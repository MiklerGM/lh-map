import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './App';

import './style.less';
import './App.less';
import StoreModel from './models';

window.store = new StoreModel();

ReactDOM.render(<App store={window.store} />, document.body.appendChild(document.createElement('div')));
