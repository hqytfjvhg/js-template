const exclude = ["actions", "getters", "mutations", "namespaced"];
export default function Persistent({ key, modules, modulesKeys }) {
  return (store) => {
    //先读取之前的数据，合并到oldState中
    const localOldState = JSON.parse(localStorage.getItem(key) || "{}");
    const sessionOldState = JSON.parse(sessionStorage.getItem(key) || "{}");
    let oldState = {};
    Object.assign(oldState, localOldState, sessionOldState);
    //如果有之前的数据，就把现有的数据覆盖modules
    if (Object.keys(oldState).length > 0) {
      for (const oldKey in oldState) {
        modules[oldKey] = oldState[oldKey];
      }
      store.replaceState(modules);
    }
    //通过store.subscribe监听所有的mutation，每当状态发生变化时，触发回调函数
    store.subscribe((mutation, state) => {
      // 判断是否需要缓存数据至localStorage
      if (modulesKeys.local.length > 0) {
        const localData = setData(store.state, modulesKeys.local);
        localStorage.setItem(key, JSON.stringify(localData));
      } else {
        localStorage.removeItem(key);
      }
      // 判断是否需要缓存数据至sessionStorage
      if (modulesKeys.session.length > 0) {
        const sessionData = setData(store.state, modulesKeys.session);
        sessionStorage.setItem(key, JSON.stringify(sessionData));
      } else {
        sessionStorage.removeItem(key);
      }
    });
    // console.log(store, "store的内容");
  };
}

//取出最新的值state中所有模块的值
function setData(state, module) {
  let data = {};
  for (const i of module) {
    data[i] = state[i];
  }
  return data;
}
