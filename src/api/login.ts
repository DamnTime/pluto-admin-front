import useRequest from '@/core/useRequest';

export const login = (params: any) => {
  return useRequest.post('/admin/login', params, {
    showLoading: false,
  });
};
// 退出登录
export const loginOut = () => {
  return useRequest.post('/admin/loginOut', null, {
    showLoading: false,
  });
};
