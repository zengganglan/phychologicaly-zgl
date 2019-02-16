<template>
  <div class="pagi">
    <div class="pagination">
      <span class="first" @click="first"></span>
      <input type="button" value="上" class="pre" @click="prev">
      <input type="text" v-model="currentpage" class="page" @click="show" @keyup.enter="updatepage">
      <span class="check" @click="show"></span>
      <input type="button" value="下" class="next" @click="nex">
      <span class="end" @click="last"></span>

      <ul class="pages" v-if="flag" @click="check()">
        <!-- 根据allpage动态渲染 加滚动条 -->
        <li v-for="index in countpage" :key="index">{{index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentpage: this.page.currentpage,
      countpage: this.page.countpage,
      pagesize: this.page.pagesize,
      flag: this.page.flag
    };
  },
  created() {
    console.log(this.page);
  },
  methods: {
    //分页下拉框显示
    show() {
      this.flag = !this.flag;
    },
    //点击下拉框选择时就请求数据重新刷新
    check() {
      var target = event.target;
      this.flag = false;
      this.currentpage = target.innerHTML;
      //调用请求数据方法
    },
    // 根据allpage/pagesize更新数据，手动输入enter键更新数据
    updatepage() {
      // 总数据
      console.log(1, this.countpage);
      this.flag = false
      //调用请求数据方法
    },
    //点击返回首页
    first() {
      this.currentpage = 1;
    },
    // 点击返回最后一页
    last() {
      this.currentpage = this.countpage;
    },
    //点击返回前一页
    prev() {
      if (this.currentpage > 1) {
        this.currentpage = this.currentpage - 1;
        console.log(this.currentpage);
      }
    },
    //点击返回后一页
    nex() {
      if (this.currentpage < this.countpage) {
        this.currentpage = this.currentpage - 0 + 1;
        console.log(typeof this.currentpage);
      }
    }
  },
  props: ["page"]
};
</script>

<style lang='scss' scoped>
.pagi {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: flex-end;
  border-bottom: 1px dashed #9f9a9b;
}
.pagination {
  width: 152px;
  height: 30px;
  position: relative;
  input {
    border: 0;
    outline: none;
  }
  .first {
    position: absolute;
    top: 4px;
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #9f9a9b transparent transparent;
  }
  .pre {
    position: absolute;
    top: 4px;
    left: 23px;
  }
  .page {
    position: absolute;
    top: 4px;
    left: 58px;
    width: 50px;
    height: 20px;
  }
  .check {
    position: absolute;
    top: 10px;
    left: 85px;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: #9f9a9b transparent transparent transparent;
  }
  .next {
    position: absolute;
    top: 6px;
    left: 110px;
  }
  .end {
    position: absolute;
    top: 5px;
    left: 143px;
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #9f9a9b;
  }
  .pre,
  .next {
    width: 30px;
    font-size: 12px;
  }

  .pages {
    max-height: 150px;
    overflow: auto;
    position: absolute;
    z-index: 5;
    left: 58px;
    top: 20px;
    width: 50px;
    background-color: white;
    > li {
      height: 20px;
      border-bottom: 1px solid #9f9a9b;
    }
  }
}
</style>