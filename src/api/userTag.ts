import useRequest from '@/core/useRequest';

// 获取用户标签列表
export const getUserTagList = (params: any) => {
  return useRequest.get('/admin/userTag', params, {
    showLoading: true,
  });
};

// 新增标签
export const createUserTag = (params: any) => {
  return useRequest.post('/admin/userTag', params, {
    showLoading: true,
  });
};

// 编辑标签
export const editUserTag = (params: any) => {
  return useRequest.put(`/admin/userTag/${params.id}`, params, {
    showLoading: true,
  });
};

// 删除标签
export const deleteUserTag = (id: any) => {
  return useRequest.delete(`/admin/userTag/${id}`, null, {
    showLoading: true,
  });
};

// 用户标签详情
export const getUserTag = (id: any) => {
  return useRequest.get(`/admin/userTag/${id}`, null, {
    showLoading: true,
  });
};
