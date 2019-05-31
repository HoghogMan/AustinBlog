import Vue from 'vue'
import Vuex from 'vuex'
import {postLoginUser , getLogout} from '@/api/user.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //存储用户权限信息，初始时为空
    roles: '',
    user: {}
  },
  getters: {
    getRoles: state => state.roles,
    getUser: state => state.user
  },
  mutations: {
    // addRoles(state, {roles}) {   state.roles = roles;   console.log(state.roles);
    // },
    SET_USER: (state, user) => {
      state.user = user;
    },
    CLEAR_USER: (state, user) => { //清空用户信息
      state.user = {};
    }
  },
  actions: {
    // addRoles: ({   commit }, {roles}) => {   commit('addRoles', {roles}); },
    Login({ //登录
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        // console.log(data);
        postLoginUser({data: data}).then(res => {
          if (res.data) {
            commit('SET_USER', res.data.user)
            resolve();
          }
        }).catch(err => {
          console.log(err);
          reject();
        })
      })
    },
    Logout({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getLogout({
          custom: {
            messageShow: false
          }
        }).then(res => {
          commit('CLEAR_USER');
          resolve(res)
        }).catch((error) => {
          commit('CLEAR_USER');
          reject(error)
        })
      })
    },
    setUserInfo({
      commit
    }, data) {
      // return new Promise((resolve, reject) => {
        commit('SET_USER', data.user);
      // })
    }
  },
  modules: {}
})

export default store
