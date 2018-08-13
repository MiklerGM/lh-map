import React from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';

import ButtonToggle from '../components/ButtonToggle';

@inject('store')
@observer
class LanguageSetup extends React.Component {
  close() {
    console.log(' --- close func --- ');
  }


  @action handleData(data) {
    Object.keys(data).map((cur) => {
      this.props.store.data.data[cur] = data[cur];
      return false;
    });
  }

  proceed() {
    console.log('--- close window --- ');
    console.log('-- choosed langauge ---');
    console.log(  Object.keys(this.props.store.data.data).filter((v) => (this.props.store.data.data[v])) );
    this.props.store.flags.flag.langaugeSetup = false;
    this.props.store.data.languages = Object.keys(this.props.store.data.data).filter((v) => (this.props.store.data.data[v]));
  }

  render() {
    if (!this.props.store.flags.flag.langaugeSetup) {
      return null;
    }

    return (
      <div className='language-setup layer-3'>
        <button onClick={() => this.close()} className='close-window' type='button'>
          <span className="lnr lnr-cross" />
        </button>
        <h3>Choose language</h3>

        <div className='lang-list'>
          {Object.keys(this.props.store.data.data).map(
            lang =>
              <ButtonToggle
                key={`key_${lang}`}
                name={lang}
                label={lang}
                checked={this.props.store.data.data[lang]}
                cb={e => this.handleData(e)}
              />
          )}
        </div>
        <button onClick={() => this.proceed()} type='button'>
          Proceed
        </button>
      </div>
    )
  }
}

export default LanguageSetup;
