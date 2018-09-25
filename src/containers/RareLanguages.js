import React from 'react';

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
  handleHover = (e, d) => {
    e.preventDefault();
    const position = [e.pageX, e.pageY];
    const active = true;
    // const info = formatMessage({ id: `${d}.full` });
    const info = `${d}`;
    // console.log(active, [e.clientX, e.clientY], info);
    // this.props.enableTooltip(active, position, info);
  }

  render() {
    const { selected } = this.props;
    return (
      <div className='rare-wrapper'>
        {Object.keys(decorations).map(d => (
          selected[d] &&
          <img
            key={d}
            src={decorations[d]}
            alt={d}
            onMouseOver={e => this.handleHover(e, d)}
            onFocus={e => this.handleHover(e, d)}
          />
        ))}
      </div>
    );
  }
}

export default RareLanguages;
