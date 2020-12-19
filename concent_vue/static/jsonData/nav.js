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
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "项目信息登记",
                      "path": "/manage/proposal/list",
                      "component": "/manage/proposal/list",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "项目信息登记维护",
                      "path": "/manage/proposal/detail",
                      "component": "/manage/proposal/detail",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "项目信息变更",
                      "path": "/manage/proposal/infoChangeList",
                      "component": "/manage/proposal/infoChangeList",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "项目信息变更",
                      "path": "/manage/proposal/infoChangeDetail",
                      "component": "/manage/proposal/infoChangeDetail",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "项目信息查询",
                      "path": "/manage/proposal/searchList",
                      "component": "/manage/proposal/searchList",
                      "iconCls": "el-icon-switch-button",
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
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "资格预审登记",
                      "path": "/manage/verify/list",
                      "component": "/manage/verify/list",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "资格预审查看",
                      "path": "/manage/verify/list_VerifySearch",
                      "component": "/manage/verify/list_VerifySearch",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "资格预审登记审核",
                      "path": "/manage/verify/list_WorkFlow",
                      "component": "/manage/verify/list_WorkFlow",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "资格预审变更",
                      "path": "/manage/verify/list_Change",
                      "component": "/manage/verify/list_Change",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
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
                      "iconCls": "el-icon-switch-button",
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
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "投标登记",
                      "path": "/manage/bid_info/list",
                      "component": "/manage/bid_info/list",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "投标登记新增",
                      "path": "/manage/bid_info/detail",
                      "component": "/manage/bid_info/detail",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    }
                  ]
                },
                {
                  "name": "合同管理",
                  "path": "/manage/contractManager",
                  "component": "/router",
                  "iconCls": "el-icon-printer",
                  "menushow": true,
                  "leaf": false,
                  "defaultpage": true,
                  "children": [
                    {
                      "name": "工程承包合同",
                      "path": "/manage/contractManager/project/list",
                      "component": "/manage/contractManager/project/list",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "工程承包合同新增",
                      "path": "/manage/contractManager/project/detail",
                      "component": "/manage/contractManager/project/detail",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                      "name": "勘察设计合同",
                      "path": "/manage/contractManager/design/list",
                      "component": "/manage/contractManager/design/list",
                      "iconCls": "el-icon-switch-button",
                      "menushow": true,
                      "leaf": true,
                      "defaultpage": true
                    },
                    {
                      "name": "勘察设计合同新增",
                      "path": "/manage/contractManager/design/detail",
                      "component": "/manage/contractManager/design/detail",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    },
                    {
                    "name": "房地产合同",
                    "path": "/manage/contractManager/house/list",
                    "component": "/manage/contractManager/house/list",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "房地产合同新增",
                    "path": "/manage/contractManager/house/detail",
                    "component": "/manage/contractManager/house/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "物资贸易合同",
                    "path": "/manage/contractManager/trade/list",
                    "component": "/manage/contractManager/trade/list",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "物资贸易合同新增",
                    "path": "/manage/contractManager/trade/detail",
                    "component": "/manage/contractManager/trade/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": false
                  },
                  {
                    "name": "工业制造合同",
                    "path": "/manage/contractManager/industrial/list",
                    "component": "/manage/contractManager/industrial/list",
                    "iconCls": "el-icon-switch-button",
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
                    "iconCls": "el-icon-switch-button",
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
                    "iconCls": "el-icon-switch-button",
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
                    "iconCls": "el-icon-switch-button",
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
                  ]
                },
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
                  "name": "工程承包项目管理",
                  "path": "/statistics/project/engineList",
                  "component": "/statistics/project/engineList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                }, {
                  "name": "工程承包项目添加",
                  "path": "/statistics/project/engineAdd",
                  "component": "/statistics/project/engineAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "勘察设计项目管理",
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
                  "name": "房地产项目管理",
                  "path": "/statistics/project/estateList",
                  "component": "/statistics/project/estateList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "房地产项目登记",
                  "path": "/statistics/project/estateAdd",
                  "component": "/statistics/project/estateAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "物资贸易项目管理",
                  "path": "/statistics/project/tradeList",
                  "component": "/statistics/project/tradeList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "物资贸易项目登记",
                  "path": "/statistics/project/tradeAdd",
                  "component": "/statistics/project/tradeAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "工业制造项目管理",
                  "path": "/statistics/project/manufactureList",
                  "component": "/statistics/project/manufactureList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                ,
                {
                  "name": "工业制造项目登记",
                  "path": "/statistics/project/manufactureAdd",
                  "component": "/statistics/project/manufactureAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "金融保险项目管理",
                  "path": "/statistics/project/financeList",
                  "component": "/statistics/project/financeList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "金融保险项目登记",
                  "path": "/statistics/project/financeAdd",
                  "component": "/statistics/project/financeAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "运营维管项目管理",
                  "path": "/statistics/project/maintenanceList",
                  "component": "/statistics/project/maintenanceList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "运营维管项目登记",
                  "path": "/statistics/project/maintenanceAdd",
                  "component": "/statistics/project/maintenanceAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "其他目管理",
                  "path": "/statistics/project/otherList",
                  "component": "/statistics/project/otherList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "其他目登记",
                  "path": "/statistics/project/otherAdd",
                  "component": "/statistics/project/otherAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
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
                  {
                    "name": "标准库新增",
                    "path": "/boq/dataStandards/ordinaryStandard/detail",
                    "component": "/boq/dataStandards/ordinaryStandard/detail",
                    "iconCls": "el-icon-switch-button",
                    "menushow": false,
                    "leaf": true,
                    "defaultpage": true
                  },
                  {
                    "name": "知识库",
                    "path": "/boq/dataStandards/nationalStandard",
                    "component": "",
                    "iconCls": "el-icon-switch-button",
                    "menushow": true,
                    "leaf": true,
                    "defaultpage": true
                  }, {
                    "name": "近义词库",
                    "path": "/boq/dataStandards/standardSynonym",
                    "component": "",
                    "iconCls": "el-icon-switch-button",
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
  ]
}

