import React from 'react';
import { FormProps } from 'antd/es/form';
import { GetFieldDecoratorOptions } from 'antd/es/form/Form';
import { ButtonType } from 'antd/es/Button';
import { ColProps } from 'antd/es/grid';

export type IUploadType = 'upload' | 'dragupload';

export interface IFormList {
  // data中的每一项
  type:
    | 'input'
    | 'textarea'
    | 'select'
    | 'inputNumber'
    | 'switch'
    | 'monthPicker'
    | 'weekPicker'
    | 'cascader'
    | 'rangePicker'
    | 'datePicker'
    | 'radio'
    | 'checkbox'
    | 'upload'
    | 'Render';
  key: string;
  label?: string;
  uploadType?: IUploadType; // 图片上传类型
  isCrop?: boolean; // 图片是否需要裁减
  extraTxt?: string;
  options?: any[];
  render?: React.ReactNode;
  formItemConfig?: GetFieldDecoratorOptions;
  [propName: string]: any;
}

export interface IFormHanlders {
  srouce: 'Search' | 'Reset' | string;
  txt: string;
  bgColor: ButtonType;
  [propName: string]: any;
}

export interface ISuperForm extends FormProps {
  formItemList: IFormList[]; // form表单配置项
  formHanlders?: IFormHanlders[]; // form表单按钮操作
  formHanldersLayout?: ColProps;
  handleSubmit?: Function;
  col?: number; // 开启类似高级搜索布局
}
