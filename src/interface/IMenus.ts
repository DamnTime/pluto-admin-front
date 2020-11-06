interface IMenusItem {
  path: string;
  lavel?: number;
  hidden?: boolean;
  title: string;
  icon: string;
}
interface IMenus extends IMenusItem {
  children?: IMenusItem[];
}
export default IMenus;
