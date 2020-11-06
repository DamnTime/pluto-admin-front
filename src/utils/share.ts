import { ISession } from '@/interface/ISession';
import dayjs from 'dayjs';
import * as qiniu from 'qiniu-js';
import rootApi from '@/core/api';
import { getQiniuToken } from '@/api/upload';
import { IComstomRequest } from '@/interface/IUpload';

// 非空
export const notEmpty = (str: string): boolean => {
  return str !== null && str !== undefined;
};

// 空
export const isEmpty = (str: any) => {
  return str === null || str === undefined || str === '';
};

// 精准判断数据类型
export const dataType = (tgt: any, type: string) => {
  const dataType = Object.prototype.toString
    .call(tgt)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase();
  return type ? dataType === type : dataType;
};

// formdata数据类型转换
export const transformData = (body: any) => {
  let data = '';
  for (let key in body) {
    if (data) {
      data += '&';
    }
    data += encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
  }
  return data;
};

// 获取ref
export const getRef = (intance: any = { current: {} }, funcs: string[] = []) => {
  const noop = (funcName: string) => {
    console.error(`${funcName}不存在`);
  };
  const defaultFuncs = Object.create({});
  const intances = Object.keys(intance.current);
  for (let index = 0; index < funcs.length; index += 1) {
    const element = funcs[index];
    if (intances.includes(element)) {
      defaultFuncs[element] = intance.current[element];
    } else {
      noop(element);
    }
  }
  return defaultFuncs;
};

export const setValueBySession = (key: string, value: any, options: ISession = {}) => {
  if (value === undefined || value === null || dataType(value, 'function')) return;
  const defaultConfig = {
    expire: 1000 * 60 * 60 * 24 * 30, // 默认过期时间为30天
  };

  const mergeOptions = Object.assign({}, defaultConfig, options);

  const nowTime = new Date().getTime();
  mergeOptions.expire += nowTime;

  let setValue: any = {
    value,
    ...mergeOptions,
    _createdTime: options.expire || defaultConfig.expire,
  };
  window.sessionStorage.setItem(key, JSON.stringify(setValue));
};

// 对sessionstorage的操作
export const getValueBySession = (key: string, updateExpire: boolean = false) => {
  const data = window.sessionStorage.getItem(key);
  if (data) {
    const { value, expire, _createdTime } = JSON.parse(data);
    const nowTime = new Date().getDate();
    const diff = dayjs(nowTime).diff(dayjs(expire)) >= 0;
    if (!diff) {
      // 未过期
      if (updateExpire) {
        // 更新expire字段
        setValueBySession(key, value, {
          expire: _createdTime,
        });
      }
      return value;
    }

    window.sessionStorage.removeItem(key);
    return '';
  }
};

export const customUploadRequest = async (config: IComstomRequest) => {
  const noop = () => {};
  const { info, prefix = 'web' } = config;

  const { onProgress = noop, onError = noop, onSuccess, file } = info;
  const getCurrentTimeStamp = new Date().getTime();
  try {
    const token = await getQiniuToken();
    const key = `${prefix}/${getCurrentTimeStamp}/${file.name}`;
    const next = (res: any) => {
      const { total } = res;
      const { percent } = total;
      onProgress({ percent });
    };
    const error = (err: any) => {
      onError(Error(`上传失败:${err}`));
    };
    const complete = (res: any) => {
      onSuccess(res.key || '');
    };
    const observer: any = qiniu.upload(file, key, token, {}, { useCdnDomain: true });
    const subscription = observer.subscribe(next, error, (res: any) => {
      complete(res);
      // 取消订阅，释放内存
      subscription.unsubscribe();
    });
  } catch (err) {
    onError(Error(err));
  }
};

// 文章字数统计
export const getWordCount = (text: string) => {
  let length = 0;
  try {
    // 先将回车换行符做特殊处理
    text = text.replace(/(rn+|s+|  +)/g, ''); // 书 = 云
    // 处理英文字符数字，连续字母、数字、英文符号视为一个单词
    text = text.replace(/[x00-xff]/g, 'm');
    // 合并字符m，连续字母、数字、英文符号视为一个单词
    text = text.replace(/m+/g, '*');
    // 去掉回车换行符
    text = text.replace(/书+/g, '');
    // 返回字数
    length = text.length;
  } catch (error) {}
  return length;
};
