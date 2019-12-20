<template>
  <div class="comment">
    <myhead>
      <span slot="title">精彩评论</span>
    </myhead>
    <div class="commentList">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replay(comment)">回复</span>
        </div>
        <commentItem
        v-if="comment.parent"
        :comment="comment.parent"
        @replay='replay'
        ></commentItem>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <articleFoot
    :article="article"
    :replayObj='parentReplay'
    @resetObj='parentReplay=null'
    @refresh='init'
    ></articleFoot>
  </div>
</template>

<script>
import myhead from '@/components/myhead.vue'
import commentItem from '@/components/comment_item.vue'
import articleFoot from '@/components/articleFoot.vue'
import { getCommentsById, getArticleDetail } from '@/api/article.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      commentList: {},
      article: {},
      parentReplay: {}
    }
  },
  components: {
    myhead,
    commentItem,
    articleFoot
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      let res = await getCommentsById(this.id)
      if (res.status === 200) {
        this.commentList = res.data.data.map(value => {
          value.user.head_img =
        localStorage.getItem('hm_40_baseURL') + value.user.head_img
          return value
        })
      }
      let res1 = await getArticleDetail(this.id)
      if (res1.status === 200) {
        this.article = res1.data.data
      }
    },
    replay (comment) {
      this.parentReplay = comment
    }
  }
}
</script>

<style lang='less' scoped>
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom:10px;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
