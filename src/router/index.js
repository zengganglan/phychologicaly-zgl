import Vue from 'vue'
import Router from 'vue-router'
import teacherlayout from '../views/layout/teacherlayout'
//管理员所有子页面
import teacherschool from '../views/layout/teacherschool'
import Groupsettings from '../views/teacherlist/adminmange/Groupsettings'
import admindata from "../views/teacherlist/adminmange/admindata"
import grade from "../views/teacherlist/adminmange/grade"
import admintype from "../views/teacherlist/adminmange/admintype"
import adminlist from "../views/teacherlist/adminmange/adminlist"
import setdata from "../views/teacherlist/adminmange/setdata"



import studentlayout from '../views/layout/studentlayout'
//学生所有子页面
import testList from "../views/test/testList"
import studentschool from '../views/layout/studentschool'

import report from "../views/test/report"
import login from "../views/login/login"
import register from "../views/login/register"
import getUserPassword from "../views/login/getUserPassword"


Vue.use(Router)

export default new Router({
  routes: [
    //登陆页
    {
      path: "/login",
      name: '登陆',
      component: login,
    },
    {
      path: "/register",
      name: "注册",
      component: register,
    },
    {
      path: "/getUserPassword",
      name: "设置密码",
      component: getUserPassword,
    },
    //老师初始页面及所有子页面[侧边栏和顶部相同]
    {
      path: '/teacherindex',
      name: '生涯测评',
      component: teacherlayout,
      // redirect: 'noredirect',
      children: [{
          path: "teacherschool",
          name: "学校",
          component: teacherschool
        },
      ]
    },

    // 管理人员模块
    {
      path: "/admin",
      name: "管理类",
      component: teacherlayout,
      children: [{
          path: "Groupsettings",
          name: "测评报告",
          component: Groupsettings
        },
        {
          path: "admindata",
          name: "管理数据",
          component: admindata
        },
        {
          path: "grade/:id",
          name: "班级数据",
          component: grade,
          name: "grade"
        },
        {
          path: "admintype",
          name: "管理类型",
          component: admintype
        },
        {
          path: "adminlist",
          name: "管理列表",
          component: adminlist
        },
        {
          path: "setdata",
          name: "学生资料录入",
          component: setdata
        },
      ]

    },
    //学生初始页面及所有子页面，[侧边栏和顶部相同]
    {
      path: '/studentindex',
      name: '学生测评',
      component: studentlayout,
      children: [{
          path: "studentschool",
          name: "学生",
          component: studentschool
        },

      ]

    },
    //重定向
    {
      path: '/',
      redirect: '/login',
    }

  ]
})
