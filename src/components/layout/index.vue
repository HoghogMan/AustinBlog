<template>
  <section class="main-home">
    <section class="main-home-header">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2">Creation</el-menu-item>
      </el-menu>
    </section>
    <section class="main-home-body">    
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
    </section>
  </section>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      activeIndex: '1',
    }
  },
  created() { },
  mounted() { },
  methods: {
    handleSelect(val) {
      // console.log(val);
      switch (val) {
        case '1':
          this.$router.push('/');
          break;
        case '2':
          this.$router.push('/itemPark');
          break;
        default:
          this.$router.push('/');
          break;
      }
    }
  },
  watch: {},
  computed: {},
  components: {},
}
</script>
<style scoped>
.wrapper {}

.main-home {
  height: 100%;
  width: 100%;
  /*background: url('../../assets/background2.jpg') no-repeat;*/
  /*background-size: cover;*/
  /*opacity: 0.3;*/
}
</style>