// @flow

import React from 'react';

const PageBtns = (props: { dataLength: number, cardsPerPage: number, clickHandler: Function }) => (
  <div>
    {Array.from({ length: Math.ceil(props.dataLength / props.cardsPerPage) }, (v, i) => i + 1).map(val => (
      <button key={val} onClick={props.clickHandler}>
        {val}
      </button>
    ))}
  </div>
);

export default PageBtns;
