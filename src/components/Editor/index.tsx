import React, { useRef } from 'react';
import Editor from 'for-editor';
import { message } from 'antd';
import { customUploadRequest } from '@/utils/share';
import { uploadHost } from '@/core/config';

interface IEditor {
  value?: string;
  onChange?: (str: string) => void;
  onAutoSave?: (str: string) => void;
}

const FormEditor = (props: IEditor) => {
  const { value = '', onChange, onAutoSave, ...rest } = props;

  const forEditorRef = useRef<any>(null);

  const handleChange = (val: any) => {
    onChange && onChange(val);
  };

  const handleAddImg = (img: any) => {
    const info = {
      onSuccess: (file: any) => {
        forEditorRef.current.$img2Url(img.name, `${uploadHost}/${file}`);
      },
      file: img,
    };
    customUploadRequest({ info, prefix: 'forEditor' });
  };

  // 点击保存
  const handleSave = () => {
    if (typeof onAutoSave === 'function' && value) {
      onAutoSave(value);
      message.success('保存成功');
    }
  };

  const editorProps = {
    value,
    onChange: handleChange,
    ...rest,
    addImg: handleAddImg,
    onSave: handleSave,
    toolbar: {
      h1: true, // h1
      h2: true, // h2
      h3: true, // h3
      h4: true, // h4
      img: true, // 图片
      link: true, // 链接
      code: true, // 代码块
      preview: true, // 预览
      expand: true, // 全屏
      /* v0.0.9 */
      undo: true, // 撤销
      redo: true, // 重做
      save: true, // 保存
      /* v0.2.3 */
      subfield: true, // 单双栏模式
    },
  };

  return (
    <>
      <Editor ref={forEditorRef} {...editorProps} />
    </>
  );
};

export default FormEditor;
