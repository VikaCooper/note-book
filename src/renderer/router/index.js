import Vue from 'vue';
import Router from 'vue-router';
import Post from '@/views/post';
import Category from '@/views/category';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
    {
      path: '/category',
      name: 'Category',
      component: Category,
    },
    {
      path: '*',
      redirect: '/post',
    },
  ],
});
