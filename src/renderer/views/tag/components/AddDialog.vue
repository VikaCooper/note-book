<template>
  <a-modal
    title="Title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <a-input v-model="name" />
  </a-modal>
</template>
<script>
export default {
  name: 'AddDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      confirmLoading: false,
      name: '',
      color: '',
    };
  },
  methods: {
    handleOk() {

    },
    handleCancel() {

    },
  },
};
</script>