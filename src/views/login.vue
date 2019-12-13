<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <myinput  placeholder="用户名/手机号"
        v-model="users.username"
        :rules='/^1\d{10}$/'
        msg_err='手机号输入错误请输入11位手机号'
        />
        <myinput  placeholder="密码" type="password" v-model="users.password"/>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <mybutton type='danger' @click="login">登录按钮</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { userLogin } from '@/api/users.js'
export default {
  data () {
    return {
      users: {
        username: '111',
        password: '222'
      }
    }
  },
  components: {
    mybutton, myinput
  },
  methods: {
    login (event) {
      userLogin(this.users)
        .then(res => {
          console.log(res)

          if (res.data.message === '登录成功') {

          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登录失败，请重试')
        })
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242,242,242);
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
