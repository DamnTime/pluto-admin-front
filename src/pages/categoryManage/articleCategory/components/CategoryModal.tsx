import React, { useEffect, useRef, useState } from 'react';
import { Modal, message } from 'antd';
import { ISuperForm } from '@/interface/ISuperform';
import SuperForm from '@/components/SuperForm';
import { createCategory, editCategory, getCategory } from '@/api/category';

const DRAWER_TYPE_TITLE = {
  check: '查看分类',
  add: '新增分类',
  edit: '编辑分类',
};

export type IModalType = 'check' | 'add' | 'edit';

interface IModalProps {
  modalType: IModalType;
  onClose: any;
  visible: boolean;
  id?: number | string;
  handleAfter: () => void;
}

const CategoryModal: React.FC<IModalProps> = props => {
  const { modalType, onClose, visible, id, handleAfter } = props;

  const superFormRef = useRef<any>(null);

  const detail = useRef<any>({});

  const formConfig: ISuperForm = {
    formItemList: [
      {
        type: 'input',
        key: 'name',
        label: '分类名称',
        placeholder: '请输入分类名称, 不超过15个字符',
        disabled: modalType === 'check',
        maxLength: 15,
        formItemConfig: {
          rules: [{ required: true, message: '请输入分类名称' }],
        },
      },
    ],
    formHanlders:
      modalType === 'check'
        ? []
        : [
            {
              bgColor: 'primary',
              txt: '确认',
              srouce: 'submit',
            },
          ],
  };

  const fetchDetail = async () => {
    const res = await getCategory(id);
    detail.current = res;
    superFormRef.current.setFieldsValue(res);
  };

  useEffect(() => {
    if (visible && modalType !== 'add') {
      fetchDetail();
    }
    if(modalType === 'add'){
      detail.current = {}
    }
  }, [visible]);

  const handleSubmit = async (values: any, srouce: string) => {
    const api = modalType === 'add' ? createCategory : editCategory;
    await api({
      ...detail.current ?? {},
      ...values,
    });
    message.success('操作成功');
    handleAfter && handleAfter();
  };

  return (
    <Modal
      title={`${DRAWER_TYPE_TITLE[modalType]}`}
      width={600}
      onCancel={onClose}
      visible={visible}
      destroyOnClose
      footer={null}
    >
      <SuperForm {...formConfig} handleSubmit={handleSubmit} ref={superFormRef} />
    </Modal>
  );
};

export default CategoryModal;
