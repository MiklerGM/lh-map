import React from 'react';
import { FormattedMessage } from 'react-intl';

import SearchInput from '../components/SearchInput';

class LanguageSearch extends React.Component {
  render() {
    return (
      <div className='language-search layer-4'>
        <span className='search-title'>
          <FormattedMessage id='search.title' />
        </span>
        <SearchInput
          selected={this.props.selected}
          cb={this.props.cb}
        />
        <button className='more-button decorless' onClick={() => this.props.updateUI({ langGrid: true })}>
          <FormattedMessage id='search.more' />
        </button>
        <button className='button--share' onClick={() => this.props.share()}>
          <FormattedMessage id='search.share' />
          <i className='icon-share' />
        </button>
      </div>
    );
  }
}

export default LanguageSearch;
