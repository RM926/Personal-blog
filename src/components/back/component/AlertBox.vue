<template>
  <div id="alert" v-if="alert.show">
    <div class="alert-box">
        <h1>警告</h1>
        <p>{{alert.message}}</p>
        <div class="handle-button">
          <span class="cancel" @click="cancel">取消</span>&nbsp;&nbsp;<span class="delete" @click="comfirm">确认</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertBox",
  props: {
    alert:{
     type:Object,
     default(){
       return {
         message:'确定这个操作吗？',
         show:false
       }
     }
    }
  },
  methods:{
    cancel(){
      this.alert.show = false
    },
    comfirm(){
      this.$emit('comfirmClick')
    }
  }
};
</script>

<style scoped>
h1{
  align-self: center;
  font-size:1.3rem;
}
#alert {
  position:absolute;
  top:0;
  left: 0;
  height:100vh;
  width:100%;
  z-index:1000;
  /* background:rgba(240, 235, 235, 0.1) */
   /* background:rgba(20, 20, 20, 0.2) */
}
.cancel,
.delete {
  cursor: pointer;
  margin:0 .3rem;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease,
    opacity 0.2s ease;
}
.cancel:hover {
  color: #09a86b;
}
.delete:hover {
  color: rgb(182, 7, 7);
}
.alert-box{
  position:absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  height:200px;
  width: 350px;
  padding:1rem;
  /* background:rgb(70, 69, 69); */
  /* background:rgb(192, 191, 191); */
  display:flex;
  flex-direction:column;
}
.handle-button{
  align-self: flex-end;
  margin-top:auto;
  margin-right: .8rem;
}
</style>