<template>
  <div class="head">
      <span class="iconfont iconjiantou2" @click="$router.back()">
          <slot name="left"></slot>
      </span>
      <span class="title">
          <slot name="title"></slot>
      </span>
      <span class="right">
          <slot name="right"></slot>
      </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.head{
    display: flex;
    justify-content: space-between;
    padding:0 10px;
    height: 50*100vw/360;
    line-height: 50*100vw/360;
    border-bottom: 2px solid #ccc;
    .title{
        font-weight: 700
    }
}
</style>
