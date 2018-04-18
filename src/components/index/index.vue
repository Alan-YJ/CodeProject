<template>
  <div class='content-wrapper'>
    <div class='slider-wrapper'>
      <el-carousel  trigger="click" class='slider'>
        <el-carousel-item v-for='item in imgList' :key='item.key'>
          <h2>{{item.title}}</h2>
          <img :img="item.url">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class='article-wrapper'>
      <!-- 数据未完成加载时提示 -->
      <div v-if='!loaded' class='loading'>
        <img src="static/imgs/loading.gif">
        <p>资源正在加载中...</p>
      </div>
      <List class='article' @reloadList='reloadList' v-else :pageInfo='articleList.data' :list='articleList' :targetsTech='targets'></List>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import List from 'components/base/list';
import {parseCode} from 'common/js/parseCodeToJson.js'
import {mapGetters} from 'vuex';
export default {
  data(){
    return {
      articleList:[],
      loaded:false,
      targets:[
        {text:'热门文章',id:0},
        {text:'html',id:1},
        {text:'php',id:2},
        {text:'java',id:3}
      ]
    }
  },
  watch:{
    articleList(){
      if(this.articleList.status==1){
        this.loaded = true
      }
    }
  },
  methods:{
    reloadList(newdata){
        this.articleList = newdata
    }
  },
  computed:{
    ...mapGetters({
      imgList:'imgList'
    })
  },
  created(){
    //请求默认加载资源
      Axios.get('http://yjhapi.agxx.club/iweb/topic/topicList',{
          params:{
            par:'index_hot'
          }
      }).then((res)=>{
          this.articleList = JSON.parse(parseCode(res.data));
      })
  },
  components:{
    List
  }
}
</script>
<style lang="stylus" scoped>
  .content-wrapper
    margin:0 auto
    margin-top:40px
    padding-bottom:150px
    width:100%
    max-width:1100px
    min-width:960px
    .slider-wrapper
      width:100%
      height:300px
      .el-carousel__item h3 
        color: #475669
        font-size: 14px
        opacity: 0.75
        line-height: 150px
        margin: 0
      .el-carousel__item:nth-child(2n) 
        background-color: #99a9bf
      .el-carousel__item:nth-child(2n+1) 
        background-color: #d3dce6
      .slider
        h2
          text-align:center
          color:white
          line-height:300px
    .article-wrapper
      width:100%
      .loading
        margin-top:20px
        text-align:center
        p
          margin-top:20px
      .article
        margin-top:50px
</style>
