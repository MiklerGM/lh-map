import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


class Tooltip extends React.Component {
  render() {
    return (
      <div
        className='layer-3 tooltip'
        style={
          {
            position: 'fixed',
            top: `${this.props.coord[1]}px`,
            left: `${this.props.coord[0]}px`
          }
        }
      >
        {this.props.info}
      </div>
    );
  }
}

Tooltip.propTypes = {
  coord: PropTypes.array.isRequired,
  info: PropTypes.string.isRequired
};

export default Tooltip;
