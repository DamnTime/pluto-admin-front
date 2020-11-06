import React, { useState } from 'react';

import style from './index.scss';

interface ILoginInput {
  id: string;
  onChange?: (val: string | number, type: string) => void;
  type: string;
  placeholder?: string;
}

const LoginInput = (props: ILoginInput) => {
  const { id, type, onChange, placeholder } = props;

  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const handleChange = (e: any, type: string) => {
    const value = e.target.value;
    setValue(value);
    onChange && onChange(value, type);
  };

  const focusStyle = focus ? 'focus' : '';

  return (
    <div className={`${style['login-input-wrapper']} ${style[focusStyle]}`}>
      <input
        value={value}
        type={type}
        className={style['login-input']}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={e => handleChange(e, id)}
        id={id}
      />
      {!value && (
        <label htmlFor={id} className={style['place-holder']}>
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default LoginInput;
