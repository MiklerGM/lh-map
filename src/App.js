import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';

import createHistory from 'history/createBrowserHistory';

import lang from '../data/lang.json';

import Main from './pages/Main';
import Map from './containers/Map';
import Tooltip from './components/Tooltip';

import localeDataRU from './locales/ru.json';
import localeDataEN from './locales/en.json';
import RareLanguages from './containers/RareLanguages';

const history = createHistory();

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

const linkTemplate = window.location.origin;

const genResultLink = res => ({
  href: `/result/${res}`,
  url: `${linkTemplate}/result/${res}`,
  img: `${linkTemplate}/preview/${res}.png`,
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
    i18n: 'ru',
    shared: false,
    tooltipActive: false,
    tooltipPosition: [0, 0],
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
      this.setState(prevState => ({
        tooltipActive: true,
        tooltipPosition: e.pixel,
        tooltipInfo: (prevState.i18n === 'ru')
          ? e.object.properties.adminRu
          : e.object.properties.admin,
      }));
    }
  }

  select(lng) {
    console.log('> Selecting', lng, 'App.js>select');
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
      result: genResultLink('hello'),
      shared: false,
    }, () => this.share());
  }

  share(check = false, tryCount = 0) {
    const { selected, population } = this.state;
    const body = {
      selected: Object.keys(selected).filter(f => selected[f]),
      pop: population,
      i18n: this.state.i18n,
      check
    };

    const url = '/share';
    const req = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, req).then((response) => {
      if (response.status !== 200) {
        console.error('Sending was unsuccessful');
        if (tryCount < 4) {
          setTimeout(() => {
            console.info('New try');
            this.share(check, tryCount + 1);
          }, 500);
        } else {
          console.error('Too many tries');
          console.error('Response', response);
        }
        return;
      }
      try {
        response.json().then((j) => {
          console.log('>>> Shared result');
          console.log(j);
          if (j.success) {
            this.setState((prevState) => {
              const curSelected = Object.keys(prevState.selected)
                .filter(f => prevState.selected[f])
                .sort().join('');
              const flatSelected = j.selected.sort().join('');
              if (curSelected === flatSelected) {
                if (j.ready === true) {
                  const result = genResultLink(j.result);
                  console.log('history', history);
                  history.push(result.href);
                  this.setState({
                    shared: j.ready,
                    result,
                  });
                } else {
                  console.info('Image not ready');
                  console.info(j.selected);
                  setTimeout(() => {
                    console.info('New check');
                    this.share(true);
                  }, 150);
                }
              } else {
                console.error('Stalled data on sharing', prevState, j);
                console.error(curSelected, flatSelected, curSelected === flatSelected);
              }
            });
          } else {
            console.error('Terrible error happened, but not handled correctly');
          }
        });
      } catch (e) {
        console.error('Something bad happened on server', e);
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
      tooltipPosition,
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
          {tooltipActive
            && <Tooltip position={tooltipPosition} info={tooltipInfo} />}
          <RareLanguages selected={selected} />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
