<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  created() {
  },
  watch: {
    '$route': function(to, from) {
      console.log('123')
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
}

</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* height: 100%;
  width: 100%; */
}
</style>
