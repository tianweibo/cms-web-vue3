/* eslint-disable */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/auth/login/index.vue";
import storage from "@/utils/storage";

// 方法三： 通过后台传来的 router过滤
// 如果不需要前端控制路由权限，直接将routes和asyncRoutes写在一起。
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
  {
    path: "/app",
    name: "app",
    redirect: "/app/marketing",
    component: () => import("@/components/layouts/layout/index.vue"),
    children: [
      {
        path: "marketing",
        name: "Marketing",
        meta: {
          title: "营销活动",
          isMenu: true
        },
        redirect: "/app/marketing/interaction",
        component: () => import("@/components/layouts/template/index.vue"),
        children: [
          {
            path: "interaction",
            name: "Interaction",
            meta: {
              title: "互动活动",
              icon: "",
              isMenu: true
            },
            redirect: "/app/marketing/interaction/list",
            component: () => import("@/components/layouts/template/index.vue"),
            children: [
              {
                path: "list",
                name: "InteractionList",
                meta: {
                  title: "我的互动",
                  icon: "",
                  isMenu: true
                },
                component: () => import("@/pages/interaction/list/index.vue")
              },
              {
                path: "center",
                name: "InteractionCenter",
                meta: {
                  title: "互动中心",
                  icon: "",
                  isMenu: true
                },
                component: () => import("@/pages/interaction/center/index.vue")
              },
              {
                path: "apps",
                name: "InteractionApps",
                meta: {
                  title: "",
                  icon: "",
                  isMenu: false
                },
                component: () => import("@/components/layouts/template/index.vue"),
                redirect: "/app/marketing/apps/demo",
                children: [
                  
                  {
                    path: "demo",
                    name: "demo",
                    meta: {
                      title: "演示",
                      icon: "",
                      isMenu: false
                    },
                    component: () => import("@/pages/interaction/apps/demo/index.vue")
                  },
                  // 一个个互动，依次类推
                ]
              },
              {
                path: "analysis",
                name: "InteractionAnalysis",
                meta: {
                  title: "数据分析",
                  icon: "",
                  isMenu: false
                },
                component: () => import("@/pages/interaction/analysis/index.vue")
              }
            ]
          }
        ]
      }
    ]
  }
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
