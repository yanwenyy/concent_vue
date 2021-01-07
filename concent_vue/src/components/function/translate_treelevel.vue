<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-input class="input-with-select" placeholder="请输入内容" v-model="filtertext">
          <el-button @click="searchtree" icon="el-icon-search" slot="append"></el-button>
        </el-input>
        <el-card class="cardBox">
          <el-tree
            :auto-expand-parent="true"
            :current-node-key="currentkeys"
            :data="treeData"
            :default-expanded-keys="expanddefaults"
            :expand-on-click-node="false"
            :load="loadNode"
            :props="defaultProps"
            @node-click="nodeChg"
            class="el-transform-tree-node"
            highlight-current
            lazy
            node-key="uuid"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span v-if="data.type===1">
                <i class="el-icon-office-building"></i>
                {{ node.label }}
              </span>
              <span v-if="data.type===2">
                <i class="el-icon-school"></i>
                {{ node.label }}
              </span>
              <span v-if="data.type===3">
                <i class="el-icon-bank-card"></i>
                {{ node.label }}
              </span>
              <span v-if="data.type===4">
                <i class="el-icon-user"></i>
                {{ node.label }}
              </span>
              <span v-if="data.type===null||!data.type">
                <i class="el-icon-user"></i>
                {{ node.label }}
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-row style="text-align:center; margin-top:100px;">
          <el-button @click="toRight" circle icon="el-icon-arrow-right" type="primary"></el-button>
        </el-row>
        <el-row style="text-align:center;margin-top:5px;">
          <el-button @click="toLeft" circle icon="el-icon-arrow-left" type="primary"></el-button>
        </el-row>
      </el-col>
      <el-col :span="10">
        <el-card class="cardBox">
          <p style="text-align:center;">
            <span style="color:gray;" v-if="checkedOptions.length===0">暂无数据</span>
          </p>
          <el-checkbox-group size="mini" style="width:100%;" v-model="checkedBox">
            <el-checkbox-button
              :key="item.uuid"
              :label="item.uuid"
              class="checkboxborder"
              style="width:100%;margin:4px;border-left:1px solid #eee;"
              v-for="item in checkedOptions"
            >
              {{item.name}}
              <template v-if="item.type===4">({{item.custom}})</template>
            </el-checkbox-button>
          </el-checkbox-group>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['qtype', 'checkArr', 'replace','chooseOrg'],
  data() {
    return {
      treeData: [],
      leftCheck: [],
      checkedBox: [],
      checkedOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      filtertext: '',
      node: {},
      resolve: {},
      currentkeys: '',
      expanddefaults: []
    }
  },
  methods: {
    nodeChg(data, node) {
      this.node = node
      this.getCheckedNodes(data, node)
      console.log(data)
    },
    searchtree() {
      this.$http
        .post('/api/contract/init/queryUserTree/query', {
          item2: [this.node.data],
          username: this.filtertext
        })
        .then(res => {
          if (res.data.code === 0) {
            this.expanddefaults = res.data.data
            console.log(this.expanddefaults[this.expanddefaults.length - 1])

            // this.currentkeys =
          }
        })
    },
    loadNode(node, resolve) {
      console.log(node)
      var path = '/api/contract/resource/getAllChildren'
      if (this.qtype === 1 && node.data.type === 3) {
        path = '/api/contract/resource/getUsers'
      }
      this.$http
        .post(
          path,
          {
            id: node.data.id,
            providerId: node.data.providerId
          },
          { isLoading: false }
        )
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            if (res.data.data !== null) {
              res.data.data.forEach(item => {
                if (item.type === 4 && this.qtype === 1) {
                  item.leaf = true
                } else if (item.type === 3 && this.qtype === 2) {
                  item.leaf = true
                }
              })
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(
                  this.expanddefaults[this.expanddefaults.length - 1]
                )
              })
              return resolve(res.data.data)
            } else {
              return resolve([])
            }
          }
        })
    },
    toRight() {
      console.log(this.leftCheck)
      this.leftCheck.forEach(item => {
        this.checkedOptions.push(item)
      })
      this.checkedOptions = this.unique1(this.checkedOptions)
      this.$emit('checkedData', this.checkedOptions)
    },
    toLeft() {
      for (var i = 0; i < this.checkedBox.length; i++) {
        this.checkedOptions.forEach((item, index) => {
          if (item.uuid === this.checkedBox[i]) {
            this.checkedOptions.splice(index, 1)
          }
        })
      }
      this.$emit('checkedData', this.checkedOptions)
    },
    unique1(array) {
      console.log(array)
      let obj = {}
      array = array.reduce((cur, next) => {
        obj[next.uuid] ? '' : (obj[next.uuid] = true && cur.push(next))
        return cur
      }, [])
      return array
      // var n = []
      // for (var i = 0; i < array.length; i++) {
      //   if (n.indexOf(array[i]) === -1) n.push(array[i])
      // }
      // return n
    },
    getCheckedNodes(data, node) {
      this.leftCheck = []
      var arr = []
      if (this.qtype === 1) {
        if (node.data.type === 3 && node.childNodes.length) {
          node.childNodes.forEach(item => {
            arr.push(item.data)
          })
          this.leftCheck = data.children
        }
        if (node.data.type === 4) {
          arr.push(data)
        }
      }
      if (this.qtype === 2) {
        if (node.data.type === 2 && node.childNodes.length) {
          node.childNodes.forEach(item => {
            arr.push(item.data)
          })
          this.leftCheck = data.children
        }

        if (node.data.type === 3) {
          arr.push(data)
        }
      }
      this.leftCheck = arr
    }
  },

  mounted() {
    if (this.checkArr) {
      this.checkedOptions = this.checkArr
      this.checkedOptions.forEach(item => {
        item.uuid = item.userid
      })
    }
    let _self = this
   console.log(JSON.parse(this.chooseOrg))
      _self.treeData = [JSON.parse(this.chooseOrg)]
        _self.$nextTick(() => {
        _self.$refs.tree.setCurrentKey(_self.treeData[0].uuid)
        _self.node.data = _self.treeData[0]
      })

    // this.$getOrgPermission(this.$route.path, function() {
    //   _self.treeData = JSON.parse(localStorage.getItem('orgPermissionArr'))
    //   console.log(_self.treeData)
    //   _self.$nextTick(() => {
    //     _self.$refs.tree.setCurrentKey(_self.treeData[0].uuid)
    //     _self.node.data = _self.treeData[0]
    //   })
    // })
  },
  beforeDestroyed() {
    this.checkedBox = []
    this.checkedOptions = []
  }
}
</script>
<style scoped>
.el-checkbox-button__inner {
  display: inline-block;
  white-space: normal;
  word-wrap: break-word;
  width: 200px;
}
.cardBox {
  height: 300px;
  overflow-y: scroll;
}
</style>
