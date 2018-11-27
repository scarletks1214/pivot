import * as React from 'react';

import Header from './Header';

export default (props: any) => (
  <div>
    <Header />
    {props.children}
    <footer />
  </div>
);
