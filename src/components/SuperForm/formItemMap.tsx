import React, { cloneElement } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Checkbox,
  Radio,
  DatePicker,
  Cascader,
} from 'antd';
import FileUpload from '@/components/FileUpload/index';

const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItemMap = {
  input(config: any) {
    const defaultPlaceHolder = `请输入${config.label}`;
    const type = config.inputType || 'text';
    return <Input placeholder={defaultPlaceHolder} {...config} type={type} />;
  },
  textarea(config: any) {
    const defaultPlaceHolder = `请输入${config.label}`;
    return <Input.TextArea placeholder={defaultPlaceHolder} {...config} />;
  },
  select(config: any) {
    const { options, ...rest } = config;
    return (
      <Select {...rest}>
        {options.map((option: any) => (
          <Option value={option.value} disabled={!!option.disabled} key={option.value}>
            {option.title}
          </Option>
        ))}
      </Select>
    );
  },
  inputNumber(config: any) {
    return <InputNumber {...config} />;
  },
  switch(config: any) {
    return <Switch {...config} />;
  },
  checkbox(config: any) {
    const { options, ...rest } = config;
    return <CheckboxGroup options={options} {...rest} />;
  },
  radio(config: any) {
    const { options, ...rest } = config;
    return <RadioGroup options={options} {...rest} />;
  },
  monthPicker(config: any) {
    return <MonthPicker {...config} />;
  },
  rangePicker(config: any) {
    return <RangePicker {...config} />;
  },
  datePicker(config: any) {
    return <DatePicker {...config} />;
  },
  weekPicker(config: any) {
    return <WeekPicker {...config} />;
  },
  cascader(config: any) {
    const { options, ...rest } = config;
    return <Cascader options={options} {...rest} />;
  },
  upload(config: any) {
    return <FileUpload {...config} />;
  },
  Render(config: any) {
    const render = config.render || <></>;
    return cloneElement(render, config);
  },
};

export default FormItemMap;
