<template>
<div>
 <!-- <span>范围：</span> -->
 <input type="button" v-model="newvalue" id="school" @click="showtree()"> 
  <div class="tree" v-if="treeflag">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <div class="box">
      <el-tree
        @node-click="nodeclick"
       :check-on-click-node="true"
        :highlight-current="true"
        class="filter-tree"
        :data="data2"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2"
      ></el-tree>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      // 父组件控制学校选择框组件开关
      treeflag: false,
      // 下拉框
      newvalue:"",
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
      }
    };
  },
  created(){
   this.newvalue=this.data2[0].label
  },
  watch: {
    filterText(val) {
      // 只要val改变就掉用过滤函数--把数据传给后台，后台过滤重新拿数据
      this.$refs.tree2.filter(val);
      console.log(val);
    }
  },
  methods: {
    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nodeclick(a1,a2,a3){
      // console.log(a1,a2,a3)
     this.newvalue=a1.label
       this.treeflag=!this.treeflag;

    },
     showtree(){
      this.treeflag=!this.treeflag;

    }

  },
};
</script>

<style lang="scss" scoped>
div{
  width: 100%; 
  #school {
          height: 32px;
          // width: 150px;
            width: 100%; 

        }

.tree {
  //  width: 150px;
  position: relative;
  top: -17px;
  left: 0px;
  z-index: 999;
  .el-input {
    height: 45px;
    box-sizing: border-box;
    position: relative;
    top: 27px;
  }
  .box {
    overflow: auto;
    height: 155px;
    position: relative;
    top: 17px;
    background-color: white;
  }
}
}

</style>