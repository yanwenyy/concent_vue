<template>
  <el-dialog
    :destroy-on-close="true"
    title="附件列表"
    :visible.sync="dialogVisible"
  >

    <div>
      <el-table
        :data="detailform.commonFilesList"
        :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
        @selection-change="handleSelectionChange"
        align="center"
        border
        class="contractInfoTable"
        ref="table"
        style="width: 100%;height: auto;"
      >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column :resizable="false"
                                 label="单位"
                                 prop="orgName"
                                 show-overflow-tooltip>

                </el-table-column>

                <el-table-column :resizable="false"
                                 label="是否可见"
                                 prop="isDisplay"
                                 show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-button :underline="false"
                             @click="handleRemove(scope.row,scope.$index)"
                             type="warning">可见切换</el-button>
                  </template>
                </el-table-column>
              </el-table>

    </div>
    <div>
<el-pagination
  :current-page="page.current"
  :page-size="page.size"
  :page-sizes="[10, 50, 100]"
  :total="page.total"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
  layout="total, sizes, prev, pager, next, jumper"
></el-pagination>
    </div>
  </el-dialog>
</template>

<script>
  //import datas from '@/utils/positionOrg'

  export default {
    data() {
      return {
        page: {current: 1, size: 10, total: 0, records: []},
        searchform:{
          uuid:'',
          businessId:'',
          businessType:'',
          businessCode:'',
          fileName:'',
          fileType:'',
          fileSize:'',
          filePath:'',
          remarks:''
        },
        detailform:{
          commonFilesList:[
            {
              orgName:"中土集团",
              orgId:"中土集团",
              isDisplay:"可见"
            },
            {
              orgName:"十一局",
              orgId:"十一局",
              isDisplay:"可见"
            },
            {
              orgName:"十二局",
              orgId:"十二局",
              isDisplay:"可见"
            },
            {
              orgName:"大桥局",
              orgId:"大桥局",
              isDisplay:"可见"
            },
            {
              orgName:"十四局",
              orgId:"十四局",
              isDisplay:"可见"
            },
            {
              orgName:"十五局",
              orgId:"十五局",
              isDisplay:"可见"
            },
            {
              orgName:"十六局",
              orgId:"十六局",
              isDisplay:"可见"
            },
            {
              orgName:"十七局",
              orgId:"十七局",
              isDisplay:"可见"
            },
            {
              orgName:"十八局",
              orgId:"十八局",
              isDisplay:"可见"
            },
            {
              orgName:"十九局",
              orgId:"十九局",
              isDisplay:"可见"
            },
            {
              orgName:"二十局",
              orgId:"二十局",
              isDisplay:"可见"
            },
            {
              orgName:"二十一局",
              orgId:"二十一局",
              isDisplay:"可见"
            },
            {
              orgName:"二十二局",
              orgId:"二十二局",
              isDisplay:"可见"
            },
            {
              orgName:"二十三局",
              orgId:"二十三局",
              isDisplay:"可见"
            },
            {
              orgName:"二十四局",
              orgId:"二十四局",
              isDisplay:"可见"
            },
            {
              orgName:"二十五局",
              orgId:"二十五局",
              isDisplay:"可见"
            },
            {
              orgName:"中铁建设",
              orgId:"中铁建设",
              isDisplay:"可见"
            },
            {
              orgName:"电气化局",
              orgId:"电气化局",
              isDisplay:"可见"
            },
            {
              orgName:"港航局",
              orgId:"港航局",
              isDisplay:"可见"
            },
            {
              orgName:"城建集团",
              orgId:"城建集团",
              isDisplay:"可见"
            },
            {
              orgName:"铁建国际",
              orgId:"铁建国际",
              isDisplay:"可见"
            },
            {
              orgName:"铁一院",
              orgId:"铁一院",
              isDisplay:"可见"
            },
            {
              orgName:"铁四院",
              orgId:"铁四院",
              isDisplay:"可见"
            },
            {
              orgName:"中非建设",
              orgId:"中非建设",
              isDisplay:"可见"
            },
            {
              orgName:"中铁第五勘查设计院集团有限公司",
              orgId:"中铁第五勘查设计院集团有限公司",
              isDisplay:"可见"
            },
            {
              orgName:"上海院",
              orgId:"上海院",
              isDisplay:"可见"
            },
            {
              orgName:"物资集团",
              orgId:"物资集团",
              isDisplay:"可见"
            },
            {
              orgName:"铁建重工",
              orgId:"铁建重工",
              isDisplay:"可见"
            },
            {
              orgName:"铁城监理",
              orgId:"铁城监理",
              isDisplay:"可见"
            },
            {
              orgName:"房地产集团",
              orgId:"房地产集团",
              isDisplay:"可见"
            },
            {
              orgName:"财务公司",
              orgId:"财务公司",
              isDisplay:"可见"
            },
            {
              orgName:"诚合保险",
              orgId:"诚合保险",
              isDisplay:"可见"
            },
            {
              orgName:"金租公司",
              orgId:"金租公司",
              isDisplay:"可见"
            },
            {
              orgName:"资产管理公司",
              orgId:"资产管理公司",
              isDisplay:"可见"
            },
            {
              orgName:"投资集团",
              orgId:"投资集团",
              isDisplay:"可见"
            },
            {
              orgName:"中铁磁浮",
              orgId:"中铁磁浮",
              isDisplay:"可见"
            },
            {
              orgName:"华南公司",
              orgId:"华南公司",
              isDisplay:"可见"
            },
            {
              orgName:"南方投资公司",
              orgId:"南方投资公司",
              isDisplay:"可见"
            },
            {
              orgName:"昆仑投资公司",
              orgId:"昆仑投资公司",
              isDisplay:"可见"
            },
            {
              orgName:"铁一院",
              orgId:"铁一院",
              isDisplay:"可见"
            },
            {
              orgName:"华北投资公司",
              orgId:"华北投资公司",
              isDisplay:"可见"
            },
            {
              orgName:"重庆投资集团",
              orgId:"重庆投资集团",
              isDisplay:"可见"
            },
            {
              orgName:"海峡公司",
              orgId:"海峡公司",
              isDisplay:"可见"
            },
            {
              orgName:"北部湾投资公司",
              orgId:"北部湾投资公司",
              isDisplay:"可见"
            },
            {
              orgName:"西北投资公司",
              orgId:"西北投资公司",
              isDisplay:"可见"
            },
            {
              orgName:"城市投资",
              orgId:"城市投资",
              isDisplay:"可见"
            },
            {
              orgName:"铁建高新",
              orgId:"铁建高新",
              isDisplay:"可见"
            },
            {
              orgName:"商务公司",
              orgId:"商务公司",
              isDisplay:"可见"
            },
            {
              orgName:"中国铁建股份有限公司北京培训中心",
              orgId:"中国铁建股份有限公司北京培训中心",
              isDisplay:"可见"
            },
            {
              orgName:"中铁建网络信息科技有限公司",
              orgId:"中铁建网络信息科技有限公司",
              isDisplay:"可见"
            },
            {
              orgName:"东北区域总部",
              orgId:"东北区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"华北区域总部",
              orgId:"华北区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"中原区域总部",
              orgId:"中原区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"华中区域总部",
              orgId:"华中区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"华东区域总部",
              orgId:"华东区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"华南区域总部",
              orgId:"华南区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"重庆区域总部",
              orgId:"重庆区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"西南区域总部",
              orgId:"西南区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"西北区域总部",
              orgId:"西北区域总部",
              isDisplay:"可见"
            },
            {
              orgName:"国际集团",
              orgId:"国际集团",
              isDisplay:"可见"
            },
            {
              orgName:"京承高速",
              orgId:"京承高速",
              isDisplay:"可见"
            },
            {
              orgName:"网信科技",
              orgId:"网信科技",
              isDisplay:"可见"
            },
            {
              orgName:"中铁建国际投资有限公司",
              orgId:"中铁建国际投资有限公司",
              isDisplay:"可见"
            },
            {
              orgName:"发展公司",
              orgId:"发展公司",
              isDisplay:"可见"
            },
            {
              orgName:"军民融合指挥部",
              orgId:"军民融合指挥部",
              isDisplay:"可见"
            },
            {
              orgName:"北方投资",
              orgId:"北方投资",
              isDisplay:"可见"
            },
            {
              orgName:"中铁建资本控股集团有限公司",
              orgId:"中铁建资本控股集团有限公司",
              isDisplay:"可见"
            }
          ]
        },
        selectbusinessId:"",


        dialogVisible: true,


        multipleSelection: [],
      }
    },
    mounted() {
      //json方法引入数据
      // this.$http.get('/static/jsonData/position.json', { isLoading: false }).then(res =>{
      //   // console.log(res.data.data);
      //   this.datas=res.data.data
      // });

      //js方法引入数据
      //this.datas=datas;
      //console.log(datas)
    },
    methods: {
      handleSizeChange(val) {
        this.searchform.size = val
        this.getData()
      },
      handleCurrentChange(val) {
        this.searchform.current = val
        this.getData()
      },
      //上传附件
      handleChange(response, file, fileList) {
        if (response && response.code === 200) {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.detailform.commonFilesList.push(response.data);
              console.log(JSON.stringify(this.detailform.commonFilesList))
            }
          })
        } else {
          this.$message.error(response.msg)
        }
      },
      handleRemove(file, index) {
        this.$http
          .post(
            "/api/topInfo/CommonFiles/list/delete",
            {ids: [file.uuid]},
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.detailform.commonFilesList.splice(index, 1);
            }

          });
        console.log(this.detailform.commonFilesList)
      },
      init(val) {
        this.selectbusinessId = val;
        this.dialogVisible = true;
      },
      handleCheckChange(data, checked, indeterminate) {

        if (checked) {
          this.resultData.push(data);
        }
        console.log(data, checked, indeterminate);
      },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
      handleNodeClick(data) {
        // console.log(data);
        if (this.notSelect.indexOf(data.detailCode) == '-1') {
          this.dialogVisible = false;
          //this.$emit('getPosition',data)
        }
      },
      result() {
        this.dialogVisible = false;
        this.$emit('getPosition', this.resultData)
        this.resultData = [];
      },
      loadData() {
        alert(this.selectbusinessId);
        this.searchform.businessId = this.selectbusinessId;
        this.$http
          .post(
            '/api/topInfo/CommonFiles/list/loadPageData',
            this.searchform
          )
          .then(res => {
            this.page = res.data.data
            console.log(JSON.stringify(this.page));
          })
      }
    }
  }
</script>

<style scoped>

</style>
