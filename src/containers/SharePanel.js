import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import SocialButton from '../components/SocialButton';
import './SharePanel.less';

class SocialButtonWrapper extends React.Component {
  url = window.location.href;

  // depend on locale in future
  text = 'dumb text';

  link = (s) => {
    switch (s) {
      case 'twitter': return `https://twitter.com/intent/tweet?url=${this.url}&text=${this.text}&via=chronist`;
      case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${this.url}&title=${this.text}&description=${this.text}&picture=${this.text}`;
      case 'gplus': return `https://plus.google.com/share?url=${this.url}`;
      case 'vkontakte': return `https://vk.com/share.php?url=${this.url}&title=${this.text}&description=${this.text}&image=${this.text}`;
      case 'odnoklassniki': return '';
      default: return 'error';
    }
  }

  handleClick(s) {
    console.log('handleClick', s);
    const link = this.link(s);
    window.open(link, '', 'menubar=no, toolbar=no, resizable=yes,scrollbars=yes,height=400,width=400');
  }

  render() {
    return (
      <div className='share-panel__social'>
        {
          ['twitter', 'facebook', 'gplus', 'vkontakte', 'odnoklassniki'].map(sns => <SocialButton key={sns} name={sns} cb={s => this.handleClick(s)} />)
        }
      </div>
    );
  }
}

class ResultWrapper extends React.Component {
  render() {
    const { img, url } = this.props.result;

    return (
      <div className='share-panel__result'>
        <div className='share-panel_picwrapper'>
          <img src={img} alt='Richpreview sharing' width='100%' />
        </div>
        <div className='share-panel_inputwrapper'>
          <CopyToClipboard
            text={url}
            onCopy={() => console.log('oncopy callback')}
          >
            <input type='text' value={url} readOnly onFocus={e => e.target.select()} />
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

class SharePanel extends React.Component {
  render() {
    return (
      <div className='share-panel layer-4'>
        <SocialButtonWrapper />
        <ResultWrapper result={this.props.result} shared={this.props.shared} />
      </div>
    );
  }
}


export default SharePanel;
