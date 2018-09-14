import React from 'react';
import { render } from 'react-dom';
import App from './App';

import './style.less';
import './App.less';
import './assets/favicon.ico';

window.store = {
  viewState: null,
  selected: null,
};

function renderApp(component) {
  const Application = component;
  render(<Application />, document.body.appendChild(document.createElement('div')));
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    // saving script child
    const script = document.body.removeChild(document.body.children[0]);
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    } // wiping all children
    // returning back script field
    document.body.appendChild(script);

    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
