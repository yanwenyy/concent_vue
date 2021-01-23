<template>
  <el-dialog
    :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialog" title="修改项目状态" width="400px" @close="closeDialog">
    <el-form class="gcform">
      <el-form-item>
        <el-select
          filterable
          clearable
          placeholder="请选择"
          @change="getIdName"
          v-model="newStatusId">
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in data"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  export default {
    name: 'stateUpdate',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        dialog: false, newStatusId: '', newStatusName: '', ids: []
      }
    },
    methods: {
      closeDialog() {
        this.dialog = false
      },
      getIdName(id) {
        this.newStatusName = ''
        if (id) {
          this.data.find(
            (item) => {
              if (item.id === id) {
                this.newStatusName = item.detailName
              }
            }
          )
        }
        console.log(this.newStatusId, this.newStatusName)
      },
      submit() {
        if (!this.newStatusId || !this.newStatusName) {
          this.$message({
            message: '请选择您要修改的状态',
            type: 'error'
          })
          return
        }
        const params = {ids: this.ids.toString(), newStatusName: this.newStatusName, newStatusId: this.newStatusId}
        this.$http
          .post('/api/statistics/StatisticsProject/detail/updateProjectName', params)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialog = false
              this.$emit('resetState')
            }
          })
      }
    }
  }
</script>

<style scoped>
  >>> .el-dialog__body {
    padding-top: 0;
  }
</style>
