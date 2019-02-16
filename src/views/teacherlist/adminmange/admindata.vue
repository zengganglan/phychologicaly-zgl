<template>
  <div class="main">
    <div class="head">
      <div class="a1">学生资料管理</div>
      <span class="a2">管理学生个人资料</span>
    </div>
    <div class="tab">
      <ul>
        <li
          v-for="(item,index) in tabls"
          :class="{tabactive:tabindex-1==index}"
          :key="index"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
    </div>
    <ul>
      <li class="data1" v-if="tabindex==1">
        <div class="search">
          <ul>
            <li>
              <span>范围：</span>
              <input type="button" value="演示中学" id="school" @click="showtree()">
              <div class="tree" v-if="defaultProps.treeflag">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

                <div class="box">
                  <el-tree
                    class="filter-tree"
                    :data="data2"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree2"
                  ></el-tree>
                </div>
              </div>
              <!-- <select name="school" id="school" selected="selected" value>
                <option value="1">演示中学1</option>
                <option value="2">演示中学2</option>
                <option value="3">演示中学3</option>
              </select>-->
            </li>
            <li>
              <span>学生查询：</span>
              <input type="text" value id="person">
              <!-- 点击搜索开始出现table表格 -->
              <i class="iconfont icon-sousuo" @click="showtable()"></i>
            </li>
          </ul>
        </div>
        <div class="body" v-if="tableflag">
          <div class="work">
            <span class="del" @click="handleDownload">导出</span>
            <span class="export" @click="handleDelAll">选中删除</span>
            <span class="div">分发量表</span>
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
                  <th>序号</th>
                  <th>学号</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>年龄</th>
                  <th>班级</th>
                  <th>手机</th>
                  <th>登陆时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in tableData3" :key="index">
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
                    <input v-if="item.sort==index1" type="text" v-model="item.xuehao">
                    <span v-else>{{item.xuehao}}</span>
                  </td>
                  <td>
                    <input v-if="item.sort==index1" type="text" v-model="item.name">
                    <span v-else>{{item.name}}</span>
                  </td>
                  <td>
                    <input v-if="item.sort==index1" type="text" v-model="item.sex">
                    <span v-else>{{item.sex}}</span>
                  </td>
                  <td>
                    <input v-if="item.sort==index1" type="text" v-model="item.age">
                    <span v-else>{{item.age}}</span>
                  </td>
                  <td>
                    <input v-if="item.sort==index1" type="text" v-model="item.class">
                    <span v-else>{{item.class}}</span>
                  </td>
                  <td>
                    <input v-if="item.sort==index1" type="text" v-model="item.phones">
                    <span v-else>{{item.phones}}</span>
                  </td>
                  <td>
                    <input v-if="item.sort==index1" type="text" v-model="item.time">
                    <span v-else>{{item.time}}</span>
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
          <div class="pagi">
            <div class="pagination">
              <span class="first" @click="first"></span>
              <input type="button" value="上" class="pre" @click="prev">
              <input
                type="text"
                v-model="currentpage"
                class="page"
                @click="show"
                @keyup.enter="updatepage"
              >
              <span class="check" @click="show"></span>
              <input type="button" value="下" class="next" @click="nex">
              <span class="end" @click="last"></span>

              <ul class="pages" v-if="flag" @click="check()">
                <!-- 根据allpage动态渲染 加滚动条 -->
                <li v-for="index in countpage" :key="index">{{index}}</li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li class="data2" v-else-if="tabindex==2">
        <div class="luru">资料转移</div>
        <ul>
          <li class="zy1">
            <span>班级：</span>
            <div>
              <schoolcheck></schoolcheck>
            </div>
          </li>
          <li>-----------></li>
          <li class="zy2">
            <span>班级：</span>
            <div>
              <schoolcheck></schoolcheck>
            </div>
          </li>
          <li class="zy3">
            <span>开始转移</span>
          </li>
        </ul>
      </li>
      <li class="data3" v-else>3</li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import schoolcheck from "../../../components/schoolcheck";

