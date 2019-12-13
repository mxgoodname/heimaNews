<template>
  <input
  class="inp"
  :value="value"
  @input="handlerInput"
  @blur="handlerBlur"
  :class="{error:!statu,success:statu}"
  >
</template>

<script>
export default {
  data () {
    return {
      statu: false
    }
  },
  // 刚进入如果有value为成功
  mounted () {
    this.statu = !!this.value
  },
  props: ['rules', 'value', 'msg_err'],
  methods: {
    handlerInput (event) {
      let value = event.target.value
      this.$emit('input', value)
      // 如果有规则则设置
      if (this.rules) {
        if (this.rules.test(value)) {
          this.statu = true
        } else {
          this.statu = false
        }
        // 如果没有规则且有value才为真
      } else {
        this.statu = !!value
      }
    },
    handlerBlur (event) {
      if (this.rules && !this.rules.test(event.target.value)) {
        this.$toast.fail(this.msg_err)
      }
    }
  }

}
</script>

<style lang='less' scoped>
.inp{
    width: 314*100vw/360;
    height: 40*100vw/360;
    border:none;
    outline: none;
    border-bottom: 2px solid rgb(117,117,117);
    font-size: 18px;
    margin: 5px 0;
    background-color: transparent;
}
.error{
  border-bottom-color: red;
}
.success{
  border-bottom-color: green;
}
</style>
