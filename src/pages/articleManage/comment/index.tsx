import React, {useState, useEffect} from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { getComment, deleteComment } from '@/api/comment';

const Comment = () => {

  const columns = [
    {
      title: '评价人昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '评价人头像',
      dataIndex: 'headImg',
      key: 'headImg',
      render:(v:string)=><img src={v} alt="" style={{width:'80px',height:'80px',borderRadius:'45px'}}/>
    },
    {
      title: '评价内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '是否作者',
      dataIndex: 'isAuthor',
      key: 'isAuthor',
      render:(v:number)=><span>{+v === 0?'否':'是'}</span>
    },
    {
      title: '相关文章',
      dataIndex: 'article',
      key: 'article',
      render:(v:any)=><span>{v ? v.title : '-'}</span>
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render:(v:any,row:any) =>               <Popconfirm
      title="确认删除?"
      onConfirm={() => handleDelete(row)}
      okText="确认"
      cancelText="取消"
    >
      <Button type="link" disabled={row.children}>删除</Button>
    </Popconfirm>
    },
  ];
  const [data,setData] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const handleDelete = async (row:any)=>{
    await deleteComment(row.id);
    message.success('删除成功');
    fetchData();
  }

  // 获取评论数据
  const fetchData = async ()=>{
    const res = await getComment({});
    setData(res ?? []);
  }

  return <Table columns={columns} pagination={false} dataSource={data} />;
};

export default Comment;
