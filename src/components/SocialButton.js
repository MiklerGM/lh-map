import React from 'react';

const SocialButton = ({ name, cb }) => (
  <button className='btn-sns' onClick={() => cb(name)}>
    <span className={`icon-${name}`} />
  </button>
);

export default SocialButton;
