<!--详情-->
<template>
  <div>
    <el-collapse value="projectInfo">
      <el-collapse-item title="项目信息" name="projectInfo">
        <template slot="title">
          <i class="header-icon el-icon-collection"></i>项目信息
        </template>
        <div>项目名称：<span style="color:#0a469d !important;margin-right: 50px;">{{projectName}}</span>计划类型：<span style="color:#0a469d !important;">{{planTypeName}}</span></div>
      </el-collapse-item>
    </el-collapse>

    <div style="width: 100%; overflow: hidden;margin-top:10px;">
      <el-button-group v-if="projectStatus !== '1'" style="float: left">
        <el-button icon="el-icon-success" @click="submit" type="primary" plain>提交</el-button>
        <el-button icon="el-icon-folder-checked" @click="save" type="primary" plain>保存</el-button>
        <el-button icon="el-icon-refresh-left" @click="back" type="primary" plain>返回</el-button>
      </el-button-group>
      <el-button-group v-else style="float: left">
        <el-button icon="el-icon-refresh-left" @click="back" type="primary" plain>返回</el-button>
        <el-button icon="el-icon-s-custom" @click="rollback" type="primary" plain>回退</el-button>
      </el-button-group>
    </div>

    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="data"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke'
        }"
        border
        highlight-current-row
        ref="table"
        style="width: 100%"
        cell-style="padding:5px 0"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          :width="250"
          align="left"
          label="统计项名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div :class="vnameMarginLeft(scope.row.tjxCode,scope.row.veditable)">{{scope.row.tjxName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          :width="90"
          align="center"
          prop="jldw"
          label="计量单位"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="计划"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.veditable === '1' && scope.row.venabled === '1' && projectStatus !== '1' ">
              <el-input v-model="scope.row.value" @input="scope.row.value = scope.row.value.replace(/[^\-?\d.]/g,'','')"/>
            </div>
            <div v-else-if="projectStatus !== '1' " style="text-align: right">{{sonCount(scope.row)}}</div>
            <div v-else>{{scope.row.value}}</div>
          </template>
        </el-table-column>
        <el-table-column
          :width="400"
          align="center"
          label=""
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'plan-all-detail',
    components: {
    },
    data() {
      return {
        projectStatus: JSON.parse(this.$utils.decrypt(this.$route.query.p)).planInfo.projectStatus,
        data: [],
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        proNameHover: false,
        projectName: JSON.parse(this.$utils.decrypt(this.$route.query.p)).planInfo.projectName,
        planType: JSON.parse(this.$utils.decrypt(this.$route.query.p)).planInfo.planProjectTjx.planType,
        planTypeName: JSON.parse(this.$utils.decrypt(this.$route.query.p)).planInfo.planTypeName
      }
    },
    computed: {
      vnameMarginLeft() {
        return (vcode, veditable) => {
          var vnameClass = ''
          if (vcode && veditable) {
            if (veditable === '1') {
              vnameClass += 'editable'
            }
            if (vcode.length === 6) {
              vnameClass += ' margin-left-25'
            } else if (vcode.length === 9) {
              vnameClass += ' margin-left-50'
            } else if (vcode.length === 12) {
              vnameClass += ' margin-left-75'
            } else if (vcode.length === 15) {
              vnameClass += ' margin-left-100'
            }
          }
          return vnameClass
        }
      },
      sonCount () {
        return (rowData) => {
          var bb = []
          for (var i in this.data.map(row => row.value)) {
            if (this.data.map(row => row.value)[i] && this.data.map(row => row.sumTarget)[i] === rowData.uuid) {
              bb.push(this.data.map(row => row.value)[i])
            }
          }
          return (bb.reduce((acc, cur) => (parseFloat(cur) + acc), 0) === 0 ? '' : bb.reduce((acc, cur) => (parseFloat(cur) + acc), 0))
        }
      }
    },
    methods: {
      // 保存
      save() {
        let planId = ''
        if (this.data.length > 0) {
          planId = this.data[0].planId
          let tableData = {
            planId: planId,
            planProjectTjx: {uuid: planId, status: 0},
            planPrjTjxDetailList: this.data
          }
          this.$http
            .post('/api/statistics/planPrjTjxDetail/detail/save', JSON.stringify(tableData), {useJson: true})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '保存成功',
                  duration: 1000,
                  type: 'success',
                  onClose: () => { this.$router.back() }
                })
              }
            })
        }
      },
      submit() {
        let planId = ''
        if (this.data.length > 0) {
          planId = this.data[0].planId
          let tableData = {
            planId: planId,
            planProjectTjx: {uuid: planId, status: 1},
            planPrjTjxDetailList: this.data
          }
          this.$http
            .post('/api/statistics/planPrjTjxDetail/detail/save', JSON.stringify(tableData), {useJson: true})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '提交成功',
                  duration: 1000,
                  type: 'success',
                  onClose: () => { this.$router.back() }
                })
              }
            })
        }
      },
      rollback() {
        this.$http
          .post('/api/statistics/PlanProjectTjx/detail/save', JSON.stringify({uuid: this.p.planInfo.planId, status: 0}), {useJson: true})
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '回退成功',
                duration: 1000,
                onClose: () => { this.$router.back() }
              })
            }
          })
      },
      // 返回上一页
      back() {
        this.$router.back()
      },
      // 获取数据
      getData() {
        this.$http
          .post('/api/statistics/planPrjTjxDetail/list/loadPageData', JSON.stringify({
            planId: JSON.parse(this.$utils.decrypt(this.$route.query.p)).planInfo.planId,
            planType: JSON.parse(this.$utils.decrypt(this.$route.query.p)).planInfo.planProjectTjx.planType,
            planProjectTjx: JSON.parse(this.$utils.decrypt(this.$route.query.p)).planInfo.planProjectTjx
          }), {useJson: true})
          .then(res => {
            this.data = res.data.data
            if (this.data) {
              this.data.forEach((obj) => {
                if (obj.value === 0) {
                  obj.value = ''
                }
              })
            }
          })
      }
    },
    created() {

    },
    mounted() {
      this.getData()
    }
  }
</script>
<style scoped>
  /deep/ .el-input__inner{
    height: 25px;
    text-align: right;
    padding-right:2px;
  }
  .margin-left-25{
    margin-left: 25px;
  }
  .margin-left-50{
    margin-left: 50px;
  }
  .margin-left-75{
    margin-left: 75px;
  }
  .margin-left-100{
    margin-left: 100px;
  }
  .editable{
    color: #0e45a1;
  }

  /deep/ .el-collapse-item__header{
    height:35px !important;
    ling-height:35px !important;
  }

  /deep/ .el-collapse-item__content{
    padding-bottom: 5px !important;
  }
</style>
