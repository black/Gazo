<template>
  <div>
    <img v-bind:src='imgsrc' alt="">
    <button v-on:click="download()">DOWNLOAD</button>
  </div>
</template>

<script>
export default {
  props: ['imgsrc'],
  methods: {
    download () {
      console.log(this.imgsrc)
      console.log('download')
    }
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  },
  mounted () {
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
