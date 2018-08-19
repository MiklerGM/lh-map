import React from 'react';
import { render } from 'react-dom';
import App from './App';

import './style.less';
import './App.less';
import StoreModel from './models';

window.store = new StoreModel();

function renderApp(component) {
  const Application = component;
  render(<Application store={window.store} />, document.body.appendChild(document.createElement('div')));
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
