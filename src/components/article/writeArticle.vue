<template>
  <div class='write-wrapper' v-loading='loading'>
    <div class='write'>
      <el-form ref='form'>
        <el-form-item  class='title-wrapper'>
          <el-form-item class='left'>
            <span>文章标题:</span>
            <el-input v-model='title' ></el-input>
          </el-form-item>
          <el-form-item class='right' >
            <el-form-item label=''>
              <span>所属分类:</span>
              <el-select v-model='type'>
                <el-option v-for='item in typeOptions' :key='item.value' :label='item.label' :value='item.value'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=''>
              <span>技术分类:</span>
              <el-select v-model='tech_type'>
                <el-option v-for='item in techOptions' :key='item.value' :label='item.label' :value='item.value'></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <!-- 编辑器 -->
          <quill-editor ref="myTextEditor"
              v-model="content" 
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)" @change="onEditorChange($event)"
              >
          </quill-editor>
        </el-form-item>
        <el-form-item class='btn-wrapper'>
          <el-button @click='issue' class='issueBtn' type='danger'>发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {
  components:{
  },
  data(){
    return {
      loading:true,
      topic:{},
      title:'',
      type:'',
      tech_type:'',
      content:'<h1>Text content</h1>',
      md_content:'',
      user:'',
      typeOptions:[
        {value:'1',label:'经验分享'},
        {value:'2',label:'入门学习'},
        {value:'3',label:'成果分享'}
      ],
      techOptions:[
        {value:'1',label:'html'},
        {value:'2',label:'php'},
        {value:'3',label:'java'}
      ],
      editorOption: {
        //编辑器配置 
        toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
      }
    }
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem('user'))
    //是由编辑跳转到本页面则加载数据
    //文章信息应该用对象存放   后面改
    if(this.$route.params.topic_id){
      this.topic = this.$route.params.row
      this.title = this.topic.title
      this.type = this.topic.type
      this.tech_type = this.topic.tech_type
      this.content = this.topic.content
      this.loading = false
    }else{
      this.loading = false
    }
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
      this.md_content = text
    },
    //发布
    issue(){
      if(this.title==''){
        this.$message.error('请输入文章标题');
        return
      }
      if(this.type==''){
        this.$message.error('请选择所属分类');
        return
      }
      if(this.tech_type==''){
        this.$message.error('请选择技术分类');
        return
      }
      if(this.content==''){
        this.$message.error('请输入文章内容');
        return
      }
      if(this.$route.params.topic_id){
        Axios.post('/api/iweb/topic/topicEdit',{
          content:this.content,
          md_content:this.md_content,
          user_id:this.user.user_id,
          avatar:this.user.avatar,
          nickname:this.user.nick_name,
          token:this.user.token,
          type:this.type,
          tech_type:this.tech_type,
          title:this.title,
          topic_id:this.$route.params.topic_id
        }).then((res)=>{
          if(res.data.status==1){
            this.$message.success('修改成功');
            this.$router.push({
              path:'/home/myArticle'
            })
          }
        })
      }else{
        //验证通过，提交文章
        Axios.post('/api/iweb/topic/topicAdd',{
          content:this.content,
          md_content:this.md_content,
          user_id:this.user.user_id,
          avatar:this.user.avatar,
          nickname:this.user.nick_name,
          token:this.user.token,
          type:this.type,
          tech_type:this.tech_type,
          title:this.title
        }).then((res)=>{
          if(res.data.status==1){
            this.$message.success('添加成功');
            this.$router.push({
              path:'/home/myArticle'
            })
          }
        })
      }
    }
  },
  
}
</script>
<style lang="stylus" scoped>
  .write-wrapper
    margin:50px auto
    width:100%
    min-width:960px
    max-width:1100px
    .title-wrapper
      width:100%
      .left,.right
        width:40%
        display inline-block
      .left>div>div
        display :flex
        justify-content :space-between
      .left .el-input
        width:75%
        display inline-block
      .right
        width:58%
        margin-left:10px
        &>div
          display :flex
          justify-content :flex-start
        .el-form-item
          display inline-block
          .el-form-item__content
            display inline-block
            width:20px
    .quill-editor
      height:550px
    .btn-wrapper
      position:relative
      .issueBtn
        width:120px
        position:absolute
        right:50px
</style>
