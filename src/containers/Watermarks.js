import React from 'react';

import lhLogo from '../assets/watermark-lh-full.png';
import chLogo from '../assets/watermark-chrono-full.svg';

class Watermarks extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div className='watermark'>
          <img src={chLogo} alt='Chronist logo' />
        </div>
        <div className='watermark'>
          <img src={lhLogo} alt='Language Heroes logo' />
        </div>
      </div>
    );
  }
}

export default Watermarks;
