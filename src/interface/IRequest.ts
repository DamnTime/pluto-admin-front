import { AxiosRequestConfig } from 'axios';
interface IRquest extends AxiosRequestConfig {
  showLoading?: boolean;
  showErrorModal?: boolean;
  removeEmptyParams?: boolean;
  saveLoginTimeOutData?: boolean;
  contentType?: 'json' | 'text' | 'formData';
  header?: any;
}

export default IRquest;
