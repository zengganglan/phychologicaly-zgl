<template>
  <div>
    <table class="tb_list" ref="tables">
      <thead>
        <tr>
          <th>
            <input type="checkbox" name="available" value="0" ref="allcheck" @click="allcheck()">全选
          </th>
          <!-- 也可以循环遍历 -->
          <th v-for="(item,index) in table.thead" :key="index">{{item}}</th>
        </tr>
      </thead>
       <tbody>
                <tr v-for="(item,index) in table.tableData3" :key="index" @mouseover="changecolor(index)" v-bind:class="{heightcolor:isactive==item.sort}" @mouseout="colorcancel()">
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
                    <span>{{item.xuehao}}</span>
                  </td>
                  <td>
                    <span >{{item.name}}</span>
                  </td>
                  <td>
                    <span >{{item.sex}}</span>
                  </td>
                  <td>
                    <span >{{item.age}}</span>
                  </td>
                  <td>
                    <span >{{item.class}}</span>
                  </td>
                  <td>
                    <span >{{item.phones}}</span>
                  </td>
                  <td>
                    <span >{{item.time}}</span>
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
            
              </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
            // 高亮显示
      isactive:"",
      // 编辑
      index1: ""
    };
  },
  created(){
         console.log(this.table.tableData3)
  },
  methods: {
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
     // 划过事件
    changecolor(index){
      console.log(index)
      this.isactive=index-0+1;
      
    },
    colorcancel(){
      this.isactive=""
    }
  },
  // 父组件点击搜索传给子组件thead 和 data数据。开始渲染
  props: ["table"]
};
</script>

<style lang="scss" scoped>
 .heightcolor{
      background-color: #8d929c;
 }
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
</style>