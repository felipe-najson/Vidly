import React from 'react';

// Input: liked:boolean
// Output: onClick()

const Like = (props) => {
  let classes = 'fa fa-heart';
  if (!props.liked) classes += '-o';
  return (
    <i
      onClick={props.onLikeToggle}
      className={classes}
      aria-hidden='true'
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Like;
