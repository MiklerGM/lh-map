import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';

import lang from '../data/lang.json';

import Main from './pages/Main';
import Map from './containers/Map';
import Tooltip from './components/Tooltip';

import localeDataRU from './locales/ru.json';
import localeDataEN from './locales/en.json';
import RareLanguages from './containers/RareLanguages';

console.time('Calculating Locales');
const localeLang = Object.keys(lang).reduce((p, c) => ({
  en: {
    ...p.en,
    [`${c}.full`]: lang[c].i18n.en
  },
  ru: {
    ...p.ru,
    [`${c}.full`]: lang[c].i18n.ru
  }
}), { en: {}, ru: {} });
console.timeEnd('Calculating Locales');

addLocaleData([...en, ...ru]);

const genResultLink = res => ({
  url: `${window.location.href}result/${res}`,
  img: `${window.location.href}preview/${res}.png`,
});

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
    map: {},
    idx: 0,
    i18n: 'ru',
    shared: null,
    tooltipActive: false,
    tooltipCoord: [0, 0],
    tooltipInfo: '',
    result: genResultLink('hello'),
    population: window.store.population || 0,
    intl: this.locales.ru,
    selected: window.store.selected === null
      ? Object.keys(lang).reduce((prev, cur) => ({
        ...prev,
        [cur]: false
      }), {})
      : window.store.selected,
  }

  componentDidMount() {
    if (navigator.language === 'ru-RU') {
      this.changeLocale('ru');
    } else {
      this.changeLocale('en');
    }
    this.loadData();
  }

  setTooltip(e) {
    // e.color === null ? null : d.object.key;
    // this.props.store.pins.setActive(key, false);
    // this.props.store.pins.setPosition(d.x, d.y);
    if (e.color === null) {
      this.setState({ tooltipActive: false });
    } else {
      (this.state.i18n === 'ru')
        ? this.setState({
          tooltipActive: true,
          tooltipCoord: e.pixel,
          tooltipInfo: e.object.properties.adminRu
        })
        : this.setState({
          tooltipActive: true,
          tooltipCoord: e.pixel,
          tooltipInfo: e.object.properties.admin
        });
    }
  }

  select(lng) {
    console.log('Selecting', lng);
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
    const idx = this.state.idx + 1;
    this.setState({
      idx,
      population,
      selected,
    });
    this.share(population, selected, idx);
  }

  share(population, selected, idx) {
    const body = {
      selected: Object.keys(selected).filter(f => selected[f]),
      pop: population,
      i18n: this.state.i18n,
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
        try {
          response.json().then((j) => {
            console.log('>>> Shared result');
            console.log(j);
            if (j.success) {
              if (this.state.idx >= idx) {
                this.setState({
                  shared: j.result,
                  result: genResultLink(j.result)
                });
              } else {
                console.error('Stalled data on sharing');
                console.log(idx, this.state.idx);
              }
            } else {
              console.error('Terrible error happened, but not handled correctly');
            }
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

  changeLocale(loc) {
    if (loc in this.locales) {
      this.setState({
        i18n: loc,
        intl: this.locales[loc],
      });
    }
  }

  loadData() {
    fetch('./map.json')
      .then(response => response.json())
      .then(map => this.setState({ map }));
  }

  render() {
    const {
      map,
      intl,
      selected,
      shared,
      result,
      population,
      tooltipActive,
      tooltipCoord,
      tooltipInfo
    } = this.state;

    return (
      <IntlProvider {...intl}>
        <div>
          <Map map={map} lang={lang} selected={selected} setTooltip={e => this.setTooltip(e)} />
          <Main
            lang={lang}
            selected={selected}
            select={lng => this.select(lng)}
            shared={shared}
            result={result}
            population={population}
          />
          {tooltipActive ? <Tooltip coord={tooltipCoord} info={tooltipInfo} /> : null}
          <RareLanguages selected={selected} />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
