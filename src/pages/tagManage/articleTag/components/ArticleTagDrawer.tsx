import React, { useEffect, useRef, useState } from 'react';
import { Drawer, message } from 'antd';
import { ISuperForm } from '@/interface/ISuperform';
import SuperForm from '@/components/SuperForm';
import ColorPicker from '@/components/ColorPicker';
import { createArticleTag, editArticleTag, getArticleTag } from '@/api/articleTag';

const DRAWER_TYPE_TITLE = {
  check: '查看文章',
  add: '新增文章',
  edit: '编辑文章',
};

export type IdrawerType = 'check' | 'add' | 'edit';

interface IDrawerProps {
  drawerType: IdrawerType;
  onClose: any;
  visible: boolean;
  id?: number | string;
  handleAfter: () => void;
}

const ArticleTagDrawer: React.FC<IDrawerProps> = props => {
  const { drawerType, onClose, visible, id, handleAfter } = props;

  const superFormRef = useRef<any>(null);

  const [detail, setDetail] = useState<any>({});

  const formConfig: ISuperForm = {
    formItemList: [
      {
        type: 'input',
        key: 'name',
        label: '标签名称',
        placeholder: '请输入标签名称, 不超过4个字符',
        disabled: drawerType === 'check',
        maxLength: 4,
        formItemConfig: {
          rules: [{ required: true, message: '请输入标签名称' }],
        },
      },
      {
        type: 'Render',
        key: 'color',
        label: '标签颜色',
        placeholder: '请选择颜色',
        disabled: drawerType === 'check',
        formItemConfig: {
          initialValue: '#22194D',
          rules: [
            {
              required: true,
              message: '请选择标签',
            },
          ],
        },
        render: <ColorPicker />,
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
    const res = await getArticleTag(id);
    setDetail(res);
    superFormRef.current.setFieldsValue(res);
  };

  useEffect(() => {
    if (visible && drawerType !== 'add') {
      fetchDetail();
    }
  }, [visible]);

  const handleSubmit = async (values: any, srouce: string) => {
    const api = drawerType === 'add' ? createArticleTag : editArticleTag;
    await api({
      ...detail,
      ...values,
    });
    message.success('操作成功');
    handleAfter && handleAfter();
  };

  return (
    <Drawer
      title={`${DRAWER_TYPE_TITLE[drawerType]}标签`}
      width={600}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
    >
      <SuperForm {...formConfig} handleSubmit={handleSubmit} ref={superFormRef} />
    </Drawer>
  );
};

export default ArticleTagDrawer;
