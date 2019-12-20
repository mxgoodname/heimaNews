<template>
  <div class="commentitem">
    <mycomment
    v-if="comment.parent"
    :comment='comment.parent'
    @replay='replay'
    ></mycomment>
    <div class="head">
      <div>
        <span>{{comment.user.nickname}}</span>
        <span>2小时前</span>
      </div>
      <span @click="replay(comment)">回复</span>
    </div>
    <div class="text">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'mycomment',
  props: ['comment'],
  mounted () {
  },
  methods: {
    replay (comment) {
      this.$emit('replay', comment)
    }
  }
}
</script>

<style lang='less' scoped>
.commentitem {
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
}
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
</style>
