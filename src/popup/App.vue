<template>
  <div>
    <nav class="nav"> 
      <div class="navbar">
        <div>
          <span class="brand">{{title}}</span> 
          <span class="info">IMAGES {{imgcount}}</span>
        </div>
        <div>
          <img class="filters" :src="viewType?require('../assets/grid-2.svg'):require('../assets/grid-4.svg')" alt="" v-on:click="changeView()">
          <img class="filters" src="../assets/filter.svg" alt="" v-on:click="filter()">
        </div>
      </div>
      <div class="filterSlider" v-show="filterView" >
        <input type="range" v-model="min_width" min=0 max=2000>
        <span> {{min_width}}</span>
        <!-- <RangeView /> -->
      </div>
    </nav>
    <div class="container">
      <ImgView v-bind:class="viewType?'cards-2':'cards-4'" v-for="(img,idx) in getImages" :key="idx" v-bind:imgsrc="img" v-bind:dimension="min_width" />
    </div>
  </div>
</template>

<script>
const browser = require("webextension-polyfill")
import ImgView from '@/components/ImgView.vue'
// import RangeView from '@/components/RangeView.vue'

export default {
  name: 'App',
  components: {
    ImgView 
  },
  data () {
    return {
      title: 'GAZO',
      subtitle:'An Image Scraper',
      imgsrc: [],
      imsizes:[],
      imgcount:'Fetching...',
      viewType:false,
      filterView:false,
      min_width:0 
    }
  },
  computed: {
    getImages(){ 
      return this.imgsrc;
    }, 
  },
  methods: {
    changeView(){
      this.viewType =!this.viewType;
      console.log(this.viewType);
    },
    // findImages(){   
    //   browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    //     browser.tabs
    //       .sendMessage(tabs[0].id, {  from: 'appvue',msg: 'getimages' })
    //       .then((res) => {
    //         this.imgsrc = res.msg; 
    //         this.imgcount = this.imgsrc.length
    //         console.log("getting imgs",res.from);
    //       });
    //   });    
    // },  
    filter(){
      this.filterView = !this.filterView;
    },
    getNewImages(){
      browser.runtime.onMessage.addListener( (res, sender, sendResponse)=>{   
          for(let i=0;i<res.data.length;i++){
            console.log("dataSrc",res.data[i]);
            if(!this.imgsrc.includes(res.data[i]))
              this.imgsrc.push(res.data[i]); 
          } 
          this.imgcount = this.imgsrc.length;
          console.log("array length",this.imgcount);
          sendResponse({
              from:'appvue',
              data: "Received the images"
          }); 
      });
    }
  },
  mounted () { 
    //  this.findImages()
     this.getNewImages()
  }
}

</script>

<style>
  html,body {
    width: 400px;
    height: 400px;
    padding: 0;
    margin: 0; 
    font-family: sans-serif;
  }
  *{
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
      display: none;
  }

  .nav{ 
    width: 100%;
    background: white;
    position: fixed;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.3);
    z-index: 1000;
  }

  .navbar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;  
    font: bold;
    padding: 10px;
  }
  .brand{
    display: block;
    font-size: 1.2rem; 
    letter-spacing: 0.3rem;
    font-weight: bold;
    color: #fecd1a;
  }
  .info{  
    font-size: 0.5rem;
    letter-spacing: 0.1rem;
    padding: 0;
    margin: 0;
  }

  .container{
    display: flex; 
    flex-wrap: wrap;
    padding: 16% 1% 0%;
  }

  .cards-2{
    flex: 1 0 50%; 
  }
  .cards-4{
    flex: 1 0 25%; 
  }
 
  .filters{
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.5s ease-in;
    max-width: 100%;
    margin: 0 10px;
  }
  .filters:hover{
    opacity: 1;
  }

  .filterSlider{
    display: grid;
    grid-template-columns: 1fr 50px;
    grid-gap: 10px;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    padding: 10px;
  }

  input[type=range]{
    -webkit-appearance: none;
    width: 100%;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #fecd1a;
    margin-top: -4px;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
      background: #ccc;
  }

</style>
