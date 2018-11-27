import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import 'highlight.js/styles/solarized-dark.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import AppRouters from './routers';

ReactDOM.render(
  <Router>
    <AppRouters />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
