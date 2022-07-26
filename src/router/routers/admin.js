// 框架提供了三级菜单机制，也就是按照父子关系写三级就行了。如果你并不想在左侧 sideBar 显示，框架同样提供了在右侧以 menuTab 形式存在的可能
// 1配置右侧路由的上级路由类型为 tab 父路由，配置子路由到右侧，默认选中第一个
// 2folder父路由，没有具体页面，控制左侧菜单折叠
// 3view视图页面，最底层路由
const adminRouter = {
    route: null,
    name: null,
    title: '权限管理',
    type: 'folder',
    icon: 'iconfont icon-huiyuanguanli',
    filePath: 'pages/admin/',
    order: null,
    inNav: true,
    permission: ['超级管理员独有权限'],
    children: [
      {
        route: '/admin/user',
        name: null,
        title: '用户管理',
        type: 'folder', // 取 route 为默认加载页
        icon: 'iconfont icon-huiyuanguanli',
        filePath: 'pages/admin/user/',
        inNav: true,
        children: [
          {
            title: '用户列表',
            type: 'view',
            name: 'userList',
            route: '/admin/user/list',
            filePath: 'pages/admin/user/user-list.vue',
            inNav: true,
            icon: 'iconfont icon-huiyuanguanli',
            permission: ['超级管理员独有权限'],
          },
          {
            title: '添加用户',
            type: 'view',
            inNav: true,
            route: '/admin/user/add',
            icon: 'iconfont icon-add',
            name: 'UserCreate',
            filePath: 'pages/admin/user/user-create.vue',
            permission: ['超级管理员独有权限'],
          },
        ],
      },
      {
        route: '/admin/group/list',
        name: null,
        title: '分组管理',
        type: 'tab', // 取 route 为默认加载页
        icon: 'iconfont icon-yunyingguanli_fuwufenzuguanli',
        filePath: 'pages/admin/group',
        inNav: true,
        children: [
          {
            route: '/admin/group/list',
            type: 'view',
            name: 'groupList',
            inNav: true,
            filePath: 'pages/admin/group/group-list.vue',
            title: '分组列表',
            icon: 'iconfont icon-huiyuanguanli',
            permission: ['超级管理员独有权限'],
          },
          {
            route: '/admin/group/add',
            type: 'view',
            name: 'GroupCreate',
            filePath: 'pages/admin/group/group-create.vue',
            inNav: true,
            title: '添加分组',
            icon: 'iconfont icon-add',
            permission: ['超级管理员独有权限'],
          },
          {
            route: '/admin/group/edit',
            type: 'view',
            name: 'GroupEdit',
            filePath: 'pages/admin/group/group-edit.vue',
            inNav: false,
            title: '修改分组',
            icon: 'iconfont icon-add',
            permission: ['超级管理员独有权限'],
          },
        ],
      },
    ],
  }
  
  export default adminRouter
  