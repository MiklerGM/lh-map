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

const style = {
  position: 'fixed',
  bottom: 10,
  right: 10,
  pointerEvents: 'none',
};

export default class RareLanguages extends React.Component {
  render() {
    const { selected } = this.props;
    const defaultSize = 128;
    const w = defaultSize / window.devicePixelRatio;
    return (
      <div className='rare-wrapper' style={style}>
        {Object.keys(decorations).map(d => (
          selected[d] && <img width={w} heigh={w} key={d} src={decorations[d]} alt={d} />
        ))}
      </div>
    );
  }
}
