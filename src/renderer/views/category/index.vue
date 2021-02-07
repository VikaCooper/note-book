<template>
  <div class="category">
    <div class="category__ops">
      <div class="category__ops__left">
        <a-button type="primary" @click="handleShowBtns">
          {{showBtns ? '取消' : '批量操作'}}
        </a-button>
        <a-checkbox v-if="showBtns" v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">全选</a-checkbox>
      </div>

      <a-button-group v-if="showBtns">
        <a-button type="danger" @click="deleteMulti">删除</a-button>
        <a-button>分类</a-button>
        <a-button>打标签</a-button>
      </a-button-group>

    </div>
    <div v-if="cardList && cardList.length" class="category__wrap">
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="cardList">
        <a-list-item slot="renderItem" slot-scope="c">
          <a-card class="category__wrap__card" @click="handleCardClick(c)">
            <div slot="title" class="category__wrap__card__title">
              <div class="title">
                <a-checkbox v-if="showBtns" v-model="c.checked"></a-checkbox>
                <span>{{c.title}}</span>
              </div>
              <div class="time">最后更新: {{c.updateTime ? c.updateTime : c.createTime | timeTransfer}}</div>
            </div>
            <div slot="extra">
              <a-button type="default" shape="circle" icon="edit" @click.stop="handleEditClick(c.id)"/>
              <a-button type="danger" shape="circle" icon="delete" @click.stop="handleDeleteClick(c.id)"/>
            </div>
            <p>{{c.content}}</p>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
    <a-empty v-else />
  </div>
</template>
<script>
export default {
  name: 'Category',
  data() {
    return {
      cardList: [],
      showBtns: false,
      checkAll: false,
      indeterminate: false,
    };
  },
  created() {
    this.initCategory();
  },
  methods: {
    handleCheckAll(e) {
      this.cardList.forEach((item) => {
        this.$set(item, 'checked', e.target.checked);
      });
      this.indeterminate = false;
    },
    handleShowBtns() {
      this.showBtns = !this.showBtns;
      if (this.showBtns) {
        this.cardList.forEach((item) => {
          this.$set(item, 'checked', false);
        });
        this.checkAll = false;
        this.indeterminate = false;
      }
    },
    initCategory() {
      this.$db.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        this.cardList = docs;
        this.checkAll = false;
        this.indeterminate = false;
      });
    },
    handleCardClick(c) {
      if (!this.showBtns) {
        return;
      }

      this.$set(c, 'checked', !c.checked);
      let checkNum = 0;
      this.cardList.forEach((item) => {
        if (item.checked) {
          checkNum += 1;
        }
      });
      if (checkNum === 0) {
        this.checkAll = false;
        this.indeterminate = false;
      } else if (checkNum > 0 && checkNum < this.cardList.length) {
        this.checkAll = false;
        this.indeterminate = true;
      } else {
        this.checkAll = true;
        this.indeterminate = false;
      }
    },
    handleEditClick(id) {
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
          }, (err) => {
            if (!err) {
              this.initCategory();
              this.$message.success('删除成功!');
            }
          });
        },
        onCancel: () => {
          this.$message.info('幸好没有手抖呢~');
        },
      });
    },
    deleteMulti() {
      const ids = [];
      this.cardList.forEach((item) => {
        if (item.checked) {
          ids.push(item.id);
        }
      });
      console.log(ids);


      this.$confirm({
        title: '提示',
        content: '确认删除选中的笔记嘛?',
        onOk: () => {
          this.$db.remove({
            id: { $in: ids },
          }, {
            multi: true,
          }, (err) => {
            if (!err) {
              this.initCategory();
              this.$message.success('删除成功!');
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
  &__ops {
    display: flex;
    margin-bottom: 24px;

    &__left {
      margin-right: 32px;
    }
  }

  &__wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &__card {
      cursor: pointer;
      margin-right: 24px;
      margin-bottom: 24px;
      // width: 20%;
      flex: 1;
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
