<template>
  <div class="tabbar">
    <router-link class="link" to="/Articles">文章</router-link>
    <router-link class="link" to="/Create">新建</router-link>
    <router-link class="link" to="/Search">搜索</router-link>
    <router-link class="link" to="/Draft">草稿</router-link>
    <router-link class="link" to="/FriendLink">友链</router-link>
    <router-link class="link" to="/Account">账户</router-link>
    <span class="link" @click="quit">退出</span>
    <alert-box
      :alert="alertData"
      @cancelClick="cancel"
      @comfirmClick="comfirm"
    ></alert-box>
  </div>
</template>

<script>
import AlertBox from "@/components/back/component/AlertBox";
export default {
  name: "TabBar",
  data() {
    return {
      alertData: {
        message: "退出当前账号？",
        show: false,
      },
    };
  },
  components: {
    AlertBox,
  },
  methods: {
    cancel() {
      this.alertData.show = false;
    },
    comfirm() {
      //删除localStorage
      this.$store.commit("removeUser");
      this.alertData.show = false;
      this.$router.replace("/");
    },
    quit() {
      this.alertData.show = true;
    },
  },
};
</script>

<style scoped>
.tabbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;
  height: 100%;
  border: 1px solid #969693;
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
}
.link {
  /* width: 100%; */
  display: inline-block;
  margin: 0.4rem 0;
}
.router-link-active {
  color: #cc0033;
  border-bottom: 0.2rem solid #ffcc66;
}
</style>