import { ITableColumns } from './ITable';
import { ISuperForm } from './ISuperform';
export interface IListPage {
  fetchList?: Function; // 获取数据方法
  dealData?: Function; // 对数据进行额外的处理
  tableConfig: {
    columns: ITableColumns[];
    dataSource?: any[];
  };
  formConfig: ISuperForm;
  autoLoad?: boolean;
  extraParam?: any; // 请求数据额外的参数
  renderMiddle?: React.ReactNode;
  renderTop?: React.ReactNode;
}
