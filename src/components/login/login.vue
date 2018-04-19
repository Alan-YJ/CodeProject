<template>
  <div class='login-wrapper'>
    <div class='login'>
      <el-form ref='form' >
        <div class='title'>
          欢迎回到猿计划
        </div>
          <el-form-item>
            <el-input v-model='phone' class='phone' placeholder='请输入登录手机号'></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model='password' type='password' class='password' placeholder='6-16位密码、区分大小写、不能使用空格'></el-input>
          </el-form-item>
          <div class='aotoLogin'>
            <el-checkbox v-model='checked'>下次自动登录</el-checkbox>
            <div>
              <router-link to='/forgetPwd' class='forget'>忘记密码</router-link>
              <router-link to='/register' class='reg'>立即注册</router-link>
            </div>
          </div>
          <el-form-item  class='loginBtn'>
            <el-button type='danger' @click='login'>登录</el-button>
          </el-form-item>
        <div class='loginType'>
          <p>使用合作网站账号登录</p>
          <span class='icon-wx'></span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {setCookie,getCookie} from 'common/js/setCookies.js';
import {parseCode} from 'common/js/parseCodeToJson.js'
import {checkPhone,checkPwd} from 'common/js/regExp.js'
import {mapMutations} from 'vuex'
import Axios from 'axios'
export default {
  data(){
    return {
      phone:'13011072992',
      password:'123456',
      checked:false
    }
  },
  methods:{
    login(){
      if(checkPhone(this.phone)&&checkPwd(this.password,this.password)){
        Axios.post('/api/iweb/login/check',{
          mobile:this.phone,
          pwd:this.password
        }).then((res)=>{
          let data = res.data
          if(data.status==1){
            this.$message({
              showClose: true,
              message: '登陆成功',
              type: 'success'
            });
            //保存登陆信息 store
            this.setUser(data.data)
            //保存到session 
            sessionStorage.setItem('user',JSON.stringify(data.data))
            let date = new Date()
            //判断是否勾选保存登陆信息
            if(this.checked){
              //保存到cookie
              setCookie('user',JSON.stringify(data.data),7)
            }
            //跳转到个人中心
            this.$nextTick(()=>{
              this.$router.push({
                path:'/home'
              })
            })
          }else{
            this.$message({
              showClose: true,
              message: data.info,
              type: 'error'
              });
          }
        })
      }else{
        this.$message({
          showClose: true,
          message: '用户名或密码错误',
          type: 'error'
        });
        this.password =''
      }
    },
    ...mapMutations({
      setUser:'SET_USER'
    })
  }
}
</script>
<style lang="stylus">
@import '../../common/css/variable.styl';
  .login-wrapper
    margin:0 auto
    width:100%
    max-width:1100px
    min-width:960px
    .login
      margin:50px auto 
      padding:30px 60px
      box-shadow :0px 0px 5px 0px $color-desc
      background-color:white
      width:300px
      .title
        margin-bottom:22px
        border-bottom:1px solid $color-title
        text-align:center
        line-height:40px
      .aotoLogin
        display :flex
        justify-content :space-between
        line-height:40px
        font-size:14px
        position:relative
        top:-8px
        .reg
          color:$color-active
      .loginBtn
        text-align:center
        button
          width:70%
      .loginType
        font-size:12px
        p
          padding-bottom:10px
        .icon-wx
          font-size:36px
          cursor pointer
</style>
