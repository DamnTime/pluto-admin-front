import useRequest from '@/core/useRequest';

export const getQiniuToken = () => {
  return useRequest.post('/admin/common/uploadToken');
};
