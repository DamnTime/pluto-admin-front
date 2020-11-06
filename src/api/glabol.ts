import useRequest from '@/core/useRequest';

// 搜索用户标签
export const searchUserTag = (params: any) => {
  return useRequest.get('/admin/userTag-search', params, {
    showLoading: false,
  });
};

// 搜索文章分类
export const searchArticleCate = (params: any) => {
  return useRequest.get('/admin/category-search', params, {
    showLoading: false,
  });
};

// 搜索文章标签
export const searchArticleTag = (params: any) => {
  return useRequest.get('/admin/article-tag-search', params, {
    showLoading: false,
  });
};

// 获取天气数据
export const getWeather = () => {
  return useRequest.get('/admin/common/weather', null, {
    showLoading: false,
  });
};
