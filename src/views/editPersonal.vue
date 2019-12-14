<template>
  <div class="bd">
    <myhead>
      <span slot="title">编辑资料</span>
      <span slot="right">退出</span>
    </myhead>
    <div class="headUser">
      <img :src="this.userInfo.head_img" alt class="head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <userlist title="昵称" :content='userInfo.nickname'></userlist>
    <userlist title="密码" :content='userInfo.password'></userlist>
    <userlist title="性别" :content='userInfo.gender'></userlist>
  </div>
</template>

<script>
import myhead from '@/components/myhead.vue'
import { getUserInfo } from '@/api/users.js'
import userlist from '@/components/userList.vue'
export default {
  data () {
    return {
      id: '',
      userInfo: {}
    }
  },
  components: {
    myhead, userlist
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
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
.bd{
    .headUser{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: relative;
        .head_img{
            display: block;
            width: 100*100vw/360;
            height: 100*100vw/360;
            border-radius: 10000000px;
        }
    }
}
</style>
