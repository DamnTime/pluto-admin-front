import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Weather from '../Weather';
import UserSetting from '../UserSetting';
const { Header } = Layout;
import styles from './index.scss';

interface IEheaderProps {}

const AppHeader: React.FC<IEheaderProps> = props => {
  const {
    layout: { collapsed },
  } = window.g_app._store.getState();

  function toggle() {
    window.g_app._store.dispatch({
      type: 'layout/setCollapsed',
      payload: {
        collapsed: !collapsed,
      },
    });
  }

  return (
    <Header className="app-header">
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />
      <div className={styles['header-right']}>
        <div style={{ marginRight: '20px' }}>
          <Weather />
        </div>
        <UserSetting />
      </div>
    </Header>
  );
};

export default AppHeader;
