<template>
  <div class="head">
    <div class="a1">{{headson[0]}}</div>
    <span class="a2">{{headson[1]}}</span>
  </div>
</template>

<script>
export default {
  props: ["headson"],
  created() {
    console.log(this.headson);
  }
};
</script>

<style lang="scss" scoped>
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
</style>