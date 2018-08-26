import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ButtonToggle = ({ name, checked, cb }) => (
  <FormattedMessage id={`${name}.full`}>
    {fullName => (
      <label
        htmlFor={name}
        className={checked ? 'button-toggle__checked button-toggle ' : 'button-toggle '}
        onChange={() => cb(name)}
      >
        <input
          id={name}
          type='checkbox'
          className='button-toggle'
          checked={checked}
          onChange={() => cb(name)}
        />
        {fullName}
      </label>
    )}
  </FormattedMessage>
);

ButtonToggle.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  cb: PropTypes.func.isRequired
};

export default ButtonToggle;
