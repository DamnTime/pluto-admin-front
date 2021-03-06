import useRequest from '@/core/useRequest';

// 获取文章列表
export const getArticleList = (params: any) => {
  return useRequest.get('/admin/article', params, {
    showLoading: true,
  });
};

// 新增文章
export const createArticle = (params: any) => {
  return useRequest.post('/admin/article', params, {
    showLoading: true,
    saveLoginTimeOutData: true,
  });
};

// 编辑文章
export const editArticle = (params: any) => {
  return useRequest.put(`/admin/article/${params.id}`, params, {
    showLoading: true,
    saveLoginTimeOutData: true,
  });
};

// 删除文章
export const deleteArticle = (id: any) => {
  return useRequest.delete(`/admin/article/${id}`, null, {
    showLoading: true,
  });
};

// 标签详情
export const getArticle = (id: any) => {
  return useRequest.get(`/admin/article/${id}`, null, {
    showLoading: true,
  });
};
