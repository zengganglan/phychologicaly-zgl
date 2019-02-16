<template>
  <div class="main">
    <div class="head">
      <div class="a1">单位组别设置</div>
      <span class="a2">单位组别设置，导出</span>
    </div>
    <div class="body">
      <div class="work">
        <span class="del" @click="handleDownload">导出</span>
             <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->

        <span class="export" @click="handleDelAll">选中删除</span>
      </div>
      <div class="datas">
         <table class="tb_list" ref="tables">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="available"
                  value="0"
                  ref="allcheck"
                  @click="allcheck()"
                >全选
              </th>
              <!-- 也可以循环遍历 -->

              <th v-for="(item,index) in thead" :key="index" >{{item}}</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData3" :key="index" @mouseover="changecolor(index)" v-bind:class="{heightcolor:isactive==item.sort}" @mouseout="colorcancel()">
              <td align="center">
                <input
                  type="checkbox"
                  name="available"
                  :value="item.sort"
                  ref="icheck"
                  @click="icheck()"
                >
              </td>
              <td class="sort">{{item.sort}}</td>
              <td class="class">
                <input v-if="item.sort==index1" type="text" v-model="item.class">
                <!-- 点击跳转相关年纪的班级 -->
                <router-link v-else :to="'/admin/grade.vue/' + item.sort" tag="a">{{item.class}}</router-link>
                
              </td>
              <td>
                <input v-if="item.sort==index1" type="text" v-model="item.name">
                <span v-else>{{item.name}}</span>
              </td>
              <td>
                <input v-if="item.sort==index1" type="text" v-model="item.ID">
                <span v-else>{{item.ID}}</span>
              </td>

              <td>
                <template v-if="item.sort==index1">
                  <span @click="queding(item.sort)">确定</span>
                  <span @click="cancle(item.sort)">取消</span>
                </template>
                <template v-else>
                  <span @click="setting(item.sort)">编辑</span>
                  <span @click="del(item.sort)">删除</span>
                </template>
              </td>
            </tr>
            <template v-if="addflag">
              <tr>
                <td align="center">
                  <input type="checkbox" name="available" value="0">
                </td>
                <td class="sort">{{tableData3.length+1}}</td>
                <td class="class">
                  <input type="text" v-model="values.value1">
                </td>
                <td>
                  <input type="text" v-model="values.value2">
                </td>
                <td>
                  <input type="text" v-model="values.value3">
                </td>

                <td>
                  <span @click="queding()">确定</span>
                  <span @click="cancle()">取消</span>
                </td>
              </tr>
            </template>
          </tbody>
         </table>
      </div>
    </div>
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
    <div class="add" @click="addnumber()" v-if="!addflag">新增</div>
    <div class="complete" @click="complete()" v-else>完成</div>

  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import excelbtn from "../../../components/excel"
