<template>
  <div class='knowledge-wrapper'>
    <list v-if='articleList.data' :list='articleList' :targetsTech='targets'  ></list>
    <div class='content'>
      <div class='content-left'></div>
      <div class='content-right'>
        <div class='left'></div>
        <div class='middle'>自学成才不求人</div>
        <div class='right'></div>
      </div>
    </div>
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
        {text:'全部',id:0},
        {text:'html',id:1},
        {text:'java',id:2},
        {text:'php',id:3},
      ],
      articleList:{}
    }
  },
  created(){
    //请求默认加载资源
      Axios.get('http://yjhapi.agxx.club/iweb/topic/topicList',{
          params:{
            type:0
          }
      }).then((res)=>{
          this.articleList = JSON.parse(parseCode(res.data));
      })
  },
  methods:{
  }
}
</script>
<style lang="stylus" scoped>
.knowledge-wrapper
  margin:0 auto
  max-width:1100px
  min-width:960px
  width:100%
  .content
    padding:20px
    display :flex
    height:26px
    background-color:rgb(96,125,139)
    .content-left
      flex:1
    .content-right
      width:150px
      border-left:1px solid white
      padding-left:50px
      display:flex
      justify-content :space-around
      .left,.right
        flex:1
        border-bottom:1px solid white
        position:relative
        top:-12px
      .middle
        padding:0px 5px
        color:white
        line-height:26px;
        font-size:12px
</style>
