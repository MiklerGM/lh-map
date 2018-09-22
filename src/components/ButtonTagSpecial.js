import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


class ButtonTagSpecial extends React.Component {
  render() {
    return (
      <button
        className='button-tag'
        type='button'
        onClick={() => this.props.cb(this.props.name)}
      >
        <FormattedMessage id={`${this.props.value}`} />
      </button>
    );
  }
}

ButtonTagSpecial.propTypes = {
  value: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired
};

export default ButtonTagSpecial;
