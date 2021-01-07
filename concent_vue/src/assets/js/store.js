import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  bulletinType:[],//公告类型
  certificationType:[],//资审方式
  amountSource:[],//资金来源
  purchaseNature:[],//采购性质
  orgType:[],//组织类型
  bizCode:[],//业务板块
  measureUnit:[],//计量单位表
  xqprojectType:[],//新签工程行业类别
  railwayBureau:[],//所属铁路局
  statistics:[],//统计相关表
  wumoveType:[],//物资贸易合同所属类别
  eacode:[],//代码对照表
  projectNature:[],//项目性质类别
  bizTypeCode:[],//业务类别
  taxType:[],//纳税类型
  authCode:[],//权限类别
  supLevel:[],//名录类型
  businessType:[],//企业类型
  supType:[],//供应商类型
  constructionUnitNature:[],//建设单位性质类别
  position:[],//区域信息
  warZone:[],//战区
  arms:[],//兵种1
  siteName:[],//场地名称
  assemblyType:[],//装配类型
  architecturalType:[],//建筑类型
  buildingStructure:[],//房屋建筑结构类型
  yesOrNo:[],//是否
  systemAround:[],//系统内外
  roadOutside:[],//路内路外
  domesticOverseas:[],//境内、外
  projectType:[],//项目类型
  emergingMarket:[],//新兴市场
  customernatureCode:[],//客户性质
  cooperation:[],//框架合作协议
  qwe:[],//qwe
  stage:[],//商务阶段
  plantype:[],//计划类型
  processState:[],//流程状态
  followType:[],//跟进单位类型
  customerStatus:[],//客户状态
  bidType:[],//招标方式
  Information:[],//资审通过状态
  projectModel:[],//项目模式
  companyType:[],//客户类别
  probability:[],//预计中标概率
  projectDomainType:[],//工程行业类别
  railwayLine:[],//所属线路
  contractType:[],//合同类型
  certificationType:[],//项目板块

  optiondata:[],
  dialogState: 'edit',
  num: 0,
  postGrade: '',
  collapsed: true,
  topNavState: '',
  leftNavState: '',
  account: '',
  route: '',
  projectroute: '',
  // curProjectId: '1d8283451c7b8b4e56fc62744e74f7ba'
  curProjectId: '11484beb7ca57f78b1773381547ec24d ',
  messageCount: [],
  categoryHc:[],
  category:{},//一级大类
}

