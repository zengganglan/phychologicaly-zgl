<template>
  <div>
    <div class="register">
      <div class="box">
        <ul class="head">
          <li
            v-for="(item, index1) in items"
            v-bind:key="index1"
            @click="show(index1+1)"
            ref="el"
          >{{item.message}}</li>
        </ul>

        <ul class="body">
          <template v-if="index==1">
            <li>
              <input type="text" placeholder="请使用中国大陆手机号码" name="phone">
              <br>
              <input type="text" placeholder="短信验证码" name="yzm">
              <input type="button" value="获取验证码" name="getyzm">
              <br>
              <input
                type="password"
                id="mm-pwd"
                ref="mmpwd"
                placeholder="设置密码"
                name="password"
                v-on:keyup="check()"
              >
              <span id="mm-pd" ref="mmpd" style="color: red; font-size: 12px; line-height: 30px;"></span>
              <div class="mm-btm">
                <div id="lv1" ref="lv1">弱</div>
                <div id="lv2" ref="lv2">中</div>
                <div id="lv3" ref="lv3">强</div>
              </div>
              <input type="text" placeholder="确认密码" name="againpass">
              <br>
              <input type="checkbox" name="check" id="btn">我已阅读并遵守
              <a href="#">《心理咨询系统服务条款》</a>
              <br>
              <input type="button" value="注册" name="btn">
            </li>
          </template>

          <template v-else>
            <li>
              <input type="text" placeholder="请使用常用邮箱" name="phone">
              <br>
              <input type="text" placeholder="短信验证码" name="yzm">
              <input type="button" value="获取验证码" name="getyzm">
              <br>
              <input
                type="password"
                id="mm-pwd"
                onkeyup="show()"
                placeholder="设置密码"
                name="password"
              >
              <span id="mm-pd" style="color: red; font-size: 12px; line-height: 30px;"></span>
              <div class="mm-btm">
                <div id="lv1">弱</div>
                <div id="lv2">中</div>
                <div id="lv3">强</div>
              </div>
              <input type="text" placeholder="确认密码" name="againpass">
              <br>
              <input type="checkbox" name="check" id="btn">我已阅读并遵守
              <a href="#">《心理咨询系统服务条款》</a>
              <br>
              <input type="button" value="注册" name="btn">
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 密码强度正则匹配，匹配后改变颜色
  data() {
    return {
      items: [{ message: "用手机注册" }, { message: "用邮箱注册" }],
      index: 1
    };
  },
  created() {},
  methods: {
    show(index) {
      this.index = index;
      if (index == 1) {
        this.$refs.el[1].style.cssText =
          "border-bottom:2px solid #E6E6E6;border-top:2px solid #E6E6E6;";
        this.$refs.el[0].style.cssText =
          "border-bottom:none;border-top:3px solid #2E7DBF;";
      } else {
        this.$refs.el[0].style.cssText =
          "border-bottom:2px solid #E6E6E6;border-top:2px solid #E6E6E6;";
        this.$refs.el[1].style.cssText =
          "border-bottom:none;border-top:3px solid #2E7DBF;";
      }
    },

    check() {
        var a = this.$refs.mmpwd.value
        var mmpd = this.$refs.mmpd
        var lv1 = this.$refs.lv1
        var lv2 = this.$refs.lv2
        var lv3 = this.$refs.lv3
      if (a.length == 0) {
        mmpd.innerHTML = "密码不能为空！";
      } else if (a.length < 6) {
        mmpd.innerHTML = "密码长度不能小于6个字符!";
        lv1.style.borderTopColor = "";
        lv2.style.borderTopColor = "";
        lv3.style.borderTopColor = "";
      } else if (a.length >= 6 && a.length <= 16) {
        mmpd.innerHTML = "";
        var reg = /^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/; //全是数字或全是字母 6-16个字符
        var reg1 = /^[A-Za-z0-9]{6,16}$/; //数字、26个英文字母 6-16个字符
        var reg2 = /^\w{6,16}$/; // 由数字、26个英文字母或者下划线组成的字符串 6-16个字符
        if (a.match(reg)) {
            console.log(1)
           lv1.style.borderTopColor = "red";
           lv2.style.borderTopColor = "";
           lv3.style.borderTopColor = "";
        } else if (a.match(reg1)) {
          //   document.getElementById("lv1").style.borderTopColor="red";
          lv1.style.borderTopColor = "";
          lv2.style.borderTopColor = "";
          lv3.style.borderTopColor = "yellow";
        } else if (a.match(reg2)) {
          lv1.style.borderTopColor = "";
          lv2.style.borderTopColor = "";
          lv3.style.borderTopColor = "green";
        }
      } else if (a.length > 16) {
          mmpd.innerHTML =
          "密码长度不能大于16个字符!";
         lv1.style.borderTopColor = "gainsboro";
         lv2.style.borderTopColor = "gainsboro";
         lv3.style.borderTopColor = "gainsboro";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 794px;
  height: 553px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #e6e6e6;
  margin-top: 100px;
  .box {
    margin: 0 auto;
    margin-top: 38px;
    width: 324px;
    height: 378px;
    // background-color: #CDCDCB;
    .head {
      height: 33px;
      li {
        width: 48.77%;
        float: left;
        text-align: center;
        line-height: 33px;
      }
      li:nth-child(1) {
        border-top: 3px solid #2e7dbf;
        border-left: 2px solid #dddddd;
        border-right: 2px solid #dddddd;
      }
      li:nth-child(2) {
        transform: translateX(-2px);
        border: 2px solid #dddddd;
      }
    }
    .body {
      position: relative;
      li {
        top: 0;
        position: absolute;
        height: 100%;
        input[name="phone"],
        input[name="againpass"],
        input[name="password"],
        input[name="btn"] {
          width: 322px;
          height: 32px;
          border: 2px solid #e6e6e6;
        }
        input[name="phone"] {
          margin-top: 50px;
          margin-bottom: 10px;
        }
        input[name="yzm"] {
          height: 32px;
          width: 244px;
          border: 2px solid #e6e6e6;
        }
        input[name="getyzm"] {
          border: 2px solid #e6e6e6;
          background-color: #5bb95a;
          height: 32px;
          margin-bottom: 10px;
          border: none;
        }
        input[name="againpass"] {
          margin-bottom: 20px;
        }
        input[name="btn"] {
          margin-top: 30px;
          background-color: #418bc8;
          border: none;
        }
      }
    }
  }
}
.mm-btm {
  height: 40px;
  width: 140px;
  position: relative;
  margin-top: 10px;
}

#lv1,
#lv2,
#lv3 {
  height: 30px;
  width: 40px;
  border-top: 6px solid #cdcdcb;
  margin-left: 3px;
  float: left;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
}
</style>