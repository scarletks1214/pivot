import React from 'react';

function Icon(props) {
  let className = 'fa fa-' + props.type;
  if (props.spin) {
    className += ' fa-spin';
  }
  return <i className={className} />;
}

export default Icon;
