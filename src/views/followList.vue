<template>
  <div class="focus">
    <myhead>
      <span slot="title">我的关注</span>
    </myhead>
    <div class="list">
      <div class="box" v-for="(item,index) in followList" :key='item.id'>
        <img :src="item.head_img" alt />
        <div class="center">
          <p>{{item.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="unFollow(index,item.id)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import myhead from '@/components/myhead.vue'
import { getFollowList, unFollowUser } from '@/api/users.js'
export default {
  data () {
    return {
      followList: []
    }
  },
  components: {
    myhead
  },
  async mounted () {
    let res = await getFollowList()
    if (res.status === 200) {
      this.followList = res.data.data.map(value => {
        value.head_img = localStorage.getItem('hm_40_baseURL') + value.head_img
        return value
      })
    }
    console.log(this.followList)
  },
  methods: {
    async unFollow (index, id) {
      let res = await unFollowUser(id)
      if (res.status === 200) {
        this.followList = this.followList.splice(index, 1)
      }
      this.$toast.success(res.data.message)
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
