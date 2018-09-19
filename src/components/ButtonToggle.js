import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ButtonToggle = ({ name, checked, select }) => (
  <FormattedMessage id={`${name}.full`}>
    {fullName => (
      <label
        htmlFor={name}
        className={checked ? 'button-toggle__checked button-toggle ' : 'button-toggle '}
        onChange={() => select(name)}
      >
        <input
          id={name}
          type='checkbox'
          className='button-toggle'
          checked={checked}
        />
        {fullName}
      </label>
    )}
  </FormattedMessage>
);

ButtonToggle.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired
};

export default ButtonToggle;
