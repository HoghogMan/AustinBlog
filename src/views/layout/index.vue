<template>
  <section class="main-home">
    <main-header></main-header>
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
    <!--<main-footer></main-footer>-->
    <scroll-top></scroll-top>
  </section>
</template>


<script>
import ScrollTop from 'ScrollTop'
import mainHeader from './components/mainHeader.vue'
import mainFooter from './components/mainFooter.vue'

import { getSession } from '@/api/user.js';


export default {
  props: {},
  data() {
    return {

    }
  },
  created() {//判断是否登录
    getSession({}).then(res => {
      if(res.data.status == '1001'){
        // alert('请先登录');
      }else{
        this.$store.dispatch('setUserInfo', res.data);
      }
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {

  },
  watch: {

  },
  computed: {},
  components: {
    ScrollTop,
    mainHeader,
    mainFooter,
  },
}
</script>
<style lang="scss" scoped>

</style>