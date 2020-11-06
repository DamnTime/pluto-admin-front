import React,{useEffect, useState} from 'react';
import { Select } from 'antd';
import debounce from 'lodash/debounce';
import { SelectProps } from 'antd/es/select';
import { dataType } from '@/utils/share';

const { Option } = Select;

interface ISelectUserTag extends SelectProps {
  propId?: string;
  propName?: string;
  fetchList: (val:string|number) => Promise<any>;
  value?: any;
  onChange?: (val: any) => void;
}

const SelectByApi = (props: ISelectUserTag) => {
  const { value, onChange, propId = 'id', propName = 'name',fetchList, ...rest } = props;

  const isMultiple = rest.mode === 'multiple';

  const [data,setData] = useState<any[]>([]);

  useEffect(()=>{
    if(value){
      setData(dataType(value,'array') ? value : [value])
    }
  },[value])

  const handleChange = (val:any) => {
    let changeValue;
    if(isMultiple){
      changeValue = data.filter(d=>val.includes(d[propId]));
    } else{
      changeValue = data.find(d=> +d[propId] === +val);
    }

    onChange && onChange(changeValue);
  };

  const handleSearch = debounce(async (searchKey:string|number) => {
    if (searchKey) {
      const result = await fetchList(searchKey);
      setData(result ?? []);
    } else {
      setData([]);
    }
  },200);

  const receiveValue = value ? isMultiple ? value.map((val: any) => val[propId]) : value[propId] : undefined;


  const options = data.map(d => <Option key={+d[propId]} value={+d[propId]}>{d[propName]}</Option>);

  return (
    <Select
      showSearch
      value={receiveValue}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      {...rest}
    >
      {options}
    </Select>
  );
};

export default SelectByApi;
