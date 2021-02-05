
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

// store 模块动态引入 注意文件格式 好处就是不用每个模块都要import引入了
// eslint-disable-next-line
const modulesFiles = require.context('./', true, /\index.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  return { ...modules, ...value.default };
}, {});

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules,
  strict: debug,
});
