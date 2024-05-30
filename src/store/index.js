import { createStore, createLogger } from "vuex";
import Persistent from "./plugins/persistent";
const debug = import.meta.env.MODE !== "production";
const files = import.meta.globEager("./modules/*.js");

let modules = {};
// console.log(files, "存储文件");
Object.keys(files).forEach((c) => {
  // console.log(c);
  const module = files[c].default;
  //c的值是./modules/app.js，./modules/keepAlive.js，./modules/user.js
  //取模块的名称，^开头，\.\/以./开头,(.*)第一个捕获组，获取所有内容,\/指/,这里是指从/开始到/的值就是modules,\.点,第二个捕获组从/开始到.的值就是app，\W+所有的字符,$结束
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, "$2");
  modules[moduleName] = module;
});

// 这是一个vuex本地存储插件，默认把vuex所有数据都做存储了
// local代表存储在localStorage里面，进行永久存储
// session代表存储在sessionStorage里面，进行临时存储
// 都接收Modules的文件名数组，如：['app', 'keepAlive', 'user']
// 用户相关的数据建议直接存储在local里面，session里面会导致打开新窗口时获取不到token值，因为session只针对当前会话
const persistent = Persistent({
  key: "vuex",
  modules,
  modulesKeys: {
    local: Object.keys(modules),
    session: [],
  },
});

export default createStore({
  modules: {
    ...modules, //修改值的时候是store.state.app.theme
  },
  strict: debug, //开启严格模式，任何对状态的非mutation修改都会抛出错误
  plugins: debug ? [createLogger(), persistent] : [persistent], //如果debug为真，那么首先使用createLogger()插件，它会在控制台打印出Vuex的action、mutation等信息，便于调试，如果debug为假，则仅使用persistent插件，不开启日志记录
});
