import React from 'react';
import PropTypes from 'prop-types';

class LocaleWidget extends React.Component {
  toggleLocale() {
    if (this.props.locale === 'ru') {
      this.props.onChangeLanguage('en');
    } else {
      this.props.onChangeLanguage('ru');
    }
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
          padding: '10px',
          margin: '10px'
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
