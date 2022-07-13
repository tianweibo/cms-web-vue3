import ComPagination from "./components/pagination/index.vue";
import ComBreadcrumb from "./components/breadcrumb/index.vue";
import Focus from "./directive/focus";
import Permission from "./directive/permission";
import { createApp } from "vue";
import InteracteCom from "interacte-com"
import 'interacte-com/dist/bundle.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from './config-antd'
import Filters from "./filters/index";
//import Antd from "ant-design-vue/es"; // 因为配置了按需加载导致按需加载和全量加载引入文件路径不一致
import "ant-design-vue/dist/antd.less"; // or 'ant-design-vue/dist/antd.less'
import "./styles/import.less";
import "./styles/base.less";
// import "./permission";



const app = createApp(App);

app.config.globalProperties.$filters = Filters;
app.directive("focus", Focus);
app.directive("permission", Permission);
app
  .use(Antd)
  .use(InteracteCom)
  .use(router)
  .use(store)
  .component("Pagination", ComPagination)
  .component("Breadcrumb", ComBreadcrumb)
  .mount("#app");
