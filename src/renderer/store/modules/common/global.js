export default {
  namespaced: true,
  state: {
    menuList: [
      {
        id: 1,
        label: '新建',
        icon: 'plus-circle',
        key: '/post',
      },
      {
        id: 2,
        label: '目录',
        icon: 'container',
        key: '/category',
      },
      {
        id: 3,
        label: '标签',
        icon: 'tags',
        key: '/tag',
      },
    ],
  },
  mutations: {},
  actions: {},
};
