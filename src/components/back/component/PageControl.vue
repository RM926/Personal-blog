<template>
  <div class="page-control">
    <div>第&nbsp;<span>{{pageData.page}}</span>&nbsp;页</div>
    <div class="page-button">
      <div>
        <div v-if='pageData.page == 1' class="disable">上一页</div>
        <div v-else class="last-page" @click="lastEvent">上一页</div>
      </div>
      <div>
        <div v-if='pageData.page == pageData.pageCount' class="disable">下一页</div>
        <div v-else class="next-page" @click="nextEvent">下一页</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageControl",
  props:{
    pageData:{
      type:Object,
      default(){
        return {
          page:1,
          pageCount:0,
          nextDisable:false
        }
      }
    }
  },
  methods:{
    lastEvent(){
      this.$emit("lastClick")
    },
    nextEvent(){
      this.$emit('nextClick')
    }
  }
};
</script>

<style scoped>
.page-control {
  display: flex;
  justify-content: space-between;
  padding: 1.4rem 2rem;
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
}
.page-button{
  display:flex;
}
.last-page,.next-page{
  position:relative;
}
.last-page:hover,.next-page:hover{
  color: #0daa6e;
}
.last-page::after,.next-page::after{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;

  transform: skew(-35deg);
  height: 0.4rem;
  width: 100%;
  background: #7decc2;
  opacity: 0.3;
}
.page-button div {
  margin:0 .3rem;
  padding: 0 0.2rem;
  cursor: pointer;
}
.page-button .disable{
  position:relative;
  cursor:text;
}
.disable::after, .disable::after{
  content:'';
  position:absolute;
  left: 0;
  top:50%;
  height: .1rem;
  transform-origin: 50%;
  transform:rotateX(10deg) rotateY(10deg);
  opacity: 0.3;
  background:red;
  width: 100%;

}
</style>