import React from 'react';
import PropTypes from 'prop-types';

class ButtonTag extends React.Component {
  render() {
    return (
      <button
        className='button-tag'
        type='button'
        onClick={() => this.props.cb({ [this.props.name]: false })}
      >
        {this.props.value}
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
