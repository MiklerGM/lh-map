import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import SocialButton from '../components/SocialButton';
import './SharePanel.less';

import HelloPng from '../../preview/hello.png';

class SocialButtonWrapper extends React.Component {
  get url() {
    return 'localhost:3000';
  }

  get text() {
    return 'dumb text';
  }

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

const url = 'https://localohost:3000/result/3000';

class RusultWrapper extends React.Component {
  render() {
    return (
      <div className='share-panel__result'>
        <img src={HelloPng} alt='hello.png' />
        <CopyToClipboard
          text={url}
          onCopy={() => console.log('oncopy callback')}
        >
          <input type='text' value={url} readOnly onFocus={e => e.target.select()} />
        </CopyToClipboard>
      </div>
    );
  }
}

class SharePanel extends React.Component {
  render() {
    return (
      <div className='share-panel layer-4'>
        <SocialButtonWrapper />
        <RusultWrapper />
      </div>
    );
  }
}


export default SharePanel;
