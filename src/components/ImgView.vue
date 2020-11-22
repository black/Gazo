<template>
  <div>
    <img v-bind:src='imgsrc' alt=""><br>
    <span>SIZE:{{imgsize}}</span><br>
    <a v-bind:href='imgsrc' download>DOWNLOAD</a>
  </div>
</template>

<script>
const browser = require("webextension-polyfill")
export default {
  props: ['imgsrc','imgsize'], 
  computed: {
    defaultText() {
      return browser.i18n.getMessage('extName')
    }
  }, 
  mounted() {
    browser.runtime.sendMessage({})
  }
}
</script>

<style scoped>
  /* img {
    width: 50%;
    height: 200px;
  } */
</style>