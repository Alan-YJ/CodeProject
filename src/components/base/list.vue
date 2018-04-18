<template>
    <div class='wrapper'>
        <div class='tags'>
            <el-tag v-if='targetsTech.length>0' @click.native='loadList($event,index)' v-for='(item,index) in targetsTech' :key='item.text' :type='index==tech_type?"":"info"' class='tag'>{{item.text}}</el-tag>
            <el-tag v-if='targets.length>0' @click.native='loadTypeList($event,index)' v-for='(item,index) in targets' :key='item.text' :type='index==type?"":"info"' class='tagType'>{{item.text}}</el-tag>
        </div>
        <div v-if='sort' class='sort-wrapper'>
            <div class='new' @click='toggltSortType($event)' :class='tsort=="new"?"active":""'>最新</div>
            <div class='hot' @click='toggltSortType($event)' :class='tsort=="hot"?"active":""'>最热</div>
        </div>
        <div v-if='result.length>0'>
            <ul class='list-wrapper' >
                <li v-for='item in result' :key='item.topic_id'>
                    <div class='user-wrapper'>
                        <span class='user'>
                            {{item.nickname}}
                        </span>
                        <span class='time'>
                            {{UTtoDT(item.c_time)}}
                        </span>
                    </div>
                    <div class='title-wrapper' @click='jumpto(item)'>
                        <div>{{item.title}}</div>
                        <div class='comment-wrapper' v-if='comment'>
                            <div>
                                <span class='icon-twitch'></span>
                                <span class='comment' >{{item.comment_num}}</span>
                            </div>
                            <div>
                                <span class='icon-thumb_up'></span>
                                <span class='like'>{{item.like_num}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class='pagination' >
                <el-pagination @current-change='changePage(currentPage)' background layout="prev, pager, next" :total='page.total'></el-pagination>
            </div>
        </div>
        <div v-else class='no-data'>
            暂无数据
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import {UnixTimeToDateTime} from 'common/js/UnixTimeToDateTime.js'
import {parseCode} from 'common/js/parseCodeToJson.js';
export default {
//Data  hot -> 是否加载热门文章 type -> 默认分类 tech_type -> 默认体系  result  ->  列表显示的数据
    data(){
        return {
            hot:false,
            type:0,
            tech_type:0,
            result:[],
            page:{},
            tsort:"new"
        }
    },
//propsData :targetsTech -> 体系列表  targets -> 分类列表 list -> 默认加载的文章列表  comment -> 是否显示评论数量  pageInfo -> 分页信息  tsort -> 排序信息  user_id -> 用户信息
  props:{
      targetsTech:{
          type:Array,
          default:function(){
              return []
          }
      },
      targets:{
          type:Array,
          default:function(){
              return []
          }
      },
      list:{
          type:Object,
          default:function(){
              return {}
          }
      },
      comment:{
          type:Boolean,
          default:true
      },
      sort:{
          type:Boolean,
          default:false
      },
      user_id:{
          type:String,
          default:''
      }
  },
  watch:{
  },
  created(){
      if(this.list.data){
        this.result = this.list.data.data
        this.page = this.list.data
      }
  },
  methods:{
      //解决返回数据编码报错问题
      UTtoDT(time){
          return UnixTimeToDateTime(time);
      },
      //加载数据 event代表点击的对象  通过它的文本和index来判断需要请求的列表   type_tech用
      loadList(event,index){
        //避免点击当前列表标题也重新请求数据，如果需要点击重新刷新列表注释即可
        if(event.target.className.lastIndexOf('el-tag--info')>=0){
            //如果点击有效则把数据更新
            this.tech_type = index
            //如果是首页热门  则把hot改为true
            if(index==0&&this.targetsTech[0].text=='热门文章'){
                this.hot = true
            }else{
                this.hot = false
            }
            this.reLoadList()
        }
      },
      loadTypeList(event,index){
        //避免点击当前列表标题也重新请求数据，如果需要点击重新刷新列表注释即可
        if(event.target.className.lastIndexOf('el-tag--info')>=0){
            //如果点击有效则把数据更新
            this.type = index
            this.reLoadList()
        }
      },
      //设置传递的参数
      getParams(){
          let data={};
          //如果是首页热门文章 则只需要一个参数
          if(this.hot){
              data.par = 'index_hot'
          }else{
              if(this.sort){
                data.tsort = this.tsort
              }
              //tech_type和type只需要一种  用于请求不同种类数据
              if(this.tech_type!=0){
                data.tech_type = this.tech_type
              }else{
                data.type = this.type
              }
              if(this.user_id!=''){
                data.user_id = this.user_id
              }
              if(this.page.total&&this.page.total>10){
                  data.page = this.page.current_page
              }
              //~翻页
          }
          return data;
      },
      //请求列表数据
      reLoadList(){
            //加载数据
            Axios.get('http://yjhapi.agxx.club/iweb/topic/topicList',{
                params:this.getParams()
            }).then((res)=>{
                let articleList = JSON.parse(parseCode(res.data));
                //通过父元素传参
                //this.$emit('reloadList',articleList)
                //自我改变
                this.result = articleList.data.data
                this.page = articleList.data
            })
      },
      toggltSortType(event){
          this.tsort = event.target.classList[0];
          this.reLoadList()
      },
      jumpto(event){
          //跳转页面
          this.getArticle(event)
      },
      getArticle(article){
          //跳转到文章
        //   Axios.post('/api/iweb/topic/queryDetail',{
        //           topic_id:article.topic_id,
        //           user_id:article.user_id,
        //           token:''
        //   }).then((res)=>{
        //       console.info()
                this.$router.push({
                    name:'topic',
                    params:{
                        topic_id:article.topic_id
                    }
                })
        //   })
      },
      changePage(Page){
          //下一页
          //未验证
          console.info('下一页',Page);
          this.page.current_page = Page;
      },
  }
}
</script>
<style lang='stylus' scoped>
@import '../../common/css/variable.styl';
    .wrapper
        .tags
            border-bottom:1px solid black
            line-height:50px
            .tag
                margin-right:20px
                cursor pointer
                &:hover
                    color:$color-active
            .tagType
                margin-right:20px
                cursor pointer
                &:hover
                    color:$color-active
        .list-wrapper
            li
                padding:20px 0px
                border-bottom:1px solid #ddd
                .user-wrapper
                    width:100%
                    font-size:$font-size-small
                    color:$color-desc
                    line-height:16px
                    .time
                        margin-left:5px
                        &:before
                            content:'·'
                        &:after
                            content:'·'
                .title-wrapper
                    margin-top:10px
                    display :flex
                    justify-content :space-between
                    cursor pointer
                    .comment-wrapper
                        &>div
                            display inline-block
        .pagination
            margin-top:30px
            text-align:center
        .no-data
            text-align:center
            line-height:80px
        .sort-wrapper
            padding:10px 10px 0px 0px
            line-height:50px
            display :flex
            &>div
                width:50px
                height:30px
                text-align:center
                line-height:30px
                font-size:12px
                cursor pointer
                &:first-child
                    margin-right:10px
                &.active
                    background-color:$color-active
                    color:white
</style>
