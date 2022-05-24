// 场景id
export const decorateLink = (appid: string): string =>  {
  return `https://market.m.taobao.com/app/miniapp-biz/qrcode/index.html?_ariver_appid=${appid}&_mp_code=tb&transition=present`
}
export const pathList = {
  1: {
    // ?id=22&query=edit/copy, 啥也没有就是创建你觉得怎么样
    path: '/app/marketing/interaction/apps/bigwheel',
    link: ''
  },
}