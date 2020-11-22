<template>
  <div class="container" v-show="checkDim">
    <img v-bind:src='imgsrc' alt="" v-on:load="onImgLoad" ref="imgeView"><br> 
    <a v-bind:href='imgsrc' download>DOWNLOAD</a>
  </div>
</template>

<script>
const browser = require("webextension-polyfill")
export default {
  props: ['imgsrc','dimension'], 
  data(){
    return{
      img_size:0,
    }
  },
  computed: {
    defaultText() {
      return browser.i18n.getMessage('extName')
    },
    checkDim(){ 
      return this.img_size>this.dimension?true:false;
    }
  }, 
  methods:{ 
    onImgLoad() { 
       console.log("hellow",this.$refs.imgeView.width);
       this.img_size = this.$refs.imgeView.width;
    }
  },
  mounted() { 
    browser.runtime.sendMessage({})
  }
}
</script>

<style scoped>
.container{  
  position: relative; 
  padding: 0;
  background: rgba(25, 0, 255, 0.124);
}
.container img{ 
  width: 100%;
  max-width: 100%;  
}

.container a{
  position: absolute;
  bottom: 0;
  left: 0;
  display: none;
  width: 100%;
  text-decoration: none;
  color: grey;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  padding: 5% 0;
  background:blue;
  color: white;
}

 
.container:hover  > a{
  display: block; 
}

.hide{
  display: none;
}
  /* img {
    width: 50%;
    height: 200px;
  } */
</style>