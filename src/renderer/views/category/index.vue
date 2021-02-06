<template>
  <div class="category">
    <div class="category__wrap">
      <a-card v-for="c in cardList" class="category__wrap__card">
        <div slot="title" class="category__wrap__card__title">
          <div class="title">{{c.title}}</div>
          <div class="time">最后更新: {{c.updateTime ? c.updateTime : c.createTime | timeTransfer}}</div>
        </div>
        <div slot="extra">
          <a-button type="default" shape="circle" icon="edit" @click.stop="handleCardClick(c.id)"/>
          <a-button type="danger" shape="circle" icon="delete" @click.stop="handleDeleteClick(c.id)"/>
        </div>
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
    handleDeleteClick(id) {
      this.$confirm({
        title: '提示',
        content: '确认删除这篇笔记嘛?',
        onOk: () => {
          this.$db.remove({
            id,
          }, (err, doc) => {
            console.log(err, doc);
            if (!err) {
              this.initCategory();
            }
          });
        },
        onCancel: () => {
          this.$message.info('幸好没有手抖呢~');
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.category {
  &__wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &__card {
      cursor: pointer;
      margin-right: 24px;
      margin-bottom: 24px;
      width: 380px;
      height: 280px;
      box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.25);
      transition: all 0.3 ease;

      .ant-card-body {
        p {
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      &__title {
        .time {
          font-size: 12px;
          color: #7f8c8d;
        }
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
