import React from 'react';

import LanguageSetup from '../containers/LanguageSetup';
import LanguageSearch from '../containers/LanguageSearch';
import TagsWrapper from '../containers/TagsWrapper';
import SharePanel from '../containers/SharePanel';
import NativeSpeakers from '../components/NativeSpeakers';
import Watermarks from '../containers/Watermarks';
import LocaleWidget from '../components/LocaleWidget';

class Main extends React.Component {
  render() {
    const { langGrid, sharePanel } = this.props.UI;
    return (
      <div>
        <LanguageSearch
          lang={this.props.lang}
          selected={this.props.selected}
          uiState={this.props.UI}
          updateUI={this.props.updateUI}
          cb={this.props.select}
        />
        <TagsWrapper
          selected={this.props.selected}
          cb={this.props.select}
        />
        {langGrid
          && (
            <LanguageSetup
              data={this.props.lang}
              selected={this.props.selected}
              uiState={langGrid}
              updateUI={this.props.updateUI}
              select={this.props.select}
            />)
        }
        {sharePanel
          && (
            <SharePanel
              result={this.props.result}
              shared={this.props.shared}
              updateUI={this.props.updateUI}
              uiState={this.props.UI}
            />)
        }
        <NativeSpeakers population={this.props.population} />
        <Watermarks />
        <LocaleWidget
          locale={this.props.locale}
          onChangeLanguage={this.props.changeLocale}
        />
      </div>
    );
  }
}

export default Main;
