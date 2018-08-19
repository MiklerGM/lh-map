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
import localeDataEN from './locales/en.json';
import RareLanguages from './containers/RareLanguages';

console.time('Calculating Locales');
const localeLang = Object.keys(lang).reduce((p, c) => ({
  en: {
    ...p.en,
    [`${c}.full`]: lang[c].i18n.eng
  },
  ru: {
    ...p.ru,
    [`${c}.full`]: lang[c].i18n.rus
  }
}), { en: {}, ru: {} });
console.timeEnd('Calculating Locales');

addLocaleData([...en, ...ru]);

class App extends React.Component {
  locales = {
    en: {
      locale: 'en',
      key: 'en',
      messages: { ...localeDataEN, ...localeLang.en }
    },
    ru: {
      locale: 'ru',
      key: 'ru',
      messages: { ...localeDataRU, ...localeLang.ru }
    }
  }

  state = {
    intl: this.locales.ru,
    selected: window.store.selected === null
      ? Object.keys(lang).reduce((prev, cur) => ({
        ...prev,
        [cur]: false
      }), {})
      : window.store.selected,
  }

  select(lng) {
    const { selected } = this.state;
    const newSelected = {
      ...selected,
      [lng]: !selected[lng],
    };
    window.store.selected = newSelected;
    this.setState({
      selected: newSelected
    });
  }

  render() {
    const { intl, selected } = this.state;
    return (
      <IntlProvider {...intl}>
        <div>
          <Map map={map} lang={lang} selected={selected} />
          <Main lang={lang} selected={selected} select={lng => this.select(lng)} />
          <RareLanguages selected={selected} />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
