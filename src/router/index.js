//基础依赖
import Vue from 'vue'
import Router from 'vue-router'
//基础组件
import Header from 'components/header/header'
//大分类
//Index -> 主页 Knowledge -> 知识体系  Activity -> 活动中心  Article -> 文章列表  Writearticle -> 写文章
import Index from 'components/index/index'
import Knowledge from 'components/knowledge/knowledge'
import Activity from 'components/activity/activity'
import Article from 'components/article/article'
import Topic from 'components/article/topic'
import Writearticle from 'components/article/writeArticle'
import Login from 'components/login/login'
import Register from 'components/register/register'
// //个人中心
//BaseInfo -> 我的信息  ResetPassword -> 修改密码 MyArticle -> 我的帖子 MyCollection -> 我的收藏  MyMessage -> 我的消息 MyTask -> 我的任务
import Home from 'components/home/home'
import BaseInfo from 'components/home/baseInfo'
import ResetPassword from 'components/home/resetPassword'
import MyArticle from 'components/home/myArticle'
import MyCollection from 'components/home/myCollection'
import MyMessage from 'components/home/myMessage'
import MyTask from 'components/home/myTask'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect:'/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: Knowledge
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
          path: '/topic/:topic_id',
          name: 'topic',
          component: Topic,
    },
    {
      path: '/writearticle',
      name: 'writearticle',
      component: Writearticle,
      meta:{
        requireAuth:true
      }
    },
    {
          path: '/writearticle/:topic_id',
          name: 'editarticle',
          component: Writearticle,
          meta:{
            requireAuth:true
          }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:'/home/baseInfo',
      meta:{
        requireAuth:true
      },
      children:[
        {
          path: 'baseInfo',
          name:'baseInfo',
          component: BaseInfo,
          meta:{
            requireAuth:true
          }
        },
        {
          path: 'resetPassword',
          name: 'resetPassword',
          component: ResetPassword,
          meta:{
            requireAuth:true
          }
        },
        {
          path: 'myArticle',
          name: 'myArticle',
          component: MyArticle,
          meta:{
            requireAuth:true
          }
        },
        {
          path: 'myCollection',
          name: 'myCollection',
          component: MyCollection,
          meta:{
            requireAuth:true
          }
        },
        {
          path: 'myMessage',
          name: 'myMessage',
          component: MyMessage,
          meta:{
            requireAuth:true
          }
        },
        {
          path: 'myTask',
          name: 'myTask',
          component: MyTask,
          meta:{
            requireAuth:true
          }
        },
      ]
    },
  ]
})
//设置全局守卫 
//判断是否需要登陆，以及是否已经登陆
router.beforeEach((to,from,next)=>{
  //如果没有匹配到对应的路由页面
  if(to.matched.length===0){
    //如果上级未匹配到路由则跳转主页,如果能匹配就去来的页面
    from.name ? next({ name:from.name }) : next('/home');
  }else{
    //如果路由有meta属性，代表必须先登陆再访问
    if(to.matched.some(res => res.meta.requireAuth)){
      //判断session中是否有登陆信息
      if(sessionStorage.getItem('user')){
        next()
      }else{
        next({
          path:'/login',
          query:{redirect:to.fullPath}
        })
      }
    }else{
      //没有匹配
      next()
    }
  }
})



export default router