<template>
  <div class="dialogClass">
    <!-- <cardTitile :param="titileName" :bclose="true" /> -->

    <el-row style="padding-right: 16px;" v-if="!notitle">
      <span style="float:right;display:flex">
        <i style="display:flex;align-items:center">
          <img :src="icon0" style="width:15px" />

          <span style="padding-left: 5px; font-style:initial">通过</span>
        </i>

        <i style="display:flex;align-items:center;padding-left:16px">
          <img :src="icon1" style="width:15px" />

          <span style="padding-left: 5px; font-style:initial">驳回</span>
        </i>

        <i style="display:flex;align-items:center;padding-left:16px">
          <img :src="icon2" style="width:15px" />

          <span style="padding-left: 5px; font-style:initial">作废</span>
        </i>

        <i style="display:flex;align-items:center;padding-left:16px">
          <img :src="icon3" style="width:15px" />

          <span style="padding-left:5px; font-style:initial">待审批</span>
        </i>
      </span>
    </el-row>

    <el-row class="stepClass">
      <!-- 未开始 未提交 -->

      <el-steps
        v-if="approveState === '-4'"
        :space="250"
        :active="2"
        align-center
      >
        <el-step>
          <template slot="title">
            待提交
          </template>

          <template slot="icon">
            <i slot="reference"><img :src="icon3" style="width:20px"/></i>
          </template>
        </el-step>

        <el-step>
          <template slot="title">
            未开始
          </template>

          <template slot="icon">
            <i slot="reference"><img :src="icon3" style="width:20px"/></i>
          </template>
        </el-step>
      </el-steps>

      <!-- 多条渲染 -->

      <el-steps
        v-if="approveState !== '-4'"
        :space="250"
        :active="listS.length"
        align-center
      >
        <template v-for="(item, index) in listS">
          <el-step :key="index">
            <template slot="icon">
              <el-popover placement="top-start" width="200" trigger="hover">
                <span>{{ item.personTitle }}: {{ item.approvePerson }}</span
                ><br />

                <span>{{ item.dateTitle }}: {{ item.approveTime }}</span
                ><br />

                <span>{{ item.remarkTitle }}:  <span v-if="item.remark!='null'">{{ item.remark }}</span></span>

                <i slot="reference">
                  <img :src="item.icon" style="width:20px" />
                </i>
              </el-popover>
            </template>

            <template slot="title">
              {{ item.title }}
            </template>
          </el-step>
        </template>

        <template v-for="(item, index) in listN">
          <el-step :key="index">
            <template slot="icon">
              <el-popover placement="top-start" width="200" trigger="hover">
                <span>{{ item.personTitle }}: {{ item.approvePerson }}</span
                ><br />

                <span>{{ item.dateTitle }}: {{ item.approveTime }}</span
                ><br />

                <span>{{ item.remarkTitle }}:  <span v-if="item.remark!='null'">{{ item.remark }}</span></span>

                <i slot="reference">
                  <img :src="item.icon" style="width:20px" />
                </i>
              </el-popover>
            </template>

            <template slot="title">
              {{ item.title }}
            </template>
          </el-step>
        </template>
      </el-steps>
    </el-row>
<!--
    <div class="paddindSpace" style="padding-top:20px; padding-bottom: 0px">
      <el-button round type="info" @click="backToMain">关闭</el-button>
    </div> -->
  </div>
</template>

<script>
// import { loadData } from '@/api/contract/caigouhetong'

// import cardTitile from '@/layout/mixin/cardTitile'

