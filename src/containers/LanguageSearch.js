import React from 'react';

import SearchInput from '../components/SearchInput';

class LanguageSearch extends React.Component {
  render() {
    return (
      <div className='language-search layer-4'>
        <p>LanguageSearch</p>
        <SearchInput
          selected={this.props.selected}
          cb={this.props.cb}
        />
        <button onClick={() => this.props.updateUI({ langGrid: true })}>
          {' more '}
        </button>
        <button>{' share '}</button>
      </div>
    );
  }
}

export default LanguageSearch;
