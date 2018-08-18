import React from 'react';

import LanguageSetup from '../containers/LanguageSetup';
import LangaugeSearch from '../containers/LangaugeSearch';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('main mount:', this.props);
  }

  render() {
    return (
      <div>
        <div className='language-setup layer-3'>
          <h1> Main </h1>
        </div>
        <LangaugeSearch />
      </div>
    );
  }
}

export default Main;
