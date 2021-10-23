<template>
  <div class="admin">
    <div class="blank-block"></div>
    <div class="avatar" @click="toHome">
      <img src="@/assets/img/logo.jpg" alt="iamge" />
    </div>
    <div class="main">
      <tab-bar class="tabbar"/>
      <keep-alive exclude="Draft"><router-view class="view" /></keep-alive>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/back/component/TabBar.vue";

export default {
  name: "Admin",
  components: {
    TabBar,
  },
  methods: {
    toHome() {
      this.$router.push("/Home");
    },
  },
};
</script>

<style scoped>
.blank-block{
  height:3rem;
}
.admin {
  width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  /* background-color: rgb(212, 201, 201); */
  /* height:100vh; */
}
.main{
  display: flex;
  /* margin-top:1rem; */
}
.tabbar{
  margin-top:4.5rem;
}
.avatar {
  width: 3rem;
  height: 3rem;
  
}
img {
  width: 100%;
  height: 100%;
  border:none;
  border-radius: 50%;
}
.view {
  flex:1;
  margin-left: 2.5rem;
}
</style>