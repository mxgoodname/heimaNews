<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span
        @click="followThisUser"
        :class="{follow:article.has_follow}"
      >{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.user&&article.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="article.content" v-if="article.type===1"></div>
      <video v-if="article.type===2" :src="article.content" controls></video>
      <div class="opt">
        <span class="like" :class="{active:article.has_like}">
          <van-icon name="good-job-o" @click="likeThisArticle" />
          {{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <articleFoot :article='article'></articleFoot>
  </div>
</template>

<script>
import { getArticleDetail, likeArticle, getCommentsById } from '@/api/article.js'
import { unFollowUser, followUser } from '@/api/users.js'
import articleFoot from '@/components/articleFoot.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      article: {},
      commentList: []
    }
  },
  components: {
    articleFoot
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getArticleDetail(this.id)
    if (res.status === 200) {
      this.article = res.data.data
      let res1 = await getCommentsById(this.article.id, { pageSize: 10 })
      if (res1.status === 200) {
        console.log(res1)
        this.commentList = res1.data.data.map(value => {
          value.user.head_img = localStorage.getItem('hm_40_baseURL') + value.user.head_img
          return value
        })
        // console.log(this.commentList)
      }
    }
    // console.log(this.article)
  },
  methods: {
    async followThisUser () {
      let res
      if (this.article.has_follow) {
        res = await unFollowUser(this.article.user.id)
      } else {
        res = await followUser(this.article.user.id)
      }
      console.log(res)
      this.article.has_follow = !this.article.has_follow
      this.$toast.success(res.data.message)
    },
    async likeThisArticle () {
      let res = await likeArticle(this.article.id)
      console.log(res)
      console.log(this.article)
      if (res.data.message === '点赞成功') {
        this.article.like_length++
      } else if (res.data.message === '取消成功') {
        this.article.like_length--
      }
      this.$toast.success(res.data.message)
      this.article.has_like = !this.article.has_like
    }
  }
}
</script>

<style lang='less' scoped>
.articaldetail{
  padding-bottom: 50px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  .follow {
    background-color: #f00;
    color: #fff;
  }
  > span {
    padding: 5px 15px;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    border: #ccc 1px solid;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
  video {
    width: 100%;
    border-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .active {
    color: #f00;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
  }
  .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
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
/deep/.photo {
  img {
    width: 100%;
    display: block;
  }
}
</style>
