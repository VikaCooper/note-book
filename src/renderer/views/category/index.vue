<template>
  <div class="category">
    <div class="category__wrap">
      <a-card v-for="c in cardList" :title="c.title" class="category__wrap__card" @click="handleCardClick(c.id)">
        <span slot="extra" href="#">{{c.time}}</span>
        <p>{{c.content}}</p>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category',
  data() {
    return {
      cardList: [],
    };
  },
  created() {
    this.initCategory();
  },
  methods: {
    initCategory() {
      this.$db.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(docs);
        this.cardList = docs;
      });
    },
    handleCardClick(id) {
      if (!id) {
        this.$message.info('这篇笔记妹有id');
      } else {
        this.$router.push({
          path: '/post',
          query: {
            id,
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.category {
  &__wrap {
    display: flex;
    align-items: center;

    &__card {
      cursor: pointer;
      margin-right: 24px;
      width: 300px;
      box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.25);
      transition: all 0.3 ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
