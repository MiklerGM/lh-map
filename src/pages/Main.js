import React from 'react';

import LanguageSetup from '../containers/LanguageSetup';
import LangaugeSearch from '../containers/LangaugeSearch';
import TagsWrapper from '../containers/TagsWrapper';

import langData from '../../data/lang.json';
import selectedLang from '../../data/selectedLang.json';

class Main extends React.Component {
  state = {
    selectedLang: selectedLang,
    data: langData,
    runtime: {
      langgrid: false,
    }
  };

  handleSelectedLang(value) {
    this.setState({ selectedLang: { ...this.state.selectedLang, ...value } });
  }

  updateUI(value) {
    this.setState({ runtime: { ...this.state.runtime, ...value } });
  }

  render() {
    return (
      <div>
        <LangaugeSearch
          selectedLang={this.state.selectedLang}
          updateUI={v => this.updateUI(v)}
          cb={(e) => this.handleSelectedLang(e)}
        />
        <TagsWrapper
          selectedLang={this.state.selectedLang}
          cb={(e) => this.handleSelectedLang(e)}
        />
        {this.state.runtime.langgrid
          ? <LanguageSetup
            data={this.state.data}
            selectedLang={this.state.selectedLang}
            updateUI={v => this.updateUI(v)}
            cb={(e) => this.handleSelectedLang(e)}
          />
          : null
        }
      </div>
    );
  }
}

export default Main;
