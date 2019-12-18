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
        <myinput
          placeholder="用户名/手机号"
          v-model="users.username"
          :rules="/^1\d{10}$/"
          msg_err="手机号输入错误请输入11位手机号"
        />
        <myinput placeholder="昵称" type="text" v-model="users.nickname" />
        <myinput placeholder="密码" type="password" v-model="users.password" />
      </div>
      <mybutton type="danger" @click="register">注册</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { registerUser } from '@/api/users.js'
export default {
  data () {
    return {
      users: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    mybutton, myinput
  },
  methods: {
    async register () {
      if (!/^1\d{10}$/.test(this.users.username)) {
        this.$toast.fail('请输入正确的11位手机号')
      } else if (!/\w{3,16}/.test(this.users.password)) {
        this.$toast.fail('请输入3~16位的密码')
      } else if (this.users.nickname.length === 0) {
        this.$toast.fail('请输入昵称')
      } else {
        let res = await registerUser(this.users)
        if (res.data.message === '注册成功') {
          this.$toast.success('注册成功')
          this.$router.push({ path: '/login' })
        } else {
          this.$toast.fail(res.data.message)
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242, 242, 242);
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
