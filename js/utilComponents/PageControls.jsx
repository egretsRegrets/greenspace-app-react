// @flow

import React from 'react';

export const PageBtns = (props: { dataLength: number, cardsPerPage: number, clickHandler: Function }) => {
  // $FlowFixMe
  const passValueToHandler = (event: SyntheticEvent<*>) => props.clickHandler(event.target.innerHTML);
  return (
    <div>
      {Array.from({ length: Math.ceil(props.dataLength / props.cardsPerPage) }, (v, i) => i + 1).map(val => (
        <button key={val} onClick={passValueToHandler}>
          {val}
        </button>
      ))}
    </div>
  );
};

export const NextPreviousBtns = (props: {
  pageNumber: number,
  dataLength: number,
  cardsPerPage: number,
  clickHandler: Function
}) => {
  const totalPages = Math.ceil(props.dataLength / props.cardsPerPage);
  // $FlowFixMe
  const passValueToHandler = (event: SyntheticEvent<*>) => props.clickHandler(event.target.name);
  const previousBtn = (
    <button
      name={props.pageNumber - 1}
      onClick={passValueToHandler}
      className="w4 pa3 mr4 tr pointer bg-white ba b--black bg-animate hover-bg-black hover-white v-top"
    >
      <svg className="w1 mt1 fl" data-icon="chevronLeft" viewBox="0 0 32 32" style={{ fill: 'currentcolor' }}>
        <title>chevronLeft icon</title>
        <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" />
      </svg>
      <span className="dib mt1">Previous</span>
    </button>
  );
  const nextBtn = (
    <button
      name={props.pageNumber + 1}
      onClick={passValueToHandler}
      className="w4 pa3 mr4 tl pointer bg-white ba b--black bg-animate hover-bg-black hover-white v-top"
    >
      <span className="dib mt1">Next</span>
      <svg className="w1 mt1 fr" data-icon="chevronRight" viewBox="0 0 32 32" style={{ fill: 'currentcolor' }}>
        <title>chevronRight icon</title>
        <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
      </svg>
    </button>
  );
  return (
    <div className="avenir v-btm">
      {props.pageNumber > 1 ? previousBtn : null}
      {props.pageNumber < totalPages ? nextBtn : null}
      <h5 className="dib black avenir f5" style={{ lineHeight: '2.4' }}>{`${props.pageNumber} of ${totalPages}`}</h5>
    </div>
  );
};
