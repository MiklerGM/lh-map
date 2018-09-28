import React from 'react';
import PropTypes from 'prop-types';

class LocaleWidget extends React.Component {
  toggleLocale() {
    const loc = this.props.locale === 'ru' ? 'en' : 'ru';
    this.props.onChangeLanguage(loc);
  }

  render() {
    return (
      <button
        onClick={() => this.toggleLocale()}
        className='decorless'
        style={{
          zIndex: 100,
          cursor: 'pointer',
          display: 'block',
          position: 'fixed',
          bottom: '0',
          right: '0',
          padding: '12px',
          margin: '2px'
        }}
      >
        {this.props.locale === 'ru' ? 'EN' : 'RU'}
      </button>
    );
  }
}

LocaleWidget.propTypes = {
  locale: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
};

export default LocaleWidget;
