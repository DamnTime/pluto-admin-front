import React,{forwardRef,useImperativeHandle} from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Form, Row, Col, Button } from 'antd';
import { IFormList, ISuperForm } from '@/interface/ISuperform';
import { defaultFormItemLayout } from '@/core/config';
import formItemMap from './formItemMap';

import './index.scss';

const SuperForm = (props: ISuperForm & FormComponentProps,ref:any) => {
  const {
    handleSubmit,
    formItemList,
    form,
    col,
    formHanlders,
    formHanldersLayout,
    ...rest
  } = Object.assign({},defaultFormItemLayout,props);

  const tailFormItemLayout = {
    wrapperCol: {
      offset: rest.labelCol?.span
    },
  };
  

  useImperativeHandle(ref, () => ({
    ...props.form,
  }));

  // 处理默认的配置参数
  const dealItemDefaultConfig = (config:any)=>{
    const defaultConfig = {};
    return Object.assign({},defaultConfig,config);
  }

  const renderCommonItem = () => {
    return formItemList.map((item: IFormList) => {
      const { formItemConfig = {}, key, type, extraTxt = '', ...rest } = item;
      if (formItemMap[type]) {
        const ItemType = formItemMap[type](dealItemDefaultConfig(rest));
        return (
          <Col span={col ?? 24} key={key}>
            <Form.Item {...rest}>
              {getFieldDecorator(key, formItemConfig)(ItemType)}
              {` ${extraTxt}`}
            </Form.Item>
          </Col>
        );
      }
    });
  };

  const renderHandlers = ()=>{
    return formHanlders?.map((handle,index)=>{
      const {txt,bgColor,srouce} = handle;
      return (
        <Button style={{marginRight:formHanlders?.length-1>index?'8px':0}} type={bgColor} onClick={(e)=>onClick(e,srouce)} key={srouce}>
          {txt}
        </Button>
      )
    })
  }

  const onClick = (e:any,srouce:any) => {
    e.preventDefault();
    const {handleSubmit,form} = props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      if(srouce === 'Reset'){ // 重置直接在组件内部处理
        form.resetFields();
      }
      handleSubmit && handleSubmit(fieldsValue,srouce)
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form {...rest} className="super-form">
      <Row gutter={24}>{renderCommonItem()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: col ? 'right' : 'left' }}>
          <Form.Item {...tailFormItemLayout}>
            {renderHandlers()}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};


const EnhanceSuperForm = forwardRef(SuperForm);

export default Form.create<ISuperForm & FormComponentProps>()(EnhanceSuperForm);
