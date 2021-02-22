<template>
  <div class="tag">
    <div v-if="tagList && tagList.length" class="tag__wrap">
      <a-tag v-if="t in tagList" :key="t.id" :color="t.color">
        {{t.name}}
      </a-tag>
    </div>
    <a-empty v-else>
      <span slot="description">还没有标签哦~</span>
      <a-button type="primary" @click="handleAddClick">
        添加一个
      </a-button>
    </a-empty>
    <AddDialog :visible="addDialogVisible" />
  </div>
</template>
<script>
export default {
  name: 'Tag',
  data() {
    return {
      tagList: [],
      addDialogVisible: false,
    };
  },
  components: {
    AddDialog: () => import('./components/AddDialog'),
  },
  created() {
    this.initTags();
  },
  methods: {
    handleAddClick() {
      this.addDialogVisible = true;
    },
    initTags() {
      this.$db.tagDb.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        this.tagList = docs;
      });
    },
  },
};
</script>