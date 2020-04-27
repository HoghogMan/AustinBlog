<template>
  <section v-if="showMainHeader">
    <section class="main-home-header">
      <section class="main-home-header-left">
        <!-- <img src="../../../assets/avatar.png" alt=""> -->
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
          <li v-for="(item,index) in navData" :key="index" :class="{'active' : activeName.indexOf(item.name) !== -1 }" @click="handleClick(item,index)">
            {{item.label}}
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
      activeName:this.$route.path,//默认高亮Home
      dialogLoginVisible: false,//是否显示登录弹框,默认不显示
      navData: [
        { 
          label: '首页',
          name: 'home',
        },
        {
          label: '创作轴',
          name: 'createLine',
        }, {
          label: '文章',
          name: 'itemPark',
        },
        {
          label: '关于我',
          name: 'aboutMe',
        },
      ]
    }
  },
  methods: {
    handleClick(item) {
      this.activeName = item.name;
      this.$router.push({name: item.name});
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
    $route(val){
      if(val){
        this.activeName = val.path;
      }
    }
  },
  computed: {
    isLoginStatus() {
      return this.$store.getters.getUser.username;
    },
    userName() {
      return this.$store.getters.getUser.username ? this.$store.getters.getUser.username : '';
    },
    showMainHeader() {  // 是否显示头部banner  非首页显示
      return this.$route.path !== '/';
    }
  },
  components: {
    loginBox,
  },
}
</script>
<style lang="scss" scoped>
.active {
  background-color: #FFF;
  color: #000 !important;
}

.welcome-text {
  text-align: right;
  font-size: 14px;
  color: #FFF;
  font-weight: 600;
}

.drop-dowm {
  position: fixed;
  top: 10px;
  right: 80px;
  cursor: pointer;
  /deep/.el-dropdown-link {
    cursor: pointer;
    color: #FFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
    color: #FFF;
  }
}
</style>