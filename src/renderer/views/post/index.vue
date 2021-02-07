<template>
  <div class="post">
    <div class="post__ipt__wrap">
      <input v-model="title" class="post__ipt" placeholder="请输入标题"></input>
      <div class="post__btns">
        <a-button type="default" shape="circle" icon="close" @click.stop="handleClearClick"/>
      </div>
    </div>
    <mavon-editor ref="md" :toolbars="toolbars" :shortCut="false" :toolbarsFlag="true" v-model="note" @imgAdd="uploadImg" @save="handleSave" class="post__editor" />
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
      images: [],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
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
    uploadImg() {},
    savePost() {
      const id = getID();
      this.$db.insert({
        id,
        title: this.title || '未命名',
        createTime: Date.now(),
        updateTime: Date.now(),
        content: this.note,
      }, (err) => {
        if (err) {
          this.$message.error('保存失败啦...');
        } else {
          this.$message.success('保存成功啦!');
        }
      });
    },
    creatdNewPost() {
      if (!this.title) {
        this.$confirm({
          title: '提示',
          content: '标题还没有输入哦, 确认保存吗?',
          onOk: () => {
            this.savePost();
          },
          onCancel: () => {
            this.$message.info('幸好没有手抖呢~');
          },
        });
      } else {
        this.savePost();
      }
    },
    updateExsitPost() {
      this.$db.update({
        id: this.id,
      }, {
        $set: {
          title: this.title,
          updateTime: Date.now(),
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
    handleClearClick() {
      this.note = '';
      this.title = '';
      this.id = '';
      this.$message.info('内容给你清空啦~');
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
    display: flex;
    flex-direction: row;
    align-items: center;
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
    height: 36px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 18px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    transition: all 0.5s;
    outline: none;
    flex-grow: 3;
  }

  &__btns {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }

  .v-note-wrapper {
    z-index: 1;
  }
}
</style>
