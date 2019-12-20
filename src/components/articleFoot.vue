<template>
  <div class="comment">
    <div class="addcomment" v-show="isshow">
      <input type="text" placeholder="写跟帖"  @focus="handerFocus"/>
      <span class="comment" @click="$router.push({path:`/comments/${article.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{article.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="collect" v-if="!article.has_star"></i>
      <i v-if="article.has_star" class="active"><van-icon name="star" @click="collect" /></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="!isshow">
        <textarea  ref='commtext' rows="5" ></textarea>
        <div>
            <span @click="sendComment" >发送</span><br>
            <span @click="celComent">取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { articleCollect, sendComment } from '@/api/article.js'
export default {
  data () {
    return {
      isshow: true
    }
  },
  watch: {
    replayObj () {
      if (this.replayObj) {
        this.isshow = false
        console.log(this.replayObj)

        this.handerFocus()
      }
    }
  },
  props: ['article', 'replayObj'],
  methods: {
    handerFocus () {
      this.isshow = false
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
    // 收藏
    async collect () {
      let res = await articleCollect(this.article.id)
      this.$toast.success(res.data.message)
      this.article.has_star = !this.article.has_star
    },
    // 发表评论
    async sendComment () {
      let data = {
        content: this.$refs.commtext.value
      }
      if (this.replayObj) {
        data.parent_id = this.replayObj.id
      }
      let res = await sendComment(this.$route.params.id, data)
      if (res.data.message === '评论发布成功') {
        this.$toast.success(res.data.message)
        this.$emit('refresh')
        this.$refs.commtext.value = ''
        this.isshow = true
      }
    },
    // 取消评论
    celComent () {
      this.isshow = true
      this.$emit('resetObj')
    }
  }
}
</script>

<style lang='less' scoped>
.comment{
    position: fixed;
    bottom: 0;
    left: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  .active{
      color:red;
  }
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
    line-height: 30px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
