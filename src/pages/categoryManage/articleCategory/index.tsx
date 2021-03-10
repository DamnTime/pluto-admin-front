import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, message, Table, Icon } from 'antd';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { getCategoryList, deleteCategory, updateSorts } from '@/api/category';
import CategoryModal, { IModalType } from './components/CategoryModal';

import './index.scss';

const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableWrapper = SortableContainer((props: any) => <tbody {...props} />);

const DragHandle = SortableHandle(() => (
  <Icon style={{ cursor: 'pointer', color: '#999' }} type="menu-unfold" />
));

const ArticleCategory = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [dataSource, setDataSource] = useState<any[]>([]);

  const [id, setId] = useState<number | ''>('');

  const [modalType, setModalType] = useState<IModalType>('add');

  const fetchCataList = async () => {
    const res = await getCategoryList();
    setDataSource(res);
  };

  useEffect(() => {
    fetchCataList();
  }, []);

  const handleEdit = (row: any) => {
    setModalType('edit');
    setId(row.id);
    setVisible(true);
  };

  const handleDelete = async (record: any) => {
    await deleteCategory(record.id);
    message.success('删除成功');
    fetchCataList();
  };

  const handleAfter = () => {
    setVisible(false);
    fetchCataList();
  };

  const handleCreate = () => {
    setModalType('add');
    setVisible(true);
  };

  const columns = [
    {
      title: '排序',
      dataIndex: 'sort',
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '分类名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '关联文章',
      key: 'articles',
      dataIndex: 'articles',
      render: (txt: any) => {
        return txt.length
          ? txt.map((t: any) => {
              const prefix = t.authorName ? `${t.authorName}/` : '';
              return <div>{`${prefix}${t.title}`}</div>;
            })
          : '-';
      },
    },
    {
      title: '操作',
      key: 'opera',
      width: 180,
      render: (txt: number, record: any) => {
        return (
          <>
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

  const onSortEnd = async (data: any) => {
    const { oldIndex, newIndex } = data;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource as any), oldIndex, newIndex).filter(
        el => !!el,
      );
      setDataSource(newData);
      const params = {
        sorts: newData.map((d: any, index: number) => ({ ...d, sortNo: index + 1 })),
      };
      await updateSorts(params);
      message.success('操作成功');
    }
  };

  const DraggableContainer = (props: any) => (
    <SortableWrapper
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.id === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Button type="primary" onClick={handleCreate}>
          新增分类
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="id"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
      <CategoryModal
        visible={visible}
        modalType={modalType}
        onClose={() => setVisible(false)}
        handleAfter={handleAfter}
        id={id}
      />
    </>
  );
};

export default ArticleCategory;
