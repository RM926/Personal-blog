<template>
  <div class="footer">
    <p>Copyright © 2021 <router-link to='/Login'>影沉寒水</router-link></p>
    <!-- <p>Copyright © 2021 <span @click="toLogin">影沉寒水</span></p> -->

  </div>
</template>

<script>
export default {
  name:"Footer",
  methods:{

  }
}
</script>

<style scoped>
.footer{
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin:6.5rem 0 2rem 0
}
.footer p{
  text-align:center;
  margin:0
}
</style>