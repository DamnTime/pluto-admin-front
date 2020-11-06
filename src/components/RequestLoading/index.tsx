import React from 'react';
import { Spin } from 'antd';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';

type ILoadingProp = {
  tip: string;
};

interface ICreateLoading {
  show: () => void;
  destroy: () => void;
}

const Loading = (props: ILoadingProp) => <Spin size="large" tip={props.tip} />;

const CreateLoading = (props?: any): ICreateLoading => {
  let loadingIntance: any = null;
  return {
    show() {
      if (!loadingIntance) {
        loadingIntance = document.createElement('div');
        loadingIntance.className = 'loading-content';
        document.body.appendChild(loadingIntance);
        ReactDOM.render(React.createElement(Loading, props), loadingIntance);
      }
    },
    destroy: debounce(function() {
      if (loadingIntance) {
        ReactDOM.unmountComponentAtNode(loadingIntance);
        document.body.removeChild(loadingIntance);
        loadingIntance = null;
      }
    }, 500),
  };
};

export default CreateLoading;
