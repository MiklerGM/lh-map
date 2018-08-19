import React from 'react';

import ButtonTag from '../components/ButtonTag';

class TagsWrapper extends React.Component {
  render() {
    return (
      <div className='langauge-bread'>
        {Object.keys(this.props.selectedLang).filter(key => this.props.selectedLang[key]).map(lang =>
          <ButtonTag value={lang} name={lang} key={lang} cb={e => this.props.cb(e)} />)
        }
      </div>
    );
  }
}

export default TagsWrapper;
