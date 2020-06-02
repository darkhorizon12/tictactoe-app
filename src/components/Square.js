import React from 'react';
import "../Game.css";

const Square = (props) => {
  const { value, onClick, win } = props;
  const cNm = win ? "b_square" : "square";
  return (
    <button
      className={ cNm }
      onClick={ onClick }
    >
      { value }
    </button>
  );
};

export default Square;