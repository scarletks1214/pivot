import React from 'react';

import Icon from './Icon';
import $ from 'jquery';

function Button(props) {
  let propsCopy = $.extend({}, props);
  let color = propsCopy.color || 'secondary';

  propsCopy.className = propsCopy.className + (' btn btn-' + color) + (propsCopy.size ? ' btn-' + propsCopy.size : '');

  propsCopy.type = propsCopy.type || 'button';

  if (propsCopy.size) {
    delete propsCopy.size;
  }

  if (propsCopy.color) {
    delete propsCopy.color;
  }

  propsCopy.children = propsCopy.children || null;

  let icon = null;
  if (propsCopy.icon) {
    icon = <Icon type={propsCopy.icon} />;
    delete propsCopy.icon;
  }

  return (
    <button {...propsCopy}>
      {icon}
      {propsCopy.children}
    </button>
  );
}

export default Button;
