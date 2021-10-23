<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  // props: {
  //   message: {
  //     type: String,
  //     default() {
  //       return ''
  //     }
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default() {
  //       return false
  //     }
  //   }
  // },
  methods: {
    show(message, duration = 2000) {
      setTimeout(() => {
        this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
      }, 200);
      
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 3rem;
  transform: translate(-50%);
  padding: 1rem 1.2rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  /* background: rgba(0, 0, 0, .75); */
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
  z-index: 999;
}
</style>
