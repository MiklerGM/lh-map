import React from 'react';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {
  get classNames() {
    const classes = ['tooltip layer-3'];
    if (this.props.position[0] > 0.5 * window.innerWidth) {
      if (this.props.position[1] < 0.7 * window.innerHeight) {
        classes.push('tooltipTopRight');
      } else {
        classes.push('tooltipBottomRight');
      }
    } else if (this.props.position[1] < 0.7 * window.innerHeight) {
      classes.push('tooltipTopLeft');
    } else {
      classes.push('tooltipBottomLeft');
    }
    return classes;
  }

  render() {
    return (
      <div
        className={this.classNames.join(' ')}
        onClick={() => this.props.cb()}
        style={
          {
            position: 'fixed',
            top: `${this.props.position[1]}px`,
            left: `${this.props.position[0]}px`
          }
        }
      >
        {this.props.info}
      </div>
    );
  }
}

Tooltip.propTypes = {
  position: PropTypes.array.isRequired,
  info: PropTypes.string.isRequired
};

export default Tooltip;
