import React, { useRef, useEffect } from 'react';
import { Modal, message } from 'antd';
import router from 'umi/router';
import SuperForm from '@/components/SuperForm';
import { ISuperForm } from '@/interface/ISuperform';
import { editPassWord } from '@/api/user';

interface IEditPwdModalProps {
  visible: boolean;
  handleCancel: () => void;
}

const EditPwdModal: React.FC<IEditPwdModalProps> = props => {
  const { visible, handleCancel } = props;

  const superFormRef = useRef<any>(null);

  useEffect(() => {
    if (visible && superFormRef.current) {
      superFormRef.current.resetFields();
    }
  }, [visible]);

  const compareToFirstPassword = (rule: any, value: string, callback: Function) => {
    if (value && value !== superFormRef.current.getFieldValue('passWord')) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };

  const formConfig: ISuperForm = {
    labelCol: {
      span: 5,
    },
    formItemList: [
      {
        type: 'input',
        inputType: 'password',
        key: 'oldPassWord',
        label: '原密码',
        placeholder: '请输入原密码',
        formItemConfig: {
          rules: [{ required: true, message: '请输入原密码' }],
        },
      },
      {
        type: 'input',
        inputType: 'password',
        key: 'passWord',
        label: '新密码',
        placeholder: '请输入新密码',
        formItemConfig: {
          rules: [{ required: true, message: '请输入新密码' }],
        },
      },
      {
        type: 'input',
        inputType: 'password',
        key: 'comfirmPassWord',
        label: '确认新密码',
        placeholder: '请输入确认新密码',
        formItemConfig: {
          rules: [
            { required: true, message: '请输入确认新密码' },
            {
              validator: compareToFirstPassword,
            },
          ],
        },
      },
    ],
  };

  const handleOk = () => {
    superFormRef.current.validateFields(async (err: any, values: any) => {
      if (!err) {
        await editPassWord(values);
        message.success('密码修改成功，请重新登录');
        router.push('/login');
      }
    });
  };

  return (
    <Modal title="修改密码" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <SuperForm {...formConfig} ref={superFormRef} />
    </Modal>
  );
};

export default EditPwdModal;
