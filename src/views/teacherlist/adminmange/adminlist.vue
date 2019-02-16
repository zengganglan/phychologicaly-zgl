<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <div class="search">
      <ul>
        <li>
          <!-- 学校组件 -->
           <span>范围：</span>
            <div class="schoolcheck1">
          <schoolcheck ref="schoolcheck1" ></schoolcheck>
            </div>
        </li>
        <li>类型：
          <select name="school" id="type" selected="selected" value>
            <option value="1">不限</option>
            <option value="2">心理咨询师</option>
            <option value="3">校长</option>
            <option value="4">管理员</option>
          </select>
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
      </div>
      <tables :table="table"></tables>
      <pagination :page="page"></pagination>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import headson from "../../../components/headson";
import schoolcheck from "../../../components/schoolcheck";
import tables from "../../../components/table";
import pagination from "../../../components/pagination";
export default {
  data() {
    return {
      // 头部组件信息
      headson: ["管理员列表", "查询管理员列表信息"],

      // 搜索出现表格
      tableflag: false,
      // 页码
      page: {
        currentpage: 1,
        countpage: "",
        pagesize: 1,
        flag: false
      },

      //页面初始化请求数据赋值
      table: {
        thead: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
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
      }
    };
  },

  created() {},
  mounted() {
    this.getList();
    console.log(this.$refs.schoolcheck1);
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      this.page.countpage = Math.ceil(
        this.table.tableData3.length / this.page.pagesize
      );
    },

    // 导出excel表格功能
    handleDownload() {
      let vm = this;
      //  var icheck = this.$refs.icheck;

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

    // 搜索功能
    showtable() {
      //子组件树形控件的开关
      this.$refs.schoolcheck1.treeflag = false;
      this.tableflag = true;

      this.$refs.schoolcheck1.newvalue;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      console.log(1);
    }
  },
  components: {
    headson: headson,
    schoolcheck: schoolcheck,
    tables: tables,
    pagination: pagination
  }
};
</script>

<style lang="scss" scoped>
.tabactive {
  color: #169bd5;
}

.main {
  .search {
    height: 65px;
    width: 1000px;
    margin: 0 auto;
    background-color: #cccccc;
    ul {
      width: 100%;
      display: flex;
      padding-top: 15px;
      li:nth-child(1) {
        float: left;
        margin-left: 50px;
        .schoolcheck1{
          position: relative;
          top: -20px;
          left: 40px;
          width: 150px;
        }
      }
      li:nth-child(2) {
        float: left;
        margin-left: 50px;
        #type {
          height: 32px;
          outline: none;
          width: 150px;
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
      li:nth-child(3) {
        float: left;
        margin-left: 50px;
        #person {
          height: 32px;
          outline: none;
          width: 200px;
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
    // overflow: hidden;
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
}
</style>



