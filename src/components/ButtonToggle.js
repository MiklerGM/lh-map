import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './ButtonToggle.less';

const ButtonToggle = ({ name, checked, cb }) => (
  <FormattedMessage id={`${name}.full`}>
    {(fullname) => {
      return (
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
            onChange={(e) => {
              cb({ [name]: Boolean(e.target.checked) });
            }}
          />
          {fullname}
        </label>
      );
    }}
  </FormattedMessage>
);

ButtonToggle.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  cb: PropTypes.func.isRequired
};

export default ButtonToggle;
