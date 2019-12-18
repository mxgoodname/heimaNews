<template>
  <div @click="$router.push({path:`/articleDetail/${post.id}`})">
    <div class="single" v-if="post.cover.length<=2&&post.type===1">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <div class="single1" v-else-if="post.cover.length>2&& post.type===1">
    <p class="content">{{post.title}}</p>
    <div class="imgs">
      <img v-for="item in post.cover" :key="item.id" :src="item.url" alt />
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}</span>
    </p>
  </div>
  <div class="single2" v-else-if=" post.type===2">
    <p class="content">{{post.title}}</p>
    <div class="video">
      <div class="play"><van-icon name="play"/></div>
      <img :src="post.cover[0].url" alt />
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}</span>
    </p>
  </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
}
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
.single1 {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-direction: column;
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      width: 33.33%;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
}
.single2 {
  .video {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    .play{
      width: 50*100vw/360;
      height: 50*100vw/360;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background:rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      box-shadow: 0 0 10px #fff;
      text-align: center;
     .van-icon-play{
       color: #fff;
      line-height: 50*100vw/360;
      font-size: 40px;
     }
    }
    > img {
      width: 100%;
    }
  }
}
</style>
