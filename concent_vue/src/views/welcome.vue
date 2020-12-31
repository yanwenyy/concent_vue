<template>
  <div class="home">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="height:100%;color:#aaa">
         首页
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import sysbrief from '../../static/images/sysbrief.png'
import mybrief from '../../static/images/mybrief.png'
import '@/assets/fonts/iconfont.css'
export default {
  name: 'welcome',
  components: {
    pdf
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      page: 1,
      currentPage: 0,
      pageCount: 0,
      chartColumn: null,
      chartBar: null,
      chartPie: null,
      value: '',
      sysbrief: sysbrief,
      mybrief: mybrief,
      searchform: { current: 1, size: 10 },
      carouselData: [],
      announceData: [],
      forumData: [],
      brief: {},
      approveList: [],
      noticeList: [],
      readList: [],
      projectList: [],
      activeName: 'first',
      page: { current: 1, size: 10, total: 0, records: [] },
      page1: { current: 1, size: 10, total: 0, records: [] },
      page2: { current: 1, size: 10, total: 0, records: [] },
      page3: { current: 1, size: 10, total: 0, records: [] },
      page5: { current: 1, size: 10, total: 0, records: [] },
      page6: { current: 1, size: 10, total: 0, records: [] }
    }
  },
  created() {
    this.getuserlist()
    this.getNum()
  },
  methods: {
    // 待处理
    desClick(row) {
      console.log('待处理名称', row)
      this.$router.push({
        path: row.path,
        query: ''
      })
    },

    // 证书编码
    certificateCodingClick(val) {
      // console.log('证书编码')
      // this.$router.push({
      //   path: 'appraisalresult/certificatedownprint/list',
      //   query: ''
      // })
      let obj = {
        uuid: val
      }
      this.$http
        .post('/api' + this.$route.path + '/downloadCertificate/operate', obj, {
          responseType: 'blob'
        })
        .then(res => {
          var blob = new Blob([res.data])
          if (window.navigator.msSaveOrOpenBlob) {
            // 兼容IE10
            navigator.msSaveBlob(blob)
          } else {
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = '证书.pdf' // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除万元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
          }
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
    // 获取待处理消息列表
    getuserlist() {
      let obj = {
        uuid: localStorage.getItem('routerstring')
      }
      this.$http.post('/api/init/homepage/queryList/query', obj).then(res => {
        this.page2.records = res.data.data
      })
    },

    // 获取我的消息列表
    getmsg() {
      let obj = {
        page: this.page
      }
      this.$http.post('/api/resource/getMsgByPage', obj).then(res => {
        this.page = res.data.data
      })
    },
    // 获取我的申报列表
    getMyDeclareList() {
      let obj = {
        page: this.page1
      }
      this.$http.post('/api/init/myapply/queryList/query', obj).then(res => {
        this.page1 = res.data.data
      })
    },
    // 获取申报人员公示列表
    getpeoplelist() {
      let obj = {
        page: this.page5
      }
      this.$http
        .post('/api/init/publicity/queryPageList/query', obj)
        .then(res => {
          this.page5 = res.data.data
        })
    },

    // 获取评审结果公示列表
    getresultlist() {
      let obj = {
        page: this.page6
      }
      this.$http
        .post('/api/init/publicity/queryPageList2/query', obj)
        .then(res => {
          this.page6 = res.data.data
        })
    },
    // 我的消息分页处理函数
    handleSizeChange(val) {
      this.page.size = val
      this.getmsg()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.getmsg()
    },

    // 申报列表分页
    handleSizeChange1(val) {
      this.page1.size = val
      this.getMyDeclareList()
    },
    handleCurrentChange1(val) {
      this.page1.current = val
      this.getMyDeclareList()
    },

    // 待处理列表分页
    handleSizeChange2(val) {
      this.page2.size = val
      this.getuserlist()
    },
    handleCurrentChange2(val) {
      this.page2.current = val
      this.getuserlist()
    },
    // 申报人员公示分页
    handleSizeChange5(val) {
      this.page5.size = val
      this.getpeoplelist()
    },
    handleCurrentChange5(val) {
      this.page5.current = val
      this.getpeoplelist()
    },
    // 评审结果公示分页
    handleSizeChange6(val) {
      this.page6.size = val
      this.getresultlist()
    },
    handleCurrentChange6(val) {
      this.page6.current = val
      this.getresultlist()
    },
    handleClick() {
      if (this.activeName === 'first') {
        this.getuserlist()
      } else if (this.activeName === 'third') {
        this.getmsg()
      } else if (this.activeName === 'mydeclare') {
        this.getMyDeclareList()
      } else if (this.activeName === 'Personpublic') {
        this.getpeoplelist()
      } else if (this.activeName === 'resultpublic') {
        this.getresultlist()
      }
    },
    // 轮播图
    getcarouselData() {
      this.$http
        .post('/cms/admin/api/cms/banner.json', { pageNum: 1, pageSize: 3 })
        .then(res => {
          if (res.data.code === '200') {
            this.carouselData = res.data.data
          }
        })
    },
    // 通知公告
    getAnnounceData() {
      this.$http
        .post('/cms/admin/api/cms/announce.json ', { pageNum: 1, pageSize: 8 })
        .then(res => {
          if (res.data.code === '200') {
            this.announceData = res.data.data
          }
        })
    },
    // 交流园地
    getForumData() {
      this.$http
        .post('/cms/admin/api/cms/news.json', { pageNum: 1, pageSize: 5 })
        .then(res => {
          if (res.data.code === '200') {
            this.forumData = res.data.data
          }
        })
    },
    // 简报
    getBriefData() {
      this.$http.post('/api/welcome/briefing/detail').then(res => {
        if (res.data.code === 0) {
          this.brief = res.data.data
        }
      })
    },
    // 待办--流程审批
    getApproveList() {
      this.$http
        .post('/api/base/approve/todo', { current: 1, size: 3 })
        .then(res => {
          if (res.data.code === 0) {
            this.approveList = res.data.data.records
          }
        })
    },
    // 待办--行政工作(通知)
    getNoticeList() {
      this.$http
        .post('/api/welcome/message/notice/list', { current: 1, size: 3 })
        .then(res => {
          if (res.data.code === 0) {
            this.noticeList = res.data.data.records
          }
        })
    },
    // 我的项目
    getProjectList() {
      this.$http
        .post('/api/welcome/project/list ', { current: 1, size: 8 })
        .then(res => {
          if (res.data.code === 0) {
            this.projectList = res.data.data.records
          }
        })
    },
    // 待阅
    getReadList() {
      this.$http
        .post('/api/welcome/message/read/list ', { current: 1, size: 5 })
        .then(res => {
          if (res.data.code === 0) {
            this.readList = res.data.data.records
          }
        })
    },
    // 页面跳转开始
    toApproveList() {
      this.$router.push({
        path: '/message/Approve/'
      })
    },
    toApproveDetail(item) {
      var p = {}
      if (item.currNode === '退回') {
        p = {
          actpoint: 'edit',
          instid: item.instId,
          uuid: item.instId,
          jumpmark: true
        }
      } else {
        p = {
          actpoint: 'verify',
          instid: item.instId,
          jumpmark: true
        }
      }
      var todoPath
      if (item.todoUrl.slice(-1) !== '/') {
        todoPath = item.todoUrl + '/'
      } else {
        todoPath = item.todoUrl
      }
      this.$router.push({
        path: todoPath,
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    toNoticeList() {
      this.$router.push({
        path: '/message/notice/'
      })
    },
    toReadList() {
      this.$router.push({
        path: '/message/read/'
      })
    },
    // 行政工作和待阅详情跳转
    // handleCurrentChange(item) {
    //   let p = {
    //     actpoint: 'olook',
    //     instid: item.instid,
    //     uuid: item.instid,
    //     jumpmark: true
    //   }
    //   let todoPath = this.getToPath(item.audittype)
    //   this.$router.push({
    //     path: todoPath,
    //     query: { p: this.$utils.encrypt(JSON.stringify(p)) }
    //   })
    // },
    getToPath(audittype) {
      var todoPath
      if (audittype === 'workpoint') {
        // 工作要点
        todoPath = '/manage/workpoint/search/detail/'
      } else if (audittype === 'publicity') {
        // 审前公示
        todoPath = '/task/ready/publicity/detail/'
      } else if (audittype === 'meeting') {
        // 进点会
        todoPath = '/task/do/meeting/detail/'
      } else if (audittype === 'prenotice') {
        // 审前通知书
        todoPath = '/task/ready/prenotice/detail/'
      } else if (audittype === 'notice') {
        // 审计通知书
        todoPath = '/task/ready/notice/detail/'
      } else if (audittype === 'auditopinion') {
        // 审计意见书
        todoPath = '/task/report/auditopinion/detail/'
      } else if (audittype === 'seekopinion') {
        // 征求意见表
        todoPath = '/task/report/seekopinion/detail/'
      } else if (audittype === 'official') {
        // 报告正式稿
        todoPath = '/task/report/official/detail/'
      } else if (audittype === 'seekopinions') {
        // 征求意见反馈
        todoPath = '/interflow/seekopinions/detail/'
      } else if (audittype === 'data') {
        // 所需资料反馈
        todoPath = '/interflow/data/detail/'
      } else if (audittype === 'rectifyplan') {
        // 整改计划上报
        todoPath = '/interflow/rectifyplan/detail/'
      } else if (audittype === 'rectifyreport') {
        // 整改报告上报
        todoPath = '/interflow/rectifyreport/detail/'
      }
      return todoPath
    },
    // 项目列表
    toProjectList() {
      this.$router.push({
        path: '/task/workplat/list'
      })
    },
    toProjectDetail(item) {
      let p = {
        projectid: item.uuid,
        jumpmark: true
      }
      this.$router.push({
        path: '/task/workplat/detail/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    // 通知公告列表
    toAnnounceList() {
      this.$router.push({
        path: '/cms/announce'
      })
    },
    toCmsDetail(jumpurl) {
      this.$router.push({
        path: '/cms/detail/',
        query: { src: this.$utils.encrypt(jumpurl) }
      })
    },
    toDynamicList() {
      this.$router.push({
        path: '/cms/news'
      })
    }
  }
}
</script>
<style lang="scss">
.el-card__body .text {
  margin-right: -20px;
}
.el-card__body .text div.clearfix:hover {
  cursor: pointer;
}
.el-card__body .text div.clearfix.title-two:hover {
  cursor: default;
}
.el-card__body .text div.clearfix:hover {
  .home-true-notice-title,
  .home-exchange-title,
  .home-notice-title,
  .home-notice-time {
    color: #409eff;
  }
}

.briefSpan {
  font-size: 14px;
}
.brief {
  height: 100%;
  margin-left: 10px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100px auto;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.chart-container {
  width: 100%;
}
.el-divider--horizontal {
  margin: 6px 0;
}
.home-base-icon {
  display: inline-block;
  width: 23px;
  height: 23px;
  background: url(../../static/images/base-title-icon.png) center no-repeat
    #ff0000;
}

.row {
  padding: 0 5%;
}

.row-left {
  padding-right: 40px;
}
.row-right {
  padding-left: 40px;
}

.row-container {
  padding: 10px 20px;
  border: 1px solid #d6d6d6;
  margin: 5px 0px;
}

.row-container .row-left::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 300px;
  top: calc(50% - 150px);
  left: 50%;
  background-color: #ccc;
  box-shadow: 1px 1px 3px #ccc, -1px -1px 3px #f6f7f7;
}

.bottom-row .row-left::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 200px;
  top: calc(50% - 100px);
  left: 50%;
  background-color: #ccc;
  box-shadow: 1px 1px 3px #ccc, -1px -1px 3px #f6f7f7;
}

.row-container .row-left h4 {
  margin: 0;
  height: 42px;
  line-height: 42px;
}

// .middle-row::before {
//   content: "";
//   position: absolute;
//   width: 5px;
//   height: 60px;
//   top: calc(50% - 30px);
//   background-color: #424f72;
//   z-index: 2;
// }
// .middle-row::after {
//   content: "";
//   position: absolute;
//   width: 5px;
//   height: 180px;
//   top: calc(50% - 90px);
//   right: 5%;
//   background-color: #424f72;
//   z-index: 2;
// }
.bottom-row {
  background-color: #f6f7f7;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: -5px;
}

.bottom-row .box-card {
  background-color: #f6f7f7;
}

.box-card >>> .el-card__header {
  padding: 10px 20px;
}

.home-true-notice {
  border-bottom: 1px dashed #e5e5e5;
  margin-right: -20px;
}
.home-true-notice-title {

  background: url(../../static/images/home-true-notice-icon.png) left center
    no-repeat;
  background-position: 20px center;
  padding-left: 35px;
  line-height: 49px;
  width: calc(100% - 165px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  color: #333;
  font-family: '微软雅黑';
}

.home-exchange-title {

  background: url(../../static/images/home-exchange-icon.png) left center
    no-repeat;
  background-position: 0px 15px;
  padding-left: 30px;
  line-height: 42px;
  width: calc(100% - 165px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  color: #333;
  font-family: '微软雅黑';
  background-size: 16px 16px;
}

.home-notice-title {

  padding-left: 20px;
  line-height: 42px;
  width: calc(100% - 165px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  color: #333;
  font-family: '微软雅黑' ；;
}
.home-notice-title::before {
  content: '';
  position: absolute;
  top: 18px;
  left: 5px;
  width: 5px;
  height: 5px;
  background-color: #2196f3;
}
.home-notice-time {
  float: right;
  text-align: right;
  line-height: 42px;
  min-width: 90px;
  color: #aaa;
}

.home-true-notice .home-notice-time {
  margin-right: 0px;
  line-height: 49px;
}

.el-card {
  border: 0 none;
}

.el-card__header {
  border-bottom-color: #d6d6d6;
}
.el-card__header span {
  position: relative;
  font-size: 20px;
  font-family: '微软雅黑';
}

.el-card__header span::before {
  content: '';
  position: absolute;
  top: 5px;
  left: -14px;
  width: 4px;
  height: 20px;
  background-color: #bd1e21;
}

.text {
  font-size: 14px;
  margin-left: -20px;
  margin-top: -10px;
  margin-bottom: -10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

/* 简报 */
.brief {
  text-align: center;
}
.brief .title {
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  color: #4d4d4d;
}
.brief .content {
  border: 1px solid #d7e5f0;
  border-radius: 0 0 6px 6px;
}
.brief .head {
  display: flex;
  justify-content: space-between;
  background: url(../../static/images/5.png) no-repeat center -1px;
}
.brief .head div {
  width: calc(50% - 28px);
  height: 33px;
  line-height: 34px;
  cursor: pointer;
  border-bottom: 1px solid #d7e5f0;
}
.brief ul {
  display: flex;
  justify-content: space-around;
  padding-left: 0px;
  flex-wrap: wrap;
  margin: 5px 0;
}
.brief li {
  position: relative;
  box-sizing: border-box;
  padding-left: 14%;
  padding-right: 4%;
  padding-top: 4px;
  height: 50px;
  line-height: 1;
  border-radius: 6px 0 6px 0;
  // background-color: #5588c7;
  background-color: #99ccff;
  margin: 5px;
  color: #fff;
  text-align: left;
  min-width: 35%;
}
.brief li div {
  font-size: 16px;
  position: absolute;
  top: 7px;
  left: 35%;
}
.brief li span {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 30px;
  left: 35%;
}

.brief li:nth-child(3),
.brief li:nth-child(4) {
  // background-color: #eb7f58;
  background-color: #99cc33;
}
.brief li:nth-child(5),
.brief li:nth-child(6) {
  // background-color: #0199e4;
  background-color: #edb637;
}
.brief li:nth-child(7),
.brief li:nth-child(8) {
  // background-color: #4cc14e;
  background-color: #99ccff;
}
.brief li:nth-child(9),
.brief li:nth-child(10) {
  // background-color: #7688ec;
  background-color: #99cc33;
}
.brief li:nth-child(11),
.brief li:nth-child(12) {
  // background-color: #47b7a7;
  background-color: #edb637;
}
.brief li:nth-child(13),
.brief li:nth-child(14) {
  background-color: #edb637;
}
/* 字体图标 */
.brief li::before {
  font-family: 'iconfont' !important;
  position: absolute;
  left: 8%;
  top: 0;
  font-size: 24px;
  line-height: 41px;
}
.brief li:nth-child(-n + 4)::before {
  content: '\e641';
}
.brief li:nth-child(5)::before,
.brief li:nth-child(6)::before {
  content: '\e697';
  font-weight: 700;
}
.brief li:nth-child(7)::before,
.brief li:nth-child(8)::before {
  content: '\e628';
}
.brief li:nth-child(9)::before,
.brief li:nth-child(10)::before,
.brief li:nth-child(11)::before,
.brief li:nth-child(12)::before {
  content: '\e60d';
}
.brief li:nth-child(13)::before,
.brief li:nth-child(14)::before {
  content: '\e770';
}
@media screen and (max-width: 1400px) {
  .row {
    padding: 0 5px;
    padding-right: 10px;
  }
  .middle-row::after {
    right: 7px;
  }
}
.home {
  .el-tabs__item {
    color: #333;
  }
  .el-tabs__item:hover {
    color: #409eff;
    position: relative;
    top: -2px;
  }
  .el-tabs__item.is-active {
    color: #409eff;
    position: relative;
    top: 0;
  }
  .notice-list {
    width: 100%;
    list-style: none;
    // box-sizing: border-box;
    // font-family: 'fanti';
    p {

      font-size: 18px;
      color: #aaa;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      // text-overflow: ellipsis;
    }
    p:first-child {
      width: 68%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p:last-child {
      width: 31%;
      text-align: right;
    }
    p:hover {
      color: #2b63ff;
    }
  }
}
</style>
