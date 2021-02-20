import Vue from 'vue';
import Router from 'vue-router';
import Post from '@/views/post';
import Category from '@/views/category';
import Tag from '@/views/tag';

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
      path: '/tag',
      name: 'Tag',
      component: Tag,
    },
    {
      path: '*',
      redirect: '/post',
    },
  ],
});
