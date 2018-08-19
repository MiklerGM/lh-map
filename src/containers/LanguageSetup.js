import React from 'react';

import ButtonToggle from '../components/ButtonToggle';

class LanguageSetup extends React.Component {
  handleData(data) {
  //   Object.keys(data).map((cur) => {
  //     this.props.store.data.data[cur] = data[cur];
  //     return false;
  //   });
    console.log('data', data);
  }

  proceed() {
    this.props.updateUI({ langgrid: false });
  }

  render() {
    return (
      <div className='language-setup layer-3'>
        <button onClick={() => this.props.updateUI({ langgrid: false })} className='close-window' type='button'>
          <span className="lnr lnr-cross" />
        </button>
        <h3>Choose language</h3>

        <div className='lang-list'>
        {Object.keys(this.props.selectedLang).map(lang =>
          <ButtonToggle
            key={`key_${lang}`}
            name={lang}
            label={lang}
            checked={this.props.selectedLang[lang]}
            cb={e => this.props.cb(e)}
          />
        )}
        </div>
        <button onClick={() => this.proceed()} type='button'>
          Proceed
        </button>
      </div>
    );
  }
}

export default LanguageSetup;
