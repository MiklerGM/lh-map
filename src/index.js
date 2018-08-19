import React from 'react';
import { render } from 'react-dom';
import App from './App';

import './style.less';
import './App.less';

function renderApp(component) {
  const Application = component;
  render(<Application />, document.body.appendChild(document.createElement('div')));
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
