import React from 'react';
import PropTypes from 'prop-types';
import './ButtonToggle.less';

const ButtonToggle = ({ name, checked, label, cb, disabled = false }) => (
  <label
    htmlFor={name}
    className={checked ? 'button-toggle__checked button-toggle ' : 'button-toggle '}
    onChange={(e) => {
      cb({ [name]: Boolean(e.target.checked) });
    }}
  >
    <input
      id={name}
      type='checkbox'
      className='button-toggle'
      checked={checked}
      disabled={disabled}
      onChange={(e) => {
        cb({ [name]: Boolean(e.target.checked) });
      }}
    />
    {label}
  </label>
);


ButtonToggle.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired
};

export default ButtonToggle;
