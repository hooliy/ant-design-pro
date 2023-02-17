export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', name: "欢迎", icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: "管理页",
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: "sub-page", component: './List' },
    ],
  },
  { icon: 'table', name: "TableList", path: '/list', component: './List' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
