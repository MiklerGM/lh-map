import React from 'react';
import { Provider, observer } from 'mobx-react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';

import AppRouter from './routes';

import localeDataRU from './locales/ru.json';
import localeDataEN from './locales/en.json';
addLocaleData([...en, ...ru]);


@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: 'en',
      messages: localeDataRU
    };
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <IntlProvider
          locale={this.state.locale}
          key={this.state.locale}
          messages={this.state.messages}
        >
          <Router>
            <AppRouter />
          </Router>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
