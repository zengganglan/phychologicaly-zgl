<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- tab栏目 -->
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
        <div class="luru">批量录入设置</div>
        <ul class="a1">
          <li>
            <span>地点：</span>
            <div class="schoolcheck">
              <schoolcheck></schoolcheck>
            </div>
          </li>
          <li>
            <span>起始学号：</span>
            <input type="text" placeholder="请输入学号">
          </li>
          <li>
            <span>导入数量：</span>
            <input type="text" placeholder="请输入数量">
          </li>
          <li>
            <span>初始密码：</span>
            <input type="text" placeholder="请输入初始密码">
            <input type="button" value="随机生成">
            <input type="button" value="手动填写">
            <input type="password" placeholder="请输入六位数字">
          </li>
        </ul>
      </li>
      <li class="data2" v-else-if="tabindex==2">
        <div class="luru">参数设置</div>
        <ul class="a2">
          <li>
            <span>选择：</span>

            <div class="schoolcheck">
              <schoolcheck></schoolcheck>
            </div>
          </li>
          <li>
            <span>上传：</span>
            <input type="button" value="预览数据" class="hui">
            <a href="javascript:;" class="file">
              {{filename}}
              <form action method="post" enctype="multipart/form-data">
                <input
                  type="file"
                  name="myfile"
                  id="myfile"
                  ref="myfile"
                  class="upload"
                  @change="upload()"
                  v-if="shows"
                >
                <div
                  class="navbar"
                  v-else
                  :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2? '':'green'}"
                ></div>
              </form>
              <!--  -->
            </a>
          </li>
        </ul>
      </li>
      <li class="data3" v-else>
        <div class="working">
          <input type="button" value="通过审核">
          <input type="button" value="删除">
        </div>
        <!-- 表格 -->
        <tables :table="table"></tables>
        <pagination :page="page"></pagination>
      </li>
    </ul>
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
      shows: true,
      filename: "选择文件",
      file: {
        uploadPercentage: 1,
        uploadStatus:""
      },
      // 头部组件信息
      headson: ["学生资料录入", "录入学生个人资料"],
      // 筛选
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label",
        treeflag: false
      },
      // 切导航行栏
      tabls: ["手动输入", "从Excel导入", "密码操作"],
      tabindex: 1,
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
  watch: {
    filterText(val) {
      // 只要val改变就掉用过滤函数--把数据传给后台，后台过滤重新拿数据
      this.$refs.tree2.filter(val);
      console.log(val);
    }
  },

  created() {},
  methods: {
    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },

    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //树形
    showtree() {
      this.defaultProps.treeflag = !this.defaultProps.treeflag;
    },
    // 上传文件
    upload() {
      var filePath = event.target.value;
      if (filePath.indexOf("xlsx") != -1 || filePath.indexOf("xls") != -1) {
        // 读取文件
        var fileReader = new FileReader();
        var file = this.$refs.myfile.files[0];
        var name = file.name;
        // 开始读取二进制文件
        fileReader.readAsBinaryString(file);
        this.shows = false;
        this.filename = name;
         this.file.uploadPercentage = 50+'%';
        // 读取文件成功获取数据
        fileReader.onload = function() {
          alert("读取文件成功,把二进制信息传到后台");
          // 读取文件成功传到后台 同时出现进度条
          //配置全局请求头的配置
          var param = fileReader.result
          let config = {
            //添加请求头
            headers: {
              "Content-Type": "multipart/form-data"
            },
            //添加上传进度监听事件
            onUploadProgress: e => {
              var completeProgress = (((e.loaded / e.total) * 100) | 0) + "%";
              console.log(this.files);
              this.file.uploadPercentage = completeProgress;
            }
          };
          this.axios
            .post("http://127.0.0.1:8778/upload", param, config)
            .then(function(response) {
              console.log(response);
              this.file.uploadStatus = 2;
              // 如果上传成功可以激活预览按钮 可以点击预览。增加类名
            })
            .catch(function(error) {
              console.log(error);
              this.file.uploadStatus = -1;
            });
        };
      } else {
        alert("文件为空或者文件格式不是excel.请重新选择文件");
      }
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
// 文件上传
.file {
  // width: 100px;
  // height: 30px;
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
form {
  width: 100%;
  height: 100%;
}
.file input {
  position: absolute;
  font-size: 100px;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.navbar {
  position: absolute;
  font-size: 100px;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}

.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}

.hui {
  background-color: gray;
}
.blu {
  background-color: #169bd5;
}
.tabactive {
  color: #169bd5;
  border-bottom: 2px solid #169bd5;
}
input {
  outline: none;
  border: none;
}
.luru {
  border-left: 3px solid #169bd5;
  margin-top: 10px;
  color: #169bd5;
  padding-left: 10px;
}
.main {
  .tab {
    width: 90%;
    height: 40px;
    background-color: #ffffff;
    margin-left: 10px;
    color: #bfbfc0;
    font-size: 12px;
    ul {
      li {
        height: 40px;
        float: left;
        text-align: center;
        width: 200px;
        line-height: 40px;
      }
    }
  }
}
.data1 {
  margin-left: 10px;

  .a1 {
    width: 764px;
    height: 293px;
    background-color: #bfbfc0;
    // line-height: 70px;
    overflow: hidden;
    li {
      margin-top: 30px;

      span {
        margin-left: 170px;
      }
      input {
        width: 200px;
        height: 32px;
      }
    }
    li:nth-child(1) {
      position: relative;
      span {
        margin-left: 200px;
      }

      .schoolcheck {
        position: absolute;
        top: 0px;
        left: 255px;
        width: 200px;
        // height: 295px;
      }
    }
    li:nth-child(4) {
      input {
        width: 100px;
        margin-right: 20px;
        height: 32px;
      }
    }
  }
}
.data2 {
  margin-left: 10px;
  .a2 {
    width: 764px;
    height: 150px;
    background-color: #bfbfc0;
    padding-top: 20px;
    // overflow: hidden;
    li {
      span {
        margin-left: 50px;
      }
      input {
        width: 100px;
        height: 30px;
        margin-right: 20px;
      }
    }
    li:nth-child(1) {
      position: relative;
      .schoolcheck {
        position: absolute;
        top: 0px;
        left: 100px;
        width: 200px;
      }
    }
    li:nth-child(2) {
      margin-top: 20px;

      .file {
        position: relative;
        top: 10px;
      }
    }
  }
}
.data3 {
  .working {
    padding-top: 10px;
    height: 50px;
    width: 90%;
    input {
      height: 30px;
      width: 100px;
      text-align: center;
      float: right;
      margin-left: 20px;
      background-color: #169bd5;
    }
  }
  div {
  }
}
</style>



