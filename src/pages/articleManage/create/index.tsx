import React, { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import { ISuperForm } from '@/interface/ISuperform';
import SuperForm from '@/components/SuperForm';
import SelectByApi from '@/components/SelectByApi';
import FormEditor from '@/components/Editor';
import {timeFormat} from '@/core/config';
import { searchArticleCate, searchArticleTag } from '@/api/glabol';
import { getValueBySession,setValueBySession } from '@/utils/share';
import { createArticle, editArticle, getArticle } from '@/api/article';

export type IdrawerType = 'check' | 'add' | 'edit';

const EDITOR_CONTENT = 'articleContent';

const ArticleManage: React.FC<any> = props => {
  const { location } = props;

  const [type, setType] = useState<any>(location.query?.type);

  const superFormRef = useRef<any>(null);


  const fetchDetail = async (id:number|string) => {
    const res = await getArticle(id);
    res.cate = {
      id:res.categoryId,
      name:res.categoryName
    }
    res.publishTime = moment(res.publishTime);
    res.isEncrypt = !!res.isEncrypt;
    res.content = getValueBySession(EDITOR_CONTENT,true) ?? res.content;
    superFormRef.current.setFieldsValue(res);
  };

  const onAutoSave = (value:string)=>{
    setValueBySession(EDITOR_CONTENT,value);
  }

  useEffect(() => {
    setType(location.query?.type);
  }, [location.query?.type]);

  useEffect(() => {
    const {id,type} = location.query;
    if(id && type !== 'add'){
      fetchDetail(id);
    } else {
      superFormRef.current.setFieldsValue({
        content: getValueBySession(EDITOR_CONTENT,true) ?? ''
      });
    }
    return ()=>{
      window.sessionStorage.removeItem(EDITOR_CONTENT);
    }
  }, []);

  const formConfig: ISuperForm = {
    labelCol: {
      span: 2,
    },
    formItemList: [
      {
        type: 'input',
        key: 'title',
        label: '文章标题',
        placeholder: '请输入文章标题',
        disabled: type === 'check',
        formItemConfig: {
          rules: [{ required: true, message: '请输入文章标题' }],
        },
      },
      {
        type: 'input',
        key: 'subMessage',
        label: '文章简介',
        placeholder: '请输入文章简介',
        disabled: type === 'check',
      },
      {
        type: 'upload',
        label: '封面图',
        key: 'cover',
        isCrop: true,
        limit: 1,
        disabled: type === 'check',
        formItemConfig: {
          rules: [
            {
              required: true,
              message: '请上传封面图',
            },
          ],
        },
      },
      {
        type: 'switch',
        key: 'isEncrypt',
        label: '是否加密',
        disabled: type === 'check',
        formItemConfig: {
          initialValue: false,
          valuePropName: 'checked',
          rules: [{ required: true, message: '请选择是否加密' }],
        },
      },
      {
        type: 'datePicker',
        showTime: true,
        key: 'publishTime',
        label: '发布日期',
        disabled: type === 'check',
        formItemConfig: {
          normalize: val => (val ? moment(val) : undefined),
          rules: [{ required: true, message: '请选择发布日期' }],
        },
      },
      {
        type: 'Render',
        key: 'cate',
        label: '文章分类',
        placeholder: '请选择文章分类',
        disabled: type === 'check',
        formItemConfig: {
          rules: [
            {
              required: true,
              message: '请选择文章分类',
            },
          ],
        },
        render: (
          <SelectByApi
            propName="name"
            disabled={type === 'check'}
            fetchList={searchKey => searchArticleCate({ name: searchKey })}
          />
        ),
      },
      {
        type: 'Render',
        key: 'articleTags',
        label: '文章标签',
        placeholder: '请选择标签',
        disabled: type === 'check',
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
            propName="name"
            disabled={type === 'check'}
            mode="multiple"
            fetchList={searchKey => searchArticleTag({ tagName: searchKey })}
          />
        ),
      },
      {
        type: 'Render',
        key: 'content',
        label: '文章内容',
        placeholder: '请输入内容',
        disabled: type === 'check',
        formItemConfig: {
          rules: [
            {
              required: true,
              message: '请输入内容',
            },
          ],
        },
        render: <FormEditor onAutoSave={onAutoSave}/>,
      },
      {
        type: 'radio',
        key: 'status',
        options: [
          {
            label: '禁用',
            value: 0,
          },
          {
            label: '立即发布',
            value: 1,
          },
          {
            label: '待发布',
            value: 2,
          },
        ],
        label: '文章状态',
        disabled: type === 'check',
        formItemConfig: {
          initialValue: 2,
          rules: [{ required: true, message: '请选择文章状态' }],
        },
      },
    ],
    formHanlders:
      type === 'check'
        ? []
        : [
            {
              bgColor: 'primary',
              txt: '确认',
              srouce: 'submit',
            },
          ],
  };

  const handleSubmit = async (values: any, srouce: string) => {
    const api = type === 'add' ? createArticle : editArticle;
    const params = {
      ...values,
    };
    type === 'edit' && (params.id = location.query.id);
    params.publishTime = moment(params.publishTime).format(timeFormat);
    params.status = +params.status;
    params.categoryId = params.cate?.id;
    params.categoryName = params.cate?.name;
    params.wordsNumber = params.content.length;
    await api(params);
    message.success('操作成功');
    router.replace('/articleManage/list');
  };

  return <SuperForm {...formConfig} handleSubmit={handleSubmit} ref={superFormRef} />;
};

export default withRouter(ArticleManage);
