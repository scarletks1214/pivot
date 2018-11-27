import React from 'react';

export const Alert = props => {
  let type = props.type || 'info';
  let dismissable = props.dismissable === false ? false : true;

  let className = [props.className, 'alert', 'alert-' + type, dismissable ? 'alert-dismissable' : ''].join(' ');

  let title = props.title ? <strong>{props.title} </strong> : null;
  let text = props.text || null;

  return (
    <div className={className}>
      {title}
      {text}
      {props.children}
    </div>
  );
};

export default Alert;
