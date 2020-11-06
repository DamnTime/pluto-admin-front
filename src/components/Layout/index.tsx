import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import AppMenus from './AppMenus';
import AppHeader from './AppHeader';
import styles from './index.scss';

const { Content, Footer, Sider } = Layout;

interface ILayoutAppProps {}

const LayoutApp: React.FunctionComponent<ILayoutAppProps> = (props: any) => {
  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider trigger={null} collapsible collapsed={props.layout.collapsed}>
        <div className={styles.logo} />
        <AppMenus />
      </Sider>
      <Layout style={{ position: 'relative', overflow: 'hidden' }}>
        <AppHeader />
        <div className={styles['app-content']}>
          <Content>{props.children}</Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default connect(({ layout }: any) => ({
  layout,
}))(LayoutApp);
