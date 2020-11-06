export interface IListPageRef {
  setFormValue: () => any;
  handleRefresh: () => void;
  getFormValues: () => any;
  fetchList: () => void;
  [prop: string]: any;
}
