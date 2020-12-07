<template>
  <el-row :gutter="20" class="userlist">
    <el-col :span="24" class="righttable">
      <div class="searchform">
        <el-divider></el-divider>
      </div>
      <div style="margin-top: 20px;">
        <el-table
          :data="page.records"
          :header-cell-style="{'text-align' : 'center','background-color' : 'whitesmoke'}"
          border
          highlight-current-row
          ref="table"
          stripe
          style="width: 100%"
        >
          <!-- <el-table-column :width="40" align="center" show-overflow-tooltip type="selection"></el-table-column> -->

          <el-table-column :width="60" align="center" label="序号" show-overflow-tooltip type="index"></el-table-column>
          <el-table-column :min-width="420" align="center" label="消息" prop="message" show-overflow-tooltip></el-table-column>
          <el-table-column :min-width="120" label="时间" prop="createTime" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.createTime | datetimeformat}}</template>
          </el-table-column>
          <el-table-column :min-width="120" label="状态" prop="isUsed" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.isUsed === '1'">已读</span>
              <span v-if="scope.row.isUsed === '0'">未读</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="120">
            <template slot-scope="scope">
              <el-button @click="sure(scope.row)" size="mini" v-if="scope.row.isUsed === '0'">确认已读</el-button>
              <el-button disabled size="mini" v-if="scope.row.isUsed === '1'">确认已读</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page.current"
          :page-size="page.size"
          :page-sizes="[10, 50, 100]"
          :total="page.total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
          style="margin-top: 5px;"
        ></el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script scope>
export default {
  name: 'user-list',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      orgTree: [],
      expandKey: '',
      page: { current: 1, size: 10, total: 0, records: [] },
      searchParam: {
        page: {
          asc: [''],
          ascs: [''],
          current: 1,
          desc: [''],
          descs: [''],
          optimizeCountSql: true,
          orders: [
            {
              asc: true,
              column: ''
            }
          ],
          pages: 0,
          records: [{}],
          searchCount: true,
          size: 10,
          total: 0
        },
        uuid: ''
      },
      postdata: {
        uuid: ''
      },
      multipleSelection: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    // this.getOrgTree()
    this.getuserlist()
  },
  methods: {
    // 加载机构树
    getOrgTree() {
      this.$http.post('/api/base/orgs', this.postdata).then(res => {
        this.orgTree = res.data.data
        if (this.orgTree.length) this.expandKey = this.orgTree[0].id
      })
    },
    userlistSearch() {
      this.searchParam.page.current = 1
      this.getuserlist()
    },
    // 加载列表
    sure(row) {
      this.$http.post('/api/resource/readMsg', { uuid: row.uuid }).then(res => {
        this.getuserlist()
        this.getNum()
      })
    },
    getNum() {
      this.$http.post('/api/resource/getMsgNum').then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          this.$store.state.num = res.data.data
        }
      })
    },
    getuserlist() {
      this.$http.post('/api/resource/getMsgByPage', this.page).then(res => {
        this.page = res.data.data
      })
    },

    // 启用/禁用
    handleOpenOrClosed(index, row) {
      let { uuid, isused } = row
      isused = isused === '0' ? '1' : '0'
      this.$http
        .post('/api' + this.$route.path + 'enableOrDisableUser', {
          uuid,
          isused
        })
        .then(res => {
          this.getuserlist()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
    },
    // 解锁
    unlockUser() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info('请选择一条记录进行编辑操作！')
        return false
      }
      this.$http
        .post('/api' + this.$route.path + 'unlockUser', {
          uuid: this.multipleSelection[0].uuid
        })
        .then(res => {
          if (res.data.code === 0) {
            this.getuserlist()
            this.$message({
              message: '解锁成功',
              type: 'success'
            })
          }
        })
    },
    // 重置密码
    initUserPassword() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info('请选择一条记录进行编辑操作！')
        return false
      }
      this.$http
        .post('/api' + this.$route.path + 'initUserPassword', {
          uuid: this.multipleSelection[0].uuid
        })
        .then(res => {
          if (res.data.code === 0) {
            this.getuserlist()
            this.$message({
              message: '重置密码成功',
              type: 'success'
            })
          }
        })
    },

    // 增加
    add() {
      let p = {
        actpoint: 'edit',
        orgid: this.searchParam.uuid
      }
      this.$router.push({
        path: '../detail/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    // 编辑单位
    edit() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info('请选择一条记录进行编辑操作！')
        return false
      }
      let p = {
        actpoint: 'edit',
        instid: this.multipleSelection[0].uuid,
        orgid: this.multipleSelection[0].orgid,
        orgname: this.multipleSelection[0].orgname
      }
      this.$router.push({
        path: '../detail/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 关键词检索机构
    filterNode(id, data) {
      if (!id) return true
      return data.name.indexOf(id) !== -1
    },
    // 点击树获取某个单位列表
    getCheckedNodes(data) {
      this.searchParam.uuid = data.code
      this.getuserlist()
    },
    searchformReset() {
      this.$refs['searchParam'].resetFields()
      this.getuserlist()
    },
    // 分页处理函数
    handleSizeChange(val) {
      this.page.size = val
      this.getuserlist()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.page.current = val
      this.getuserlist()
    }
  }
}
</script>

<style lang="scss" scoped>
.userlist {
  padding-top: 20px;
}
.lefttree {
  height: 600px;
  overflow-y: auto;
  overflow-x: auto;
  .el-tree.filter-tree {
    margin-top: 15px;
  }
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
</style>
