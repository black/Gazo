<template>
  <div>
    <span>
      {{title}}
    </span>
    <ul>
      <ImgView v-for="img in getImages" :key="img" v-bind:imgsrc="img" />
    </ul>
  </div>
</template>

<script>
const browser = require("webextension-polyfill")
import ImgView from '@/components/ImgView.vue'

export default {
  name: 'App',
  components: {
    ImgView
  },
  data () {
    return {
      title: 'IMAGE DOWNLOADER',
      imgsrc: [] 
    }
  },
  computed: {
    getImages(){ 
      return this.imgsrc;
    }
  },
  methods: {
    findImages(){   
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs
          .sendMessage(tabs[0].id, { msg: 'getimages' })
          .then((res) => {
            this.imgsrc = res.msg;
            console.log("response come here",res.msg);
          });
      });    
    }
  },
  mounted () {
     this.findImages()
  }
}

</script>

<style>
  html {
    width: 400px;
    height: 400px;
  }

</style>
