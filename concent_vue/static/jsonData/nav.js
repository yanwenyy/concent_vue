export default {
  code: 0,
  msg: '',
  data: [
    {
      'name': 'tm',
      'data': [
        // {
        //   'name': '首页',
        //   'path': '/homepage',
        //   'component': '/welcome',
        //   'iconCls': null,
        //   'menushow': true,
        //   'leaf': true,
        //   'defaultpage': false
        // },
      ]
    },

    {
      'name': 'tlm',
      'data': [
        {
          'name': '新签合同',
          'path': '/manage',
          'component': '/router',
          'iconCls': 'el-icon-printer',
          'menushow': true,
          'leaf': false,
          'defaultpage': false,
          'children': [
            {
              'name': '工作台',
              'path': '/manage/home/home',
              'component': '/manage/home/home',
              'iconCls': 'el-icon-s-home',
              'menushow': true,
              'leaf': true,
              'defaultpage': true
            },
            {
              'name': '待办已办列表',
              'path': '/manage/home/taskList',
              'component': '/manage/home/taskList',
              'iconCls': 'el-icon-notebook-2',
              'menushow': false,
              'leaf': true,
              'defaultpage': false
            },
            {
              'name': '信息管理',
              'path': '/manage/proposal',
              'component': '/router',
              'iconCls': 'el-icon-document-copy',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '项目信息登记',
                  'path': '/manage/proposal/importList',
                  'component': '/manage/proposal/importList',
                  'iconCls': 'el-icon-notebook-1',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '项目信息登记详情',
                  'path': '/manage/proposal/importDetail',
                  'component': '/manage/proposal/importDetail',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                // {
                //   'name': '项目信息登记',
                //   'path': '/manage/proposal/list',
                //   'component': '/manage/proposal/list',
                //   'iconCls': 'el-icon-notebook-2',
                //   'menushow': true,
                //   'leaf': true,
                //   'defaultpage': true
                // },
                // {
                //   'name': '项目信息登记维护',
                //   'path': '/manage/proposal/detail',
                //   'component': '/manage/proposal/detail',
                //   'iconCls': 'el-icon-notebook-2',
                //   'menushow': false,
                //   'leaf': true,
                //   'defaultpage': false
                // },
                {
                  'name': '项目信息跟踪',
                  'path': '/manage/proposal/track_list',
                  'component': '/manage/proposal/track_list',
                  'iconCls': 'el-icon-aim',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '信息恢复跟踪',
                  'path': '/manage/proposal/track_back',
                  'component': '/manage/proposal/track_back',
                  'iconCls': 'el-icon-aim',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息跟踪详情',
                  'path': '/manage/proposal/track_detail',
                  'component': '/manage/proposal/track_detail',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/manage/proposal/infoChangeList',
                  'component': '/manage/proposal/infoChangeList',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/manage/proposal/infoChangeDetail',
                  'component': '/manage/proposal/infoChangeDetail',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息查询',
                  'path': '/manage/proposal/searchList',
                  'component': '/manage/proposal/searchList',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },

              ]
            },

            {
              'name': '资审管理',
              'path': '/manage/verify',
              'component': '/router',
              'iconCls': 'el-icon-document-checked',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '资格预审登记',
                  'path': '/manage/verify/listAll',
                  'component': '/manage/verify/listAll',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '资审结果登记',
                  'path': '/manage/verify/resultlist',
                  'component': '/manage/verify/resultlist',
                  'iconCls': 'el-icon-document-checked',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '资格预审登记审核',
                  'path': '/manage/verify/list_WorkFlow',
                  'component': '/manage/verify/list_WorkFlow',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '资格预审变更',
                  'path': '/manage/verify/listChange',
                  'component': '/manage/verify/listChange',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '资格预审查询',
                  'path': '/manage/verify/listVerifySearch',
                  'component': '/manage/verify/listVerifySearch',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '资格预审变更详细',
                  'path': '/manage/verify/detail_Chang',
                  'component': '/manage/verify/detail_Chang',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '资格预审标段列表',
                  'path': '/manage/verify/list_Section',
                  'component': '/manage/verify/list_Section',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '资审登记新增',
                  'path': '/manage/verify/detail',
                  'component': '/manage/verify/detail',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                }
              ]
            },

            {
              'name': '投标管理',
              'path': '/manage/bid_info',
              'component': '/router',
              'iconCls': 'el-icon-collection',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '投标信息登记',
                  'path': '/manage/bid_info/list',
                  'component': '/manage/bid_info/list',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '开标信息登记',
                  'path': '/manage/bid_info/KBlist',
                  'component': '/manage/bid_info/KBlist',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '中标结果登记',
                  'path': '/manage/bid_info/Winning_bid_z',
                  'component': '/manage/bid_info/Winning_bid_z',
                  'iconCls': 'el-icon-document-checked',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '投标登记新增',
                  'path': '/manage/bid_info/detail',
                  'component': '/manage/bid_info/detail',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '投标信息变更',
                  'path': '/manage/bid_info/inforChangeList',
                  'component': '/manage/bid_info/inforChangeList',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '投标登记变更详情',
                  'path': '/manage/bid_info/InfoChangeDetail',
                  'component': '/manage/bid_info/InfoChangeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '投标信息查询',
                  'path': '/manage/bid_info/searchLIst',
                  'component': '/manage/bid_info/searchLIst',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '开标结果登记',
                  'path': '/manage/bid_info/Winning_bidKB',
                  'component': '/manage/bid_info/Winning_bidKB',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': false,
                  'defaultpage': false
                },
                {
                  'name': '投标信息查询',
                  'path': '/manage/bid_info/tender/list',
                  'component': '/manage/bid_info/tender/list',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '投标查询详情',
                  'path': '/manage/bid_info/tender/detail',
                  'component': '/manage/bid_info/tender/detail',
                  'iconCls': 'el-icon-edit',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '开标查询详情',
                  'path': '/manage/bid_info/tender/detailKB',
                  'component': '/manage/bid_info/tender/detailKB',
                  'iconCls': 'el-icon-edit',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
              ]
            },
            {
              'name': '合同管理',
              'path': '/manage/contractManager',
              'component': '/router',
              'iconCls': 'el-icon-receiving',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '工程承包合同',
                  'path': '/manage/contractManager/project/list',
                  'component': '/manage/contractManager/project/list',
                  'iconCls': 'el-icon-school',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '工程承包合同新增',
                  'path': '/manage/contractManager/project/detail',
                  'component': '/manage/contractManager/project/detail',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '勘察设计合同',
                  'path': '/manage/contractManager/design/list',
                  'component': '/manage/contractManager/design/list',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '勘察设计合同新增',
                  'path': '/manage/contractManager/design/detail',
                  'component': '/manage/contractManager/design/detail',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '房地产合同',
                  'path': '/manage/contractManager/house/list',
                  'component': '/manage/contractManager/house/list',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '房地产合同新增',
                  'path': '/manage/contractManager/house/detail',
                  'component': '/manage/contractManager/house/detail',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '物资贸易合同',
                  'path': '/manage/contractManager/trade/list',
                  'component': '/manage/contractManager/trade/list',
                  'iconCls': 'el-icon-truck',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '物资贸易合同新增',
                  'path': '/manage/contractManager/trade/detail',
                  'component': '/manage/contractManager/trade/detail',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '工业制造合同',
                  'path': '/manage/contractManager/industrial/list',
                  'component': '/manage/contractManager/industrial/list',
                  'iconCls': 'el-icon-cpu',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '工业制造合同新增',
                  'path': '/manage/contractManager/industrial/detail',
                  'component': '/manage/contractManager/industrial/detail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '金融保险合同',
                  'path': '/manage/contractManager/finance/list',
                  'component': '/manage/contractManager/finance/list',
                  'iconCls': 'el-icon-money',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '金融保险合同新增',
                  'path': '/manage/contractManager/finance/detail',
                  'component': '/manage/contractManager/finance/detail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '运营维管合同',
                  'path': '/manage/contractManager/operate/list',
                  'component': '/manage/contractManager/operate/list',
                  'iconCls': 'el-icon-setting',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '运营维管合同新增',
                  'path': '/manage/contractManager/operate/detail',
                  'component': '/manage/contractManager/operate/detail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '其他合同',
                  'path': '/manage/contractManager/other/list',
                  'component': '/manage/contractManager/other/list',
                  'iconCls': 'el-icon-coin',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '其他合同新增',
                  'path': '/manage/contractManager/other/detail',
                  'component': '/manage/contractManager/other/detail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '合同信息变更',
                  'path': '/manage/contractManager/change/list',
                  'component': '/manage/contractManager/change/list',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '合同信息变更查询',
                  'path': '/manage/contractManager/change/searchList',
                  'component': '/manage/contractManager/change/searchList',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '工程承包变更',
                  'path': '/manage/contractManager/project/changeDetail',
                  'component': '/manage/contractManager/project/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '勘察设计变更',
                  'path': '/manage/contractManager/design/changeDetail',
                  'component': '/manage/contractManager/design/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '房地产变更',
                  'path': '/manage/contractManager/house/changeDetail',
                  'component': '/manage/contractManager/house/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '物资贸易变更',
                  'path': '/manage/contractManager/trade/changeDetail',
                  'component': '/manage/contractManager/trade/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '工业制造变更',
                  'path': '/manage/contractManager/industrial/changeDetail',
                  'component': '/manage/contractManager/industrial/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '金融保险变更',
                  'path': '/manage/contractManager/finance/changeDetail',
                  'component': '/manage/contractManager/finance/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '运营维管变更',
                  'path': '/manage/contractManager/operate/changeDetail',
                  'component': '/manage/contractManager/operate/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '其他合同变更',
                  'path': '/manage/contractManager/other/changeDetail',
                  'component': '/manage/contractManager/other/changeDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '合同信息查询',
                  'path': '/manage/contractManager/search/list',
                  'component': '/manage/contractManager/search/list',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '合同金额修改',
                  'path': '/manage/contractManager/moneyEdit/list',
                  'component': '/manage/contractManager/moneyEdit/list',
                  'iconCls': 'el-icon-edit',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '标的物维护',
                  'path': '/manage/contractManager/BdwList',
                  'component': '/manage/contractManager/BdwList',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '劳材机维护',
                  'path': '/manage/contractManager/machineList',
                  'component': '/manage/contractManager/machineList',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '实物工程量维护',
                  'path': '/manage/contractManager/physicalList',
                  'component': '/manage/contractManager/physicalList',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '合同信息核减',
                  'path': '/manage/contractManager/examinationCut/list',
                  'component': '/manage/contractManager/examinationCut/list',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '合同信息核减详情',
                  'path': '/manage/contractManager/examinationCut/detail',
                  'component': '/manage/contractManager/examinationCut/detail',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '合同信息核减查询',
                  'path': '/manage/contractManager/examinationCut/searchList',
                  'component': '/manage/contractManager/examinationCut/searchList',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
              ]
            },
            {
              'name': '数据迁移查询',
              'path': '/dataMigration/data/list',
              'component': '/dataMigration/data/list',
              'iconCls': 'el-icon-edit',
              'menushow': true,
              'leaf': true,
              'defaultpage': true
            },
            {
              'name': '数据迁移子表',
              'path': '/dataMigration/data/listchild',
              'component': '/dataMigration/data/listchild',
              'iconCls': 'el-icon-edit',
              'menushow': false,
              'leaf': true,
              'defaultpage': false
            },
            // {
            //   'name': '新签年计划',
            //   'path': '/manage/plan',
            //   'component': '/router',
            //   'iconCls': 'el-icon-document-remove',
            //   'menushow': true,
            //   'leaf': false,
            //   'defaultpage': false,
            //   'children': [
            //     {
            //       'name': '工程公司上报',
            //       'path': '/manage/plan/01',
            //       'component': '/manage/plan/01',
            //       'iconCls': 'el-icon-notebook-2',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司汇总',
            //       'path': '/manage/plan/02',
            //       'component': '/manage/plan/02',
            //       'iconCls': 'el-icon-receiving',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司上报',
            //       'path': '/manage/plan/03',
            //       'component': '/manage/plan/03',
            //       'iconCls': 'el-icon-notebook-2',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '股份公司汇总',
            //       'path': '/manage/plan/04',
            //       'component': '/manage/plan/04',
            //       'iconCls': 'el-icon-receiving',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '下级上报查询',
            //       'path': '/manage/plan/05',
            //       'component': '/manage/plan/05',
            //       'iconCls': 'el-icon-search',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '股份公司调整',
            //       'path': '/manage/plan/06',
            //       'component': '/manage/plan/06',
            //       'iconCls': 'el-icon-edit-outline',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司调整',
            //       'path': '/manage/plan/07',
            //       'component': '/manage/plan/07',
            //       'iconCls': 'el-icon-edit-outline',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '股份公司下达',
            //       'path': '/manage/plan/08',
            //       'component': '/manage/plan/08',
            //       'iconCls': 'el-icon-finished',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司下达',
            //       'path': '/manage/plan/09',
            //       'component': '/manage/plan/09',
            //       'iconCls': 'el-icon-finished',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '上级下达查看',
            //       'path': '/manage/plan/10',
            //       'component': '/manage/plan/10',
            //       'iconCls': 'el-icon-search',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '下级下达查看',
            //       'path': '/manage/plan/11',
            //       'component': '/manage/plan/11',
            //       'iconCls': 'el-icon-search',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     }
            //   ]
            // },
            {
              'name': '新签报表',
              'path': '/manage/xinqian/list',
              'component': '/manage/xinqian/list',
              'iconCls': 'el-icon-edit-outline',
              'menushow': true,
              'leaf': true,
              'defaultpage': false
            },
            {
              'name': '报表管理',
              'path': '/manage/report/list',
              'component': '/manage/report/list',
              'iconCls': 'el-icon-coin',
              'menushow': true,
              'leaf': true,
              'defaultpage': false
            },
            {
              'name': '共享单位库',
              'path': '/manage/companies/companiesList',
              'component': '/manage/companies/companiesList',
              'iconCls': 'el-icon-search',
              'menushow': true,
              'leaf': true,
              'defaultpage': false
            },
            {
              'name': '扩展字段',
              'path': '/manage/extend/list',
              'component': '/manage/extend/list',
              'iconCls': 'el-icon-search',
              'menushow': true,
              'leaf': true,
              'defaultpage': false
            },
            {
              'name': '工程量清单库数据标准',
              'path': '/boq/dataStandards',
              'component': '/router',
              'iconCls': 'el-icon-data-analysis',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '标准库',
                  'path': '/boq/ordinaryStandard/list',
                  'component': '/boq/ordinaryStandard/list',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                /* {
                'name': '标准库新增',
                'path': '/boq/dataStandards/ordinaryStandard/detail',
                'component': '/boq/dataStandards/ordinaryStandard/detail',
                'iconCls': 'el-icon-switch-button',
                'menushow': false,
                'leaf': true,
                'defaultpage': true
              }, */
                {
                  'name': '国标库',
                  'path': '/boq/nationalStandard/list',
                  'component': '/boq/nationalStandard/list',
                  'iconCls': 'el-icon-folder-opened',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '国标库新增',
                  'path': '/boq/nationalStandard/detail',
                  'component': '/boq/nationalStandard/detail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '知识库',
                  'path': '/boq/ordinaryScience/list',
                  'component': '/boq/ordinaryScience/list',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                }, {
                  'name': '近义词库',
                  'path': '/boq/standardSynonym/list',
                  'component': '/boq/standardSynonym/list',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                }
              ]
            },
            {
              'name': '区域信息录入',
              'path': '/manage/regionEntry/list',
              'component': '/manage/regionEntry/list',
              'iconCls': 'el-icon-edit',
              'menushow': true,
              'leaf': true,
              'defaultpage': true
            },
            {
              'name': '指挥部列表',
              'path': '/manage/regionEntry/listOld',
              'component': '/manage/regionEntry/listOld',
              'iconCls': 'el-icon-edit',
              'menushow': true,
              'leaf': true,
              'defaultpage': true
            },
            {
              'name': '区域信息录入详情',
              'path': '/manage/regionEntry/detail',
              'component': '/manage/regionEntry/detail',
              'iconCls': 'el-icon-printer',
              'menushow': false,
              'leaf': true,
              'defaultpage': true
            },
          ]
        },
        {
          'name': '计划统计',
          'path': '/statistics',
          'component': '/router',
          'iconCls': 'el-icon-printer',
          'menushow': true,
          'leaf': false,
          'defaultpage': false,
          'children': [
            {
              'name': '工作台',
              'path': '/statistics/home/home',
              'component': '/statistics/home/home',
              'iconCls': 'el-icon-s-home',
              'menushow': true,
              'leaf': true,
              'defaultpage': true
            },
            {
              'name': '待办已办列表',
              'path': '/statistics/home/taskList',
              'component': '/statistics/home/taskList',
              'iconCls': 'el-icon-notebook-2',
              'menushow': false,
              'leaf': true,
              'defaultpage': false
            },
            {
              'name': '项目管理',
              'path': '/statistics/project',
              'component': '/router',
              'iconCls': 'el-icon-coin',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '工程承包项目',
                  'path': '/statistics/project/engineList',
                  'component': '/statistics/project/engineList',
                  'iconCls': 'el-icon-school',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                }, {
                  'name': '工程承包项目',
                  'path': '/statistics/project/engineAdd',
                  'component': '/statistics/project/engineAdd',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '勘察设计项目',
                  'path': '/statistics/project/designList',
                  'component': '/statistics/project/designList',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '勘察设计项目',
                  'path': '/statistics/project/designAdd',
                  'component': '/statistics/project/designAdd',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '房地产项目',
                  'path': '/statistics/project/estateList',
                  'component': '/statistics/project/estateList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '房地产项目',
                  'path': '/statistics/project/estateAdd',
                  'component': '/statistics/project/estateAdd',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '物资贸易项目',
                  'path': '/statistics/project/tradeList',
                  'component': '/statistics/project/tradeList',
                  'iconCls': 'el-icon-truck',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '物资贸易项目',
                  'path': '/statistics/project/tradeAdd',
                  'component': '/statistics/project/tradeAdd',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '工业制造项目',
                  'path': '/statistics/project/manufactureList',
                  'component': '/statistics/project/manufactureList',
                  'iconCls': 'el-icon-cpu',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '工业制造项目',
                  'path': '/statistics/project/manufactureAdd',
                  'component': '/statistics/project/manufactureAdd',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '金融保险项目',
                  'path': '/statistics/project/financeList',
                  'component': '/statistics/project/financeList',
                  'iconCls': 'el-icon-money',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '金融保险项目',
                  'path': '/statistics/project/financeAdd',
                  'component': '/statistics/project/financeAdd',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '运营维管项目',
                  'path': '/statistics/project/maintenanceList',
                  'component': '/statistics/project/maintenanceList',
                  'iconCls': 'el-icon-setting',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '运营维管项目',
                  'path': '/statistics/project/maintenanceAdd',
                  'component': '/statistics/project/maintenanceAdd',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '其他项目',
                  'path': '/statistics/project/otherList',
                  'component': '/statistics/project/otherList',
                  'iconCls': 'el-icon-coin',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '其他项目',
                  'path': '/statistics/project/otherAdd',
                  'component': '/statistics/project/otherAdd',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': false,
                  'leaf': false,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/changeList',
                  'component': '/statistics/project/changeList',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更查询',
                  'path': '/statistics/project/ListChangeSearch',
                  'component': '/statistics/project/ListChangeSearch',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/changeAdd',
                  'component': '/statistics/project/changeAdd',
                  'iconCls': 'el-icon-edit-outline',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                // {
                //   'name': '项目信息合并',
                //   'path': '/statistics/project/hb',
                //   'component': '/statistics/project/hb',
                //   'iconCls': 'el-icon-connection',
                //   'menushow': true,
                //   'leaf': true,
                //   'defaultpage': false
                // },
                // {
                //   'name': '项目信息移动',
                //   'path': '/statistics/project/hb',
                //   'component': '/statistics/project/hb1',
                //   'iconCls': 'el-icon-rank',
                //   'menushow': true,
                //   'leaf': true,
                //   'defaultpage': false
                // },
                {
                  'name': '项目信息查询',
                  'path': '/statistics/project/searchList',
                  'component': '/statistics/project/searchList',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/engineDetail',
                  'component': '/statistics/project/change/engineDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/designDetail',
                  'component': '/statistics/project/change/designDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/estateDetail',
                  'component': '/statistics/project/change/estateDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/financeDetail',
                  'component': '/statistics/project/change/financeDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/maintenanceDetail',
                  'component': '/statistics/project/change/maintenanceDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/manufactureDetail',
                  'component': '/statistics/project/change/manufactureDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/otherDetail',
                  'component': '/statistics/project/change/otherDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息变更',
                  'path': '/statistics/project/change/tradeDetail',
                  'component': '/statistics/project/change/tradeDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/index',
                  'component': '/statistics/project/tradeMerge/index',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/list',
                  'component': '/statistics/project/tradeMerge/list',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/engineAdd',
                  'component': '/statistics/project/tradeMerge/engineAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/designAdd',
                  'component': '/statistics/project/tradeMerge/designAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/estateAdd',
                  'component': '/statistics/project/tradeMerge/estateAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/financeAdd',
                  'component': '/statistics/project/tradeMerge/financeAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/maintenanceAdd',
                  'component': '/statistics/project/tradeMerge/maintenanceAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/manufactureAdd',
                  'component': '/statistics/project/tradeMerge/manufactureAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/otherAdd',
                  'component': '/statistics/project/tradeMerge/otherAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目信息合并',
                  'path': '/statistics/project/tradeMerge/tradeAdd',
                  'component': '/statistics/project/tradeMerge/tradeAdd',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/engineDetail',
                  'component': '/statistics/project/tradeMerge/engineDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/designDetail',
                  'component': '/statistics/project/tradeMerge/designDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/estateDetail',
                  'component': '/statistics/project/tradeMerge/estateDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/financeDetail',
                  'component': '/statistics/project/tradeMerge/financeDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/maintenanceDetail',
                  'component': '/statistics/project/tradeMerge/maintenanceDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/manufactureDetail',
                  'component': '/statistics/project/tradeMerge/manufactureDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/otherDetail',
                  'component': '/statistics/project/tradeMerge/otherDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '已合并项目查询',
                  'path': '/statistics/project/tradeMerge/tradeDetail',
                  'component': '/statistics/project/tradeMerge/tradeDetail',
                  'iconCls': 'el-icon-search',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
              ]
            },
            {
              'name': '产品信息管理',
              'path': '/statistics/productInfo',
              'component': '/router',
              'iconCls': 'el-icon-coin',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '产品信息维护',
                  'path': '/statistics/productInfo/maintenance',
                  'component': '/statistics/productInfo/maintenance',
                  'iconCls': 'el-icon-school',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '产品信息列表',
                  'path': '/statistics/productInfo/list',
                  'component': '/statistics/productInfo/list',
                  'iconCls': 'el-icon-school',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                }
              ]
            },
            // {
            //   'name': '产值年计划',
            //   'path': '/statistics/plan',
            //   'component': '/router',
            //   'iconCls': 'el-icon-printer',
            //   'menushow': true,
            //   'leaf': false,
            //   'defaultpage': false,
            //   'children': [
            //     {
            //       'name': '项目部上报',
            //       'path': '/statistics/annualPlan/projectReport',
            //       'component': '/statistics/annualPlan/projectReport',
            //       'iconCls': 'el-icon-notebook-2',
            //       'menushow': true,
            //       'leaf': false,
            //       'defaultpage': true
            //     },
            //     {
            //       'name': '项目部上报详情',
            //       'path': '/statistics/annualPlan/projectReportDetail',
            //       'component': '/statistics/annualPlan/projectReportDetail',
            //       'iconCls': 'el-icon-notebook-2',
            //       'menushow': false,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '项目部上报汇总详情',
            //       'path': '/statistics/annualPlan/summaryDetail',
            //       'component': '/statistics/annualPlan/summaryDetail',
            //       'iconCls': 'el-icon-notebook-2',
            //       'menushow': false,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '工程公司汇总',
            //       'path': '/statistics/plan/02-1',
            //       'component': '/statistics/plan/02-1',
            //       'iconCls': 'el-icon-receiving',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '工程公司上报',
            //       'path': '/statistics/plan/01',
            //       'component': '/statistics/plan/01',
            //       'iconCls': 'el-icon-notebook-2',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司汇总',
            //       'path': '/statistics/plan/02',
            //       'component': '/statistics/plan/02',
            //       'iconCls': 'el-icon-receiving',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司上报',
            //       'path': '/statistics/plan/03',
            //       'component': '/statistics/plan/03',
            //       'iconCls': 'el-icon-notebook-2',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '股份公司汇总',
            //       'path': '/statistics/plan/04',
            //       'component': '/statistics/plan/04',
            //       'iconCls': 'el-icon-receiving',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '下级上报查询',
            //       'path': '/statistics/plan/05',
            //       'component': '/statistics/plan/05',
            //       'iconCls': 'el-icon-search',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '股份公司调整',
            //       'path': '/statistics/plan/06',
            //       'component': '/statistics/plan/06',
            //       'iconCls': 'el-icon-edit-outline',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司调整',
            //       'path': '/statistics/plan/07',
            //       'component': '/statistics/plan/07',
            //       'iconCls': 'el-icon-edit-outline',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '股份公司下达',
            //       'path': '/statistics/plan/08',
            //       'component': '/statistics/plan/08',
            //       'iconCls': 'el-icon-finished',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '集团公司下达',
            //       'path': '/statistics/plan/09',
            //       'component': '/statistics/plan/09',
            //       'iconCls': 'el-icon-finished',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '上级下达查看',
            //       'path': '/statistics/plan/10',
            //       'component': '/statistics/plan/10',
            //       'iconCls': 'el-icon-search',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     },
            //     {
            //       'name': '下级下达查看',
            //       'path': '/statistics/plan/11',
            //       'component': '/statistics/plan/11',
            //       'iconCls': 'el-icon-search',
            //       'menushow': true,
            //       'leaf': true,
            //       'defaultpage': false
            //     }
            //   ]
            // },
            {
              'name': '统计指标',
              'path': '/statistics/bp',
              'component': '/router',
              'iconCls': 'el-icon-data-line',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '统计项管理',
                  'path': '/statistics/bp/listAll',
                  'component': '/statistics/bp/listAll',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本单位统计项',
                  'path': '/statistics/bp/listCompany',
                  'component': '/statistics/bp/listCompany',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                }
              ]
            },
            {
              'name': '项目计划',
              'path': '/statistics/plan',
              'component': '/router',
              'iconCls': 'el-icon-time',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '总设计量',
                  'path': '/statistics/plan/proTjxAllList',
                  'component': '/statistics/plan/proTjxAllList',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '设计量详情',
                  'path': '/statistics/plan/proTjxDetail',
                  'component': '/statistics/plan/proTjxDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年计划',
                  'path': '/statistics/plan/proTjxYearList',
                  'component': '/statistics/plan/proTjxYearList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年计划列表',
                  'path': '/statistics/plan/listYear',
                  'component': '/statistics/plan/listYear',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '月计划',
                  'path': '/statistics/plan/proTjxMonthList',
                  'component': '/statistics/plan/proTjxMonthList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },

                {
                  'name': '月计划列表',
                  'path': '/statistics/plan/listMonth',
                  'component': '/statistics/plan/listMonth',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                }
              ]
            },
            {
              'name': '工程月报',
              'path': '/statistics/reportMonth',
              'component': '/router',
              'iconCls': 'el-icon-date',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '项目部月报',
                  'path': '/statistics/reportMonth/listAll',
                  'component': '/statistics/reportMonth/listAll',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报批量提交',
                  'path': '/statistics/reportMonth/batchList',
                  'component': '/statistics/reportMonth/batchList',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报二级list',
                  'path': '/statistics/reportMonth/reportMList',
                  'component': '/statistics/reportMonth/reportMList',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报局指list',
                  'path': '/statistics/reportMonth/reportJZList',
                  'component': '/statistics/reportMonth/reportJZList',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报详情',
                  'path': '/statistics/reportMonth/reportMDetail',
                  'component': '/statistics/reportMonth/reportMDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '上报截止日期',
                  'path': '/statistics/reportMonth/reportEndDate',
                  'component': '/statistics/reportMonth/reportEndDate',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '公司月报(自揽)',
                  'path': '/statistics/reportMonth/companyMList',
                  'component': '/statistics/reportMonth/companyMList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '公司月报(自揽)详情',
                  'path': '/statistics/reportMonth/companyMDetail',
                  'component': '/statistics/reportMonth/companyMDetail',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '公司月报(工区)',
                  'path': '/statistics/reportMonth/companyMgqList',
                  'component': '/statistics/reportMonth/companyMgqList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '集团公司月报',
                  'path': '/statistics/reportMonth/jTList',
                  'component': '/statistics/reportMonth/jTList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '集团公司月报二级页面',
                  'path': '/statistics/reportMonth/jTMList',
                  'component': '/statistics/reportMonth/jTMList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '集团公司月报详情页面',
                  'path': '/statistics/reportMonth/jTMDetail',
                  'component': '/statistics/reportMonth/jTMDetail',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '股份公司月报查看',
                  'path': '/statistics/reportMonth/gfList',
                  'component': '/statistics/reportMonth/gfList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目月报查看',
                  'path': '/statistics/reportMonth/reportMCk',
                  'component': '/statistics/reportMonth/reportMCk',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报(代填)',
                  'path': '/statistics/reportMonth/totalMDtList',
                  'component': '/statistics/reportMonth/totalMDtList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报(代填)填报页面',
                  'path': '/statistics/reportMonth/totalreportList',
                  'component': '/statistics/reportMonth/totalreportList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '总分包月报',
                  'path': '/statistics/reportMonth/totalMList',
                  'component': '/statistics/reportMonth/totalMList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报查看',
                  'path': '/statistics/reportMonth/totalMsearchList',
                  'component': '/statistics/reportMonth/totalMsearchList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报详情',
                  'path': '/statistics/reportMonth/totalMsearchDetail',
                  'component': '/statistics/reportMonth/totalMsearchDetail',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
       /*         ,
                {
                  'name': '项目月报批量提交',
                  'path': '/statistics/reportMonth/reportMCommit',
                  'component': '/statistics/reportMonth/reportMCommit',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                }*/
              ]
            },
            {
              'name': '工程月报(验工计价)',
              'path': '/statistics/projectCheck',
              'component': '/router',
              'iconCls': 'el-icon-c-scale-to-original',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '项目部月报',
                  'path': '/statistics/projectCheck/listAll',
                  'component': '/statistics/projectCheck/listAll',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报局指list',
                  'path': '/statistics/projectCheck/reportJZList',
                  'component': '/statistics/projectCheck/reportJZList',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报批量提交',
                  'path': '/statistics/projectCheck/batchList',
                  'component': '/statistics/projectCheck/batchList',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报二级list',
                  'path': '/statistics/projectCheck/reportMList',
                  'component': '/statistics/projectCheck/reportMList',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部月报详情',
                  'path': '/statistics/projectCheck/reportMDetail',
                  'component': '/statistics/projectCheck/reportMDetail',
                  'iconCls': 'el-icon-switch-button',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '公司月报(自揽)',
                  'path': '/statistics/projectCheck/companyMList',
                  'component': '/statistics/projectCheck/companyMList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '公司月报(自揽)详情',
                  'path': '/statistics/projectCheck/companyMDetail',
                  'component': '/statistics/projectCheck/companyMDetail',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '公司月报(工区)',
                  'path': '/statistics/projectCheck/companyMgList',
                  'component': '/statistics/projectCheck/companyMgList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '上报截止日期',
                  'path': '/statistics/projectCheck/reportEndDate',
                  'component': '/statistics/projectCheck/reportEndDate',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },{
                  'name': '验工计价补录配置表',
                  'path': '/statistics/projectCheck/recordSet',
                  'component': '/statistics/projectCheck/recordSet',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '集团公司月报',
                  'path': '/statistics/projectCheck/jTList',
                  'component': '/statistics/projectCheck/jTList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '集团公司月报二级页面',
                  'path': '/statistics/projectCheck/jTMList',
                  'component': '/statistics/projectCheck/jTMList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '集团公司月报详情页面',
                  'path': '/statistics/projectCheck/jTMDetail',
                  'component': '/statistics/projectCheck/jTMDetail',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '股份公司月报查看',
                  'path': '/statistics/projectCheck/gfList',
                  'component': '/statistics/projectCheck/gfList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目月报查看',
                  'path': '/statistics/projectCheck/reportMCk',
                  'component': '/statistics/projectCheck/reportMCk',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报(代填)',
                  'path': '/statistics/projectCheck/totalMDtList',
                  'component': '/statistics/projectCheck/totalMDtList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报(代填)填报页面',
                  'path': '/statistics/projectCheck/totalreportList',
                  'component': '/statistics/projectCheck/totalreportList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': false,
                  'leaf': true
                },
                {
                  'name': '总分包月报',
                  'path': '/statistics/projectCheck/totalMList',
                  'component': '/statistics/projectCheck/totalMList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报查看',
                  'path': '/statistics/projectCheck/totalMsearchList',
                  'component': '/statistics/projectCheck/totalMsearchList',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '总分包月报详情',
                  'path': '/statistics/projectCheck/totalMsearchDetail',
                  'component': '/statistics/projectCheck/totalMsearchDetail',
                  'iconCls': 'el-icon-office-building',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
              ]
            },
            {
              'name': '年计划填报',
              'path': '/statistics/annualPlanReport',
              'component': '/router',
              'iconCls': 'el-icon-c-scale-to-original',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '年计划填报详情',
                  'path': '/statistics/annualPlanReport/reportDetail',
                  'component': '/statistics/annualPlanReport/reportDetail',
                  'iconCls': 'el-icon-reading',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '下级上报(公司或局指上报原始计划)',
                  'path': '/statistics/annualPlanReport/subordinateReport',
                  'component': '/statistics/annualPlanReport/subordinateReport',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本级上报(集团上报股份)',
                  'path': '/statistics/annualPlanReport/levelReport',
                  'component': '/statistics/annualPlanReport/levelReport',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '下级上报(公司或局指上报原始计划)二级页面',
                  'path': '/statistics/annualPlanReport/subordinateReportTwo',
                  'component': '/statistics/annualPlanReport/subordinateReportTwo',
                  'iconCls': 'el-icon-reading',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本级调整(集团调整)',
                  'path': '/statistics/annualPlanReport/levelAdjustment',
                  'component': '/statistics/annualPlanReport/levelAdjustment',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '上级下达查看(股份下达集团)',
                  'path': '/statistics/annualPlanReport/superiorReleaseLook',
                  'component': '/statistics/annualPlanReport/superiorReleaseLook',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本级下达(集团下达)',
                  'path': '/statistics/annualPlanReport/levelRelease',
                  'component': '/statistics/annualPlanReport/levelRelease',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '下级下达(集团汇总下级下达)',
                  'path': '/statistics/annualPlanReport/subordinateRelease',
                  'component': '/statistics/annualPlanReport/subordinateRelease',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年计划上报(总部项目汇总查看)',
                  'path': '/statistics/annualPlanReport/yearPlanReport',
                  'component': '/statistics/annualPlanReport/yearPlanReport',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年计划上报(总部项目汇总查看)二级页面',
                  'path': '/statistics/annualPlanReport/yearPlanReportTwo',
                  'component': '/statistics/annualPlanReport/yearPlanReportTwo',
                  'iconCls': 'el-icon-reading',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年计划下达(总部项目汇总查看)',
                  'path': '/statistics/annualPlanReport/yearPlanRelease',
                  'component': '/statistics/annualPlanReport/yearPlanRelease',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本级上报(项目部上报公司或局指)',
                  'path': '/statistics/annualPlanReport/levelXmbReport',
                  'component': '/statistics/annualPlanReport/levelXmbReport',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本级上报(项目部上报公司或局指)二级页面',
                  'path': '/statistics/annualPlanReport/levelXmbReportTwo',
                  'component': '/statistics/annualPlanReport/levelXmbReportTwo',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '项目部填报详情',
                  'path': '/statistics/annualPlanReport/projectDetail',
                  'component': '/statistics/annualPlanReport/projectDetail',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '上级下达查看(公司或局指下达)',
                  'path': '/statistics/annualPlanReport/superiorReleaseXmbLook',
                  'component': '/statistics/annualPlanReport/superiorReleaseXmbLook',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '上级下达查看(公司或局指下达)二级页面',
                  'path': '/statistics/annualPlanReport/superiorReleaseXmbLookTwo',
                  'component': '/statistics/annualPlanReport/superiorReleaseXmbLookTwo',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '下级上报(项目部上报原始计划)',
                  'path': '/statistics/annualPlanReport/subordinateGcgsReport',
                  'component': '/statistics/annualPlanReport/subordinateGcgsReport',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本级上报(公司上报集团)',
                  'path': '/statistics/annualPlanReport/levelGcgsReport',
                  'component': '/statistics/annualPlanReport/levelGcgsReport',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '上级下达查看(集团下达公司)',
                  'path': '/statistics/annualPlanReport/superiorReleaseGcgsLook',
                  'component': '/statistics/annualPlanReport/superiorReleaseGcgsLook',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '本级下达(公司下达)',
                  'path': '/statistics/annualPlanReport/levelGcgsRelease',
                  'component': '/statistics/annualPlanReport/levelGcgsRelease',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
              ]
            },
            {
              'name': '非工程月报',
              'path': '/statistics/notEMReport',
              'component': '/router',
              'iconCls': 'el-icon-date',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '月报填报',
                  'path': '/statistics/notEMReport/list',
                  'component': '/statistics/notEMReport/list',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '月报查看',
                  'path': '/statistics/notEMReport/view',
                  'component': '/statistics/notEMReport/view',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '月报填报详情',
                  'path': '/statistics/notEMReport/detail',
                  'component': '/statistics/notEMReport/detail',
                  'iconCls': 'el-icon-reading',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                }, {
                  'name': '月报查看详情',
                  'path': '/statistics/notEMReport/detailView',
                  'component': '/statistics/notEMReport/detailView',
                  'iconCls': 'el-icon-reading',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                }, {
                  'name': '新兴市场月报查询',
                  'path': '/statistics/notEMReport/searchList',
                  'component': '/statistics/notEMReport/searchList',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
              ]
            },
            {
              'name': '季/年报表',
              'path': '/statistics/quarterlyReport',
              'component': '/router',
              'iconCls': 'el-icon-time',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '季报填报',
                  'path': '/statistics/quarterlyReport/list',
                  'component': '/statistics/quarterlyReport/list',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '季报填报详情',
                  'path': '/statistics/quarterlyReport/detail',
                  'component': '/statistics/quarterlyReport/detail',
                  'iconCls': 'el-icon-reading',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年报填报',
                  'path': '/statistics/quarterlyReport/list2',
                  'component': '/statistics/quarterlyReport/list2',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年报填报详情',
                  'path': '/statistics/quarterlyReport/detail2',
                  'component': '/statistics/quarterlyReport/detail2',
                  'iconCls': 'el-icon-reading',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': false
                },

              ]
            },
            {
              'name': '计统报表',
              'path': '/statistics/reports',
              'component': '/router',
              'iconCls': 'el-icon-document-copy',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '在建项目报表',
                  'path': '/statistics/reports/list1',
                  'component': '/statistics/reports/list1',
                  'iconCls': 'el-icon-notebook-1',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '勘察设计报表',
                  'path': '/statistics/reports/list2',
                  'component': '/statistics/reports/list2',
                  'iconCls': 'el-icon-notebook-2',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '竣工设计报表',
                  'path': '/statistics/reports/list3',
                  'component': '/statistics/reports/list3',
                  'iconCls': 'el-icon-collection',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '计划统计报表',
                  'path': '/statistics/reports/list4',
                  'component': '/statistics/reports/list4',
                  'iconCls': 'el-icon-files',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '季度报表',
                  'path': '/statistics/reports/list5',
                  'component': '/statistics/reports/list5',
                  'iconCls': 'el-icon-tickets',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '年度报表',
                  'path': '/statistics/reports/list6',
                  'component': '/statistics/reports/list6',
                  'iconCls': 'el-icon-document',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                {
                  'name': '股份公司报表',
                  'path': '/statistics/reports/list7',
                  'component': '/statistics/reports/list7',
                  'iconCls': 'el-icon-reading',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': false
                },
                ]
            },
            {
              'name': '档案管理',
              'path': '/archives',
              'component': '/router',
              'iconCls': 'el-icon-printer',
              'menushow': true,
              'leaf': false,
              'defaultpage': false,
              'children': [
                {
                  'name': '档案文件录入',
                  'path': '/archives/archives/list_archives',
                  'component': '/archives/archives/list_archives',
                  'iconCls': 'el-icon-edit',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '档案文件详细',
                  'path': '/archives/archives/detail_archives',
                  'component': '/archives/archives/detail_archives',
                  'iconCls': 'el-icon-printer',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '档案文件查询',
                  'path': '/archives/archives/listArchivesSearch',
                  'component': '/archives/archives/list_archivesSearch',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '统计分析录入',
                  'path': '/archives/statistics/list_statistics',
                  'component': '/archives/statistics/list_statistics',
                  'iconCls': 'el-icon-edit',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '统计分析详细',
                  'path': '/archives/statistics/detail_statistics',
                  'component': '/archives/statistics/detail_statistics',
                  'iconCls': 'el-icon-printer',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '统计分析查询',
                  'path': '/archives/statistics/listStatisticsSearch',
                  'component': '/archives/statistics/list_statisticsSearch',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '月度分析录入',
                  'path': '/archives/analysis/list',
                  'component': '/archives/analysis/list',
                  'iconCls': 'el-icon-edit',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '月度分析详细',
                  'path': '/archives/analysis/detail',
                  'component': '/archives/analysis/detail',
                  'iconCls': 'el-icon-printer',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '月度分析查询',
                  'path': '/archives/analysis/ylistSearch',
                  'component': '/archives/analysis/list_search',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '消息信息录入',
                  'path': '/archives/news/list',
                  'component': '/archives/news/list',
                  'iconCls': 'el-icon-edit',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '消息信息详细',
                  'path': '/archives/news/detail',
                  'component': '/archives/news/detail',
                  'iconCls': 'el-icon-printer',
                  'menushow': false,
                  'leaf': true,
                  'defaultpage': true
                },
                {
                  'name': '消息信息查询',
                  'path': '/archives/news/xlistSearch',
                  'component': '/archives/news/list_search',
                  'iconCls': 'el-icon-search',
                  'menushow': true,
                  'leaf': true,
                  'defaultpage': true
                }

              ]
            },
          ]
        },
        // {
        //   'name': '工程量清单库',
        //   'path': '/boq',
        //   'component': '/router',
        //   'iconCls': 'el-icon-printer',
        //   'menushow': true,
        //   'leaf': false,
        //   'defaultpage': false,
        //   'children': [
        //     {
        //       'name': '数据标准',
        //       'path': '/boq/dataStandards',
        //       'component': '/router',
        //       'iconCls': 'el-icon-data-analysis',
        //       'menushow': true,
        //       'leaf': false,
        //       'defaultpage': false,
        //       'children': [
        //         {
        //           'name': '标准库',
        //           'path': '/boq/dataStandards/ordinaryStandard/list',
        //           'component': '/boq/dataStandards/ordinaryStandard/list',
        //           'iconCls': 'el-icon-switch-button',
        //           'menushow': true,
        //           'leaf': true,
        //           'defaultpage': true
        //         },
        //         /* {
        //         'name': '标准库新增',
        //         'path': '/boq/dataStandards/ordinaryStandard/detail',
        //         'component': '/boq/dataStandards/ordinaryStandard/detail',
        //         'iconCls': 'el-icon-switch-button',
        //         'menushow': false,
        //         'leaf': true,
        //         'defaultpage': true
        //       }, */
        //         {
        //           'name': '国标库',
        //           'path': '/boq/nationalStandard/list',
        //           'component': '/boq/nationalStandard/list',
        //           'iconCls': 'el-icon-folder-opened',
        //           'menushow': true,
        //           'leaf': true,
        //           'defaultpage': true
        //         },
        //         {
        //           'name': '国标库新增',
        //           'path': '/boq/nationalStandard/detail',
        //           'component': '/boq/nationalStandard/detail',
        //           'iconCls': 'el-icon-switch-button',
        //           'menushow': false,
        //           'leaf': true,
        //           'defaultpage': true
        //         },
        //         {
        //           'name': '知识库',
        //           'path': '/boq/ordinaryScience',
        //           'component': '',
        //           'iconCls': 'el-icon-switch-button',
        //           'menushow': true,
        //           'leaf': true,
        //           'defaultpage': true
        //         }, {
        //           'name': '近义词库',
        //           'path': '/boq/standardSynonym/list',
        //           'component': '/boq/standardSynonym/list',
        //           'iconCls': 'el-icon-switch-button',
        //           'menushow': true,
        //           'leaf': true,
        //           'defaultpage': true
        //         }
        //       ]
        //     }
        //
        //   ]
        // },
        // {
        //   'name': '档案管理',
        //   'path': '/archives',
        //   'component': '/router',
        //   'iconCls': 'el-icon-printer',
        //   'menushow': true,
        //   'leaf': false,
        //   'defaultpage': false,
        //   'children': [
        //     {
        //       'name': '档案文件录入',
        //       'path': '/archives/archives/list_archives',
        //       'component': '/archives/archives/list_archives',
        //       'iconCls': 'el-icon-edit',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '档案文件详细',
        //       'path': '/archives/archives/detail_archives',
        //       'component': '/archives/archives/detail_archives',
        //       'iconCls': 'el-icon-printer',
        //       'menushow': false,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '档案文件查询',
        //       'path': '/archives/archives/list_archivesSearch',
        //       'component': '/archives/archives/list_archivesSearch',
        //       'iconCls': 'el-icon-search',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '统计分析录入',
        //       'path': '/archives/statistics/list_statistics',
        //       'component': '/archives/statistics/list_statistics',
        //       'iconCls': 'el-icon-edit',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '统计分析详细',
        //       'path': '/archives/statistics/detail_statistics',
        //       'component': '/archives/statistics/detail_statistics',
        //       'iconCls': 'el-icon-printer',
        //       'menushow': false,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '统计分析查询',
        //       'path': '/archives/statistics/list_statisticsSearch',
        //       'component': '/archives/statistics/list_statisticsSearch',
        //       'iconCls': 'el-icon-search',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '月度分析录入',
        //       'path': '/archives/analysis/list',
        //       'component': '/archives/analysis/list',
        //       'iconCls': 'el-icon-edit',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '月度分析详细',
        //       'path': '/archives/analysis/detail',
        //       'component': '/archives/analysis/detail',
        //       'iconCls': 'el-icon-printer',
        //       'menushow': false,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '月度分析查询',
        //       'path': '/archives/analysis/list_search',
        //       'component': '/archives/analysis/list_search',
        //       'iconCls': 'el-icon-search',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '消息信息录入',
        //       'path': '/archives/news/list',
        //       'component': '/archives/news/list',
        //       'iconCls': 'el-icon-edit',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '消息信息详细',
        //       'path': '/archives/news/detail',
        //       'component': '/archives/news/detail',
        //       'iconCls': 'el-icon-printer',
        //       'menushow': false,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '消息信息查询',
        //       'path': '/archives/news/list_search',
        //       'component': '/archives/news/list_search',
        //       'iconCls': 'el-icon-search',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     }
        //
        //   ]
        // },
        {
          'name': '报表管理',
          'path': '/reportForm',
          'component': '/router',
          'iconCls': 'el-icon-printer',
          'menushow': true,
          'leaf': false,
          'defaultpage': false,
          'children': [
            {
              'name': '报表列表',
              'path': '/reportForm/list',
              'component': '/reportForm/list',
              'iconCls': 'el-icon-edit',
              'menushow': true,
              'leaf': true,
              'defaultpage': true
            },
          ]
        },
        // {
        //   'name': '数据迁移',
        //   'path': '/dataMigration',
        //   'component': '/router',
        //   'iconCls': 'el-icon-printer',
        //   'menushow': true,
        //   'leaf': false,
        //   'defaultpage': false,
        //   'children': [
        //     {
        //       'name': '数据迁移查询',
        //       'path': '/dataMigration/data/list',
        //       'component': '/dataMigration/data/list',
        //       'iconCls': 'el-icon-edit',
        //       'menushow': true,
        //       'leaf': true,
        //       'defaultpage': true
        //     },
        //     {
        //       'name': '数据迁移子表',
        //       'path': '/dataMigration/data/listchild',
        //       'component': '/dataMigration/data/listchild',
        //       'iconCls': 'el-icon-edit',
        //       'menushow': false,
        //       'leaf': true,
        //       'defaultpage': false
        //     }
        //   ]
        // }
      ]
    }
  ]
}