export default {
  data() {
    return {
      // 筛选
      filterText: "",
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        treeflag: false
      },
      // 切导航行栏
      tabls: ["查询列表", "资料转移", "密码操作"],
      tabindex: 1,
      tableflag: false,
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
      tableData3: [
        {
          sort: "1",
          xuehao: "222014003",
          name: "王小虎1",
          ID: "22222",
          sex: "女",
          age: "女",
          class: "2016级三班",
          phones: "1527282920",
          time: "2013/3/3"
        },
        {
          sort: "2",
          xuehao: "222014003",
          name: "王小虎1",
          sex: "女",
          age: "13",
          class: "2016级三班",
          phones: "1527282920",
          time: "2013/3/3"
        },
        {
          sort: "3",
          xuehao: "222014003",
          name: "王小虎1",
          ID: "22222",
          sex: "女",
          age: "女",
          class: "2016级三班",
          phones: "1527282920",
          time: "2013/3/3"
        },
        {
          sort: "4",
          xuehao: "222014003",
          name: "王小虎1",
          ID: "22222",
          sex: "女",
          age: "女",
          class: "2016级三班",
          phones: "1527282920",
          time: "2013/3/3"
        }
      ]
    };
  },
  watch: {
    filterText(val) {
      // 只要val改变就掉用过滤函数--把数据传给后台，后台过滤重新拿数据
      this.$refs.tree2.filter(val);
      console.log(val);
    }
  },

  created() {
    this.getList();
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      this.countpage = Math.ceil(this.tableData3.length / this.pagesize);
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
      console.log(this.filterText, data);
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

    // 增加数据
    addnumber() {
      this.addflag = true;
      console.log(this.addflag);
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false
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
    //点击删除选中的数据
    handleDelAll() {
      var icheck = this.$refs.icheck;
      var newarr = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          // 找到选中单选框数据的id唯一值
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
    // 导出excel表格功能
    handleDownload() {
      let vm = this;
      // 找出每一页选中数据
      var icheck = this.$refs.icheck;
      var newarr = [];

      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          // 找到选中单选框数据的id唯一值,后台在返回新数据data给我我去导出
          newarr.push(value);
        }
      }
      console.log(newarr);
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel.js");
        const tHeader = ["字段1", "字段2", "字段3", "字段4"];
        const filterVal = ["sort", "class", "name", "ID"];
        const list = vm.tableData3;
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出的列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },
    // 搜索功能
    showtable() {
      this.tableflag = true;
      this.defaultProps.treeflag = false;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      console.log(1);
    },
    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //
    showtree() {
      this.defaultProps.treeflag = !this.defaultProps.treeflag;
    }
  },
  components: {
    schoolcheck: schoolcheck
  }
};
</script>

<style lang="scss" scoped>
.tabactive {
  color: #169bd5;
}
.pagi {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: flex-end;
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
    background-color: #e9d4d4;
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
  .tab {
    width: 90%;
    height: 40px;
    margin-left: 10px;
    background-color: #ffffff;
    color: #bfbfc0;
    font-size: 12px;
    ul {
      li {
        height: 40px;
        float: left;
        text-align: center;
        width: 200px;
        line-height: 40px;
        margin-left: 10px;
      }
    }
  }
  .search {
    height: 65px;
    line-height: 65px;
    width: 90%;
    margin: 0 auto;
    background-color: #cccccc;
    ul {
      li:nth-child(1) {
        position: absolute;
        float: left;
        margin-left: 100px;
        #school {
          height: 32px;
          width: 190px;
        }
        .tree {
          width: 190px;
          position: relative;
          top: -20px;
          left: 53px;
          .el-input {
            height: 45px;
            box-sizing: border-box;
          }
          .box {
            overflow: auto;
            height: 100px;
            position: relative;
            top: -18px;
          }
        }
      }
      li:nth-child(2) {
        float: right;
        margin-right: 100px;
        #person {
          height: 32px;
          outline: none;
          width: 273px;
        }
        .icon-sousuo {
          display: inline-block;
          font-size: 32px;
          vertical-align: middle;
          background-color: #169bd5;
          height: 32px;
          line-height: 32px;
          color: #ffffff;
          position: relative;
          left: -5px;
        }
      }
    }
  }
  .body {
    overflow: hidden;
    margin-top: 10px;

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
      .div {
        margin-right: 20px;
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
      .qx {
        position: relative;
        left: 30px;
        top: 35px;
        z-index: 2;
        font-size: 12px;
        color: #8d929c;
      }
    }
  }
  .add {
    width: 310px;
    height: 25px;
    margin: 0 auto;
    background-color: #169bd5;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
    color: white;
  }
  .data2 {
    margin-left: 10px;
    height: 126px;
    width: 90%;
    background-color: #9f9a9b;
    .luru {
      border-left: 3px solid #169bd5;
      margin-top: 10px;
      color: #169bd5;
      padding-left: 10px;
      font-size: 20px;
    }
    ul {
      width: 100%;
      margin-top: 20px;
      li {
        float: left;
        text-align: center;
        position: relative;
        span {
          position: absolute;
          top: 5px;
          left: 0;
        }
      }

      li:nth-child(1) {
        width: 300px;
        height: 50px;
        margin-left: 20px;
        div {
          height: 50px;
          width: 200px;
          display: inline-block;
        }
      }
      li:nth-child(2) {
        width: 100px;
      }
      li:nth-child(3) {
        width: 300px;
        margin-left: 20px;
        div {
          height: 50px;
          width: 200px;
          display: inline-block;
        }
      }
      li:nth-child(4) {
        width: 100px;
        height: 30px;
        background-color: #169bd5;
        text-align: center;
        span {
          position: absolute;
          top: 5px;
          left: 15px;
          color: white;
        }
      }
    }
  }
}
</style>



