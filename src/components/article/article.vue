<template>
  <div class='article-wrapper'>
    <list v-if='articleList.data' :list='articleList'  :targets='targets' :comment='false' :sort='true'></list>
  </div>
</template>
<script>
import Axios from 'axios'
import List from 'components/base/list'
import {parseCode} from 'common/js/parseCodeToJson.js'
export default {
  components:{
    List
  },
  data(){
    return {
      targets:[
        {text:'所有分类',id:0,type:''},
        {text:'经验分享',id:1},
        {text:'入门学习',id:2},
        {text:'成果分享',id:3},
      ],
      articleList:{}
    }
  },
  created(){
    //请求默认加载资源
      Axios.get('http://yjhapi.agxx.club/iweb/topic/topicList',{
          params:{
            type:0,
            tsort:'new'
          }
      }).then((res)=>{
          this.articleList = JSON.parse(parseCode(res.data));
      })
  }
}
</script>
<style lang="stylus">
  .article-wrapper
    margin:0 auto
    width:100%
    max-width:1100px
    min-width:960px
</style>
