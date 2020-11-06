import useRequest from '@/core/useRequest';

// 获取文章标签列表
export const getArticleTagList = (params: any) => {
  return useRequest.get('/admin/articleTag', params, {
    showLoading: true,
  });
};

// 新增标签
export const createArticleTag = (params: any) => {
  return useRequest.post('/admin/articleTag', params, {
    showLoading: true,
  });
};

// 编辑标签
export const editArticleTag = (params: any) => {
  return useRequest.put(`/admin/articleTag/${params.id}`, params, {
    showLoading: true,
  });
};

// 删除标签
export const deleteArticleTag = (id: any) => {
  return useRequest.delete(`/admin/articleTag/${id}`, null, {
    showLoading: true,
  });
};

// 标签详情
export const getArticleTag = (id: any) => {
  return useRequest.get(`/admin/articleTag/${id}`, null, {
    showLoading: true,
  });
};
