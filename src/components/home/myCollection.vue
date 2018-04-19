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
          <span @click='undoColl(scope.$index, scope.row)' class='undo-coll'>取消收藏</span>
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
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <div class='tip'>确认删除？</div>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='centerDialogVisible=false'>取消</el-button>
        <el-button type='primary' @click='commitDel'>确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Axios from 'axios'
import {UnixTimeToTime} from 'common/js/UnixTimeToDateTime.js' 
export default {
  data(){
    return{
      page:1,
      myList:{},
      pageObj:{},
      delColl:{},
      centerDialogVisible:false
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
    commitDel(){
      Axios.post('/api/iweb/collect/topic_collect',{
        user_id:this.myInfo.user_id,
        topic_id:this.delColl.topic_id,
        token:this.myInfo.token
      }).then((res)=>{
        if(res.data.status==1){
            this.$message.success('删除成功')
            //关闭提示框
            this.centerDialogVisible = false
            //刷新页面
            this.getList(this.myInfo,this.page)
          }
      })
    },
    undoColl(index,row){
      this.centerDialogVisible = true
      this.delColl = row
      console.info(this.delColl)
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
      //加载收藏列表  
      Axios.post('/api/iweb/collect/myCollect',{
        user_id:user.user_id,
        token:user.token,
        page:page
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
  .undo-coll
    cursor pointer
    &:hover
      color:red
</style>
