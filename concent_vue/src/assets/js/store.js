import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  bulletinType:[],
  certificationType:[],
  amountSource:[],
  purchaseNature:[],
  orgType:[],
  bizCode:[],//业务板块
  measureUnit:[],
  xqprojectType:[],
  railwayBureau:[],
  statistics:[],
  wumoveType:[],
  eacode:[],
  projectNature:[],
  bizTypeCode:[],
  taxType:[],
  authCode:[],
  supLevel:[],
  businessType:[],
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
  messageCount: []
}

const getters = {
  getToolData(state) {
    return state.toolBarData
  }

}
const mutations = {
  setToolData(state, data) {
    // 添加标签按钮，如果当前路由已经打开，则不再重复添加
    Vue.prototype.$http.get('/jsonapi/System/system/category/v1.0/wholetreeNew').then(res => {

      state.optiondata = res.data.data
      this.state.optiondata.forEach((item) => {
        switch (item.categoryCode){
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

        }

      })
      // state.bulletinType =setCategory('bulletinType');
      // state.certificationType =setCategory('certificationType');
      //
      // state.amountSource=setCategory('amountSource');
      //   state.purchaseNature=setCategory('purchaseNature');
      //   state.orgType=setCategory('orgType');
      //   state.bizCode=setCategory('bizCode');
      //   state.measureUnit=setCategory('measureUnit');
      //   state.xqprojectType=setCategory('xqprojectType');
        state.railwayBureau=setCategory('railwayBureau');
        state.statistics=setCategory('statistics');
        state.wumoveType=setCategory('wumoveType');
        state.eacode=setCategory('eacode');
        state.projectNature=setCategory('projectNature');
        state.bizTypeCode=setCategory('bizTypeCode');
        state.taxType=setCategory('taxType');
        state.authCode=setCategory('authCode');
        state.supLevel=setCategory('supLevel');
        state.businessType=setCategory('businessType');
        //state.optiondata=setCategory('optiondata');
        })
    //http://36.112.155.134:9901/System/system/category/v1.0/categorys
    // Vue.prototype.$http.get('/jsonapi/System/system/category/v1.0/categorys').then(res => {
    //   state.categorys = res.data.data
    // })
  },
  setCategory(data) {
      var B=new Array();
    alert(JSON.stringify(this.state.optiondata))
    this.state.optiondata.forEach((item) => {
        if (data === item.categoryCode) {
          //name = item.categoryName
          //this.options2 = item.sysCategoryDetailList
          B= item.sysCategoryDetailList;
        }
    })
      return B;
  }

}


const actions = {
  getConfig({ commit }, data) {
    commit('setToolData', data)

  },
  getOptiondataByType({ commit }, data)
  {
    commit('setToolData1', data);

  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
