<template>
  <div class="bd">
    <myhead>
      <span slot="left" @click="back">返回</span>
      <span slot="title">编辑资料</span>
      <span slot="right" @click="exit">退出</span>
    </myhead>
    <div class="headUser">
      <img :src="this.userInfo.head_img" alt class="head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <userlist title="昵称" :content="userInfo.nickname" @click="nick=!nick"></userlist>
    <van-dialog v-model="nick" title="昵称修改" show-cancel-button @confirm="uploadNickname">
      <van-field required label="昵称" placeholder="请输入昵称" :value="userInfo.nickname" ref="nickname" />
    </van-dialog>
    <userlist type='password' title="密码" :content="userInfo.password" @click="pass=!pass"></userlist>
    <van-dialog v-model="pass" title="密码修改" show-cancel-button @confirm="uploadPassword">
      <van-field required label="原密码" placeholder="输入原密码"  ref="oldPassword" />
      <van-field required label="新密码" placeholder="输入原密码"  ref="newPassword" />
    </van-dialog>
    <userlist title="性别" :content="userInfo.gender===1?'男':'女'" @click="gendershow=!gendershow"></userlist>
     <van-dialog v-model="gendershow" title="性别修改" show-cancel-button @confirm="uploadGender">
      <van-field required label="性别" placeholder="请输入性别" :value="userInfo.gender===1?'男':'女'" ref="gender" />
    </van-dialog>
  </div>
</template>

<script>
import myhead from '@/components/myhead.vue'
import { getUserInfo, editUser } from '@/api/users.js'
import userlist from '@/components/userList.vue'
import { uploadFile } from '@/api/uploadFile.js'
export default {
  data () {
    return {
      id: '',
      userInfo: {},
      nick: false,
      pass: false,
      gendershow: false
    }
  },
  components: {
    myhead,
    userlist
  },
  methods: {
    back () {
      window.history.back()
    },
    exit () {
      window.location.href = '#/index'
      localStorage.removeItem('hm_40_token')
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      if (res.data.message === '文件上传成功') {
        let res1 = await editUser(this.id, { head_img: res.data.data.url })
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改用户头像成功')
          this.userInfo.head_img =
            localStorage.getItem('hm_40_baseURL') + res.data.data.url
        } else {
          this.$toast.fail('修改失败')
        }
      } else {
        this.$toast.fail('文件上传失败')
      }
    },
    async uploadNickname () {
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await editUser(this.id, { nickname: nickname })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        this.userInfo.nickname = nickname
      } else {
        this.$toast.fail('修改失败')
      }
    },
    async uploadPassword () {
      let oldPassword = this.$refs.oldPassword.$refs.input.value
      if (oldPassword === this.userInfo.password) {
        let newPassword = this.$refs.newPassword.$refs.input.value
        if (!/\w{3,16}/.test(newPassword)) {
          this.$toast.fail('请输入3~16位密码')
          return
        }
        let res = await editUser(this.id, { password: newPassword })
        if (res.data.message === '修改成功') {
          this.$toast.success('修改密码成功')
          this.userInfo.password = newPassword
        } else {
          this.$toast.fail('修改失败')
        }
      } else {
        this.$toast.fail('输入密码错误')
      }
    },
    async uploadGender () {
      let gender = this.$refs.gender.$refs.input.value
      let res = await editUser(this.id, { gender: gender })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        this.userInfo.gender = gender === '男' ? 1 : 0
      } else {
        this.$toast.fail('修改失败')
      }
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      this.userInfo = res.data.data
      if (res.data.data.head_img) {
        this.userInfo.head_img =
          localStorage.getItem('hm_40_baseURL') + res.data.data.head_img
      } else {
        this.userInfo.head_img =
          localStorage.getItem('hm_40_baseURL') + '/uploads/image/default.png'
      }
    } else {
      this.$toast.fail('获取数据失败')
    }
  }
}
</script>

<style lang='less' scoped>
.bd {
  .headUser {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    .head_img {
      display: block;
      width: 100 * 100vw/360;
      height: 100 * 100vw/360;
      border-radius: 10000000px;
    }
  }
  /deep/.van-uploader__upload {
    width: 100 * 100vw/360;
    height: 100 * 100vw/360;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
