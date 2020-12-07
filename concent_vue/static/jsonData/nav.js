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
                      "name": "项信登记新增项目",
                      "path": "/manage/proposal/detail",
                      "component": "/manage/proposal/detail",
                      "iconCls": "el-icon-switch-button",
                      "menushow": false,
                      "leaf": true,
                      "defaultpage": false
                    }
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
              "name": "项目管理",
              "path": "/project",
              "component": "/router",
              "iconCls": "el-icon-printer",
              "menushow": true,
              "leaf": false,
              "defaultpage": false,
              "children": [
                {
                  "name": "工程承包项目管理",
                  "path": "/project/engineList",
                  "component": "/project/engineList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                }, {
                  "name": "工程承包项目添加",
                  "path": "/project/engineAdd",
                  "component": "/project/engineAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "勘察设计项目管理",
                  "path": "/project/designList",
                  "component": "/project/designList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "勘察设计项目新增",
                  "path": "/project/designDetail",
                  "component": "/project/designDetail",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "房地产项目管理",
                  "path": "/project/estateList",
                  "component": "/project/estateList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "房地产项目登记",
                  "path": "/project/estateAdd",
                  "component": "/project/estateAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "物资贸易项目管理",
                  "path": "/project/tradeList",
                  "component": "/project/tradeList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "物资贸易项目登记",
                  "path": "/project/tradeAdd",
                  "component": "/project/tradeAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "工业制造项目管理",
                  "path": "/project/manufactureList",
                  "component": "/project/manufactureList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                ,
                {
                  "name": "工业制造项目登记",
                  "path": "/project/manufactureAdd",
                  "component": "/project/manufactureAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "金融保险项目管理",
                  "path": "/project/financeList",
                  "component": "/project/financeList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "金融保险项目登记",
                  "path": "/project/financeAdd",
                  "component": "/project/financeAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "运营维管项目管理",
                  "path": "/project/maintenanceList",
                  "component": "/project/maintenanceList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "运营维管项目登记",
                  "path": "/project/maintenanceAdd",
                  "component": "/project/maintenanceAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                },
                {
                  "name": "其他目管理",
                  "path": "/project/otherList",
                  "component": "/project/otherList",
                  "iconCls": "el-icon-switch-button",
                  "menushow": true,
                  "leaf": true,
                  "defaultpage": true
                },
                {
                  "name": "其他目登记",
                  "path": "/project/otherAdd",
                  "component": "/project/otherAdd",
                  "iconCls": "el-icon-switch-button",
                  "menushow": false,
                  "leaf": true,
                  "defaultpage": false
                }

      ]
    }

              ]
            }
  ]
}

