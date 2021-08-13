<template>
  <el-dialog :visible.sync="visible" :append-to-body="true">
    <div>
      <el-form
        class="queryForm"
        :inline="true"
        :model="searchform"
        @keyup.enter.native="init()"
      >
        <el-form-item label="项目名称:">
          <el-input
            v-model="searchform.projectName"
            placeholder="项目名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工程类别(一级):">
          <el-select
            clearable
            filterable
            placeholder="请选择"
            @change="getTwo"
            size="mini"
            v-model="searchform.projectTypeFirstId"
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in projectDomainType"/>
          </el-select>
        </el-form-item>
        <el-form-item label="工程类别(二级):">
          <el-select
            clearable
            filterable
            placeholder="请选择"
            size="mini"
            v-model="searchform.projectTypeSecondId"
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in xqprojectType"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="init()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="dataList"
        border
        v-loading="dataListLoading"
        highlight-current-row
        @current-change="handleCurrentChange"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke'
        }"
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          header-align="center"
          align="center"
          width="80"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          :width="400"
          prop="projectName"
          align="center"
          show-overflow-tooltip
          label="项目名称"
        >
        </el-table-column>
        <el-table-column
          :width="150"
          prop="projectModuleName"
          align="center"
          show-overflow-tooltip
          label="项目板块"
        >
        </el-table-column>
        <el-table-column
          prop="projectTypeFirst"
          header-align="center"
          align="center"
          label="工程类别(一级)"
        >
        </el-table-column>
        <el-table-column
          prop="projectTypeSecond"
          header-align="center"
          align="center"
          label="工程类别(二级)"
        >
        </el-table-column>
        <el-table-column
          prop="projectLocation"
          header-align="center"
          align="center"
          label="项目所在地"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="创建日期"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.createTime | dateformat }} </span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="150"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button v-if="isAuth('biz:outcar:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>-->
        <!--<el-button v-if="isAuth('biz:outcar:delete')" type="text" size="small" @click="deleteHandle(scope.row.carNum)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="sub()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        searchform: {
          current: 1,
          size: 20,
          projectName: '',
          projectTypeFirstId: '',
          projectTypeSecondId: ''
        },
        xqprojectType: [],
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: ''
      }
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType
      }
    },
    mounted() {
      this.$store.dispatch('getCategory', {
        name: 'projectDomainType',
        id: '238a917eb2b111e9a1746778b5c1167e'
      })
    },
    methods: {
      // 工程类别二级
      getTwo(id) {
        this.searchform.enginTypeSecondId = ''
        this.xqprojectType = []
        if (id !== '') {
          this.projectDomainType.find(item => {
            if (item.id === id) {
              this.xqprojectType = item.children
            }
          })
        }
      },
      // 选中数据
      sub() {
        this.visible = false
        this.$emit('refreshDataList', this.currentRow)
      },
      // 初始化
      init() {
        this.visible = true
        this.$http
          .post('/api/statistics/StatisticsProject/list/selectProjectFb', this.searchform, { isLoading: false })
          .then(res => {
            if (res.data && res.data.code === 200) {
              this.dataList = res.data.data.records
              this.totalPage = res.data.data.total
            } else {
              this.dataList = []
              this.totalPage = 0
            }
            this.dataListLoading = false
          })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.searchform.size = val
        this.searchform.current = 1
        this.init()
      },
      // 当前页
      currentChangeHandle(val) {
        this.searchform.current = val
        this.init()
      },
      // 单选
      handleCurrentChange(val) {
        this.currentRow = val
      }
    }
  }
</script>
<style scoped>
.dialog-footer {
  margin-top: 50px;
  text-align: center;
}

>>> .el-dialog {
  width: 80%;
}

>>> .el-form-item__label {
  width: auto;
}

.inline-block {
  display: inline-block;
}

.dr-notice-warn {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  background: #ffe5e0;
  color: red;
}

.dr-notice-body {
  padding: 10px;
}

.dr-notice-body > div {
  margin-bottom: 20px;
}

.sumWeigh {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}
>>> .el-input--mini .el-input__inner {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
}
</style>
