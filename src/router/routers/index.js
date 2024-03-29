import Utils from '../../utils/dealData'
import adminConfig from './admin'
/**
 * 筛除已经被添加的插件
 */
// 接入插件
//const plugins = [...pluginsConfig]
const plugins=[]
 function filterPlugin(data) {
    if (plugins.length === 0) {
      return
    }
    if (Array.isArray(data)) {
      data.forEach(item => {
        filterPlugin(item)
      })
    } else {
      const findResult = plugins.findIndex(item => data === item)
      if (findResult >= 0) {
        plugins.splice(findResult, 1)
      }
      if (data.children) {
        filterPlugin(data.children)
      }
    }
  }
  
  /**
   * 使用 Symbol 处理 name 字段, 保证唯一性
   */
  function deepReduceName(target) {
    if (Array.isArray(target)) {
      target.forEach(item => {
        if (typeof item !== 'object') {
          return
        }
        deepReduceName(item)
      })
      return
    }
    if (typeof target === 'object') {
      if (typeof target.name !== 'symbol') {
        target.name = target.name || Utils.getRandomStr()
        target.name = Symbol(target.name)
      }
  
      if (Array.isArray(target.children)) {
        target.children.forEach(item => {
          if (typeof item !== 'object') {
            return
          }
          deepReduceName(item)
        })
      }
    }
  }




let homeRouter = [
  {
    title: '林间有风',
    type: 'view',
    name: Symbol('about'),
    route: '/about',
    filePath: 'pages/about/about.vue',
    inNav: true,
    icon: 'iconfont icon-iconset0103',
    order: 1,
  },
  {
    title: '日志管理',
    type: 'view',
    name: Symbol('log'),
    route: '/log',
    filePath: 'pages/log/log.vue',
    inNav: true,
    icon: 'iconfont icon-rizhiguanli',
    order: 2,
    permission: ['查询所有日志'],
  },
  {
    title: '个人中心',
    type: 'view',
    name: Symbol('center'),
    route: '/center',
    filePath: 'pages/center/center.vue',
    inNav: false,
    icon: 'iconfont icon-rizhiguanli',
  },
  {
    title: '404',
    type: 'view',
    name: Symbol('404'),
    route: '/404',
    filePath: 'pages/error-page/404.vue',
    inNav: false,
    icon: 'iconfont icon-rizhiguanli',
  },
  adminConfig,
]


filterPlugin(homeRouter)
homeRouter = homeRouter.concat(plugins)

// 处理顺序
homeRouter = Utils.sortByOrder(homeRouter)
deepReduceName(homeRouter)

export default homeRouter


