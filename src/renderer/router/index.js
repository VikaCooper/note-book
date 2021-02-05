import Vue from 'vue';
import Router from 'vue-router';
import Post from '@/views/basic/post';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
    {
      path: '*',
      redirect: '/post',
    },
  ],
});
