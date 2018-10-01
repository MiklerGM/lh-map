import React from 'react';
import { FormattedMessage } from 'react-intl';

import TLH from '../assets/TLH.svg';
import RSL from '../assets/RSL.svg';
import EPO from '../assets/EPO.svg';
import LAT from '../assets/LAT.svg';

const decorations = {
  TLH,
  RSL,
  EPO,
  LAT,
};

class RareLanguages extends React.Component {
  handleHover = (e, lang) => {
    e.preventDefault();
    const position = [e.pageX, e.pageY];
    const active = true;
    const info = `${lang}`;
    this.props.enableTooltip(active, position, info);
  }

  render() {
    const { selected } = this.props;
    return (
      <div className='rare-wrapper'>
        {Object.keys(decorations).map(d => (
          selected[d] &&
          <FormattedMessage id={`${d}.full`} key={`${d}.key`}>
            {lang => (
              <img
                key={d}
                src={decorations[d]}
                alt={d}
                onMouseOver={e => this.handleHover(e, lang)}
                onFocus={e => this.handleHover(e, lang)}
                onMouseOut={() => this.props.disableTooltip()}
                onBlur={() => this.props.disableTooltip()}
              />
            )}
          </FormattedMessage>
        ))}
      </div>
    );
  }
}

export default RareLanguages;
