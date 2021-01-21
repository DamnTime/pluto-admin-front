import useRequest from '@/core/useRequest';

// 获取评论
export const getComment = (params: any) => {
  return useRequest.get('/admin/comment', params, {
    showLoading: true,
  });
};

// 删除评论
export const deleteComment = (id: any) => {
  return useRequest.delete(`/admin/comment/${id}`, null, {
    showLoading: true,
  });
};
