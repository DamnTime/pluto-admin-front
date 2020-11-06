import React, { useEffect, useState } from 'react';
import { Upload, Icon, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import rootApi from '@/core/api';
import { customUploadRequest, dataType } from '@/utils/share';
import { IUpload } from '@/interface/IUpload';
import { uploadHost } from '@/core/config';

import 'antd/es/modal/style';
import 'antd/es/slider/style';

const { Dragger } = Upload;

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const FileUpload = (props: IUpload) => {
  const { value, onChange, limit = 2, uploadType = 'upload', isCrop = false, ...rest } = props;

  const transformValue = (val: any) => {
    const receiveValue = val ? val.split(',') : [];
    return receiveValue.map((val: string, idx: number) => ({
      uid: `-${idx}`,
      name: val.split('/').slice(-1)[0],
      status: 'done',
      url: val,
    }));
  };

  const [fileList, setFileList] = useState<any>(transformValue(value));

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    if (value) {
      setFileList(transformValue(value));
    }
  }, [value]);

  const getChangedVals = (list: any[]) => {
    return list.map((file: any) => file.url || `${uploadHost}/${file.response}`).join(',');
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);

    if (info.file.status === 'done') {
      let files = '';

      if (dataType(info.fileList, 'array')) {
        files = getChangedVals(info.fileList);
      }

      onChange && onChange(files);
    }
  };

  const handelRemove = (file: any) => {
    const changedVals = getChangedVals(fileList.filter((f: any) => f.uid !== file.uid));

    onChange && onChange(changedVals);
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisible(true);
  };

  const commonProps = {
    action: `${rootApi[process.env.UMI_ENV]}/admin/common/uploadToken`,
    accept: 'image/jpg,image/jpeg,image/png',
    fileList,
    customRequest: (info: any) => customUploadRequest({ info, prefix: 'goodsImage' }),
    onChange: handleUploadChange,
    onRemove: handelRemove,
    onPreview: handlePreview,
  };

  const uploadBtn = (txt: string) => {
    return (
      fileList.length < limit && (
        <>
          <Icon type="plus" />
          <div className="ant-upload-text" style={{ fontSize: '12px' }}>
            {txt}
          </div>
        </>
      )
    );
  };

  const renderComp = () => {
    const comps = {
      upload: (
        <Upload listType="picture-card" {...commonProps} {...rest}>
          {uploadBtn('点击上传')}
        </Upload>
      ),
      dragupload: (
        <Dragger {...commonProps} {...rest}>
          {uploadBtn('点击或拖拽上传')}
        </Dragger>
      ),
    };
    return comps[uploadType];
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  return (
    <>
      {isCrop ? <ImgCrop rotate>{renderComp()}</ImgCrop> : renderComp()}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default FileUpload;
