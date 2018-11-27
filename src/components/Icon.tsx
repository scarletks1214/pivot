import * as React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faBars);
library.add(faPlus);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type IconType = 'bars' | 'plus';

interface IProps {
  type: IconType;
}

export default (props: IProps) => {
  return <FontAwesomeIcon icon={props.type} />;
};
