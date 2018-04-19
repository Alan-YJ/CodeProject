import Navigation from '../common/js/Navigation'

const state = {
    //user -> 保存登陆用户信息  myLinks -> 个人中心链接列表
    user:{},
    myLinks:[
        new Navigator('我的信息','baseInfo'),
        new Navigator('修改密码','resetPassword'),
        new Navigator('我的帖子','myArticle'),
        new Navigator('我的收藏','myCollection'),
        new Navigator('我的消息','myMessage'),
        new Navigator('我的任务','myTask')
    ],
    // myLinks:[
    //     {text:'我的信息',url:'baseInfo'},
    //     {text:'修改密码',url:'resetPassword'},
    //     {text:'我的帖子',url:'myArticle'},
    //     {text:'我的收藏',url:'myCollection'},
    //     {text:'我的消息',url:'myMessage'},
    //     {text:'我的任务',url:'myTask'},
    // ],
    imgList:[
        {title:'',key:'1',url:'http://xiaosusu.cn/1.jpg'},
        {title:'',key:'2',url:'http://xiaosusu.cn/2.jpg'},
        {title:'',key:'3',url:'http://xiaosusu.cn/3.jpg'},
        {title:'',key:'4',url:'http://xiaosusu.cn/4.jpg'},
        {title:'',key:'5',url:'http://xiaosusu.cn/5.jpg'}
    ],
    navList:[
        {text:'未读消息',link:'/home/myMessage'},
        {text:'首页',link:'/index'},
        {text:'知识体系',link:'/knowledge'},
        {text:'活动中心',link:'/activity'},
        {text:'文章列表',link:'/article'},
        {text:'写文章',link:'/writearticle'},
    ]
}

export default state