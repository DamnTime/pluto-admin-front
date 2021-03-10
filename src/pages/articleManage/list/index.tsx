import React, { useRef, useState } from 'react';
import { Button, Tag, Popconfirm, message, Tooltip } from 'antd';
import router from 'umi/router';
import ListPage from '@/components/ListPage';
import { ISuperForm } from '@/interface/ISuperform';
import { getArticleList, deleteArticle } from '@/api/article';
import { IListPageRef } from '@/interface/IListPageRef';

const ARTICLE_STATUS: any = {
  0: '禁用',
  1: '已发布',
  2: '待发布',
};

const ArticleList = (props: any) => {
  const listPageRef = useRef<IListPageRef>({} as IListPageRef);

  const handleAdd = () => {
    router.push({
      pathname: '/articleManage/create',
      query: {
        type: 'add',
      },
    });
  };

  const handleCheck = (row: any) => {
    router.push({
      pathname: '/articleManage/create',
      query: {
        type: 'check',
        id: row.id,
      },
    });
  };

  const handleEdit = (row: any) => {
    router.push({
      pathname: '/articleManage/create',
      query: {
        type: 'edit',
        id: row.id,
      },
    });
  };

  const handleDelete = async (record: any) => {
    await deleteArticle(record.id);
    message.success('删除成功');
    listPageRef.current.fetchList();
  };

  const formConfig: ISuperForm = {
    col: 12,
    formItemList: [
      {
        type: 'input',
        key: 'tagName',
        label: '文章名称',
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
    scroll: { x: 1800 },
    columns: [
      {
        title: '文章标题',
        key: 'title',
        width: 180,
        fixed: 'left',
        render: (h: string) =>
          h.length > 8 ? <Tooltip title={h}>{h.substr(0, 8) + ' ...'}</Tooltip> : h,
      },
      {
        title: '封面图',
        key: 'cover',
        fixed: 'left',
        render: (txt: string) => (
          <img src={txt} alt="" style={{ width: 80, height: 80, borderRadius: 40 }} />
        ),
      },
      {
        title: '简介',
        key: 'subMessage',
        render: (txt: any[]) => txt || '-',
      },
      {
        title: '作者',
        key: 'authorName',
      },
      {
        title: '所属分类',
        key: 'categoryName',
      },
      {
        title: '标签',
        key: 'articleTags',
        width: 200,
        render: (txt: any[]) => {
          return txt.map(tag => <Tag color={tag.color}>{tag.name}</Tag>);
        },
      },
      {
        title: '发布时间',
        width: 200,
        key: 'publishTime',
      },
      {
        title: '字数',
        key: 'wordsNumber',
      },
      {
        title: '浏览量',
        key: 'pageView',
      },
      {
        title: '是否加密',
        key: 'isEncrypt',
        render: (txt: number) => (txt === 0 ? '否' : '是'),
      },
      {
        title: '状态',
        key: 'status', // 0：禁用 1：已发布 2：待发布
        render: (txt: number) => ARTICLE_STATUS[`${txt}`],
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
            创建文章
          </Button>
        }
        fetchList={getArticleList}
        tableConfig={tableConfig}
        formConfig={formConfig}
        ref={listPageRef}
      />
    </>
  );
};

export default ArticleList;
