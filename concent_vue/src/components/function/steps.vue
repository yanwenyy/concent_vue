<template>
  <div id="stepbox" style="position:relative;">

                <el-steps :space="250" :active="2" align-center>

                  <el-step>
                    <template slot="title">
                       填写寄版单号和数量
                    </template>
                    <template slot="icon">
                      <i slot="reference"><img :src="dyIcon1" style="width:20px"></i>
                    </template>
                  </el-step>
                  <el-step>
                    <template slot="icon">
                      <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                      >
                     <span>审核人: {{ checkPerson }}</span><br>
                        <span>审核时间: {{ checkDate }}</span><br>
                        <span>备注: {{ remarks }}</span>

                        <i slot="reference">
                          <img :src="dyIcon2" style="width:20px">

                        </i>
                      </el-popover>
                    </template>

                    <template slot="title">
                      {{ title2 }}
                    </template>
                  </el-step>
                </el-steps>

  </div>
</template>
<script>
export default {
  name: 'dataCenter',
  props: {
    status: {
      type: String,
      default: ''
    },
    uuid: {
      type: String,
      default: ''
    },
    no: {
      type: String,
      default: ''
    }

  },
  data() {
    return {

    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss">

</style>
