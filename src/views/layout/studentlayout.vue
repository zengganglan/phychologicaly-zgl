<template>
    <div class="app-wrapper">
        <div class="head">
            <top/>
        </div>
        <div class="main-container">
            <Navbar/>
         <transition name="fade" mode="out-in">
            <router-view>1</router-view>
        </transition>
        </div>
    </div>
</template>

<script>
    import top from "./head"
    import Navbar from "./studentnavbar"
   
    export default {
        name:'layout',
        components:{
            top,
            Navbar
        }
    }
</script>

<style scoped>
.app-wrapper{
    padding-top: 40px;

}
  .head{
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      height: 40px;
      background-color: aquamarine;
      border-bottom: 2px solid #BDC0C3;
      z-index: 999;
  }
  .main-container{
/* 由两个子元素撑开 */
  display: flex;
  }
  .main-container>div:nth-child(2){
      flex: 1;
      background-color: #FCE7E7;
  }
</style>