import React from 'react';

const SocialButton = ({ name, cb }) => {
  return (
    <button className='btn-sns' onClick={() => cb(name)}>
      <span className={`icon-${name}`} />
    </button>
  );
};

export default SocialButton;
