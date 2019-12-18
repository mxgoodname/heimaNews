<template>
  <div class="index">
    <div class="head">
      <div class="iconfont iconnew logo icon"></div>
      <div class="search">
        <van-icon name="search" />&nbsp;&nbsp;新闻搜索
      </div>
      <div>
        <van-icon name="user-circle-o" class="icon" @click="jump"/>
      </div>
    </div>
    <van-tabs v-model="active" swipeable animated>
      <van-tab v-for="item in cateList" :key="item.id" :title="item.name">

          <van-list
            :offset="10"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
           <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
            <articleBlock v-for="post in item.postList" :key="post.id" :post="post"></articleBlock>
             </van-pull-refresh>
          </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getArticleList } from '@/api/article.js'
import articleBlock from '@/components/articleBlock.vue'
export default {
  data () {
    return {
      active: localStorage.getItem('hm_40_token') ? 1 : 0,
      cateList: []
    }
  },
  components: {
    articleBlock
  },
  async mounted () {
    let res = await getCateList()
    this.cateList = res.data.data
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        postList: [],
        pageIndex: 1,
        pageSize: 6,
        loading: false,
        finished: false,
        isLoading: false
      }
    })
    this.getPostList()
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  methods: {
    jump () {
      this.$router.push({ path: `/personal/${localStorage.getItem('hm_40_id')}` })
    },
    async getPostList () {
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      this.cateList[this.active].postList.push(...res.data.data)
      this.cateList[this.active].loading = false
      this.cateList[this.active].isLoading = false
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    onLoad () {
      this.cateList[this.active].pageIndex++
      this.getPostList()
    },
    onRefresh () {
      this.$toast('刷新成功')
      this.cateList[this.active].pageIndex = 1
      this.cateList[this.active].finished = false
      this.cateList[this.active].postList.length = 0
      this.getPostList()
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .head {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f00;
    color: #fff;
    .icon {
      padding: 0 10px;
      font-size: 30px;
    }
    .logo {
      font-size: 60px;
    }
    .search {
      height: 30 * 100vw/360;
      line-height: 30 * 100vw/360;
      flex: 1;
      font-size: 18px;
      text-align: center;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
