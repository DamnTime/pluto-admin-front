import useRequest from '@/core/useRequest';

export const getUserList = (params: any) => {
  return useRequest.get('/admin/user', params, {
    showLoading: true,
  });
};

// 创建用户
export const createUserApi = (params: any) => {
  return useRequest.post('/admin/user', params, {
    showLoading: true,
  });
};

// 编辑用户
export const editUserApi = (params: any) => {
  return useRequest.put(`/admin/user/${params.id}`, params, {
    showLoading: true,
  });
};

// 用户详情
export const getUserDetailApi = (params: any = {}) => {
  return useRequest.get(`/admin/user/${params.id}`, undefined, {
    showLoading: true,
  });
};

// 删除用户
export const deleteUser = (id: number) => {
  return useRequest.delete(`/admin/user/${id}`, undefined, {
    showLoading: true,
  });
};

// 修改密码
export const editPassWord = (params: any) => {
  return useRequest.post('/admin/edit-password', params, {
    showLoading: true,
  });
};
