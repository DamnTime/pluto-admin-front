import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import IMenus from '@/interface/IMenus';
import Menus from '@/core/menus';

const { SubMenu } = Menu;

const AppMenu: React.FC<any> = props => {
  const { pathname = '/' } = props.history.location;
  const [menuSelected, setMenuSelected] = useState(pathname);

  useEffect(() => {
    setMenuSelected(pathname);
  }, [pathname]);

  const menuOpened = `/${menuSelected.split('/')[1]}`;

  const renderItem = (menus: IMenus[]) => {
    return menus.map((i: IMenus) => {
      if (!i.hidden) {
        if (i.children && i.children.length > 0) {
          return (
            <SubMenu
              key={i.path}
              title={
                <span>
                  <Icon type={i.icon} />
                  <span>{i.title}</span>
                </span>
              }
            >
              {renderItem(i.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={i.path}>
            <Link to={i.path} replace>
              <Icon type={i.icon} />
              <span>{i.title}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={[menuOpened]}
      defaultSelectedKeys={[menuSelected]}
      selectedKeys={[menuSelected]}
    >
      {renderItem(Menus)}
    </Menu>
  );
};

export default withRouter(AppMenu);
