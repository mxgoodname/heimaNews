<template>
  <div class="btn" :class="{red:type==='danger',green:type==='success'}" @click="hander">
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['type'],
  methods: {
    hander (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.btn{
    width: 314*100vw/360;
    height: 40*100vw/360;
    font-size: 20*100vw/360;
    text-align: center;
    line-height:40*100vw/360;
    border-radius: 100000px;
}
.red{
    background: #f00;
    color: #fff;
}
.green{
    background: #0f0;
    color: #fff;
}
</style>
