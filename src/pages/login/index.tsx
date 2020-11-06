import React from 'react';
import { Icon, message } from 'antd';
import withRouter from 'umi/withRouter';
import router from 'umi/router';
import LoginInput from './components/LoginInput';
import { login } from '@/api/login';
import { setValueBySession } from '@/utils/share';

import style from './index.scss';

type IFormValue = {
  [prop: string]: any;
};

const Login = (props: any) => {
  const formValue: IFormValue = {};

  const handleChange = (value: string | number, type: string) => {
    formValue[type] = value;
  };

  const handleClick = async () => {
    if (!formValue.account) {
      return message.error('请输入账号');
    }
    if (!formValue.passWord) {
      return message.error('请输入密码');
    }
    const res = await login(formValue);

    setValueBySession('userInfo', res, {
      expire: 1000 * 60 * 60,
    });

    const from = props.location.query?.from;

    router.push(from ? `${decodeURIComponent(from)}` : '/');
  };

  return (
    <div className={style['login-container']}>
      <video className={style['login-video']} autoPlay loop muted>
        <source src="http://cdn.pluto1811.com/lighthouse.mp4" type="video/mp4" />
      </video>
      <div className={style['login-form-container']}>
        <div className={style['input-wrapper']}>
          <LoginInput type="text" placeholder="账号" id="account" onChange={handleChange} />
        </div>
        <div className={style['input-wrapper']}>
          <LoginInput type="password" placeholder="密码" id="passWord" onChange={handleChange} />
        </div>
        <div className={style['login-btn']} onClick={handleClick}>
          <Icon type="login" style={{ fontSize: '26px' }} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