const getters = {
  getToolData(state) {
    return state.toolBarData
  },
  getCategory(state){
    return state.category
  }

}
const mutations = {
  setToolData(state, data) {
    this.state.optiondata=JSON.parse(sessionStorage.getItem('optiondata'));
    // console.log(state.category[data.name])
    if(this.state.optiondata== null){
      // 添加标签按钮，如果当前路由已经打开，则不再重复添加
      Vue.prototype.$http.get('/jsonapi/System/system/category/v1.0/wholetreeNew').then(res => {
        this.state.optiondata = res.data.data;
      sessionStorage.setItem('optiondata',JSON.stringify(state.optiondata));
      this.state.optiondata=JSON.parse(sessionStorage.getItem('optiondata'));
      this.state.optiondata.forEach((item) => {
        switch (item.categoryCode){
      case 'railwayLine':
        state.railwayLine=item.sysCategoryDetailList;
        break;
      case 'bulletinType':
        state.bulletinType=item.sysCategoryDetailList;
        break;
      case 'certificationType':
        state.certificationType=item.sysCategoryDetailList;
        break;
      case 'amountSource':
        state.amountSource=item.sysCategoryDetailList;
        break;
      case 'purchaseNature':
        state.purchaseNature=item.sysCategoryDetailList;
        break;
      case 'orgType':
        state.orgType=item.sysCategoryDetailList;
        break;
      case 'bizCode':
        state.bizCode=item.sysCategoryDetailList;
        break;
      case 'measureUnit':
        state.measureUnit=item.sysCategoryDetailList;
        break;
      case 'xqprojectType':
        state.xqprojectType=item.sysCategoryDetailList;
        break;
      case 'railwayBureau':
        state.railwayBureau=item.sysCategoryDetailList;
        break;
      case 'statistics':
        state.statistics=item.sysCategoryDetailList;
        break;
      case 'wumoveType':
        state.wumoveType=item.sysCategoryDetailList;
        break;
      case 'eacode':
        state.eacode=item.sysCategoryDetailList;
        break;
      case 'projectNature':
        state.projectNature=item.sysCategoryDetailList;
        break;
      case 'bizTypeCode':
        state.bizTypeCode=item.sysCategoryDetailList;
        break;
      case 'taxType':
        state.taxType=item.sysCategoryDetailList;
        break;
      case 'authCode':
        state.authCode=item.sysCategoryDetailList;
        break;
      case 'supLevel':
        state.supLevel=item.sysCategoryDetailList;
        break;
      case 'businessType':
        state.businessType=item.sysCategoryDetailList;
        break;
      case 'supType':
        state.supType=item.sysCategoryDetailList;
        break;
      case 'constructionUnitNature':
        state.constructionUnitNature=item.sysCategoryDetailList;
        break;
      case 'position':
        state.position=item.sysCategoryDetailList;
        break;
      case 'warZone':
        state.warZone=item.sysCategoryDetailList;
        break;
      case 'arms':
        state.arms=item.sysCategoryDetailList;
        break;
      case 'siteName':
        state.siteName=item.sysCategoryDetailList;
        break;
      case 'assemblyType':
        state.assemblyType=item.sysCategoryDetailList;
        break;
      case 'architecturalType':
        state.architecturalType=item.sysCategoryDetailList;
        break;
      case 'buildingStructure':
        state.buildingStructure=item.sysCategoryDetailList;
        break;
      case 'yesOrNo':
        state.yesOrNo=item.sysCategoryDetailList;
        break;
      case 'systemAround':
        state.systemAround=item.sysCategoryDetailList;
        break;
      case 'roadOutside':
        state.roadOutside=item.sysCategoryDetailList;
        break;
      case 'domesticOverseas':
        state.domesticOverseas=item.sysCategoryDetailList;
        break;
      case 'projectType':
        state.projectType=item.sysCategoryDetailList;
        break;
      case 'emergingMarket':
        state.emergingMarket=item.sysCategoryDetailList;
        break;
      case 'customernatureCode':
        state.customernatureCode=item.sysCategoryDetailList;
        break;
      case 'cooperation':
        state.cooperation=item.sysCategoryDetailList;
        break;
      case 'qwe':
        state.qwe=item.sysCategoryDetailList;
        break;
      case 'stage':
        state.stage=item.sysCategoryDetailList;
        break;
      case 'plantype':
        state.plantype=item.sysCategoryDetailList;
        break;
      case 'processState':
        state.processState=item.sysCategoryDetailList;
        break;
      case 'followType':
        state.followType=item.sysCategoryDetailList;
        break;
      case 'customerStatus':
        state.customerStatus=item.sysCategoryDetailList;
        break;
      case 'bidType':
        state.bidType=item.sysCategoryDetailList;
        break;
      case 'Information':
        state.Information=item.sysCategoryDetailList;
        break;
      case 'projectModel':
        state.projectModel=item.sysCategoryDetailList;
        break;
      case 'companyType':
        state.companyType=item.sysCategoryDetailList;
        break;
      case 'probability':
        state.probability=item.sysCategoryDetailList;
        break;
      case 'projectDomainType':
        state.projectDomainType=item.sysCategoryDetailList;
        break;
      case 'contractType':
        state.contractType=item.sysCategoryDetailList;
        break;
      case 'projectPlate':
        state.projectPlate=item.sysCategoryDetailList;
        break;
      }
    })
    })
    }else{
      this.state.optiondata.forEach((item) => {
        switch (item.categoryCode){
      case 'railwayLine':
        state.railwayLine=item.sysCategoryDetailList;
        break;
      case 'bulletinType':
        state.bulletinType=item.sysCategoryDetailList;
        break;
      case 'certificationType':
        state.certificationType=item.sysCategoryDetailList;
        break;
      case 'amountSource':
        state.amountSource=item.sysCategoryDetailList;
        break;
      case 'purchaseNature':
        state.purchaseNature=item.sysCategoryDetailList;
        break;
      case 'orgType':
        state.orgType=item.sysCategoryDetailList;
        break;
      case 'bizCode':
        state.bizCode=item.sysCategoryDetailList;
        break;
      case 'measureUnit':
        state.measureUnit=item.sysCategoryDetailList;
        break;
      case 'xqprojectType':
        state.xqprojectType=item.sysCategoryDetailList;
        break;
      case 'railwayBureau':
        state.railwayBureau=item.sysCategoryDetailList;
        break;
      case 'statistics':
        state.statistics=item.sysCategoryDetailList;
        break;
      case 'wumoveType':
        state.wumoveType=item.sysCategoryDetailList;
        break;
      case 'eacode':
        state.eacode=item.sysCategoryDetailList;
        break;
      case 'projectNature':
        state.projectNature=item.sysCategoryDetailList;
        break;
      case 'bizTypeCode':
        state.bizTypeCode=item.sysCategoryDetailList;
        break;
      case 'taxType':
        state.taxType=item.sysCategoryDetailList;
        break;
      case 'authCode':
        state.authCode=item.sysCategoryDetailList;
        break;
      case 'supLevel':
        state.supLevel=item.sysCategoryDetailList;
        break;
      case 'businessType':
        state.businessType=item.sysCategoryDetailList;
        break;
      case 'supType':
        state.supType=item.sysCategoryDetailList;
        break;
      case 'constructionUnitNature':
        state.constructionUnitNature=item.sysCategoryDetailList;
        break;
      case 'position':
        state.position=item.sysCategoryDetailList;
        break;
      case 'warZone':
        state.warZone=item.sysCategoryDetailList;
        break;
      case 'arms':
        state.arms=item.sysCategoryDetailList;
        break;
      case 'siteName':
        state.siteName=item.sysCategoryDetailList;
        break;
      case 'assemblyType':
        state.assemblyType=item.sysCategoryDetailList;
        break;
      case 'architecturalType':
        state.architecturalType=item.sysCategoryDetailList;
        break;
      case 'buildingStructure':
        state.buildingStructure=item.sysCategoryDetailList;
        break;
      case 'yesOrNo':
        state.yesOrNo=item.sysCategoryDetailList;
        break;
      case 'systemAround':
        state.systemAround=item.sysCategoryDetailList;
        break;
      case 'roadOutside':
        state.roadOutside=item.sysCategoryDetailList;
        break;
      case 'domesticOverseas':
        state.domesticOverseas=item.sysCategoryDetailList;
        break;
      case 'projectType':
        state.projectType=item.sysCategoryDetailList;
        break;
      case 'emergingMarket':
        state.emergingMarket=item.sysCategoryDetailList;
        break;
      case 'customernatureCode':
        state.customernatureCode=item.sysCategoryDetailList;
        break;
      case 'cooperation':
        state.cooperation=item.sysCategoryDetailList;
        break;
      case 'qwe':
        state.qwe=item.sysCategoryDetailList;
        break;
      case 'stage':
        state.stage=item.sysCategoryDetailList;
        break;
      case 'plantype':
        state.plantype=item.sysCategoryDetailList;
        break;
      case 'processState':
        state.processState=item.sysCategoryDetailList;
        break;
      case 'followType':
        state.followType=item.sysCategoryDetailList;
        break;
      case 'customerStatus':
        state.customerStatus=item.sysCategoryDetailList;
        break;
      case 'bidType':
        state.bidType=item.sysCategoryDetailList;
        break;
      case 'Information':
        state.Information=item.sysCategoryDetailList;
        break;
      case 'projectModel':
        state.projectModel=item.sysCategoryDetailList;
        break;
      case 'companyType':
        state.companyType=item.sysCategoryDetailList;
        break;
      case 'probability':
        state.probability=item.sysCategoryDetailList;
        break;
      case 'projectDomainType':
        state.projectDomainType=item.sysCategoryDetailList;
        break;
      case 'contractType':
        state.contractType=item.sysCategoryDetailList;
        break;
      case 'projectPlate':
        state.projectPlate=item.sysCategoryDetailList;
        break;
      }
    })
    }
  },
  setCategory(state, data) {

    state.category=JSON.parse(sessionStorage.getItem('category'))||{};
    // console.log(state.category[data.name])
    if(state.category[data.name]== undefined){
      Vue.prototype.$http.get('/jsonapi/System/system/category/detail//v1.0/tree/' + data.id).then(res => {
        state.category[data.name] = res.data.data;
      sessionStorage.setItem('category',JSON.stringify(state.category));
      state.category=JSON.parse(sessionStorage.getItem('category'));
    })
    }else{
      state.category=JSON.parse(sessionStorage.getItem('category'));
    }
  }
}


const actions = {
  getConfig({ commit }, data) {
    commit('setToolData', data)

  },
  getOptiondataByType({ commit }, data)
  {
    commit('setToolData1', data)

  },
  getCategory({ commit }, data){
    commit('setCategory', data)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
