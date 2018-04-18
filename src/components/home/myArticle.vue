<template>
  <div class='article-wrapper' >
    <el-table v-if='myList.length' :data='myList' :row-class-name='tableRowClassName' >
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
      <el-pagination layout="prev, pager, next" @current-change='currentPage' :total="pageObj.total">
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
      pageObj:{},
    }
  },
  computed:{
    myInfo(){
      return JSON.parse(sessionStorage.getItem('user'))
    }
  },
  created(){
    this.getList(this.myInfo,this.page)
  },
  methods:{
    //当前页改变的时候加载数据
    currentPage(currentPage){
      this.getList(this.myInfo,currentPage)
    },
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
      Axios.post('/api/iweb/topic/myTopicList?page='+page,{
        user_id:user.user_id,
        token:user.token
      }).then((res)=>{
        if(res.data.status==1){
          //读取并显示列表
          this.pageObj = res.data.data.list
          this.myList = res.data.data.list.data
          for(let i in this.myList){
            this.myList[i].type = this.getType(this.myList[i].type)
            this.myList[i].c_time = new Date(parseInt(this.myList[i].c_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
          }
        }else{
          console.info('文章列表读取失败')
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
        this.$router.push({
          name:'editarticle',
          params:{
            topic_id:row.topic_id,
            row:row
          }
        })
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
