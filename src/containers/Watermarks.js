import React from 'react';


import lhLogo from '../assets/watermark-lh-full.svg';
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
          <a className='decorless' href='https://chronist.ru/'>
            <img src={chLogo} alt='Chronist logo' />
          </a>
        </div>
        <div className='watermark'>
          <a className='decorless' href='https://lh12.ru/'>
            <img src={lhLogo} alt='Language Heroes logo' />
          </a>
        </div>
      </div>
    );
  }
}

export default Watermarks;
