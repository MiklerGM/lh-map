import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';

import createHistory from 'history/createBrowserHistory';

import ym, { YMInitializer } from 'react-yandex-metrika';
import ReactGA from 'react-ga';

import lang from '../data/lang.json';

import Main from './pages/Main';
import Map from './containers/Map';
import Tooltip from './components/Tooltip';

import localeDataRU from './locales/ru.json';
import localeDataEN from './locales/en.json';
import RareLanguages from './containers/RareLanguages';

const history = createHistory();

const YM_CONFIG = {
  defer: true,
  clickmap: false,
  trackLinks: true,
  // accurateTrackBounce: true,
  // webvisor: true,
  trackHash: true
};

const GA_CONFIG = {
  debug: true,
  titleCase: false
};


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

const genResultLink = (res, ts = new Date().getTime()) => ({
  href: `/result/${res}`,
  url: `${linkTemplate}/result/${res}`,
  img: `${linkTemplate}/preview/${res}.png?t=${ts}`,
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

  results = {
    error: genResultLink('error', '0'),
    loading: genResultLink('loading', '0'),
    hello: genResultLink('hello', '0'),
  }

  state = {
    map: {},
    i18n: 'ru',
    shared: false,
    clean: true, // zero selected languages
    tooltipActive: false,
    tooltipPosition: [0, 0],
    tooltipInfo: '',
    refreshButton: false,
    UI: {
      langGrid: false,
      sharePanel: false,
    },
    result: this.results.hello,
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
    // Locale Detection magic
    // if (navigator.language.match(/ru/i)) {
    //   this.changeLocale('ru');
    // } else {
    //   this.changeLocale('en');
    // }
    this.loadData(['map.json'], (s, m) => ({ map: m }));
    ReactGA.initialize('UA-111740941-1', GA_CONFIG);
  }

  componentDidUpdate(prevProps, prevState) {
    const { shared, clean } = this.state;
    if ((prevState.i18n !== this.state.i18n) && prevState.shared === true) {
      this.share();
    } else if (prevState.selected !== this.state.selected) {
      if (process.env !== 'production') {
        // update (global) state for HMR
        window.store.population = this.state.population;
        window.store.selected = this.state.selected;
      }
      if (this.state.clean === true) {
        history.push('/');
      }
      if (this.state.UI.sharePanel === true) {
        this.share();
      }
    }
    const sharePanelOpened = prevState.UI.sharePanel === false
      && this.state.UI.sharePanel === true;
    if (sharePanelOpened && !clean && !shared) {
      this.share();
    }
    const refreshPressed = prevState.refreshButton === false
      && this.state.refreshButton === true;
    if (refreshPressed && !clean) {
      if (shared) {
        this.share(false, 0, true); // forcing share
      } if (this.state.result.href === this.results.error.href) {
        // request for same picture e.g. response was too long
        this.share();
      }
    }
  }

  get adm() {
    return Object.keys(this.state.selected).filter(f => this.state.selected[f] === true)
      .reduce((p, c) => ([...p, ...lang[c].countries]), []) // list of all countries
      .reduce((p, c) => ({ ...p, [c]: true }), {}); // uniq countries
  }

  setTooltip = (e, region) => {
    // console.log('setTooltip');
    const field = (region) ? 'region' : 'admin';
    if (e.color === null) {
      this.disableTooltip();
    } else {
      // this.setState(prevState => ({
      //   tooltipActive: true,
      //   tooltipPosition: e.pixel,
      //   tooltipInfo: (prevState.i18n === 'ru')
      //     ? e.object.properties[`${field}Ru`]
      //     : e.object.properties[`${field}`],
      // }));
      const info = (this.state.i18n === 'ru')
        ? e.object.properties[`${field}Ru`]
        : e.object.properties[`${field}`];
      this.enableTooltip(true, e.pixel, info);
    }
  }

  enableTooltip = (active, position, info) => {
    // if (process.env !== 'production') {
    //   console.log('enableTooltip');
    //   console.log(active, position, info);
    // }
    this.setState({
      tooltipActive: active,
      tooltipPosition: position,
      tooltipInfo: info
    });
  }

  disableTooltip = () => {
    this.setState({ tooltipActive: false });
  }

  updateUI = (v) => {
    this.setState(prevState => ({
      UI: {
        // close all windows
        ...Object.keys(prevState.UI)
          .reduce((prev, cur) => ({ ...prev, [cur]: false }), {}),
        // apply new changes
        ...v
      }
    }));
  }

  select = (lng) => {
    // console.log('> Selecting', lng, 'App.js>select');
    const { selected: oldSelected } = this.state;
    const selected = {
      ...oldSelected,
      [lng]: !oldSelected[lng],
    };
    const population = Object.keys(selected).reduce((prev, cur) => (
      selected[cur] === true
        ? prev + lang[cur].counter
        : prev), 0);

    const dirty = Object.keys(selected).some(f => selected[f] === true);
    const result = dirty ? this.results.loading : this.results.hello;
    this.setState({
      clean: !dirty,
      population,
      selected,
      result,
      shared: false,
    });
  }

  share = (check = false, tryCount = 0, force = false) => {
    const { selected, population } = this.state;
    const body = {
      selected: Object.keys(selected).filter(f => selected[f]),
      pop: population,
      i18n: this.state.i18n,
      force,
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
        // console.error('Sending was unsuccessful');
        if (tryCount < 4) {
          setTimeout(() => {
            // console.info('New try');
            this.share(check, tryCount + 1);
          }, 500);
        } else {
          throw Error(`Server response status not 200 (${response.status})`);
        }
        return;
      }
      try {
        response.json().then((j) => {
          // console.log('>>> Shared result');
          // console.log(j);
          if (j.success) {
            this.setState((prevState) => {
              const curSelected = Object.keys(prevState.selected)
                .filter(f => prevState.selected[f])
                .sort().join('');
              const flatSelected = j.selected.sort().join('');
              if (curSelected === flatSelected) {
                if (j.ready === true) {
                  const result = genResultLink(j.result);
                  // console.log('history', history);
                  history.push(result.href);
                  this.setState({
                    refreshButton: false,
                    shared: j.ready,
                    result,
                  });
                } else if (tryCount < 10) {
                  const nextTry = tryCount + 1;
                  const nextTime = 150 * (nextTry);
                  setTimeout(() => {
                    this.share(true, nextTry);
                  }, nextTime);
                } else {
                  throw Error('Maximum waiting time exceeded');
                }
              // } else {
              //   console.error('Stalled data on sharing', prevState, j);
              //   console.error(curSelected, flatSelected, curSelected === flatSelected);
              }
            });
          } else {
            throw Error('Terrible error happened, but not handled correctly');
          }
        });
      } catch (e) {
        throw Error(e);
      }
    })
      .catch((e) => {
        this.setState({
          refreshButton: false,
          result: this.results.error,
          shared: false,
        });
        console.error('Something bad happened on server', e);
      });
    return null;
  }

  changeLocale = (loc) => {
    if (loc in this.locales) {
      ym('reachGoal', `localeChanged-${loc}`);
      this.setState(prevState => ({
        result: prevState.clean ? this.results.hello : this.results.loading,
        shared: false,
        i18n: loc,
        intl: this.locales[loc],
      }));
    }
  }

  loadData(files, saveCb) {
    if (files.length > 0) {
      const file = files.shift();
      fetch(`./${file}`)
        .then(response => response.json())
        .then(map => this.setState(
          state => saveCb(state, map, file),
          () => this.loadData(files, saveCb)
        ));
    }
  }

  render() {
    const {
      UI,
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
      <div>
        <Map
          map={map}
          lang={lang}
          selected={selected}
          setTooltip={this.setTooltip}
          updateUI={this.updateUI}
        />
        <IntlProvider {...intl}>
          <YMInitializer accounts={[50481805]} version='2' options={YM_CONFIG}>
            <Main
              UI={UI}
              lang={lang}
              selected={selected}
              select={this.select}
              shared={shared}
              result={result}
              refresh={() => {
                if (this.state.refreshButton !== true && this.state.clean !== true) {
                  this.setState({
                    refreshButton: true,
                    result: this.results.loading
                  });
                }
              }}
              population={population}
              locale={this.state.i18n}
              updateUI={this.updateUI}
              changeLocale={this.changeLocale}
            />
            {tooltipActive
              && (
                <Tooltip
                  position={tooltipPosition}
                  info={tooltipInfo}
                  cb={this.disableTooltip}
                />)
            }
            <RareLanguages selected={selected} enableTooltip={this.enableTooltip} />
          </YMInitializer>
        </IntlProvider>
      </div>
    );
  }
}

export default App;
