<template>
  <div class="tag">
    <div v-if="tagList && tagList.length" class="tag__wrap">
      <a-tag v-if="t in tagList" :key="t.id" :color="t.color">
        {{t.name}}
      </a-tag>
    </div>
    <a-empty v-else>
      <span slot="description">还没有标签哦~</span>
      <a-button type="primary">
        添加一个
      </a-button>
    </a-empty>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  data() {
    return {
      tagList: [],
    };
  },
  methods: {
    initCategory() {
      this.$db.postDb.find({}, (err, docs) => {
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