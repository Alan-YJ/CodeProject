<template>
  <div class='wrapper'>
      <div class='title'>
        修改密码
      </div>
      <div class='avatar'>
      </div>
      <div class='phone'>
        <span class='title'>
          手机号:
        </span>
        <span class='content'>
          {{myInfo.mobile}}
        </span>
      </div>
      <div class='newpwd'>
        <span class='title'>
          新密码:
        </span>
        <span class='content'>
          <el-input v-model='newPwd' type='password'></el-input>
        </span>
      </div>
      <div class='renewpwd'>
        <span class='title'>
          确认密码:
        </span>
        <span class='content'>
          <el-input v-model='newRePwd' type='password'></el-input>
        </span>
      </div>
      <div class='ident'>
        <span class='title'>
          验证码:
        </span>
        <span class='content'>
          <el-input v-model='ident'></el-input>
          <el-button type='success' @click='getIdent($event)'>获取验证码</el-button>
        </span>
      </div>
      <div>
        <el-button type='danger' :disabled='isChecked' @click='changeInfo' class='btn'>提交</el-button>
      </div>
  </div>
</template>
<script>
import Axios from 'axios'

import {addClass,removeClass} from 'common/js/operateClassName.js'
import {parseCode} from 'common/js/parseCodeToJson.js'
import {checkPwd,checkIdent} from 'common/js/regExp.js'

export default {
  data(){
    return{
      newPwd:'',
      newRePwd:'',
      ident:''
    }
  },
  computed:{
    myInfo(){
      return JSON.parse(sessionStorage.getItem('user'))
    },
    isChecked(){
      if(checkPwd(this.newPwd,this.newRePwd)&&this.ident!=''){
        return false
      }
      return true
    }
  },
  created(){
  },
  methods:{
    changeInfo(){
      let newInfo = {
        pwd:this.newPwd,
        pwd2:this.newRePwd,
        sms_code:this.ident,
        mobile:this.myInfo.mobile
      }
      Axios.post('http://yjhapi.agxx.club/iweb/Forgetpwd/reset',newInfo).then((res)=>{
         let data = JSON.parse(parseCode(res.data))
         if(data.status==1){
           this.$message.success('修改成功')
           //保存token  session  
         }else{
           this.$message.error('修改失败,'+data.info)
         }
         this.newPwd = ''
         this.newRePwd = ''
         this.ident = ''
      })
    },
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
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/css/variable.styl';
  .wrapper
    padding:30px
    &>.title
      border-bottom:1px solid $color-desc
      line-height:22px
    &>div
      padding:11px
      line-height:40px
      display :flex
      border-bottom:1px solid #eee
      &:last-child
        border:none
      .title,.content
        display inline-block
      .title
        margin-right:30px
        width:120px
        text-align:right
      .btn
        margin:10px 0px 0px 150px
        width:120px
      .content
        flex:1
        &>.el-input
          width:200px
          display inline-block
</style>
