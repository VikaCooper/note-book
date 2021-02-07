<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" @click="() => (collapsed = !collapsed)">
        {{ logoName }}
      </div>
      <a-menu :selectedKeys="defaultKey" theme="dark" mode="inline" :default-selected-keys="defaultKey" @click="handleMenuClick">
        <a-menu-item v-for="menu in menuList" :key="menu.key">
          <a-icon :type="menu.icon" />
          <span>{{ menu.label }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="layout-content">
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Layout',
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    ...mapState('global', ['menuList']),
    logoName() {
      return this.collapsed ? 'QN' : 'Quick Note';
    },
    defaultKey() {
      return [this.$route.path];
    },
  },
  methods: {
    handleMenuClick({ key }) {
      const { path } = this.$route;
      if (path === key) {
        return;
      }
      this.$router.push({
        path: key,
      });
    },
  },
};
</script>
<style scoped lang="scss">
#components-layout-demo-custom-trigger {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;

  .layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .logo {
    cursor: pointer;
    height: 32px;
    background: transparent;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    margin: 16px;
    color: #fff;
    user-select: none;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
