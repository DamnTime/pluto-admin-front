import React from 'react';

interface ITest {
  name: string;
}

const Test = (props: ITest) => {
  return <div>{props.name}</div>;
};

export default Test;
