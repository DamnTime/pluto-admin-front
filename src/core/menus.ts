import IMenus from '@/interface/IMenus';
const menus: IMenus[] = [
  {
    path: '/',
    title: '首页',
    icon: 'home',
  },
  {
    path: '/tagManage',
    title: '标签管理',
    icon: 'home',
    children: [
      {
        path: '/tagManage/userTag',
        title: '用户标签',
        icon: 'home',
      },
      {
        path: '/tagManage/articleTag',
        title: '文章标签',
        icon: 'home',
      },
    ],
  },
  {
    path: '/categoryManage',
    title: '分类管理',
    icon: 'home',
    children: [
      {
        path: '/categoryManage/articleCategory',
        title: '文章分类',
        icon: 'home',
      },
    ],
  },
  {
    path: '/articleManage',
    title: '文章管理',
    icon: 'home',
    children: [
      {
        path: '/articleManage/list',
        title: '文章列表',
        icon: 'home',
      },
      {
        path: '/articleManage/create',
        title: '创建/编辑文章',
        hidden: true,
        icon: 'home',
      },
    ],
  },
  {
    path: '/systemManage',
    title: '系统管理',
    icon: 'home',
    children: [
      {
        path: '/systemManage/userManage',
        title: '用户管理',
        icon: 'home',
      },
    ],
  },
];
export default menus;
