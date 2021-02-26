import { Modal } from 'antd';
import Axios from 'axios';
import router from 'umi/router';
import RequestLoading from '@/components/RequestLoading';
import { transformData, isEmpty } from '@/utils/share';
import { dataType, getValueBySession } from '@/utils/share';
import IRquest from '@/interface/IRequest';
import rootApi from '@/core/api';
import {ERROR_CODE} from './enums';

const requestLoading = RequestLoading();

const defaultConfig: IRquest = {
  showLoading: true,
  showErrorModal: true,
  removeEmptyParams: true,
  contentType: 'json',
};


class Request {
  static requestCount = 0;
  static hasLoginTimeOut = false;

  axios: any;

  constructor() {
    this.axios = Axios.create({
      baseURL: rootApi[process.env.UMI_ENV],
      timeout: 30000,
      withCredentials:true
    });

    this.axios.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleRequestError.bind(this),
    );

    this.axios.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleResponeError.bind(this),
    );
  }

  // 关闭loading加载
  handleDestroyLoading() {
    Request.requestCount -= 1;
    if (Request.requestCount === 0) {
      requestLoading.destroy();
    }
  }

  // 移除空字段
  handleRemoveEmpty(config: any) {
    const { removeEmptyParams, data, params } = config;
    const d = data || params;
    if (removeEmptyParams && dataType(d, 'object')) {
      Object.entries(d).forEach(([key, value]) => {
        if (isEmpty(value)) {
          delete d[key];
        }
      });
    }
  }

  handleRequest(config: IRquest) {
    if (Request.requestCount === 0 && config.showLoading) {
      requestLoading.show();
    }
    Request.requestCount += 1;
    const userInfo = getValueBySession('userInfo', true) ?? {};
    

    const headers = {
      token: userInfo.token,
    };
    
    config.headers = Object.assign({}, config.headers, headers);
    /**
     * todo 设置token header
     * config.header = Object.assign({},config.header,header)
     */
    return config;
  }

  handleRequestError(err: any) {
    this.handleDestroyLoading();
    return Promise.reject(err);
  }

  handleResponse(response: any) {
    this.handleDestroyLoading();

    if (response.data.code !== 'S00') {
      if (response.config.showErrorModal) {
        Modal.error({
          title: '温馨提示',
          content: response.data ? response.data.msg : '系统异常，请稍后重试! ',
        });
      }
      return Promise.reject(response.data);
    }
    return response.data.content || {};
  }

  handleResponeError(err: any) {
    const res = err.response || {};
    const status = res.status;
    const errorMsg = res.data?.msg;

    const is401 = status === 401;
    if(!Request.hasLoginTimeOut){
      Modal.error({
        title: '温馨提示',
        content: `${ERROR_CODE[status+''] || errorMsg || '系统异常，请稍后重试! '}`,
        onOk(){
          if(is401){
            Request.hasLoginTimeOut = false;
            router.replace({
              pathname: '/login',
              query: {
                from: `${encodeURIComponent(window.location.hash.replace('#',''))}`,
              },
            });
            Promise.reject('token失效');
          }
        },
      });
    }
    is401 && (Request.hasLoginTimeOut = true);
    this.handleDestroyLoading();
    return Promise.reject(err);
  }

  transformContentType(contentType: string) {
    const headObj: any = {
      json: 'application/json',
      text: 'text/plain',
      formData: 'application/x-www-form-urlencoded',
    };
    return `${headObj[contentType] || headObj.json}; charset=utf-8`;
  }

  factoryRequest(config: IRquest) {
    const { method, url = '/', contentType = 'json', ...rest } = config;
    const _url = (url.startsWith('/') ? url : `/${url}`).trim();

    const headers = {
      'content-type': this.transformContentType(contentType),
    };

    if (contentType === 'formData' && method === 'post') {
      rest.data = transformData(rest.data || {});
    }

    const mergeConfig = { ...defaultConfig, ...rest };

    // 移除空参数
    this.handleRemoveEmpty(mergeConfig);

    return this.axios.request({
      method,
      url: _url,
      headers,
      ...mergeConfig,
    });
  }

  get(url: string, params?: any, config?: IRquest) {
    return this.factoryRequest({
      method: 'get',
      url,
      params,
      ...config,
    });
  }

  post(url: string, data?: any, config?: IRquest) {
    return this.factoryRequest({
      method: 'post',
      url,
      data,
      ...config,
    });
  }

  delete(url: string, params?: any, config?: IRquest) {
    return this.factoryRequest({
      method: 'delete',
      url,
      params,
      ...config,
    });
  }

  put(url: string, data?: any, config?: IRquest) {
    return this.factoryRequest({
      method: 'put',
      url,
      data,
      ...config,
    });
  }
}

const useRequest = new Request();

export default useRequest;
