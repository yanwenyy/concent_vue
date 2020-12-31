export default {
  code: 0,
  msg: '',
  data: [
    {
      "name": "tm",
      "data": [
        // {
        //   "name": "首页",
        //   "path": "/homepage",
        //   "component": "/welcome",
        //   "iconCls": null,
        //   "menushow": true,
        //   "leaf": true,
        //   "defaultpage": false
        // },
      ]
    },
    {
      "name": "tlm",
      "data": [
            {
              "name": "新签合同",
              "path": "/manage",
              "component": "/router",
              "iconCls": "el-icon-printer",
              "menushow": true,
              "leaf": false,
              "defaultpage": false,
              "children": [
                {
                  "name": "信息管理",
                  "path": "/manage/proposal",
                  "component": "/router",
                  "iconCls": "el-icon-document-copy",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "项目信息登记",
                      "path": "/manage/proposal/list",
                      "component": "/manage/proposal/list",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "项目信息登记维护",
                      "path": "/manage/proposal/detail",
                      "component": "/manage/proposal/detail",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "项目信息变更",
                      "path": "/manage/proposal/infoChangeList",
                      "component": "/manage/proposal/infoChangeList",
                      "iconCls": "el-icon-edit-outline",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "项目信息变更",
                      "path": "/manage/proposal/infoChangeDetail",
                      "component": "/manage/proposal/infoChangeDetail",
                      "iconCls": "el-icon-edit-outline",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "项目信息查询",
                      "path": "/manage/proposal/searchList",
                      "component": "/manage/proposal/searchList",
                      "iconCls": "el-icon-search",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                  ]
                },

                {
                  "name": "资审管理",
                  "path": "/manage/verify",
                  "component": "/router",
                  "iconCls": "el-icon-document-checked",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "资格预审登记",
                      "path": "/manage/verify/list",
                      "component": "/manage/verify/list",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },

                    {
                      "name": "资格预审登记审核",
                      "path": "/manage/verify/list_WorkFlow",
                      "component": "/manage/verify/list_WorkFlow",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "资格预审变更",
                      "path": "/manage/verify/list_Change",
                      "component": "/manage/verify/list_Change",
                      "iconCls": "el-icon-edit-outline",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "资格预审查询",
                      "path": "/manage/verify/list_VerifySearch",
                      "component": "/manage/verify/list_VerifySearch",
                      "iconCls": "el-icon-search",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "资格预审变更详细",
                      "path": "/manage/verify/detail_Chang",
                      "component": "/manage/verify/detail_Chang",
                      "iconCls": "el-icon-edit-outline",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "资格预审标段列表",
                      "path": "/manage/verify/list_Section",
                      "component": "/manage/verify/list_Section",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "资审登记新增",
                      "path": "/manage/verify/detail",
                      "component": "/manage/verify/detail",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    }
                  ]
                },

                {
                  "name": "投标管理",
                  "path": "/manage/bid_info",
                  "component": "/router",
                  "iconCls": "el-icon-collection",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "投标信息登记",
                      "path": "/manage/bid_info/list",
                      "component": "/manage/bid_info/list",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "投标登记新增",
                      "path": "/manage/bid_info/detail",
                      "component": "/manage/bid_info/detail",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "投标信息变更",
                      "path": "/manage/bid_info/inforChangeList",
                      "component": "/manage/bid_info/inforChangeList",
                      "iconCls": "el-icon-edit-outline",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "投标登记变更详情",
                      "path": "/manage/bid_info/InfoChangeDetail",
                      "component": "/manage/bid_info/InfoChangeDetail",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "投标信息查询",
                      "path": "/manage/bid_info/searchLIst",
                      "component": "/manage/bid_info/searchLIst",
                      "iconCls": "el-icon-search",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "开标结果登记",
                      "path": "/manage/bid_info/Winning_bid",
                      "component": "/manage/bid_info/Winning_bid",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage":  true
                  },
                  {
                    "name": "中标结果登记",
                    "path": "/manage/bid_info/Winning_bid_z",
                    "component": "/manage/bid_info/Winning_bid_z",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage":  true
                },

                  ]
                },
                {
                  "name": "合同管理",
                  "path": "/manage/contractManager",
                  "component": "/router",
                  "iconCls": "el-icon-receiving",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "工程承包合同",
                      "path": "/manage/contractManager/project/list",
                      "component": "/manage/contractManager/project/list",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "工程承包合同新增",
                      "path": "/manage/contractManager/project/detail",
                      "component": "/manage/contractManager/project/detail",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "勘察设计合同",
                      "path": "/manage/contractManager/design/list",
                      "component": "/manage/contractManager/design/list",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "勘察设计合同新增",
                      "path": "/manage/contractManager/design/detail",
                      "component": "/manage/contractManager/design/detail",
                      "iconCls":"el-icon-notebook-2",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                    "name": "房地产合同",
                    "path": "/manage/contractManager/house/list",
                    "component": "/manage/contractManager/house/list",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "房地产合同新增",
                    "path": "/manage/contractManager/house/detail",
                    "component": "/manage/contractManager/house/detail",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "物资贸易合同",
                    "path": "/manage/contractManager/trade/list",
                    "component": "/manage/contractManager/trade/list",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "物资贸易合同新增",
                    "path": "/manage/contractManager/trade/detail",
                    "component": "/manage/contractManager/trade/detail",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "工业制造合同",
                    "path": "/manage/contractManager/industrial/list",
                    "component": "/manage/contractManager/industrial/list",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "工业制造合同新增",
                    "path": "/manage/contractManager/industrial/detail",
                    "component": "/manage/contractManager/industrial/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "金融保险合同",
                    "path": "/manage/contractManager/finance/list",
                    "component": "/manage/contractManager/finance/list",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "金融保险合同新增",
                    "path": "/manage/contractManager/finance/detail",
                    "component": "/manage/contractManager/finance/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "运营维管合同",
                    "path": "/manage/contractManager/operate/list",
                    "component": "/manage/contractManager/operate/list",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "运营维管合同新增",
                    "path": "/manage/contractManager/operate/detail",
                    "component": "/manage/contractManager/operate/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "其他合同",
                    "path": "/manage/contractManager/other/list",
                    "component": "/manage/contractManager/other/list",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "其他合同新增",
                    "path": "/manage/contractManager/other/detail",
                    "component": "/manage/contractManager/other/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "合同信息变更",
                    "path": "/manage/contractManager/change/list",
                    "component": "/manage/contractManager/change/list",
                    "iconCls": "el-icon-edit-outline",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "合同信息查询",
                    "path": "/manage/contractManager/search/list",
                    "component": "/manage/contractManager/search/list",
                    "iconCls": "el-icon-search",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  }
                  ]
                },
                {
                  "name": "新签年计划",
                  "path": "/manage/proposal",
                  "component": "/router",
                  "iconCls": "el-icon-document-remove",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "工程公司上报",
                      "path": "/manage/plan/01",
                      "component": "/manage/plan/01",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "集团公司汇总",
                      "path": "/manage/plan/02",
                      "component": "/manage/plan/02",
                      "iconCls": "el-icon-receiving",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "集团公司上报",
                      "path": "/manage/plan/03",
                      "component": "/manage/plan/03",
                      "iconCls": "el-icon-notebook-2",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "股份公司汇总",
                      "path": "/manage/plan/04",
                      "component": "/manage/plan/04",
                      "iconCls": "el-icon-receiving",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "下级上报查询",
                      "path": "/manage/plan/05",
                      "component": "/manage/plan/05",
                      "iconCls": "el-icon-search",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "股份公司调整",
                      "path": "/manage/plan/06",
                      "component": "/manage/plan/06",
                      "iconCls": "el-icon-edit-outline",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "集团公司调整",
                      "path": "/manage/plan/07",
                      "component": "/manage/plan/07",
                      "iconCls": "el-icon-edit-outline",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "股份公司下达",
                      "path": "/manage/plan/08",
                      "component": "/manage/plan/08",
                      "iconCls": "el-icon-finished",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "集团公司下达",
                      "path": "/manage/plan/09",
                      "component": "/manage/plan/09",
                      "iconCls": "el-icon-finished",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "上级下达查看",
                      "path": "/manage/plan/10",
                      "component": "/manage/plan/10",
                      "iconCls": "el-icon-search",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "下级下达查看",
                      "path": "/manage/plan/11",
                      "component": "/manage/plan/11",
                      "iconCls": "el-icon-search",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                  ]
                },
                {
                  "name": "新签报表",
                  "path": "/manage/plan/bb",
                  "component": "/router",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": false
                }
              ]
            },
            {
              "name": "计划统计",
              "path": "/statistics",
              "component": "/router",
              "iconCls": "el-icon-printer",
              "menushow": true,
              "leaf": false,
              "defaultpage": false,
              "children": [
              {
              "name": "项目管理",
              "path": "/statistics/project",
              "component": "/router",
              "iconCls": "el-icon-printer",
              "menushow": true,
              "leaf": false,
              "defaultpage": false,
              "children": [
                {
                  "name": "工程承包项目",
                  "path": "/statistics/project/engineList",
                  "component": "/statistics/project/engineList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                }, {
                  "name": "工程承包项目新增",
                  "path": "/statistics/project/engineAdd",
                  "component": "/statistics/project/engineAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "勘察设计项目",
                  "path": "/statistics/project/designList",
                  "component": "/statistics/project/designList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "勘察设计项目新增",
                  "path": "/statistics/project/designDetail",
                  "component": "/statistics/project/designDetail",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "房地产项目",
                  "path": "/statistics/project/estateList",
                  "component": "/statistics/project/estateList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "房地产项目新增",
                  "path": "/statistics/project/estateAdd",
                  "component": "/statistics/project/estateAdd",
                  "iconCls": "el-icon-notebook-2",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "物资贸易项目",
                  "path": "/statistics/project/tradeList",
                  "component": "/statistics/project/tradeList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "物资贸易项目新增",
                  "path": "/statistics/project/tradeAdd",
                  "component": "/statistics/project/tradeAdd",
                  "iconCls": "el-icon-notebook-2",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "工业制造项目",
                  "path": "/statistics/project/manufactureList",
                  "component": "/statistics/project/manufactureList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                ,
                {
                  "name": "工业制造项目新增",
                  "path": "/statistics/project/manufactureAdd",
                  "component": "/statistics/project/manufactureAdd",
                  "iconCls": "el-icon-notebook-2",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "金融保险项目",
                  "path": "/statistics/project/financeList",
                  "component": "/statistics/project/financeList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "金融保险项目新增",
                  "path": "/statistics/project/financeAdd",
                  "component": "/statistics/project/financeAdd",
                  "iconCls": "el-icon-notebook-2",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "运营维管项目",
                  "path": "/statistics/project/maintenanceList",
                  "component": "/statistics/project/maintenanceList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "运营维管项目新增",
                  "path": "/statistics/project/maintenanceAdd",
                  "component": "/statistics/project/maintenanceAdd",
                  "iconCls": "el-icon-notebook-2",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "其他项目",
                  "path": "/statistics/project/otherList",
                  "component": "/statistics/project/otherList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "其他项目新增",
                  "path": "/statistics/project/otherAdd",
                  "component": "/statistics/project/otherAdd",
                  "iconCls": "el-icon-notebook-2",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "项目信息变更",
                  "path": "/statistics/project/bg",
                  "component": "/statistics/project/bg",
                  "iconCls": "el-icon-edit-outline",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "项目信息合并",
                  "path": "/statistics/project/hb",
                  "component": "/statistics/project/hb",
                  "iconCls": "el-icon-files",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "项目信息移动",
                  "path": "/statistics/project/hb",
                  "component": "/statistics/project/hb",
                  "iconCls": "el-icon-files",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "项目信息查询",
                  "path": "/statistics/project/hb",
                  "component": "/statistics/project/hb",
                  "iconCls": "el-icon-search",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                ]
              },
              {
                "name": "产值年计划",
                "path": "/statistics/project",
                "component": "/router",
                "iconCls": "el-icon-printer",
                "menushow": true,
                "leaf": false,
                "defaultpage": false,
                "children": [
                  {
                    "name": "项目部上报",
                    "path": "/statistics/plan/01-1",
                    "component": "/statistics/plan/01-1",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "工程公司汇总",
                    "path": "/statistics/plan/02-1",
                    "component": "/statistics/plan/02-1",
                    "iconCls": "el-icon-receiving",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "工程公司上报",
                    "path": "/statistics/plan/01",
                    "component": "/statistics/plan/01",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "集团公司汇总",
                    "path": "/statistics/plan/02",
                    "component": "/statistics/plan/02",
                    "iconCls": "el-icon-receiving",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "集团公司上报",
                    "path": "/statistics/plan/03",
                    "component": "/statistics/plan/03",
                    "iconCls": "el-icon-notebook-2",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "股份公司汇总",
                    "path": "/statistics/plan/04",
                    "component": "/statistics/plan/04",
                    "iconCls": "el-icon-receiving",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "下级上报查询",
                    "path": "/statistics/plan/05",
                    "component": "/statistics/plan/05",
                    "iconCls": "el-icon-search",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "股份公司调整",
                    "path": "/statistics/plan/06",
                    "component": "/statistics/plan/06",
                    "iconCls": "el-icon-edit-outline",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "集团公司调整",
                    "path": "/statistics/plan/07",
                    "component": "/statistics/plan/07",
                    "iconCls": "el-icon-edit-outline",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "股份公司下达",
                    "path": "/statistics/plan/08",
                    "component": "/statistics/plan/08",
                    "iconCls": "el-icon-finished",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "集团公司下达",
                    "path": "/statistics/plan/09",
                    "component": "/statistics/plan/09",
                    "iconCls": "el-icon-finished",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "上级下达查看",
                    "path": "/statistics/plan/10",
                    "component": "/statistics/plan/10",
                    "iconCls": "el-icon-search",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "下级下达查看",
                    "path": "/statistics/plan/11",
                    "component": "/statistics/plan/11",
                    "iconCls": "el-icon-search",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": false
                  }
                ]
              }
              ]
            },
            {
            "name": "工程量清单库",
            "path": "/boq",
            "component": "/router",
            "iconCls": "el-icon-printer",
            "menushow": true,
            "leaf": false,
            "defaultpage": false,
            "children": [
              {
                "name": "数据标准",
                "path": "/boq/dataStandards",
                "component": "/router",
                "iconCls": "el-icon-printer",
                "menushow": true,
                "leaf": false,
                "defaultpage": false,
                "children":[
                  {
                    "name": "标准库",
                    "path": "/boq/dataStandards/ordinaryStandard/list",
                    "component": "/boq/dataStandards/ordinaryStandard/list",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                 /* {
                    "name": "标准库新增",
                    "path": "/boq/dataStandards/ordinaryStandard/detail",
                    "component": "/boq/dataStandards/ordinaryStandard/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": true
                  },*/
                  {
                    "name": "国标库",
                    "path": "/boq/dataStandards/nationalStandard/list",
                    "component": "/boq/dataStandards/nationalStandard/list",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "知识库",
                    "path": "/boq/dataStandards/ordinaryScience",
                    "component": "",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  }, {
                    "name": "近义词库",
                    "path": "/boq/dataStandards/standardSynonym/list",
                    "component": "/boq/dataStandards/standardSynonym/list",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  }
                ]
              }

            ]
            },
            {
              "name": "档案管理",
              "path": "/archives",
              "component": "/router",
              "iconCls": "el-icon-printer",
              "menushow": true,
              "leaf": false,
              "defaultpage": false,
              "children": [
                {
                  "name": "档案文件录入",
                  "path": "/archives/archives/list_archives",
                  "component": "/archives/archives/list_archives",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "档案文件详细",
                  "path": "/archives/archives/detail_archives",
                  "component": "/archives/archives/detail_archives",
                  "iconCls": "el-icon-printer",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "档案文件查询",
                  "path": "/archives/archives/list_archivesSearch",
                  "component": "/archives/archives/list_archivesSearch",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "统计分析录入",
                  "path": "/archives/statistics/list_statistics",
                  "component": "/archives/statistics/list_statistics",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "统计分析详细",
                  "path": "/archives/statistics/detail_statistics",
                  "component": "/archives/statistics/detail_statistics",
                  "iconCls": "el-icon-printer",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "统计分析查询",
                  "path": "/archives/statistics/list_statisticsSearch",
                  "component": "/archives/statistics/list_statisticsSearch",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "月度分析录入",
                  "path": "/archives/analysis/list",
                  "component": "/archives/analysis/list",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "月度分析详细",
                  "path": "/archives/analysis/detail",
                  "component": "/archives/analysis/detail",
                  "iconCls": "el-icon-printer",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "月度分析查询",
                  "path": "/archives/analysis/list_search",
                  "component": "/archives/analysis/list_search",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                }
                ,
                {
                  "name": "消息信息录入",
                  "path": "/archives/news/list",
                  "component": "/archives/news/list",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "消息信息详细",
                  "path": "/archives/news/detail",
                  "component": "/archives/news/detail",
                  "iconCls": "el-icon-printer",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "消息信息查询",
                  "path": "/archives/news/list_search",
                  "component": "/archives/news/list_search",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                }

              ]
            }
           ]
          }
  ]
}

