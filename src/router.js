import Vue from 'vue'
import Router from 'vue-router'
import Page1 from './views/page/page1.vue'
import Page2 from './views/page/page2.vue'

//前端路由

//创建 router 实例

const routes=[{
	path:'/',
	component:Page1
},{
	path:'/page2',
	component:Page2
}];

const router=new Router({
	mode:'history',
	routes
});

export default router;