import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


class ButtonTag extends React.Component {
  render() {
    return (
      <button
        className='button-tag'
        type='button'
        onClick={() => this.props.cb({ [this.props.name]: false })}
      >
        <FormattedMessage id={`${this.props.value}.full`} />
        <i className="lnr lnr-cross button-tag__close" />
      </button>
    );
  }
}

ButtonTag.propTypes = {
  value: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired
};

export default ButtonTag;
