<template>
  <section>
    <section class="main-home-header">
      <section class="main-home-header-left">
        <img src="../../../assets/avatar.png" alt="">
      </section>
      <section class="main-home-header-right">
        <section class="drop-dowm">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="welcome-text">Hello! {{isLoginStatus ? userName : ''}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!isLoginStatus">
                <span @click="logIn">登录</span>
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <span @click="logOut">登出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </section>
        <ul>
          <li v-for="(item,index) in navData.filter(item => item.isNormal == true)" :key="index" :class="{'active' : item.name == activeName}" @click="handleClick(item,index)">
            {{item.name}}
          </li>
        </ul>
      </section>
    </section>
    <el-dialog :visible.sync="dialogLoginVisible" @open="dialogOpen" :close-on-click-modal="false" width="30%">
      <login-box ref="loginBox" @dialog-login="loginSuccess"></login-box>
    </el-dialog>
  </section>
</template>

<script>
import loginBox from './loginBox'
import { getLogout } from '@/api/user.js';

export default {
  props: {},
  data() {
    return {
      activeName: '首页',//默认高亮Home
      dialogLoginVisible: false,//是否显示登录弹框,默认不显示
      navData: [
        {
          name: '首页',
          isNormal: true,
        }, {
          name: '文章',
          isNormal: true,
        },
        // {
        //   name: 'Share',
        // },
        // {
        //   name: 'Contact',
        //   isNormal: true,          
        // }
      ]
    }
  },
  created() {
    console.log(this.$route.name);
    if (this.$route.name == 'itemDetail' || this.$route.name == 'itemPark') {
      this.activeName = '文章'
    } else {
      this.activeName = '首页'
    }
  },
  mounted() { },
  methods: {
    handleClick(item) {
      this.activeName = item.name;
      if (item.name == '文章') {
        this.$router.push('/itemPark');
      } else {
        this.$router.push('/');
      }
    },
    loginSuccess() { //登录成功
      this.$set(this.navData, 1, {
        name: '文章',
        isNormal: true
      })
      this.dialogLoginVisible = false;
      this.$message({
        showClose: true,
        message: 'login success', // res.message,
        type: 'success'
      })
    },
    logIn() {
      this.dialogLoginVisible = true;
    },
    logOut() {//登出
      this.$store.dispatch('Logout').then((res) => {
        if (res && res.data == 1) {
          this.$message({
            showClose: true,
            message: 'logout success', // res.message,
            type: 'success'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    dialogOpen() {//打开弹窗
      this.$nextTick(() => {
        this.$refs.loginBox.resetLoginBox();
      })
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == '/') {
        this.activeName = '首页'
      }
    }
  },
  computed: {
    isLoginStatus() {
      return this.$store.getters.getUser.username;
    },
    userName() {
      return this.$store.getters.getUser.username ? this.$store.getters.getUser.username : '';
    }
  },
  components: {
    loginBox,
  },
}
</script>
<style lang="scss" scoped>
.active {
  color: #dcb07d !important;
}

.welcome-text {
  text-align: right;
  font-size: 14px;
  color: #161b3d;
  font-weight: 600;
}

.drop-dowm {
  position: fixed;
  top: 10px;
  right: 80px;
  cursor: pointer;
  /deep/.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>