import React from 'react';
import { FormattedMessage } from 'react-intl';

import img from '../assets/lh-kat.svg';

import ButtonToggle from '../components/ButtonToggle';

class LanguageSetup extends React.Component {
  proceed() {
    this.props.updateUI({ langGrid: false });
  }

  render() {
    return (
      <div className='language-setup layer-5'>
        <div className='modal_head'>
          <h3>
            <img
              src={img}
              alt='cat'
              style={{
                width: '40px',
                height: '40px',
                display: 'inline'
              }}
            />
            <FormattedMessage id='langsetup.title' />
          </h3>
          <h3>
            <button onClick={() => this.props.updateUI({ langGrid: false })} className='close-window' type='button'>
              <span className="lnr lnr-cross" />
            </button>
          </h3>
        </div>
        <div className='lang-list'>
          {Object.keys(this.props.selected).map(lang => (
            <ButtonToggle
              key={`key_${lang}`}
              name={lang}
              checked={this.props.selected[lang]}
              select={this.props.select}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  }
}

export default LanguageSetup;
