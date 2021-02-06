<template>
  <div class="post">
    <div class="post__ipt__wrap">
      <input v-model="title" class="post__ipt" placeholder="请输入标题"></input>
    </div>
    <mavon-editor :toolbarsFlag="false" v-model="note" @save="handleSave" class="post__editor" />
  </div>
</template>
<script>
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import Vue from 'vue';
import { getID } from '@/utils/methods';

Vue.use(mavonEditor);

export default {
  name: 'Post',
  data() {
    return {
      note: '',
      title: '',
      id: '',
    };
  },
  created() {
    const { id = null } = this.$route.query;
    if (id) {
      this.id = id;
      this.queryById(id);
    }
  },
  methods: {
    queryById(id) {
      this.$db.find({ id }, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        const { id, content, title } = docs[0];
        this.id = id;
        this.title = title;
        this.note = content;
      });
    },
    handleSave() {
      if (this.id) {
        this.updateExsitPost();
      } else {
        this.creatdNewPost();
      }
    },
    creatdNewPost() {
      const id = getID();
      this.$db.insert({
        id,
        title: this.title,
        createTime: new Date().getTime(),
        updateTime: new Date().getTime(),
        content: this.note,
      }, (err) => {
        if (err) {
          this.$message.error('保存失败啦...');
        } else {
          this.$message.success('保存成功啦!');
        }
      });
    },
    updateExsitPost() {
      this.$db.update({
        id: this.id,
      }, {
        $set: {
          title: this.title,
          updateTime: new Date().getTime(),
          content: this.note,
        },
      }, (err) => {
        if (err) {
          this.$message.error('更新失败啦...');
        } else {
          this.$message.success('更新成功啦!');
        }
      });
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

  &__ipt__wrap {
    margin-bottom: 12px;
  }

  &__ipt {
    border: none;
    border-bottom: 1px solid #666;
    border-radius: 0px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    width: 100%;
    height: 36px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 18px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    transition: all 0.5s;
    outline: none;
  }
}
</style>