export default {
  components: {
    // cardTitile
  },

  props: ['no', 'notitle', 'id'],

  data() {
    return {
      icon0: require('../../../static/images/shenhetonguo-icon@2x.png'),

      icon1: require('../../../static/images/shenhebohui-icon@2x.png'),

      icon2: require('../../../static/images/shenhetonguo-icon@2x(1).png'),

      icon3: require('../../../static/images/weikaishishenhe-icon@2x.png'),

      titileName: '审批详情',

      initAllData: '',

      approveState: '',

      title1: '',

      title2: '',

      dyIcon1: '',

      dyIcon2: '',

      checkPerson: '',

      checkDate: '',

      remarks: '',

      reason: '',

      listSOrigin: [],
      listNOrigin: [],
      listN: [],
      listS: []
    }
  },

  created() {
    this.initData()
  },

  methods: {
    initData() {
      this.$http.get(
        'http://120.78.186.60:8085/api/contract/Approve/getApproveState?pkNo=' + this.no
      )
        .then((res) => {
          this.approveState = res.data.data.approveState

          this.listSOrigin = res.data.data.listS
          this.listNOrigin = res.data.data.listN
          if (this.listSOrigin.length !== 0) {
            // if (this.approveState === '0' && this.listSOrigin.length === 1) {
            //   var newJson = {
            //     approvePerson: this.listSOrigin[0].approvePerson,

            //     approvePersonId: this.listSOrigin[0].approvePersonId,

            //     approveState: '0'
            //   }

            //   this.listSOrigin.push(newJson)
            // }
            this.listNOrigin.map((item, index) => {
              switch (item.approveState) {
                case '0':
                  this.$set(this.listNOrigin[index], 'icon', this.icon3)

                  this.$set(this.listNOrigin[index], 'title', '待审批')

                  this.$set(this.listNOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listNOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listNOrigin[index], 'remarkTitle', '备注')

                  break
              }
              this.listN = JSON.parse(JSON.stringify(this.listNOrigin))
            })
            this.listSOrigin.map((item, index) => {
              switch (item.approveState) {
                case '-2':
                  this.$set(this.listSOrigin[index], 'icon', this.icon0)

                  this.$set(this.listSOrigin[index], 'title', '已提交')

                  this.$set(this.listSOrigin[index], 'personTitle', '提交人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '提交时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')

                  break

                case '1':
                  this.$set(this.listSOrigin[index], 'icon', this.icon0)

                  this.$set(this.listSOrigin[index], 'title', '审批通过')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')

                  break
                case '2':
                  this.$set(this.listSOrigin[index], 'icon', this.icon1)

                  this.$set(this.listSOrigin[index], 'title', '驳回')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '驳回原因')

                  break

                case '0':
                  this.$set(this.listSOrigin[index], 'icon', this.icon3)

                  this.$set(this.listSOrigin[index], 'title', '待审批')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')

                  break

                case '4':
                  this.$set(this.listSOrigin[index], 'icon', this.icon3)

                  this.$set(this.listSOrigin[index], 'title', '已取消')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')

                  break

                case '3':
                  this.$set(this.listSOrigin[index], 'icon', this.icon0)

                  this.$set(this.listSOrigin[index], 'title', '待撤单')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')

                  break

                case '5':
                  this.$set(this.listSOrigin[index], 'icon', this.icon0)

                  this.$set(this.listSOrigin[index], 'title', '撤单通过')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '备注')

                  break

                case '6':
                  this.$set(this.listSOrigin[index], 'icon', this.icon1)

                  this.$set(this.listSOrigin[index], 'title', '撤单驳回')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '驳回原因')

                  break
                case '7':
                  this.$set(this.listSOrigin[index], 'icon', this.icon2)

                  this.$set(this.listSOrigin[index], 'title', '作废')

                  this.$set(this.listSOrigin[index], 'personTitle', '审批人')

                  this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

                  this.$set(this.listSOrigin[index], 'remarkTitle', '作废原因')

                  break
              }
            })
            var index = this.listSOrigin.length
            // for (var i = 0; i < this.listSOrigin.length; i++) {
            //   if (this.listSOrigin[i].title === '审批通过') {
            //     index = i
            //   }
            // }
            if (this.id === '已寄版' && this.approveState === '1') {
              this.listSOrigin[index] = {
                icon: '',
                title: '',
                personTitle: '',
                dateTitle: '',
                remarkTitle: ''
              }
              this.$set(this.listSOrigin[index], 'icon', this.icon0)

              this.$set(this.listSOrigin[index], 'title', '已寄版')

              this.$set(this.listSOrigin[index], 'personTitle', '审批人')

              this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

              this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
            } else if ((this.id === '待寄版' && this.approveState === '1')) {
              this.listSOrigin[index] = {
                icon: '',
                title: '',
                personTitle: '',
                dateTitle: '',
                remarkTitle: ''
              }
              this.$set(this.listSOrigin[index], 'icon', this.icon3)

              this.$set(this.listSOrigin[index], 'title', '待寄版')

              this.$set(this.listSOrigin[index], 'personTitle', '审批人')

              this.$set(this.listSOrigin[index], 'dateTitle', '审批时间')

              this.$set(this.listSOrigin[index], 'remarkTitle', '备注')
            }
            this.listS = JSON.parse(JSON.stringify(this.listSOrigin))

            window.console.log(this.listS)
          }
        })
    },

    backToMain() {
      this.$emit('closeDialog2')
    }
  }
}
</script>

<style scoped>
.dialogClass {
  display: flex;

  flex-direction: column;
}

.paddindSpace {
  padding-top: 20px;

  display: flex;

  justify-content: center;

  margin-top: auto;

  padding-bottom: 16px !important;

  border-top: 1px solid #f3f3f3 !important;
}

.stepClass {
  min-height: 200px;

  display: flex;

  justify-content: center;

  align-items: center;
}

.stepClass .el-steps {
  display: flex;

  flex: 1;
}

.el-step.is-horizontal {
  flex: 1;
}

.paddindSpace .el-form .el-form-item {
  margin-top: 20px;

  padding-bottom: 20px;
}
</style>
