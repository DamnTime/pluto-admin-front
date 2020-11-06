import { UploadProps } from 'antd/es/upload';
export interface IComstomRequest {
  info: any;
  prefix?: string;
}

export interface IUpload extends UploadProps {
  uploadType?: 'upload' | 'dragupload';
  limit?: number;
  value?: any;
  isCrop?: boolean;
  onChange?: (val: any) => void;
}
