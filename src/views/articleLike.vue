<template>
  <div class="articleLike">
    <myhead class="header">
      <span slot="title">我的收藏</span>
    </myhead>
    <van-swipe-cell v-for="(post,index) in articleList" :key="post.id">
      <articleBlock  :post="post"></articleBlock>
      <template slot="right" >
        <van-button square type="danger" text="删除" @click="del(post.id,index)"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import myhead from '@/components/myhead.vue'
import articleBlock from '@/components/articleBlock.vue'
import { getArticleLike } from '@/api/users.js'
import { articleCollect } from '@/api/article.js'
export default {
  data () {
    return {
      articleList: []
    }
  },
  components: {
    myhead,
    articleBlock
  },
  async mounted () {
    let res = await getArticleLike()
    this.articleList = res.data.data
    console.log(res)
  },
  methods: {
    async del (id, index) {
      let res = await articleCollect(id)
      if (res.status === 200) {
        this.$toast.success(res.data.message)
      }
      this.articleList.splice(index, 1)
    }
  }
}
</script>

<style lang='less' scoped>
/deep/.van-swipe-cell__right{
  display: flex;
  align-items: center;
}
</style>
