<template>
  <div @keyup.13="onSubmit('loginForm')">
    <el-form
      :model="form"
      :rules="rules"
      class="login-box"
      label-width="80px"
      ref="loginForm"
      style="background: white;"
    >
      <!--
      <h2 class="login-title">
        <img src="../../static/images/logo.png" style="height: 40px; width: 300px;" />
      </h2>
      -->
      <el-form-item label="账号" prop="loginname">
        <el-input   placeholder="请输入账号" type="text" v-model="form.loginname" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input   :show-password="true" placeholder="请输入密码" type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;" type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :append-to-body='true'
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :title="pwctitle"
      :visible.sync="pwcvisible"
      width="25%"
    >
      <el-form :model="pwcform" :rules="pwcrules" label-width="80px" ref="pwcform">
        <el-form-item label="新密码" prop="newpassword">
          <el-input   placeholder="请输入新密码" show-password="true" type="password" v-model="pwcform.newpassword" />
        </el-form-item>
        <el-form-item label="确认输入" prop="newpassword1">
          <el-input   placeholder="请再次确认密码" show-password="true" type="password" v-model="pwcform.newpassword1" />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" v-on:click="onSubmit1('pwcform')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { permissionRouter } from '@/assets/js/permission.js'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        loginname: '',
        password: ''
      },
      pwcform: {
        newpassword: '',
        newpassword1: ''
      },
      rules: {
        loginname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      pwcrules: {
        newpassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: this.pwdvalidate, trigger: 'blur' }
        ],
        newpassword1: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          { validator: this.pwdrepeat, trigger: 'blur' }
        ]
      },
      errmsg: '',
      pwctitle: '',
      minlength: 10,
      level: '',
      pwcvisible: false
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post('/login', {
              loginname: this.$utils.getRSA().encrypt(this.form.loginname),
              password: this.$utils.getRSA().encrypt(this.form.password)
            })
            .then(res => {
              if (res.data.code === 2) {
                // 密码到期提醒
                this.$notify({
                  title: '密码即将到期',
                  message: res.data.msg,
                  duration: 0
                })
              } else if (res.data.code === 3) {
                // 强制修改密码
                this.pwcvisible = true
                this.pwctitle = res.data.msg
                if (res.data.data.minlength) {
                  this.minlength = res.data.data.minlength
                }
                if (res.data.data.level) {
                  this.level = res.data.data.level
                }
              }
              if (res.data.code === 0 || res.data.code === 2) {
                // 登录成功跳转
                permissionRouter()
                this.$router.push('/welcome')
              }
            })
        }
      })
    },
    onSubmit1(formName) {
      // 修改密码提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post('/api/contract/base/updatepassword', {
              oldPassword: this.$utils.getRSA().encrypt(this.form.password),
              password: this.$utils.getRSA().encrypt(this.pwcform.newpassword)
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({ message: '密码修改成功', type: 'success' })
                permissionRouter()
                this.form.password = this.pwcform.newpassword
                this.onSubmit('loginForm')
                // this.$router.push('/welcome')
              }
            })
        }
      })
    },
    pwdvalidate(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (value.length < this.minlength) {
          callback(new Error('密码长度不能小于 ' + this.minlength + ' 位'))
        } else if (value === this.form.password) {
          callback(new Error('新旧密码不能一样'))
        } else {
          let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/
          let pwderrmsg = '密码必须包含数字、字母大小写、特殊字符'
          switch (this.level) {
            case '1':
              reg = /^(?=.*\d)/
              pwderrmsg = '密码必须包含数字'
              break
            case '2':
              reg = /^(?=.*[a-zA-Z])(?=.*\d)/
              pwderrmsg = '密码必须包含数字、字母'
              break
            case '3':
              reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
              pwderrmsg = '密码必须包含数字、字母大小写'
              break
          }
          if (!reg.test(value) && value !== '') {
            callback(new Error(pwderrmsg))
          } else {
            callback()
          }
        }
      }
    },
    pwdrepeat(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (this.pwcform.newpassword !== this.pwcform.newpassword1) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }
    }
  },
  created() {
    // 在登录状态下用户手工修改浏览器地址到登录页面时，做登出操作，清空sessionstorage内容
    if (sessionStorage.getItem('a')) {
      this.$http.post('/api/contract/base/logout').then(res => {
        if (res.data.code === 0) {
          // 清空sessionStorage数据
          sessionStorage.clear()
          window.location.href = '/'
        }
      })
    }
    // 集成iam,当跳转不存在t参数时，跳转到iamauth页面
    let t = window.location.href
    if (t.indexOf('?t=') > 0) {
      t = t.substr(t.indexOf('?t=') + 3, t.indexOf('#/') - t.indexOf('?t=') - 3)
      sessionStorage.setItem('a', 'Bearer ' + t)
      permissionRouter()
      this.$router.push('/welcome')
    } else {
      // iam集成 如果打算开启系统自带登录，注释下列跳转
      // window.location.href =
      //   'http://10.91.9.42:30751/idp/oauth2/authorize?redirect_uri=' +
      //   encodeURIComponent(window.location.origin + '/auth/oauth/token') +
      //   '&client_id=auditinfo&response_type=code&state=' + Math.round(Math.random() * 1000)
    }
  }
}
</script>
<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -175px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  position: absolute;
  opacity: 0.95;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
