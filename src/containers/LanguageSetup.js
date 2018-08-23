import React from 'react';
import { FormattedMessage } from 'react-intl';


import ButtonToggle from '../components/ButtonToggle';

class LanguageSetup extends React.Component {
  proceed() {
    this.props.updateUI({ langGrid: false });
  }

  render() {
    return (
      <div className='language-setup layer-3'>
        <button onClick={() => this.props.updateUI({ langGrid: false })} className='close-window' type='button'>
          <span className="lnr lnr-cross" />
        </button>
        <h3>
          <FormattedMessage id='langsetup.title' />
        </h3>
        <div className='lang-list'>
          {Object.keys(this.props.selected).map(lang => (
            <ButtonToggle
              key={`key_${lang}`}
              name={lang}
              checked={this.props.selected[lang]}
              cb={e => this.props.cb(e)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default LanguageSetup;
