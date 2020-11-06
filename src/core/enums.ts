type IErrorCode = {
  [prop: string]: any;
};
// 错误码
export const ERROR_CODE: IErrorCode = {
  401: '登录失效，请重新登录',
  404: '资源未找到~',
  500: '系统异常',
};
