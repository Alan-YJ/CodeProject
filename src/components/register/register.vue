<template>
  <div class='register-wrapper'>
    <div class='register'>
      <el-form ref='form'>
        <el-form-item class='title'>
          欢迎回到猿计划
        </el-form-item>
        <el-form-item>
          <el-tooltip content="只能输入数字" placement="right">
          <el-input v-model='phone' @keydown.native="enterPhoneNum($event)" autofocus  maxlength=11 auto-complete='on' placeholder='请输入手机号'></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-input type='password' @blur='checkpwd($event)' class='password' maxlength=18 v-model='password' placeholder='请输入6位以上的密码'></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type='password' @blur='checkrepwd($event)' ref='repwd' maxlength=18 class='repassword' v-model='rePassword' placeholder='请确认密码'></el-input>
        </el-form-item>
        <el-form-item class='ident'>
          <el-input v-model='ident' :disabled='phone.length!=11'  maxlength=6 :placeholder='phone.length==11?"请输入短信验证码":"请输入正确的手机号"'></el-input>
          <el-button type='success' :disabled='phone.length!=11' @click='getIdent($event)'>获取验证码</el-button>
        </el-form-item>
        <el-form-item class='regBtn'>
          <el-button type='danger' @click='register' :disabled='checkForm?false:true'>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {addClass,removeClass} from 'common/js/operateClassName.js'
import {parseCode} from 'common/js/parseCodeToJson.js'
import {enterPhoneNum,checkPhone,checkPwd,checkIdent} from 'common/js/regExp.js'
import Axios from 'axios'
export default {
  //data: phone -> 账号 password -> 密码 rePassword -> 重复密码 ident -> 验证码
  data(){
    return {
      phone:'15805900348',
      password:'123456',
      rePassword:'123456',
      ident:'123456',
      regBtn:false,
      identInfo:''
    }
  },
  watch:{
    phone(){
        this.phone=this.phone.replace(/[\D]/g,'');
    }
  },
  filters:{
      // checkPhone(value){
      //   return value.replace(/[\D]/g,'');
      // }
  },
  computed:{
      // phone(){
      //   return this.phone.replace(/[\D]/g,'');
      // }
      //检查所有信息是否填写完整
      checkForm(){
        //调用正则判断
        return checkPhone(this.phone)&&checkPwd(this.password,this.rePassword)&&this.regBtn&&checkIdent(this.ident);
      }
  },
  methods:{
    //输入手机号时检查按键以及控制样式
    enterPhoneNum(event){
      //tab  backspace left right 直接通过
      if(event.keyCode==8||event.keyCode==9||event.keyCode==37||event.keyCode==39){
        return
      }
      event.returnValue = enterPhoneNum(event.key)
    },
    //检查密码以及控制样式
    checkpwd(event){
      if(this.password.length<6){
        event.target.style.border ='1px solid red'
      }else{
        event.target.style.border ='1px solid #dcdfe6'
        if(this.rePassword.length>0&&this.rePassword!=this.password){
          this.$refs.repwd.$el.children[0].style.border ='1px solid red'
        }else{
          this.$refs.repwd.$el.children[0].style.border ='1px solid #dcdfe6'
        }
      }
    },
    //检查重复密码以及控制样式
    checkrepwd(event){
      if(this.rePassword.length<6||this.password!=this.rePassword){
        event.target.style.border ='1px solid red'
      }else{
        event.target.style.border ='1px solid #dcdfe6'
      }
    },
    //获取验证码
    //应该独立一个单独组件的
    getIdent(event){
      let t = 60
      let node = event.target;
      if(event.target.nodeName=='SPAN'){
        node = event.path[1]
      }
      node.disabled = true
      addClass(node,'is-disabled')
      node.innerHTML = `${t--}秒后重新获取`
      let timer = setInterval(()=>{
              node.innerHTML = `${t--}秒后重新获取`
              if(t==0){
                node.innerHTML ='获取验证码'
                node.disabled = false
                removeClass(node,'is-disabled')
                clearInterval(timer)
              }
      },1000)
      if(checkPhone(this.phone)){
        Axios.post('http://yjhapi.agxx.club/iweb/Sendsms/send',{
          'mobile':this.phone
        }).then((res)=>{
          res = JSON.parse(parseCode(res.data))
          if(res.status==1){
            this.identInfo = 123456;
            this.regBtn = true;
          }
        })
      }
    },
    //开始注册
    register(){
      //接口有问题，只能返回已注册，不能注册成功
      if(this.checkForm){
        Axios.post('http://yjhapi.agxx.club/iweb/regist/index',{
          mobile:this.phone,
          pwd:this.password,
          sms_code:this.ident
        }).then((res)=>{
          let data = JSON.parse(parseCode(res.data))
          if(data.status==1){
            //注册成功
            this.$message({
              showClose: true,
              message: data.info,
              type: 'success'
            });
            //跳转到登陆
          }else{
            //注册失败
            this.$message.error({
              showClose: true,
              message: data.info,
              type: 'error'
            });
            //清空密码验证码
            this.password='';
            this.rePassword='';
            this.ident='';
          }
        })
      }
    }
  },
  created(){
    
  },
  mounted(){
  }
}
</script>
<style lang="stylus">
@import '../../common/css/variable.styl';
  .register-wrapper
    margin:50px auto
    width:100%
    max-width:1100px
    min-width:960px
    .register
      margin:0 auto
      box-shadow :0px 0px 5px 0px $color-desc
      padding:30px 60px
      width:300px
      .title>div
        text-align :center
        font-size:16px
        border-bottom:1px solid $color-title
      .ident>div
        display:flex
        &>button
          margin-left:10px
      .regBtn>div
        text-align :center
        &>button
          width:70%
        
</style>
