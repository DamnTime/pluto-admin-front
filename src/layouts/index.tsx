import React from 'react';
import { ConfigProvider } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import zhCN from 'antd/es/locale/zh_CN';
import LayoutApp from '@/components/Layout';

const BasicLayout: React.FC = (props: any) => {
  if (props.location.pathname === '/login') {
    return <>{props.children}</>;
  }
  return (
    <ConfigProvider locale={zhCN}>
      <LayoutApp>
        <TransitionGroup>
          <CSSTransition key={props.location.hash} classNames="fade" timeout={300}>
            <div>{props.children}</div>
          </CSSTransition>
        </TransitionGroup>
      </LayoutApp>
    </ConfigProvider>
  );
};

export default BasicLayout;
