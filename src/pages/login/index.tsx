import React, { useRef } from 'react';
import { Icon, message } from 'antd';
import withRouter from 'umi/withRouter';
import router from 'umi/router';
import LoginInput from './components/LoginInput';
import { login } from '@/api/login';
import { setValueBySession } from '@/utils/share';

import style from './index.scss';

const Login = (props: any) => {

  const accountInputRef = useRef<any>(null);

  const pwdInputRef = useRef<any>(null);

  const handleClick = async () => {
    const account = accountInputRef.current.value;
    const passWord = pwdInputRef.current.value;

    if (!account) {
      return message.error('请输入账号');
    }
    if (!passWord) {
      return message.error('请输入密码');
    }
    const res = await login({
      account,
      passWord
    });

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
          <LoginInput
            ref={accountInputRef}
            type="text"
            placeholder="账号"
            id="account"
          />
        </div>
        <div className={style['input-wrapper']}>
          <LoginInput
            ref={pwdInputRef}
            type="password"
            placeholder="密码"
            id="passWord"
          />
        </div>
        <div className={style['login-btn']} onClick={handleClick}>
          <Icon type="login" style={{ fontSize: '26px' }} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
