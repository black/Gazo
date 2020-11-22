<template>
  <div>
    <img v-bind:src='imgsrc' alt="">
    <a v-bind:href='imgsrc' download>DOWNLOAD</a>
  </div>
</template>

<script>
export default {
  props: ['imgsrc'],
  methods: {
    getImgSize(url, callback) { 
      let img = new Image();
      img.src = url;
      img.onload = function() { 
        callback(this.width, this.height); 
      }
    }
  },
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
  img {
    width: 50%;
    height: 200px;
  }
</style>