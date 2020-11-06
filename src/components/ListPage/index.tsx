import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { IListPage } from '@/interface/IListPage';
import SuperForm from '@/components/SuperForm';
import SuperTable from '@/components/SuperTable';
import { pagenation } from '@/core/config';
import { getRef } from '@/utils/share';

import style from './index.scss';

const ListPage = (props: IListPage, ref: any) => {
  const { fetchList, extraParam,dealData, tableConfig, formConfig,renderTop,renderMiddle } = props;

  const [dataSource, setDataSource] = useState<any[]>([]);

  const [total,setTotal] = useState<number>(0);

  const formRef = useRef(null);

  const tableRef = useRef(null);

  const searchParams = useRef({});

  const onSearchFormSubmit = (values: any, srouce: string)=>{
    if(srouce === 'Search'){
      searchParams.current = Object.assign({},searchParams.current,values)
    }else if(srouce === 'Reset'){
      searchParams.current = {};
    }
    _fetchList();
  }

  // 对外暴露的方法
  const handleRefresh = () => {
    const {setPagination} = getRef(tableRef, ['setPagination']);
    const {resetFields} = getRef(formRef, ['resetFields']);
    resetFields();
    setPagination(pagenation);
    searchParams.current = {};
    _fetchList();
  };
  const getFormValues = () => {
    const {getFieldsValue} = getRef(formRef, ['getFieldsValue']);
    return getFieldsValue();
  };
  const setFormValue = (obj:any)=>{
    const {setFieldsValue} = getRef(formRef, ['setFieldsValue']);
    return setFieldsValue(obj);
  }
  const _fetchList = async () => {

    const { list = [],total = 0 } = fetchList ? await fetchList(Object.assign(searchParams.current, extraParam)) : {};
    
    setDataSource(dealData ? dealData(list): list);
    setTotal(total);
  };

  useImperativeHandle(ref, () => ({
    setFormValue,
    handleRefresh,
    getFormValues,
    fetchList: _fetchList
  }));


  const handlePageChange = (page: any) => {
    searchParams.current = Object.assign({},searchParams.current,page);
    _fetchList();
  };

  useEffect(() => {
    // 初始化搜索参数
    const formValus = getFormValues();
    const defaultPager = {
      current: pagenation.current,
      pageSize: pagenation.pageSize,
    }
    
    searchParams.current = Object.assign({},searchParams.current,formValus,defaultPager);
    
    if(fetchList){
      _fetchList();
    } else{
      setDataSource(tableConfig.dataSource ?? []);
    }    
  }, [tableConfig.dataSource]);

  const _tableConfig = {
    ...tableConfig,
    dataSource,
    total,
    handlePageChange,
  };

  const _formConfig = Object.assign({},{
    handleSubmit:onSearchFormSubmit,
  },formConfig)


  return (
    <>
      {
        renderTop && <div className={style['list-page-top']}>
        {renderTop}
      </div>
      }
      <div className={style['search-area']}>
        <SuperForm {..._formConfig} wrappedComponentRef={formRef} />
      </div>
      {
        renderMiddle && <div className={style['list-page-middle']}>
        {renderMiddle}
        </div>
      }
      <SuperTable {..._tableConfig} ref={tableRef} />
    </>
  );
};

const EnhanceListPage = forwardRef(ListPage);

export default EnhanceListPage;