export default {
  data() {
    return {
      // 高亮显示
      isactive:"",
      // 页码
      currentpage: 1,
      countpage: "",
      pagesize: 1,
      flag: false,
      // 编辑
      index1: "",
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
        value3: ""
      },
      //请求数据赋值
      thead:["所属类", "班级", "姓名", "id", "操作"],
      filterVal :["sort", "class", "name", "ID"],
      tableData3: [
        {
          sort: "1",
          class: "2034级2班",
          name: "王小虎1",
          ID: "22222"
        },
        {
          sort: "2",
          class: "20324级2班",
          name: "王小虎2",
          ID: "3333333"
        },
        {
          sort: "3",
          class: "20324级2班",
          name: "王小虎3",
          ID: "3333333"
        },
        {
          sort: "4",
          class: "20324级2班",
          name: "王小虎3",
          ID: "3333333"
        }
      ]
    };
  },
  created() {
    this.getList()
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      this.countpage=Math.ceil(this.tableData3.length/this.pagesize);
      
    },
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
    // 根据allpage/pagesize更新数据/手动输入enter键
    updatepage() {
      var countpage = this.tableData3.length;
      console.log(1, countpage);
      //调用请求数据方法
    },
    //点击返回首页
    first() {
      this.currentpage = 1;
    },
    // 点击返回最后一页
    last() {
      this.currentpage = this.tableData3.length;
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
      if (this.currentpage < this.tableData3.length) {
        this.currentpage = this.currentpage - 0 + 1;
        console.log(typeof this.currentpage);
      }
    },

    // 增加数据开始
    addnumber() {
      this.addflag = true;
      console.log(this.addflag);
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },
    //增加数据把填写的数据得到完成向后台提交数据
    complete(){
     this.addflag = false;
     console.log(this.values)
    },
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false和关闭打开的编辑框
      console.log(this.value1);
      this.addflag = false;
      this.index1 = "";
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
    },
    // 点击编辑出现文本框
    setting(id) {
      // this.settingflag.id=id
      // console.log(this.settingflag)
      console.log(id);
      this.index1 = id;
    },
    // 点击删除单条数据
    del(id) {},
    //点击删除选中的数据【在点击上一页下一页需要记录每页选择的数据，如果新数组没有且当页选择了就当进去，如果新数组有当页没选择就删除】
    handleDelAll() {
      var icheck = this.$refs.icheck;
      var newarr = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          newarr.push(value);
        }
      }
      //  把删除的标记值传给后台
      console.log(newarr);
    },
    // 全选反选
    allcheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      for (var i = 0; i < icheck.length; i++) {
        // 把allchecked的状态赋值给每一个子选框
        icheck[i].checked = allcheck.checked;
      }
    },
    //反选
    icheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      var flag = true;
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked == false) {
          flag = false;
        }
      }
      allcheck.checked = flag;
    },
    // 导出excel表格功能---写成全局方法点击传参调用
    handleDownload() {
      let vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel.js");
        const tHeader = ["字段1", "字段2", "字段3", "字段4"];
        const filterVal = ["sort", "class", "name", "ID"];
        // 点击导出找到checkbox选中的id数据，导出选中的就行
        const list = vm.tableData3;
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出的列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 划过事件
    changecolor(index){
      console.log(index)
      this.isactive=index-0+1;
      
    },
    colorcancel(){
      this.isactive=""
    }
  },
//  components: {
//     // 用来注册子组件的节点
//     "excel-box": excelbtn
//   }
};
</script>

<style lang="scss" scoped>
// table高亮显示
 .heightcolor{
      background-color: #8d929c;
 }
 a{
   color:#169bd5;
 }
.pagi{
  display: flex;
width: 90%;
margin: 0 auto;
  justify-content: flex-end;
}
.pagination {
  width: 200px;
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
.main {
  .head {
    height: 135px;
    padding: 0 20px;
    background-color: #E9D4D4;
    overflow: hidden;
    .a1 {
      margin-top: 30px;
      font-size: 25px;
    }
    .a2 {
      font-size: 12px;
      color: #9f9a9b;
    }
  }
  .body {
    overflow: hidden;
    .work {
      width: 90%;
      margin: 0 auto;
      span {
        display: inline-block;
        float: right;
        width: 55px;
        height: 20px;
        background-color: #169bd5;
        color: white;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        border-radius: 5px;
      }
      span:nth-child(1) {
        margin-left: 20px;
      }
    }
    .datas {
      margin-top: 30px;
      .tb_list {
        margin: 0 auto;
        width: 90%;
        border-top: 1px solid #dfd7d7;
        thead {
          th {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 30px;
            line-height: 30px;
          }
        }
        tbody {
          td {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 36px;
            line-height: 36px;
          }
        }
      }
    }
  }
  .add,.complete{
    width: 310px;
    height: 25px;
    margin: 0 auto;
    background-color: #169bd5;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
    color: white;
  }
}
</style>