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
    shared: null,
    population: window.store.population || 0,
    intl: this.locales.ru,
    selected: window.store.selected === null
      ? Object.keys(lang).reduce((prev, cur) => ({
        ...prev,
        [cur]: false
      }), {})
      : window.store.selected,
  }

  select(lng) {
    const { selected: oldSelected } = this.state;
    const selected = {
      ...oldSelected,
      [lng]: !oldSelected[lng],
    };
    const population = Object.keys(selected).reduce((prev, cur) => (
      selected[cur] === true
        ? prev + lang[cur].counter
        : prev), 0);

    window.store.population = population;
    window.store.selected = selected;
    this.setState({
      population,
      selected,
    });
  }

  share() {
    const { population, selected, shared } = this.state;
    if (shared !== null) return null;
    const body = {
      selected: Object.keys(selected).filter(f => selected[f]),
      pop: population,
      i18n: null,
    };

    const url = '/share';
    const req = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, req).then((response) => {
      const success = response.status === 200;
      if (success) {
        console.log('Success', response);
        try {
          response.json().then((j) => {
            console.log('>>> Success');
            console.log(j);
            console.log(j.result);
            this.setState({
              shared: j.result
            });
          });
        } catch (e) {
          console.error('Something bad happened on server', e);
        }
      } else {
        console.error('Sending was unsuccesdcdcsdcsdc');
      }
    });
    return null;
  }

  render() {
    const {
      intl,
      selected,
      shared,
    } = this.state;

    return (
      <IntlProvider {...intl}>
        <div>
          <Map map={map} lang={lang} selected={selected} />
          <Main
            lang={lang}
            selected={selected}
            select={lng => this.select(lng)}
            share={() => this.share()}
            shared={shared}
          />
          <RareLanguages selected={selected} />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
