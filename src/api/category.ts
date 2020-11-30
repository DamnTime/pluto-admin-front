import useRequest from '@/core/useRequest';

// 获取分类列表
export const getCategoryList = () => {
  return useRequest.get('/admin/category', {}, {
    showLoading: true,
  });
};

// 新增分类
export const createCategory = (params: any) => {
  return useRequest.post('/admin/category', params, {
    showLoading: true,
  });
};

// 编辑分类
export const editCategory = (params: any) => {
  return useRequest.put(`/admin/category/${params.id}`, params, {
    showLoading: true,
  });
};

// 删除分类
export const deleteCategory = (id: any) => {
  return useRequest.delete(`/admin/category/${id}`, null, {
    showLoading: true,
  });
};

// 分类详情
export const getCategory = (id: any) => {
  return useRequest.get(`/admin/category/${id}`, null, {
    showLoading: true,
  });
};
