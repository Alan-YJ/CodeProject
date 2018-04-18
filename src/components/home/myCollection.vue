<template>
  <div class='article-wrapper' >
    <el-table v-if='myList.length' :data='[]' :row-class-name='tableRowClassName' >
      <el-table-column prop='title' label='主题' width='300'></el-table-column>
      <el-table-column prop='type' label='分类'  ></el-table-column>
      <el-table-column prop='comment_num' label='回复'></el-table-column>
      <el-table-column prop='browser_num' label='浏览'  ></el-table-column>
      <el-table-column prop='c_time' label='发布时间' ></el-table-column>
      <el-table-column label='操作' width='150'>
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <!-- span中可显示标题或文本 -->
      <span class="demonstration"></span>
      <el-pagination
        layout="prev, pager, next"
        :total="pageObj.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import {parseCode} from 'common/js/parseCodeToJson.js'
import {UnixTimeToTime} from 'common/js/UnixTimeToDateTime.js' 
export default {
  data(){
    return{
      page:1,
      myList:{},
      pageObj:{}
    }
  },
  computed:{
    myInfo(){
      return sessionStorage.getItem('user')
    }
  },
  created(){
    let myinfo = JSON.parse(this.myInfo)
    this.getList(myinfo,this.page)
  },
  methods:{
    getType(num){
      switch(num){
        case '1':
          return '入门学习';
        case '2':
          return '经验分享';
        case '3':
          return '成果分享';
        default:
          return '其他分享';
      }
    },
    getList(user,page){
      //收藏没有接口  
      Axios.post('http://yjhapi.agxx.club/iweb/topic/myTopicList',{
        user_id:user.user_id,
        token:user.token,
        page:page
      }).then((res)=>{
        let listobj = JSON.parse(parseCode(res.data))
        if(listobj.status==1){
          //读取并显示列表
          let obj = {"status":1,"info":"","data":{"curr_page":"1","all_page":1,"list":{"total":6,"per_page":10,"current_page":"1","last_page":1,"data":[{"id":18,"topic_id":"topic18","user_id":"user8","avatar":"http:\/\/yjh.li-shang-bin.com\/avatar\/default\/8.png","nickname":"\u6d4b\u8bd5","content":"<p>\u8bd5# \u9a8c #<em>\u4e0b<\/em><ins>\u6587<\/ins><s>\u7ae0<\/s>\u7684\u53d1\u5e03 x<sup>2<\/sup> x<sub>2<\/sub><\/p>\n<div class=\"hljs-right\">\n<p>\u6b64\u6bb5\u6587\u5b57\u5e94\u53f3\u5bf9\u9f50<\/p>\n<\/div>\n<div class=\"hljs-center\">\n<p>\u6b64\u6bb5\u6587\u5b57\u5e94\u5c45\u4e2d<\/p>\n<\/div>\n<div class=\"hljs-left\">\n<p>\u6b64\u6bb5\u6587\u5b57\u5de6\u5bf9\u9f50<\/p>\n<\/div>\n<table>\n<thead>\n<tr>\n<th>1<\/th>\n<th>2<\/th>\n<th>3<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td>4<\/td>\n<td>5<\/td>\n<td>6<\/td>\n<\/tr>\n<\/tbody>\n<\/table>\n","c_time":"1523981507","modify_time":"","favorite_num":0,"comment_num":0,"sort":0,"status":1,"is_hot":0,"title":"\u6587\u7ae0\u529f\u80fd\u6d4b\u8bd5","browser_num":1,"like_num":0,"tech_type":"1","collect_num":0,"md_content":"\u8bd5# \u9a8c #*\u4e0b*++\u6587++~~\u7ae0~~\u7684\u53d1\u5e03 x^2^ x~2~\n\n\n::: hljs-right\n\n\u6b64\u6bb5\u6587\u5b57\u5e94\u53f3\u5bf9\u9f50\n\n:::\n\n\n::: hljs-center\n\n\u6b64\u6bb5\u6587\u5b57\u5e94\u5c45\u4e2d\n\n:::\n\n::: hljs-left\n\n\u6b64\u6bb5\u6587\u5b57\u5de6\u5bf9\u9f50\n\n:::\n\n\n|1|2|3|\n|-|-|-|\n|4|5|6|\n\n\n","type":"3"},{"id":16,"topic_id":"topic16","user_id":"user8","avatar":"http:\/\/yjh.li-shang-bin.com\/avatar\/default\/8.png","nickname":"\u6d4b\u8bd5","content":"<p>ffffffffffff<\/p>\n","c_time":"1523951613","modify_time":"","favorite_num":0,"comment_num":0,"sort":0,"status":1,"is_hot":0,"title":"ffff","browser_num":0,"like_num":0,"tech_type":"1","collect_num":0,"md_content":"ffffffffffff","type":"2"},{"id":15,"topic_id":"topic15","user_id":"user8","avatar":"http:\/\/yjh.li-shang-bin.com\/avatar\/default\/8.png","nickname":"\u6d4b\u8bd5","content":"<p>\u5566\u5566\u5566\u5566\u5566<\/p>\n","c_time":"1523696419","modify_time":"","favorite_num":0,"comment_num":0,"sort":0,"status":1,"is_hot":0,"title":"11","browser_num":3,"like_num":0,"tech_type":"1","collect_num":0,"md_content":"\u5566\u5566\u5566\u5566\u5566","type":"3"},{"id":13,"topic_id":"topic13","user_id":"user8","avatar":"http:\/\/yjh.li-shang-bin.com\/avatar\/default\/8.png","nickname":"\u6d4b\u8bd5","content":"<pre class=\"hljs\"><code class=\"-\">\n&gt; ::: hljs-left\n\n~^~language~^~\n\n:::\n\n\n:::\n\n\n<\/code><\/pre>\n","c_time":"1523688792","modify_time":"","favorite_num":0,"comment_num":0,"sort":0,"status":1,"is_hot":0,"title":"dd","browser_num":5,"like_num":1,"tech_type":"1","collect_num":0,"md_content":"```- 1. ::: hljs-right\n\n> ::: hljs-left\n\n~^~language~^~\n\n:::\n\n\n:::\n\n\n```\n","type":"2"},{"id":11,"topic_id":"topic11","user_id":"user8","avatar":"http:\/\/yjh.li-shang-bin.com\/avatar\/default\/8.png","nickname":"\u6d4b\u8bd5","content":"<p>\u963f\u65af\u5927\u4e09\u5927\u56db\u7684<\/p>\n","c_time":"1523673381","modify_time":"","favorite_num":0,"comment_num":0,"sort":0,"status":1,"is_hot":0,"title":"\u6d4b\u8bd5","browser_num":14,"like_num":0,"tech_type":"1","collect_num":0,"md_content":"\u963f\u65af\u5927\u4e09\u5927\u56db\u7684","type":"3"},{"id":10,"topic_id":"topic10","user_id":"user8","avatar":"http:\/\/yjh.li-shang-bin.com\/avatar\/default\/8.png","nickname":"\u6d4b\u8bd5","content":"<h1>Markdown<\/h1>\n","c_time":"1523673199","modify_time":"","favorite_num":0,"comment_num":1,"sort":0,"status":1,"is_hot":0,"title":"\u5f88\u68d2\u68d2\u771f\u7684\u5f88\u68d2\u68d2","browser_num":35,"like_num":1,"tech_type":"1","collect_num":0,"md_content":" # Markdown\n\n\n \n  \n\n","type":"4"}]}}}
          this.pageObj = obj.data.list
          this.myList = obj.data.list.data
          for(let i in this.myList){
            this.myList[i].type = this.getType(this.myList[i].type)
            this.myList[i].c_time = new Date(parseInt(this.myList[i].c_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
          }
        }else{
          console.info('列表读取失败')
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleEdit(index, row) {
        //跳转并加载文章
        console.log(index, row);
      },
      handleDelete(index, row) {
        //删除文章
        console.log(index, row);
      }
  }
}
</script>
<style lang="stylus">
  .article-wrapper
    padding:30px
  .el-table .warning-row 
    background: oldlace
  .el-table .success-row 
    background: #f0f9eb
  .block
    margin-top:50px
    text-align:center
</style>
