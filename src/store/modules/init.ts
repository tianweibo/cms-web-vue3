import { Module, Mutation } from "vuex";
import stageConfig from '@/router/routers/index.js' // 引入舞台配置
const init = {
  namespaced: true,
  state: {
    stageConfig:stageConfig,
    theIndex: 2,
  },
  mutations: {
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    
  },
  actions: {},
  getters: {
    getCurrentElement: state => {
        return state.components.find(component => component.id === state.currentElement);
    },
    sidebarList:(state)=>{
        const d = [
            {
                icon: 'iconfont icon-weibiaoti--',
                name: Symbol('DashBoard'),
                path: '/dashboard',
                title: '数据分析'
            }, {
                icon: 'iconfont icon-iconset0103',
                name: Symbol('about'),
                path: '/about',
                title: '林间有风',
            }, {
                icon: 'iconfont icon-rizhiguanli',
                name: Symbol('log'),
                path: '/log',
                title: '日志管理',
            }, {
                icon: 'iconfont icon-tushuguanli',
                name: Symbol('Z2TuYD'),
                path: 'PIJZeQ',
                title: '图书管理',
                children: [
                    {
                        icon: 'iconfont icon-tushuguanli',
                        name: Symbol('BookCreate'),
                        path: '/book/list',
                        title: '图书列表',
                    }, {
                        icon: 'iconfont icon-add',
                        name: Symbol('BookCreate'),
                        path: '/book/add',
                        title: '添加图书',
                    }
                ]
            }, {
                icon: "iconfont icon-huiyuanguanli",
                name: Symbol('ZVKXbR'),
                path: "jxDFAH",
                title: "权限管理",
                children: [
                    {
                        icon: "iconfont icon-huiyuanguanli",
                        name: Symbol('sxg2tq'),
                        path: "/admin/user",
                        title: "用户管理",
                        children: [
                            {
                                icon: "iconfont icon-huiyuanguanli",
                                name: Symbol('userList'),
                                path: "/admin/user/list",
                                title: "用户列表",
                            }, {
                                icon: "iconfont icon-add",
                                name: Symbol('UserCreate'),
                                path: "/admin/user/add",
                                title: "添加用户",
                            }
                        ]
                    }, {
                        icon: "iconfont icon-yunyingguanli_fuwufenzuguanli",
                        name: Symbol('rTYkyd'),
                        path: "/admin/group/list",
                        title: "分组管理",
                    }
                ]
            }, {
                icon: "iconfont icon-zidingyi",
                name: Symbol('WSlBQb'),
                path: "VFSKYr",
                title: "自定义组件",
                children: [
                    {
        
                        icon: "iconfont icon-upload",
                        name: Symbol('ImgsUploadDemo'),
                        path: "/custom/upload-image",
                        title: "upload 图像上传",
                    }, {
                        icon: "iconfont icon-fuwenbenbianjiqi_gongshi",
                        name: Symbol('Tinymce'),
                        path: "/custom/tinymce",
                        title: "editor 富文本",
                    }, {
                        icon: "iconfont icon-multiple_inputs",
                        name: Symbol('Multiple'),
                        path: "/custom/multiple",
                        title: "multiple 多重输入",
                    }
                ]
            }
        ]
        return d
    }
  }
};

export default init;
