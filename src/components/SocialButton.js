import React from 'react';

const SocialButton = ({ name, cb }) => (
  <button className='btn-circle' onClick={() => cb(name)}>
    <span className={`circle-${name}`} />
  </button>
);

export default SocialButton;
