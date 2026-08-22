<template lang="">

  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home,Search显示的,在登录,注册隐藏 -->
   <Footer v-show="$route.meta.show"></Footer>
    
  </div>
</template>


<script>
import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
  name:'',
  components:{
    Header,
    Footer
  }

}
</script>



<style lang="">
  
</style>