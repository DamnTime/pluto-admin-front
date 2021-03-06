import moment from 'moment';

export const pagenation = {
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  total: 0,
  showTotal: (total: number) => `共${total}条`,
};

export const uploadHost = 'http://cdn.pluto1811.com';

export const timeFormat = 'YYYY-MM-DD HH:mm:ss';

// 登录失效 session存储的key
export const _login_time_out_temp_data = '_login_time_out_temp_data';

export const normalizeTime = (time: any, format = timeFormat): string => {
  return moment.isMoment(time) ? moment(time).format(format) : moment().format(format);
};

export const defaultFormItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
