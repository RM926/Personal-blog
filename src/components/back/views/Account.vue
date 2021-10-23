<template>
  <div class="account">
    <p class="title">账号修改</p>
    <div class="form-area">
      <input
        type="text"
        class="change"
        name="name"
        v-model="name"
        placeholder="name"
        @blur="inputBlur(input1)"
        @focus="inputFocus(input1)"
        ref="input1"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
        @blur="inputBlur(input2)"
        @focus="inputFocus(input2)"
        ref="input2"
      />
      <input
        type="password"
        name="repassword"
        v-model="repassword"
        placeholder="write password again"
        @blur="inputBlur(input3)"
        @focus="inputFocus(input3)"
        ref="input3"
        @keydown.enter="submit"
      />
      <input type="submit" value="确认" @click='comfirm'/>
    </div>
    <alert-box :alert="alertData" @comfirmClick='changeAccount' />
  </div>
</template>

<script>
import { patchUser } from '@/network/user.js'
import AlertBox from '../component/AlertBox.vue'
export default {
  name: "Account",
  data() {
    return {
      input1:null,
      input2:null,
      input3:null,
      name: "",
      password: "",
      repassword: "",
      alertData:{
        message:'是否修改账号信息？',
        show:false
      }
    };
  },
  mounted(){
     this.input1=this.$refs.input1,
     this.input2=this.$refs.input2,
     this.input3=this.$refs.input3
  },
  components:{
    AlertBox
  },
  methods:{
    inputFocus(value) {
      value.classList.add("change-input");
    },
    inputBlur(value) {
      value.classList.remove("change-input");
    },
    comfirm(){
      if(this.password.trim()==''||this.name.trim()==''||this.repassword==''){
        this.$toast.show('还有内容没输入')
        return
      }
      if(this.password.trim() !== this.repassword.trim()){
        this.$toast.show('两次输入的密码不一致，请重新输入')
        return
      }
     
      this.alertData.show = true
    },
    changeAccount(){
      const account = {
        id:this.$store.state.user.id,
        name:this.name,
        password:this.password
      }
      patchUser(account).then(res => {
        if(res.status == 200){
          this.alertData.show = false
          this.$router.go('/')
        }
      })
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-weight:600;
  font-size:1.1rem;
  margin-bottom:0.5rem;
}
.form-area{
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
}
input {
  width:18rem;
  margin-top: 1.5rem;
  text-align: center;
  padding: 0.4rem 0.2rem 0.1rem;
  outline-style: none;
  border: none;
  transition: 0.5s;
  background: transparent;
  border-bottom: 1px dashed #666666;
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
}
input:last-of-type{
  width:3rem;
  height: 2rem;
  border:1px dashed rgb(57, 209, 43);
  padding:0.4rem 0.5rem 0.4rem 0.5rem !important;
  /* color:red */
}
.change-input {
  border-bottom: 1px dashed rgb(57, 209, 43);
}
</style>