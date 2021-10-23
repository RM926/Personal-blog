<template>
  <div class="themebutton">
    <el-switch
      class="switch"
      v-model="situation"
      @change="changeModel"
      active-color="#081F2F"
      inactive-color="#13ce66"
    >
    </el-switch>
  </div>
</template>

<script>
export default {
  name: "ThemeButton",
  data() {
    return {
      situation: false,
      body: null,
    };
  },
  created() {
    this.body = document.querySelector("body");
    if (this.body.className == "white") {
      this.situation = false;
    } else {
      this.situation = true;
    }
  },
  methods: {
    //判断body的className
    // - 如果是white，this.situation = ture
    // - 如果是dark，this.situation = false
    //白天和黑夜模式切换
    changeModel() {
      // console.log(this.body);
      // this.$nextTick(() => {
      if (this.situation == false) {
        this.body.className = "white";
        //只有首页的<router-link>有起作用
        // this.body.getElementsByTagName('a').forEach(aLink => {
        //  aLink.style.color = '#292A2D'
        // });
      } else {
        // this.body.getElementsByTagName('a').forEach(aLink => {
        //   aLink.style.color = '#A9A9B3'
        // });
        this.body.className = "dark";
      }
      // });
    },
  },
};
</script>
<style scoped>
</style>