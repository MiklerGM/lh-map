import React from 'react';
import { FormattedMessage } from 'react-intl';

import SearchInput from '../components/SearchInput';

class LanguageSearch extends React.Component {
  shareBtn = () => {
    this.props.updateUI({ sharePanel: !this.props.uiState.sharePanel });
  }

  moreBtn = () => {
    this.props.updateUI({ langGrid: !this.props.uiState.langGrid });
  }

  render() {
    return (
      <div className='language-search layer-4'>
        <span className='search-title'>
          <FormattedMessage id='search.title' />
        </span>
        <SearchInput
          lang={this.props.lang}
          selected={this.props.selected}
          cb={this.props.cb}
        />
        <button className='more-button decorless' onClick={this.moreBtn}>
          <FormattedMessage id='search.more' />
        </button>
        <button className='button--share' onClick={this.shareBtn}>
          <FormattedMessage id='search.share' />
          <i className='icon-share' />
        </button>
      </div>
    );
  }
}

export default LanguageSearch;
