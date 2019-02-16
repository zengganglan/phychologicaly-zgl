<template>
  <div class="login">
    <!-- 头部 -->
    <div class="head">
      <div class="top1">
        <ul>
          <li>首页</li>
          <li>资讯技术</li>
          <li>亲子关系</li>
          <li>情绪管理</li>
          <li>学校风采</li>
          <li>人际交往</li>
          <li>职场交往</li>
        </ul>
      </div>
      <div class="top2">
        <ul class="first">
          <li>1</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
        </ul>
        <ul class="second hidden">
          <li>2</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul class="third hidden">
          <li>3</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul class="forth hidden">
          <li>4</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul class="five hidden">
          <li>5</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel :interval="5000" arrow="always" height="410px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <!-- 登陆表单 -->
       <template v-if="loginsucess">
          <form action class="loginform">
        <label class="f1">用户名：
          <input type="text" name="user" ref="user" placeholder="请输入用户名" v-model="username">
        </label>
        <br>
        <label class="f2">密 &nbsp; 码：
          <input type="password" name="password" ref="password" placeholder="请输入密码" v-model="password">
        </label>
        <br>
        <label class="f3">
          验证码：
          <input type="text" name="yzm" placeholder="请输入验证码" v-model="yzm">
          <img src="http://demo.yishengya.cn/index.php/login/getCaptcha/0.37840486964475617" alt>
          <span>换一张</span>
        </label>
        <br>

        <label class="f4">
          <input type="checkbox" name="rember" ref="rember">记住密码&nbsp;&nbsp;&nbsp;
          <router-link tag="a" to="/register">注册</router-link>&nbsp;
         <router-link tag="a" to="/getUserPassword">忘记密码</router-link>

          <!-- <a href="#">注册</a>
          <a href="#">忘记密码</a> -->
        </label>
        <br>
        <input type="button" name="start" value="马上开始" @click="login">
      </form>
       </template>
      <!-- 如果登陆成功显示的弹窗 -->
       <template v-else>
         <div class="loginsucess">
           <div class="longinhead">
             <span>心理咨询管理系统</span>
             <i>[注销登陆]</i>
           </div>
           <div class="loginbody">
             <div class="left">
               <img src="" alt="">
             </div>
             <div class="right">
                <ul>
                  <li>演示学校</li>
                  <li>姓名：<i>江苏学校</i></li>
                  <li>省身份：<i>教务</i></li>
                </ul>
             </div>
           </div>
             <div class="loginout" @click="goindex">进入系统</div>
         </div>
       </template>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="a1">
        <div class="tit">
          <span>心理咨询管理系统</span>
        </div>
        <div class="sons">
          <ul class="son">
            <li>咨询技术</li>
            <li>亲子关系</li>
            <li>情绪管理</li>
            <li>学校风采</li>
            <li>人际交往</li>
            <li>职场交往</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
import Cookies from 'js-cookie';
import $ from "jquery";
$(function() {
  // $(".top2>ul:nth-child(1)")
  //   .siblings()
  //   .addClass("hidden");
  // $(".top2").css({ backgroundColor: "#0688C6", opacity: "0.6" });

  $(".top1>ul>li")
    .each(function(index) {
      $(this).attr("index", index);
    })
    .mouseover(function() {
      $(this).css({
        position: "relative",
        bottom: "20px",
        transition: "all 1s ease"
      });
      var index = $(this).attr("index");
      if (index == 0) {
        $(".top2").css({ backgroundColor: "#0688C6", opacity: "0.8" });
      } else if (index == 1) {
        $(".top2").css({ backgroundColor: "#F7BC3A", opacity: "0.8" });
      } else if (index == 2) {
        $(".top2").css({ backgroundColor: "#6ED2F2", opacity: "0.8" });
      } else if (index == 3) {
        $(".top2").css({ backgroundColor: "#F5868F", opacity: "0.8" });
      } else if (index == 4) {
        $(".top2").css({ backgroundColor: "#6DC0B8", opacity: "0.8" });
      } else if (index == 5) {
        $(".top2").css({ backgroundColor: "#B9696C", opacity: "0.8" });
      } else if (index == 6) {
        $(".top2").css({ backgroundColor: "#09C39C", opacity: "0.8" });
      }
      $(".top2>ul:nth-child(" + index + ")")
        .removeClass("hidden")
        .siblings()
        .addClass("hidden");
    })
    .mouseout(function() {
      $(this).css({
        position: "relative",
        bottom: "0px",
        transition: "all 1s ease"
      });
    });
});

