<template>
  <div class="homepage">
    <!-- <my-header v-if="!homeContent" /> -->
    <!-- <scroll ref="scroll"> -->
       <div class="blank-div" ></div>
      <keep-alive> 
        <router-view class="view-container" :key='key'/>
      </keep-alive>
    <!-- </scroll> -->
      <div class="home-content" v-show="homeContent">
        <!-- <theme-button class="theme-button" /> -->
        <h1 class="name">影沉寒水</h1>
        <p class="charater">乐观、勇敢、愿意相信</p>
        <my-tabbar />
        <div class="sentence">
          <p>“冰块都还没有融化，他又开始说那些疯了的话”</p>
          <p class="provenance">---《Ophelia》</p>
        </div>
        <Footer class="footer-bottom0"></Footer>
        <theme-button class="theme-button" />
      </div>
      <Footer v-show="isFooterShow"></Footer>
    
  </div>
</template>

<script>
import ThemeButton from "../share/ThemeButton.vue";
import MyTabbar from "./component/MyTabbar.vue";
import Footer from './component/Footer.vue'


export default {
  name: "HomePage",
  data(){
    return {
      key:null
    }
  },
  watch:{
    $route(){
      this.key = this.$route.path
    }
  },
  computed: {
    homeContent() {
      return this.$route.path == "/Home"
    },
    isFooterShow(){
       return this.$route.path !== "/Home" && this.$route.path !=="/Board" && this.$route.path!=="/Login"
    }
    },
  components: {
    ThemeButton,
    MyTabbar,
    Footer
  },
};
</script>
<style scoped>
.blank-div{
  width:100%;
  height: 3.5rem;
}
p {
  padding: 0;
  margin: 0;
  /* text-indent:0; */
}
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 600px;
  margin: 0 auto;

  /* background: blanchedalmond; */
}
.homepage .home-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 48vh;
}
.home-content .theme-button {
  margin-top:.5rem;
  margin-bottom: 3rem;
}
.homepage h1 {
  font-family:FangSong,_GB2312 FangSong_GB2312,STSong，STFangsong;
  font-size: 1.7rem;
  font-weight: 400;
  margin: 0;
}
.homepage .charater {
  font-size: 0.9rem;
  color: #969393;
}
.homepage .sentence {
  font-size:0.9rem;
  margin-top: 1rem;
  color: rgb(104, 103, 102);
}
.homepage .sentence p:nth-child(2) {
  text-align: right;
  /* margin-top: 0.7rem; */
  /* transform: translate(1rem, 0); */
}
.wrapper{
  /* overflow: hidden; */
  height: 100vh;
  width: 600px;
  background-color:cornsilk;
}
.homepage .view-container {
  align-self: flex-start;
  /* margin-top: 3.5rem; */
}
@media screen and (max-width: 600px) {
  .homepage,
  .homepage .view-container {
    width: 100%;
  }
  .homepage .home-content,
  .homepage .view-container {
    padding: 0 1.3rem;
  }
  .wrapper{
    width:100%;
  }
}
.footer-bottom0{
  margin-bottom:0 !important;
}
@media screen and (max-width: 400px) {
  .homepage .view-container {
  }
}
</style>
