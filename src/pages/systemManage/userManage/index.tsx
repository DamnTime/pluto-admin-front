import React, { useState, useRef } from 'react';
import { Button, Tag, Popconfirm, message } from 'antd';
import { ISuperForm } from '@/interface/ISuperform';
import ListPage from '@/components/ListPage';
import { getUserList } from '@/api/user';
import { IListPageRef } from '@/interface/IListPageRef';
import { deleteUser } from '@/api/user';
import DrawerForm, { IdrawerType } from './components/DrawerForm';

const UserManage: React.FC = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [id, setId] = useState<any>({});

  const listPageRef = useRef<IListPageRef>({} as IListPageRef);

  const [drawerType, setDrawerType] = useState<IdrawerType>('add');

  const onClose = () => {
    setVisible(false);
  };

  const handleAdd = () => {
    setDrawerType('add');
    setVisible(true);
  };

  const handleEdit = async (record: any) => {
    setId(record.id);
    setDrawerType('edit');
    setVisible(true);
  };

  const handleDelete = async (record: any) => {
    await deleteUser(record.id);
    message.success('删除成功');
    listPageRef.current.fetchList();
  };

  const handleCheck = async (record: any) => {
    setId(record.id);
    setDrawerType('check');
    setVisible(true);
  };

  const columns = [
    {
      title: '账号',
      key: 'account',
      fixed: 'left',
    },
    {
      title: '昵称',
      key: 'nickName',
      fixed: 'left',
    },
    {
      title: '头像',
      key: 'headImg',
      render: (txt: string) => (
        <img src={txt} alt="" style={{ width: 80, height: 80, borderRadius: 40 }} />
      ),
    },
    {
      title: '邮箱',
      width: 180,
      key: 'email',
    },
    {
      title: '爱好',
      key: 'hobby',
    },
    {
      title: '个人简介',
      width: 200,
      key: 'introduce',
    },
    {
      title: '标签',
      key: 'userTags',
      width: 200,
      render: (txt: any[]) => {
        return txt.map(tag => <Tag color={tag.color}>{tag.tagName}</Tag>);
      },
    },
    {
      title: '角色',
      key: 'role',
      render: (txt: number) => `${txt > 0 ? '超管' : '普通账号'}`,
    },
    {
      title: '性别',
      key: 'sex',
      render: (txt: number) => `${txt === 0 ? '男' : '女'}`,
    },
    {
      title: '状态',
      key: 'status',
      render: (txt: number) => `${txt === 0 ? '正常' : '冻结'}`,
    },
    {
      title: '操作',
      key: 'opera',
      width: 180,
      align: 'center',
      render: (txt: number, record: any) => {
        return (
          <>
            <Button type="link" onClick={() => handleCheck(record)} style={{ marginRight: '10px' }}>
              查看
            </Button>
            <Button type="link" onClick={() => handleEdit(record)} style={{ marginRight: '10px' }}>
              编辑
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => handleDelete(record)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" style={{ color: '#ff4d4f' }}>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const tableConfig = {
    columns,
    scroll: { x: 1800 },
  };

  const formConfig: ISuperForm = {
    col: 12,
    formItemList: [
      {
        type: 'input',
        key: 'nickName',
        label: '昵称',
      },
      {
        type: 'select',
        key: 'sex',
        label: '性别',
        placeholder: '请选择性别',
        options: [
          {
            value: 0,
            title: '男',
          },
          {
            value: 1,
            title: '女',
          },
        ],
      },
    ],
    formHanlders: [
      {
        bgColor: 'primary',
        txt: '搜索',
        srouce: 'Search',
      },
      {
        bgColor: 'default',
        txt: '重置',
        srouce: 'Reset',
      },
    ],
  };

  const handleAfter = () => {
    setVisible(false);
    listPageRef.current.handleRefresh();
  };

  return (
    <>
      <ListPage
        renderMiddle={
          <Button type="primary" onClick={handleAdd}>
            新增用户
          </Button>
        }
        fetchList={getUserList}
        tableConfig={tableConfig}
        formConfig={formConfig}
        ref={listPageRef}
      />
      <DrawerForm
        visible={visible}
        onClose={onClose}
        handleAfter={handleAfter}
        drawerType={drawerType}
        id={id}
      />
    </>
  );
};

export default UserManage;
