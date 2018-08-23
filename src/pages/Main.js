import React from 'react';

import LanguageSetup from '../containers/LanguageSetup';
import LanguageSearch from '../containers/LanguageSearch';
import TagsWrapper from '../containers/TagsWrapper';
import SharePanel from '../containers/SharePanel';

class Main extends React.Component {
  state = {
    langGrid: false,
    sharePanel: false
  };

  updateUI(value) {
    console.log('updateUI', value);
    this.setState({ ...value });
  }

  render() {
    const { langGrid, sharePanel } = this.state;
    return (
      <div>
        <LanguageSearch
          share={this.props.share}
          selected={this.props.selected}
          uiState={this.state}
          updateUI={v => this.updateUI(v)}
          cb={this.props.select}
        />
        <TagsWrapper
          selected={this.props.selected}
          cb={this.props.select}
        />
        {this.state.langGrid
          && (
            <LanguageSetup
              data={this.props.lang}
              selected={this.props.selected}
              uiState={langGrid}
              updateUI={v => this.updateUI(v)}
              cb={this.props.select}
            />)
        }
        {this.state.sharePanel
          && (
            <SharePanel
              updateUI={v => this.updateUI(v)}
              uiState={sharePanel}
            />)
        }
      </div>
    );
  }
}

export default Main;
