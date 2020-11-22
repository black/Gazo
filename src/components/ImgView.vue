<template>
  <div class="container">
    <img v-bind:src='imgsrc' alt=""><br> 
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
.container{ 
  border: 1px solid #eee;
}
.container img{ 
  width: 100%;
  max-width: 100%;  
}

.container a{
  display: none;
  width: 100%;
  text-decoration: none;
  color: grey;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  padding: 5% 0;
}

 
.container:hover  > a{
  display: block;
}
  /* img {
    width: 50%;
    height: 200px;
  } */
</style>