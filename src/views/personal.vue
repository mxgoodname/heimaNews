<template>
  <div class="personal">
    <router-link :to="'/editPersonal/'+id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="userInfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{userInfo.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <userlist title="我的关注" content="关注的用户" @click="$router.push({path:'/followList'})"></userlist>
    <userlist title="我的跟帖" content="跟帖/回复"></userlist>
    <userlist title="我的收藏" content="文章/视频" @click="$router.push({path:'/articleLike'})"></userlist>
    <userlist title="设置"></userlist>
    <mybutton type="danger" class="exit" @click="exit">退出</mybutton>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/users.js'
import userlist from '@/components/userList.vue'
import mybutton from '@/components/mybutton.vue'
export default {
  data () {
    return {
      id: '',
      userInfo: {}
    }
  },
  components: {
    userlist,
    mybutton
  },
  mounted () {
    this.id = this.$route.params.id
    getUserInfo(this.id)
      .then(res => {
        console.log(res)
        if (res.data.message === '获取成功') {
          this.userInfo = res.data.data
          if (res.data.data.head_img) {
            this.userInfo.head_img = localStorage.getItem('hm_40_baseURL') + this.userInfo.head_img
          } else {
            this.userInfo.head_img = localStorage.getItem('hm_40_baseURL') + '/uploads/image/default.png'
            console.log(localStorage.getItem('hm_40_baseURL'))

            console.log(this.userInfo.head_img)
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.$toast.fail('获取数据失败')
      })
  },
  methods: {
    exit () {
      window.location.href = '#/index'
      localStorage.removeItem('hm_40_token')
    }
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.exit {
  margin: 50px auto !important;
}
</style>
