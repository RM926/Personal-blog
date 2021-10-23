<template>
  <div class="myheader">
    <div class="header-body">
      <div class="avatar" @click="navClick">
        <img src="../../../assets/img/logo.jpg" alt="avatar" />
      </div>
    <router-link to="/Home" class="myName">影沉寒水</router-link>
    </div>
    <div class="nav" ref="nav">
      <h3>文章分类</h3>
      <ul>
        <li v-for="item in tags" :key="item" @click="tagClick(item)">
          <span>{{ item }}</span>
        </li>
        <li><router-link to="/MoreTags" class="moreTag">更多分类 ☶</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import MyTabbar from "./MyTabbar.vue";
import { getTags } from "@/network/tags.js";
export default {
  name: "MyHeader",
  data() {
    return {
      tags: [],
    };
  },
  beforeCreate() {},
  created() {
    //将Tags存入到store中
    if (!this.$store.state.tags.length) {
      getTags().then((tags) => {
        this.$store.commit("changeTags", tags);
        this.tags = this.$store.state.tags.slice(0,6);
      });
    }else{
      this.tags = this.$store.state.tags.slice(0,6)
    }
  },
  props: {},
  deactivated(){
     const navElement = this.$refs.nav;
   if (navElement.classList.contains("navChange")) {
        navElement.classList.remove("navChange");
      }
  },
  methods: {
    navClick() {
      const navElement = this.$refs.nav;
      // console.log(navElement)
      if (navElement.classList.contains("navChange")) {
        navElement.classList.remove("navChange");
      } else {
        navElement.classList.add("navChange");
      }
      // console.log("hhh");
    },
    tagClick(tag){
      this.$router.push('/tagArticle/' + tag)
    }
  },
  components: {},
};
</script>

<style scoped>
.myheader {
  /* margin-top:3.5rem; */
  position: relative;
  width: 100%；;
}
.header-body {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.header-body .avatar {
  height: 3rem;
  width: 3rem;
}
.header-body .avatar img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border:none;
}
.header-body .myName {
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: Microsoft YaHei, Microsoft JhengHei;
  cursor: pointer;
}

.nav {
  height: 0;
  width: 30%;
  position: absolute;
  overflow: hidden;
  transition: 0.3s;
  padding: 0 1rem;
  margin-top:.5rem;
  background: rgba(194, 194, 190, 0.8);
}
.navChange {
  height: 560%;
}
.nav h3 {
  margin:0;
  padding: 0.8rem 0 0.7rem 0;
  border-bottom: 1px dashed #241919;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgb(8, 8, 8);
  /* color:rgb(97, 97, 94) */
}
.nav ul {
  margin-top: 0.4rem;
  padding:0;
}
.nav ul li {
  margin:.8rem 0;
  padding:0;
  font-weight: 600;
  font-size: 0.9rem;
  color: rgb(18, 20, 20);
}
.nav ul li span{
  padding:0.4rem 0.6rem 0.4rem .2rem;
  transition:.3s;
  border-left: 0rem solid rgb(8, 134, 92);
}
.nav ul li span:hover {
  border-left: .3rem solid rgb(8, 134, 92);
  cursor: pointer;
  color: rgb(10, 104, 73);
}
.moreTag{
  color:rgb(7, 68, 48)
}
@media screen and (max-width: 700px) {
  .nav {
    width: 40%;
  }
}
@media screen and (max-width: 400px) {
  .nav {
    width: 50%;
  }
}
</style>