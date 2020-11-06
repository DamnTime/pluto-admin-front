import React, { useState } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import router from 'umi/router';
import {getValueBySession} from '@/utils/share';
import {loginOut} from '@/api/login';
import EditPwdModal from './components/EditPwdModal';

interface IWeatherProps {}

const UserSetting: React.FC<IWeatherProps> = props => {

  const [visible,setVisible] = useState<boolean>(false);

  const handleCancel = ()=>{
    setVisible(false)
  }

  const handleMenuClick = async (e:any) => {
    if(e.key ===  '1'){
      setVisible(true);
    }else if(e.key === '2'){
      await loginOut();
      router.replace('/login');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="edit" />
        修改密码
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="thunderbolt" />
        退出登录
      </Menu.Item>
    </Menu>
  );
  const userInfo = getValueBySession('userInfo', true) ?? {};

  return (
    <>
      <Dropdown overlay={menu}>
        <span>
          <Icon type="setting" />
  <span style={{ marginLeft: '8px',cursor:'pointer' }}>{userInfo.nickName}</span>
        </span>
      </Dropdown>
      <EditPwdModal handleCancel={handleCancel} visible={visible}/>
    </>
  );
};

export default UserSetting;
