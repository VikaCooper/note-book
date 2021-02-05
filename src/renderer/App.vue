<template>
  <div id="app">
    <Layout>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'note-book',
  components: {
    Layout: () => import('@/components/Layout/index'),
  },
};
</script>

<style lang="scss" scoped></style>
