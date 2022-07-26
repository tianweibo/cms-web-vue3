import { createApp } from "vue";
import InteracteCom from "@enbrandsfe/interacte_com_vue3"
import App from "./App.vue";
//import buriedpointH5 from '@enbrandsfe/buried_point';
import router from "./router";
import store from "./store";
import Antd from './config-antd'
//import Filters from "./filters/index";
//import Antd from "ant-design-vue/es"; // 因为配置了按需加载导致按需加载和全量加载引入文件路径不一致
import "ant-design-vue/dist/antd.less"; // or 'ant-design-vue/dist/antd.less'
import "./styles/import.less";
import "./styles/base.less";
// import "./permission";
const app = createApp(App);
//app.config.globalProperties.$filters = Filters;
//app.directive("focus", Focus);
//app.directive("permission", Permission);
/* buriedpointH5.setConfig({
  cloud_id:34134,      // 不可更改
  is_prod: true,      // 数据埋入测试环境还是正式环境
  runtime_env:'pc',      //  参见埋点api
  merchant_id:'未知',   //  店铺ID   （也就是店铺号，便于通过不同店铺筛选数据 无法获取就写未知）
  distinct_id:'未知',   //  用户ID， （该字段是用来便于统计uv,一定要填写可标注用户唯一的字段）
  act_id:'未知',        //  活动ID   （也就是活动号，便于通过不同活动筛选数据，确认获取不到就传未知）
  member_id:'未知',     //  会员ID （确认获取不到就传未知）
  nick:'未知',          //  确认获取不到就传未知
  mix_nick:'未知',      //  确认获取不到就传未知
  act_name:'未知',      //  确认获取不到就传未知
  open_id:'未知',       //  微信平台下请务必传入正确的open_id
  phone:'未知',         //  确认获取不到就传未知 
  ouid:'未知',          //  淘宝平台下请务必传入正确的ouid
  provider:'未知',      //  请传入提供者|未知
  open_type:1,         // 1对接新埋点平台，2互动营销类的，3其他
  platform_app: "埋点管理平台",    // 该字段不可更改
  platform_app_code: "mdglpt",       // 该字段不可更改
  platform_app_version:"1.1.1",          // 该字段不可更改
  application_dep_platform:"crm_enbrands",  // 如果值是逗号分隔，比如'xx1,xx2',则需要注意该字段的动态取值，按部署平台的不同，动态按需传入该值，取'xx1,xx2'中的任一个
  platform_business:"BD",   // // 如果值是逗号分隔，比如'xx1,xx2',则需要注意该字段的动态取值，按平台的不同，动态按需传入该值，取'xx1,xx2'中的任一个
  application_label:"62,63,64",   // 该字段不可更改
  is_interactive:false,     // 该字段不可更改
}) */

app
  .use(Antd)
  .use(InteracteCom)
  .use(router)
  .use(store)
  .mount("#app");