export default {
  data() {
    //拿到值检测是否合法返回数值供组件调用
    return {
      username:"",
      password:"",
      yzm:"",
      loginsucess:true,

    }
  
  },
  created(){
      this.getinfo()
  },
 
  methods: {
    //点击登陆拿到数据判断用户对象，根据用户对象跳转学生页面还是老师页面，陈用户信息存到store里面以便其他的组件需要
    //点第一次登陆保存cookie.可以做登陆拦截，不管又没么有点击记住密码cookie都会有值，都能获取到，所以只能保存到本地储存。
    login(){
      //点击触发事件匹配输入框正则，在给后台提交获得的信息返回结果看是否登陆成功 登陆成功就设置cookie放到vuex里面
       if(!this.username  || !this.password){
            alert("请输入用户名或密码")
        }else{
            let data = {'username':this.username,'password':this.password,yzm:this.yzm}
            console.log(data)
            /*接口请求 ,返回结果应该有用户类型，和具体用户信息userid 是否可以登陆成功信息*/
            // this.$http.post().then((res)=>{
            //   console.log(res)
            // })
            if(this.username=='teacher'){
              //设置cookie
                var uid =1
                // 保存一份在cookie，保存一份在store里面，刷新store里面没有数据
                 Cookies.set('userId', 1)
                  this.$store.commit('getuid')
                  this.$store.commit('setuid',uid)
              //第一次登陆检查又没有选择记住密码，如果选择就把用户登陆信息和密码同时放到cookie里面或则放到本地存储
              var checked= this.$refs.rember.checked
               if (checked) {
                 Cookies.set('username', this.username)
                 Cookies.set('password', this.password)

               }
              //返回成功出现弹窗。可以点击进入系统/跳转相关页面
              this.loginsucess=false;
              // this.$router.push("/teacherindex/teacherschool")
            }else{
              alert("用户名不存在")
            }
             
        }
    },
    //页面刷新调用的方法：自动获取本地存储的用户名和密码，自动添加到data里面进行赋值
       getinfo(){
         var username=  Cookies.get('username')
         var password=  Cookies.get('password')
         this.username=username 
         this.password=password 

       },
       goindex(){
         console.log("xuesheng")
         this.$router.push("/studentindex/studentschool")
       }
  }
};
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 150px;
  > .top1 {
    position: relative;
    height: 90px;
    > ul {
      height: 60px;
      position: absolute;
      bottom: 0;
      right: 200px;
      > li {
        float: left;
        width: 110px;
        height: 80px;
      }
      > li:nth-child(1) {
        background-color: #0688c6;
      }
      > li:nth-child(2) {
        background-color: #f7bc3a;
      }
      > li:nth-child(3) {
        background-color: #6ed2f2;
      }
      > li:nth-child(4) {
        background-color: #f5868f;
      }
      > li:nth-child(5) {
        background-color: #6dc0b8;
      }
      > li:nth-child(6) {
        background-color: #b9696c;
      }
      > li:nth-child(7) {
        background-color: #09c39c;
      }
    }
  }
  > .top2 {
    position: relative;
    z-index: 99;
    background-color: #0688c6;
    opacity: 0.6;

    height: 60px;
    > ul {
      position: absolute;
      right: 250px;

      > li {
        width: 130px;
        float: left;
      }
    }
  }
}
.show {
  display: block;
}
.hidden {
  display: none;
}

.banner {
  position: relative;
  top: -60px;
  .loginform {
    width: 325px;
    height: 267px;
    top: 90px;
    position: absolute;
    right: 170px;
    background: #47a9de;
    background: rgba(65, 165, 220, 0.8);
    color: #fff;
    width: 295px;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 4;
    .f1 {
      display: inline-block;
      width: 100%;
      margin-top: 20px;
      input[name="user"] {
        height: 30px;
        width: 200px;
        padding: 0 5px;
      }
    }
    .f2 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      input[name="password"] {
        height: 30px;
        width: 200px;
        padding: 0 5px;
      }
    }
    .f3 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      input[name="yzm"] {
        height: 30px;
        width: 80px;
        padding: 0 5px;
      }
      img {
        height: 33px;
        vertical-align: bottom;
        margin-right: 5px;
        width: 60px;
      }
      span {
        cursor: pointer;
      }
    }
    .f4 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      text-align: center;
      a {
        color: #fff100;
        font-size: 12px;
      }
    }
    input[name="start"] {
      margin-top: 20px;
      -webkit-appearance: none;
      width: 100%;
      height: 40px;
      font-size: 18px;
      border-radius: 5px;
      background: #fff;
      border: 0;
      color: #0186d1;
      font-family: "microsoft yahei";
      cursor: pointer;
    }
  }
  .loginsucess{
    width: 325px;
    height: 200px;
    top: 90px;
    position: absolute;
    right: 170px;
    background: #47a9de;
    background: rgba(65, 165, 220, 0.8);
    color: #fff;
    width: 295px;
    padding: 10px 0;
    border-radius: 5px;
    z-index: 4;
    .longinhead{
      height:30px;
      border-bottom:1px solid #fff;
      padding: 0 10px;
      i{
       float: right;
       color: yellow;
      }

    }
    .loginbody{
      height: 120px;
       .left{
         width: 100px;
         float: left;
       }
       .right{
        float: left;
        line-height: 40px
       }
      
    }
     .loginout{
         height: 40px;
         background-color: #fff;
          width: 90%;
          margin: 0 auto;
          text-align: center;
          line-height: 40px;
          color: #46bcfc;
          border-radius: 10px;
         
       }
  }
}

.el-carousel__item h3 {
  height: 100%;
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 410px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.bottom {
  position: relative;
  top: -60px;
  width: 100%;
  .a1 {
    padding-top: 75px;
    height: 405px;
    background-color: #1993d6;

    .tit {
      width: 1000px;
      margin: 0 auto;
      height: 76px;
      border-top: 1px solid #46bcfc;
      position: relative;
      span {
        font-size: 32px;
        top: -30px;
        left: 330px;
        text-align: center;
        line-height: 60px;
        position: absolute;
        display: inline-block;
        width: 377px;
        height: 60px;
        background-color: #1993d6;
      }
    }
    .sons {
      .son {
        display: flex;
        justify-content: center;
        li {
          float: left;
          width: 220px;
          height: 250px;
          text-align: center;
        }
        li:nth-child(1) {
          background-color: #f7bc3a;
        }
        li:nth-child(2) {
          background-color: #6ed2f2;
        }
        li:nth-child(3) {
          background-color: #f5868f;
        }
        li:nth-child(4) {
          background-color: #6dc0b8;
        }
        li:nth-child(5) {
          background-color: #b9696c;
        }
        li:nth-child(6) {
          background-color: #09c39c;
        }
      }
    }
  }
}
</style>