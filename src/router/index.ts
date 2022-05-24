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
    // meta: {
    //   roles: ['editor'] // 方法二的权限匹配路由的方式，前端在meta中写死哪些角色拥有这个路由
    // },
    component: () => import("@/components/layouts/layout/index.vue"),
    children: [
      {
        path: "marketing",
        name: "Marketing",
        meta: {
          title: "营销活动",
          isMenu: true
        },
        redirect: "/app/marketing/exchange",
        component: () => import("@/components/layouts/template/index.vue"),
        children: [
          {
            path: "exchange",
            name: "Exchange",
            meta: {
              title: "兑换活动",
              icon: "",
              isMenu: true
            },
            redirect: "/app/marketing/exchange/list",
            component: () => import("@/components/layouts/template/index.vue"),
            children: [
              {
                path: "list",
                name: "ExchangeList",
                meta: {
                  title: "兑换管理",
                  icon: "",
                  isMenu: true
                },
                component: () => import("@/pages/exchange/sub-pages/list/index.vue"),
                children: []
              },
              {
                path: "record",
                name: "ExchangeRecord",
                meta: {
                  title: "兑换记录",
                  icon: "",
                  isMenu: false
                },
                component: () => import("@/pages/exchange/sub-pages/record/index.vue"),
                children: []
              },
              {
                path: "create",
                name: "ExchangeCreate",
                meta: {
                  title: "创建兑换活动",
                  icon: "",
                  isMenu: false
                },
                component: () => import("@/pages/exchange/sub-pages/create/index.vue")
              },
              {
                path: "statistics",
                name: "ExchangeStatistics",
                meta: {
                  title: "查看数据统计",
                  icon: "",
                  isMenu: false
                },
                component: () => import("@/pages/exchange/sub-pages/statistics/index.vue")
              },
              {
                path: "analysis",
                name: "ExchangeAnalysis",
                meta: {
                  title: "兑换分析",
                  icon: "",
                  isMenu: true
                },
                component: () => import("@/pages/user/user1/index.vue")
              }
            ]
          },
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
                redirect: "/app/marketing/apps/bigwheel",
                children: [
                  {
                    path: "bigwheel",
                    name: "BigWheel",
                    meta: {
                      title: "大转盘",
                      icon: "",
                      isMenu: false
                    },
                    component: () => import("@/pages/interaction/apps/big-wheel/index.vue")
                  },
                  {
                    path: "sign",
                    name: "SignIn",
                    meta: {
                      title: "签到",
                      icon: "",
                      isMenu: false
                    },
                    component: () => import("@/pages/interaction/apps/sign-in/index.vue")
                  }
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
