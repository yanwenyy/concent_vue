<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-card class="cardBox">
          <el-tree
            :data="treeData"
            :expand-on-click-node="true"
            :load="loadNode"
            :props="defaultProps"
            @node-click="getCheckedNodes"
            class="filter-tree"
            highlight-current
            lazy
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
          <el-checkbox-group   style="width:100%;" v-model="checkedBox">
            <el-checkbox-button
              :key="item.id"
              :label="item.id"
              class="checkboxborder"
              style="width:100%;margin-top:4px;"
              v-for="item in checkedOptions"
            >{{item.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['qtype', 'treeDataChild', 'rightData'],
  data() {
    return {
      treeData: [],
      leftCheck: [],
      checkedBox: [],
      checkedOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      expandKey: '',
      treeDataChild: []
    }
  },
  methods: {
    // loadNode(node, resolve) {
    //   console.log(node)
    //   if (!node.data.id) {
    //     this.treeData = JSON.parse(localStorage.getItem('orgPermissionArr'))
    //     var arr = []
    //     this.treeData.forEach(item => {
    //       if (item.operate) {
    //         arr.push(item)
    //       }
    //     })
    //     return resolve(arr)
    //   }

    //   var path = '/api/contract/resource/getChildrenOrgs'
    //   if (this.qtype === 1 && node.data.type === 3) {
    //     path = '/api/contract/resource/getChildrenOrgs'
    //   }
    //   this.$http
    //     .post(path, {
    //       id: node.data.id,
    //       providerId: node.data.providerId
    //     })
    //     .then(res => {
    //       if (res.data.code === 0) {
    //         if (res.data.data.length) {
    //           return resolve(res.data.data)
    //         } else {
    //           return resolve([])
    //         }
    //       }
    //     })
    // },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '中国铁建' }])
      }
      if (node.data.name === '中国铁建') {
        return resolve(this.treeDataChild)
      }
      if (!node.data.id) {
        // return resolve(this.treeData)
        console.log(node)
        this.treeData = JSON.parse(localStorage.getItem('orgPermissionArr'))
        var arr = []
        this.treeData.forEach(item => {
          if (item.operate) {
            arr.push(item)
          }
        })
        return resolve(arr)
      }
      this.$http
        .post('/api/contract/resource/getChildrenOrgs', {
          // 获取下级单位
          id: node.data.id,
          providerId: node.data.providerId
        })
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data.length) {
              return resolve(res.data.data)
            } else {
              return resolve([])
            }
          }
        })
    },
    toRight() {
      this.leftCheck.forEach(item => {
        this.checkedOptions.push(item)
      })
      this.checkedOptions = this.unique1(this.checkedOptions)
      this.$emit('checkedData', this.checkedOptions)
      // console.log(this.checkedOptions, 'this.checkedOptions')
    },
    toLeft() {
      for (var i = 0; i < this.checkedBox.length; i++) {
        this.checkedOptions.forEach((item, index) => {
          if (item.id === this.checkedBox[i]) {
            this.checkedOptions.splice(index, 1)
          }
        })
      }
      this.$emit('checkedData', this.checkedOptions)
    },
    unique1(array) {
      var n = []
      for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) === -1) n.push(array[i])
      }
      return n
    },
    getCheckedNodes(data, node) {
      console.log(node)
      this.leftCheck = []
      var arr = []
      if (this.qtype === 1) {
        console.log('111')
        if (node.data.type === 3 && node.childNodes.length) {
          node.childNodes.forEach(item => {
            arr.push(item.data)
          })
          this.leftCheck = data.children
        }
        if (data.type || data.type === 0) {
          arr.push(data)
        }
      }
      if (this.qtype === 2) {
        console.log('222')
        if (node.data.type === 2 && node.childNodes.length) {
          node.childNodes.forEach(item => {
            arr.push(item.data)
          })
          this.leftCheck = data.children
        }

        if (node.data.type === 3) {
          console.log('333')
          arr.push(data)
        }
      }
      this.leftCheck = arr
      console.log(this.leftCheck)
    },
    drawRight() {
      // console.log(this.rightData, 'rightData')
      var rightArr = []
      this.rightData.forEach(element => {
        var arr = {
          name: element.orgname,
          uuid: element.orgid
        }
        rightArr.push(arr)
      })
      this.checkedOptions = rightArr
      console.log(this.checkedOptions, 'this.checkedOptions')
    }
  },
  watch: {
    rightData: {
      handler(newVal, oldVal) {
        this.rightData = newVal
        this.drawRight()
      },
      deep: true
    }
  },
  mounted() {
    this.drawRight()
    // this.treeData = JSON.parse(localStorage.getItem('orgPermissionArr'))
    // this.treeData = this.treeData.some(item => {
    //   return item.operate === true
    // })
  },
  beforeDestroyed() {
    this.checkedBox = []
    this.checkedOptions = []
  }
}
</script>
<style scoped>
.cardBox {
  height: 300px;
  overflow-y: scroll;
}
</style>
