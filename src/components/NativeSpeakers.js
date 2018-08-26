import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const style = {
  position: 'fixed',
  top: 100,
  left: 10,
  pointerEvents: 'none',
};

const PopulationSticker = ({ population }) => (
  <div style={style}>
    <FormattedMessage id='population' />
    {' '}
    {population}
  </div>
);

PopulationSticker.propTypes = {
  population: PropTypes.number.isRequired,
};

export default PopulationSticker;
