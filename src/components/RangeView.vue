<template>
  <div class="rangslider">
     <div class="thumb" ref="leftthumb" @mousedown="startDrag" @mousemove="left"></div>
     <div class="thumb" ref="rightthumb" @mousedown="startDrag" @mousemove="right"></div>
  </div>
</template>

<script>
 
export default { 
  data(){
    return{
        // left:0,
        // right:0
        dragging:false,
        leftpos:0,
        rightpos:0
    }
  }, 
  methods:{
    startDrag(){
        this.dragging= true; 
    },
    left(event) {
        if (this.dragging) { 
            this.$refs.leftthumb.style.left = event.clientX 
            console.log("left :", this.$refs.leftthumb.style.left  , event.clientX)
        }
    },
    right(event){ 
        if (this.dragging) { 
            this.$refs.rightthumb.style.left = event.clientX 
            console.log("right :",event.clientX)
        }
    }
  },
  mounted() { 
    browser.runtime.sendMessage({})
  }
}
</script>

<style scoped>

 .rangslider{
     width: 100%;
     background: red; 
     height: 10px;
     border-radius: 5px;
     position: relative;
 }

 .thumb{
     width: 10px;
     height: 10px;
     border-radius: 50%;
     background: black; 
     display: inline;
     position: absolute;
 }

 .thumb:nth-child(1){
     left: 20%;
 }

.thumb:nth-child(2){
     left: 40%;
 }
</style>