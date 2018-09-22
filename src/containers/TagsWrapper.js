import React from 'react';
import PropTypes from 'prop-types';

import ButtonTag from '../components/ButtonTag';
import ButtonTagSpecial from '../components/ButtonTagSpecial';

class TagsWrapper extends React.Component {
  state = {
    compact: false
  }

  toggleCompact() {
    console.log('show all');
    this.setState({ compact: !this.state.compact });
  }

  render() {
    const fullArrayOfLang = Object.keys(this.props.selected)
      .filter(key => this.props.selected[key]);
    let arrayOfLang = fullArrayOfLang;
    if (this.state.compact) {
      arrayOfLang = fullArrayOfLang.slice(0, 3);
    }
    return (
      <div className='language-bread'>
        {arrayOfLang.map(lang =>
          <ButtonTag value={lang} name={lang} key={lang} cb={e => this.props.cb(e)} />)
        }
        {(fullArrayOfLang.length > 3)
          ? <ButtonTagSpecial value={this.state.compact ? 'tags.more' : 'tags.less'} name="tags" cb={e => this.toggleCompact(e)} />
          : null}
      </div>
    );
  }
}

TagsWrapper.propTypes = {
  selected: PropTypes.object.isRequired,
  cb: PropTypes.func.isRequired
};

export default TagsWrapper;
