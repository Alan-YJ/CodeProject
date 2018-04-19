<template>
  <div class='header-wrapper'>
      <div>
        <div class='logo-wrapper'>
            <img src="static/imgs/logo.png">
            <h1>猿计划</h1>
        </div>
        <div class='nav-wrapper'>
            <ul>
                <li class='nav' v-for='item in navList' :key='item.link'>
                    <router-link :to='item.link'>{{item.text}}</router-link>
                </li>
                <li class='nav' v-if='!isLogin'>
                    <router-link to='login'>登陆</router-link>
                </li>
                <li class='nav' v-if='!isLogin'>
                    <router-link to='register'>注册</router-link>
                </li>
                <li class='nav' v-if='isLogin'>
                    <el-dropdown>
                        <router-link to='/home/baseInfo'>
                        <img v-lazy='user.avatar' class='avatar'>
                        <span>{{user.nick_name}}</span>
                        </router-link>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for='item in Links' :key='item.url'>
                                <router-link :to='item.url'>
                                    {{item.text}}
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native='loginOut'>
                                退出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </div>
      </div>
  </div>
</template>
<script>
import Axios from 'axios'
import {getCookie,clearCookie} from 'common/js/setCookies.js'
import {mapGetters,mapMutations} from 'vuex';
export default {
  data(){
      return {
      }
  },
  methods:{
      //清除登陆信息
      loginOut(){
          sessionStorage.clear();
          if(getCookie('user')!=''){
              clearCookie('user')
          }
          this.CLEAR_USER()
          this.$router.push({
              path:'/login' 
          })
      },
      ...mapMutations({
          CLEAR_USER:'CLEAR_USER',
          SET_USER:'SET_USER'
      }),
  },
  computed:{
      ...mapGetters({
          Links:'myLinks',
          user:'user',
          navList:'navList'
      }),
      //是否已经登陆
      isLogin(){ 
          return this.user.token
      }
  },
  created(){
      //打开页面的时候判断是否已经登陆
      if(getCookie('user')&&getCookie('user')!=''){
        let u = JSON.parse(getCookie('user'));
        this.SET_USER(u)
        sessionStorage.setItem('user',u)
      }
      if(!this.user.token){
          if(sessionStorage.getItem('user')){
              this.SET_USER(JSON.parse(sessionStorage.getItem('user')))
          }
      }
  }
}
</script>
<style lang='stylus'>
@import '../../common/css/variable.styl';
    .header-wrapper
        border-top:1px solid $color-title
        border-bottom:1px solid rgba(0,0,0,0.2)
        width:100%
        height:65px
        background-color:#fafafa
        box-shadow :0px 2px 10px 0px rgba(0,0,0,0.1);
        &>div
            margin:0 auto
            width:100%
            max-width:1100px
            min-width:960px
            height:100%
            display :flex
            justify-content :space-between
        .logo-wrapper
            vertical-align:bottom
            display:flex
            img 
                padding-top:2px
                height:60px
            h1
                line-height:65px
                color:$color-title
                font-size:$font-size-title
                font-weight:700
        .nav-wrapper
            li
                display:inline-block
                height:62px;
                line-height:65px
                cursor pointer
                &.active a
                    color: $color-active
                &:hover a
                    transform: all 0.3s ;
                    border-bottom:3px solid $color-active
                a
                    padding:0px 15px
                    padding-bottom:15px
                    transition :border 0.3s ;
                    &.router-link-active
                        color: $color-active
                .avatar
                    width:36px
                    height:36px
                    vertical-align :middle
</style>
