<template>
  <div class="list" @click="handlerclick">
      <div class="left"><span >{{title}}</span></div>
      <div class="right"><span >{{content}}</span>
      <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'content'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.list{
    display: flex;
    justify-content: space-between;
    height: 60*100vw/360;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 15px;
    .right{
        font-size: 13px;
        color: #aaa;
    }
}
</style>
