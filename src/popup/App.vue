<template>
  <div>
    <span>
      {{title}}
    </span>
    <ul>
      <ImgView v-for="(img,idx) in getImages" :key="imsizes[idx]" v-bind:imgsrc="img"  v-bind:imgsize="imsizes[idx]" v-on:load="getImgSize(img)"/>
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
      imgsrc: [],
      imsizes:[] 
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
          });
      });    
    }, 
    getImgSize(url) { 
      let img = new Image();
      img.src = url;
      img.onload = function() { 
        console.log({
          "w":this.width,
          "h":this.height
        });
        this.imsizes.push({
          "w":this.width,
          "h":this.height
        })
      }
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
