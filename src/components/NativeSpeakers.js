import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const PopulationSticker = ({ population }) => (
  <div className='native-speakers layer-5'>
    <strong>
      <FormattedMessage id='population' />
    </strong>
    {' '}
    {population.toLocaleString('ru-RU')}
  </div>
);

PopulationSticker.propTypes = {
  population: PropTypes.number.isRequired,
};

export default PopulationSticker;
