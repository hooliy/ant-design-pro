export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', name: "首页", icon: 'home', component: './Welcome' },
  // {
  //   path: '/admin',
  //   name: "管理页",
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', name: "sub-page", component: './List' },
  //   ],
  // },
  {
    path: '/system',
    name: "系统管理",
    icon: 'setting',
    routes: [
      { path: '/system', redirect: '/system/user' },
      { path: '/system/user', name: "用户管理", component: './system/user' },
      { path: '/system/role', name: "角色管理", component: './system/role' },
      { path: '/system/permission', name: "权限管理", component: './system/permission' },
      { path: '/system/operlog', name: "错误日志", component: './system/operlog' },

    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
