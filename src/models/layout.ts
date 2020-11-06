export default {
  state: {
    collapsed: false,
  },
  reducers: {
    setCollapsed(state: any, { payload: { collapsed } }: any) {
      return { ...state, collapsed };
    },
  },
};
