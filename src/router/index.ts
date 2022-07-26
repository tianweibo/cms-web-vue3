/* eslint-disable */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/auth/login/index.vue";
import Home from "@/pages/home/home1.vue"
import storage from "@/utils/storage";
import homeRouter from './home-router'
console.log(homeRouter,'router')
// 方法三： 通过后台传来的 router过滤
// 如果不需要前端控制路由权限，直接将routes和asyncRoutes写在一起。
/* {
  component:'',
  meta:{
    blueBaseColor:'',
    icon:'',
    permission:['查询所有日志']，
    title:'林间有风'，
    type:'view'
  },
  name:Symbol(about),
  path:'/about'
} */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "主页面"
    },
    children:[...homeRouter]
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/pages/error-page/401.vue")
  },
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    // 404页面不能有name。 原因可以自己加上name然后在动态添加的路由页面刷新测试
    path: "/:pathMatch(.*)*",
    // name: '404',
    component: () => import("@/pages/error-page/404.vue")
  }
];

export const asyncRoutes: Array<RouteRecordRaw> = [
 
];

const router = createRouter({
  history: createWebHashHistory(process.env.NODE_ENV),
  routes: [...constantRoutes, ...asyncRoutes]
});
router.beforeEach((to, from) => {
  if (to.query.token) {
    storage.set("TOKEN", to.query.token);
  }
  if (to.query.merchantNum) {
    storage.set("merchantNum", to.query.merchantNum);
  }
  if (to.query.domain ) {
    storage.set('domain', to.query.domain) 
  }
  return true
})
export default router;
