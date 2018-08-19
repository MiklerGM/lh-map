import React from 'react';

import SearchInput from '../components/SearchInput';

class LangaugeSearch extends React.Component {
  render() {
    return (
      <div className='langauge-search layer-4'>
        <p>LangaugeSearch</p>
        <SearchInput
          selectedLang={this.props.selectedLang}
          cb={this.props.cb}
        />
        <button onClick={() => this.props.updateUI({ langgrid: true })}> more </button>
        <button> share </button>
      </div>
    );
  }
}

export default LangaugeSearch;
