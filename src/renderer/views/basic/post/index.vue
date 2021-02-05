<template>
  <div class="post">
    <mavon-editor :toolbarsFlag="false" v-model="note" @save="handleSave" class="post__editor" />
  </div>
</template>
<script>
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import Vue from 'vue';
Vue.use(mavonEditor);

export default {
  name: 'Post',
  data() {
    return {
      note: '',
    };
  },
  methods: {
    handleSave() {
      // console.log(this.note)
    },
  },
};
</script>
<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: auto;

  &__editor {
    height: 100%;
    flex: auto;
    overflow: auto;
  }
}
</style>
