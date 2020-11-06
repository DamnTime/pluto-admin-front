import React, { useEffect, useRef, useState } from 'react';
import { Drawer, message } from 'antd';
import { ISuperForm } from '@/interface/ISuperform';
import SuperForm from '@/components/SuperForm';
import SelectByApi from '@/components/SelectByApi';
import { searchUserTag } from '@/api/glabol';
import { createUserApi, editUserApi, getUserDetailApi } from '@/api/user';

const DRAWER_TYPE_TITLE = {
  check: '查看用户',
  add: '新增用户',
  edit: '编辑用户',
};

export type IdrawerType = 'check' | 'add' | 'edit';

interface IDrawerProps {
  drawerType: IdrawerType;
  onClose: any;
  visible: boolean;
  id?: number | string;
  handleAfter: () => void;
}

const DrawerForm: React.FC<IDrawerProps> = props => {
  const { drawerType, onClose, visible, id, handleAfter } = props;

  const superFormRef = useRef<any>(null);

  const [detail, setDetail] = useState<any>({});

  const formConfig: ISuperForm = {
    col: 12,
    formItemList: [
      {
        type: 'input',
        key: 'account',
        label: '账号',
        placeholder: '请输入账号',
        disabled: drawerType === 'check',
        formItemConfig: {
          rules: [{ required: true, message: '请输入账号' }],
        },
      },
      {
        type: 'input',
        key: 'nickName',
        label: '昵称',
        disabled: drawerType === 'check',
        placeholder: '请输入昵称',
        formItemConfig: {
          rules: [{ required: true, message: '请输入昵称' }],
        },
      },
      {
        type: 'input',
        key: 'email',
        label: '邮箱',
        disabled: drawerType === 'check',
        placeholder: '请输入邮箱',
        formItemConfig: {
          rules: [{ required: true, message: '请输入邮箱' }],
        },
      },
      {
        type: 'Render',
        key: 'userTags',
        label: '标签',
        placeholder: '请选择标签',
        disabled: drawerType === 'check',
        formItemConfig: {
          rules: [
            {
              required: true,
              message: '请选择标签',
            },
          ],
        },
        render: (
          <SelectByApi
            propName="tagName"
            disabled={drawerType === 'check'}
            mode="multiple"
            fetchList={searchKey => searchUserTag({ tagName: searchKey })}
          />
        ),
      },
      {
        type: 'input',
        key: 'hobby',
        label: '爱好',
        disabled: drawerType === 'check',
        placeholder: '请输入爱好',
      },
      {
        type: 'select',
        key: 'role',
        label: '角色',
        placeholder: '请选择角色',
        disabled: drawerType === 'check',
        options: [
          {
            value: 0,
            title: '普通账号',
          },
          {
            value: 999,
            title: '超级管理员',
          },
        ],
      },
      {
        type: 'radio',
        key: 'sex',
        label: '性别',
        disabled: drawerType === 'check',
        formItemConfig: {
          initialValue: 0,
        },
        options: [
          {
            value: 0,
            label: '男',
          },
          {
            value: 1,
            label: '女',
          },
        ],
      },
      {
        type: 'textarea',
        key: 'introduce',
        label: '简介',
        rows: 4,
        disabled: drawerType === 'check',
        placeholder: '请输入个人简介',
      },
      {
        type: 'upload',
        label: '头像',
        key: 'headImg',
        isCrop: true,
        limit: 1,
        disabled: drawerType === 'check',
        formItemConfig: {
          rules: [
            {
              required: true,
              message: '请上传头像',
            },
          ],
        },
      },
    ],
    formHanlders:
      drawerType === 'check'
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
    const res = await getUserDetailApi({
      id,
    });
    setDetail(res);
    superFormRef.current.setFieldsValue(res);
  };

  useEffect(() => {
    if (visible && drawerType !== 'add') {
      fetchDetail();
    }
  }, [visible]);

  const handleSubmit = async (values: any, srouce: string) => {
    const api = drawerType === 'add' ? createUserApi : editUserApi;
    await api({
      ...detail,
      ...values,
    });
    message.success('操作成功');
    handleAfter && handleAfter();
  };

  return (
    <Drawer
      title={DRAWER_TYPE_TITLE[drawerType]}
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
    >
      <SuperForm {...formConfig} handleSubmit={handleSubmit} ref={superFormRef} />
    </Drawer>
  );
};

export default DrawerForm;
