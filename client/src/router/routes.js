/*
 * @Author: Whzcorcd
 * @Date: 2020-07-17 15:14:53
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-21 11:33:22
 * @Description: file content
 */
import {
  BasicLayout,
  BlankLayout,
  PageView,
  RouteView,
  UserLayout
} from '@/layouts'
import { bxAnaalyse } from '@/material/icons'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  UserLayout: UserLayout,

  Exception403: () =>
    import(/* webpackChunkName: "exception" */ '@/views/exception/403'),
  Exception404: () =>
    import(/* webpackChunkName: "exception" */ '@/views/exception/404'),
  Exception500: () =>
    import(/* webpackChunkName: "exception" */ '@/views/exception/500'),

  // 登录
  Login: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),

  // 概览
  Workspace: () =>
    import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Workspace')

  // // 应用管理
  // Application: () =>
  //   import(/* webpackChunkName: "application" */ '@/views/application'),

  // // 项目管理
  // Project: () => import(/* webpackChunkName: "project" */ '@/views/project'),

  // // 模块管理
  // Modules: () => import(/* webpackChunkName: "modules" */ '@/views/modules')
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: constantRouterComponents.BasicLayout,
    meta: { title: '动态代码下发系统' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: constantRouterComponents.RouteView,
        meta: {
          title: '仪表盘',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          // 外部链接
          {
            path: 'https://www.guangdianyun.tv/',
            name: 'gdy',
            meta: { title: '广电云控制台', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: constantRouterComponents.Workspace,
            meta: {
              title: '工作区',
              keepAlive: true
            }
          }
        ]
      },
      // application
      // {
      //   path: '/application',
      //   name: 'application',
      //   component: constantRouterComponents.Application,
      //   meta: {
      //     title: '应用管理',
      //     keepAlive: true,
      //     icon: bxAnaalyse
      //   }
      // }
      // {
      //   path: '/project',
      //   name: 'project',
      //   component: constantRouterComponents.Project,
      //   meta: {
      //     title: '项目管理',
      //     keepAlive: true,
      //     icon: bxAnaalyse
      //   }
      // },
      // {
      //   path: '/modules',
      //   name: 'modules',
      //   component: constantRouterComponents.Modules,
      //   meta: {
      //     title: '模块管理',
      //     keepAlive: true,
      //     icon: bxAnaalyse
      //   }
      // }
      {
        path: '/exception',
        name: 'exception',
        component: constantRouterComponents.RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning' },
        hidden: true,
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: constantRouterComponents.Exception403,
            meta: { title: '403' }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: constantRouterComponents.Exception404,
            meta: { title: '404' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: constantRouterComponents.Exception500,
            meta: { title: '500' }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: constantRouterComponents.UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      // login
      {
        path: '/user/login',
        name: 'login',
        meta: { title: '登录' },
        component: constantRouterComponents.Login
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: constantRouterComponents.Exception404
  }
]

export default routes
