import React, { useRef, useState } from 'react';
import { Button, Tag, Popconfirm, message } from 'antd';
import ListPage from '@/components/ListPage';
import { ISuperForm } from '@/interface/ISuperform';
import { getUserTagList, deleteUserTag } from '@/api/userTag';
import { IListPageRef } from '@/interface/IListPageRef';
import UserTagDrawer, { IdrawerType } from './components/UserTagDrawer';

const UserTag = (props: any) => {
  const listPageRef = useRef<IListPageRef>({} as IListPageRef);

  const [visible, setVisible] = useState<boolean>(false);

  const [id, setId] = useState<number | ''>('');

  const [drawerType, setDrawerType] = useState<IdrawerType>('add');

  const handleAdd = () => {
    setVisible(true);
    setDrawerType('add');
  };

  const handleCheck = (row: any) => {
    setDrawerType('check');
    setId(row.id);
    setVisible(true);
  };

  const handleEdit = (row: any) => {
    setDrawerType('edit');
    setId(row.id);
    setVisible(true);
  };

  const handleDelete = async (record: any) => {
    await deleteUserTag(record.id);
    message.success('删除成功');
    listPageRef.current.fetchList();
  };

  const handleAfter = () => {
    setVisible(false);
    listPageRef.current.handleRefresh();
  };

  const formConfig: ISuperForm = {
    col: 12,
    formItemList: [
      {
        type: 'input',
        key: 'tagName',
        label: '标签名称',
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

  const tableConfig = {
    columns: [
      {
        title: 'ID',
        key: 'id',
      },
      {
        title: '标签名称',
        key: 'tagName',
      },
      {
        title: '颜色',
        key: 'color',
        width: 200,
        render: (txt: string) => <Tag color={txt}>{txt}</Tag>,
      },
      {
        title: '操作',
        key: 'opera',
        width: 180,
        align: 'center',
        render: (txt: number, record: any) => {
          return (
            <>
              <Button
                type="link"
                onClick={() => handleCheck(record)}
                style={{ marginRight: '10px' }}
              >
                查看
              </Button>
              <Button
                type="link"
                onClick={() => handleEdit(record)}
                style={{ marginRight: '10px' }}
              >
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
    ],
  };

  return (
    <>
      <ListPage
        renderMiddle={
          <Button type="primary" onClick={handleAdd}>
            新增用户标签
          </Button>
        }
        fetchList={getUserTagList}
        tableConfig={tableConfig}
        formConfig={formConfig}
        ref={listPageRef}
      />
      <UserTagDrawer
        visible={visible}
        drawerType={drawerType}
        onClose={() => setVisible(false)}
        handleAfter={handleAfter}
        id={id}
      />
    </>
  );
};

export default UserTag;
