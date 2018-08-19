import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';

// Need to fetch this data instead of importing
import map from '../data/map.json';
import lang from '../data/lang.json';

// import AppRouter from './routes';
import Main from './pages/Main';
// import Result from './pages/Result';
import Map from './containers/Map';

import localeDataRU from './locales/ru.json';
// import localeDataEN from './locales/en.json';
addLocaleData([...en, ...ru]);

class App extends React.Component {
  state = {
    intl: {
      locale: 'en',
      key: 'en',
      messages: localeDataRU
    },
    selected: Object.keys(lang).reduce((prev, cur) => ({
      ...prev,
      [cur]: false
    })),
  }

  render() {
    const { intl, selected } = this.state;
    return (
      <IntlProvider {...intl}>
        <div>
          <Map map={map} lang={lang} selected={selected} />
          <Main />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
