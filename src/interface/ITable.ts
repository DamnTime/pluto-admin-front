export interface ITableColumns {
  key: string;
  title: string;
}

export interface ITable {
  columns: ITableColumns[];
  dataSource: any[];
  handlePageChange?: Function;
}
