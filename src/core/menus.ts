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
    icon: 'tag',
    children: [
      {
        path: '/tagManage/userTag',
        title: '用户标签',
        icon: 'schedule',
      },
      {
        path: '/tagManage/articleTag',
        title: '文章标签',
        icon: 'tags',
      },
    ],
  },
  {
    path: '/categoryManage',
    title: '分类管理',
    icon: 'appstore',
    children: [
      {
        path: '/categoryManage/articleCategory',
        title: '文章分类',
        icon: 'cluster',
      },
    ],
  },
  {
    path: '/articleManage',
    title: '文章管理',
    icon: 'form',
    children: [
      {
        path: '/articleManage/list',
        title: '文章列表',
        icon: 'container',
      },
      {
        path: '/articleManage/comment',
        title: '文章评论',
        icon: 'file',
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
    icon: 'setting',
    children: [
      {
        path: '/systemManage/userManage',
        title: '用户管理',
        icon: 'user',
      },
    ],
  },
];
export default menus;
