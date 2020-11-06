import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Table } from 'antd';
import { pagenation } from '@/core/config';

const SuperTable = (props: any, ref: any) => {
  const { columns = [], dataSource = [], total = 0, handlePageChange, ...rest } = props;
  const { current, pageSize } = pagenation;
  const [pagination, setPagination] = useState({ current, pageSize });

  // console.log(pagination);

  // 对外暴露的方法|属性
  useImperativeHandle(ref, () => ({
    setPagination,
    pagination: { ...pagination },
  }));

  const tablePagination = {
    ...pagenation,
    current: pagination.current,
    pageSize: pagination.pageSize,
    total,
  };

  const tableColums: any[] = columns.map((column: any) => {
    const { key, title, ...rest } = column;
    return {
      key,
      title,
      dataIndex: key,
      ...rest,
    };
  });

  const handleChange = (page: any) => {
    const { current, pageSize } = page;
    setPagination({
      ...pagination,
      current,
      pageSize,
    });

    handlePageChange && handlePageChange({ current, pageSize });
  };

  return (
    <Table
      columns={tableColums}
      dataSource={dataSource}
      pagination={tablePagination}
      onChange={handleChange}
      rowKey="id"
      {...rest}
    />
  );
};

const EnhanceSuperTable = forwardRef(SuperTable);

export default EnhanceSuperTable;
