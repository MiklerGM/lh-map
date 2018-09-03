import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage } from 'react-intl';

import SocialButton from '../components/SocialButton';
import './SharePanel.less';

class SocialButtonWrapper extends React.Component {
  url = window.location.href;

  social = ['twitter', 'facebook', 'gplus', 'vkontakte', 'odnoklassniki'];

  link = (s, title, desc) => {
    switch (s) {
      case 'twitter': return `https://twitter.com/intent/tweet?url=${encodeURI(this.props.result.url)}&text=${desc}&via=chronist`;
      case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(this.props.result.url)}&title=${title}&description=${desc}`;
      case 'gplus': return `https://plus.google.com/share?url=${encodeURI(this.props.result.url)}`;
      case 'vkontakte': return `https://vk.com/share.php?url=${encodeURI(this.props.result.url)}&title=${title}&description=${desc}`;
      case 'odnoklassniki': return '';
      default: return 'error';
    }
  }

  handleClick(s, t) {
    console.log('handleClick', s, t);
    const link = this.link(s, encodeURI(t.title), encodeURI(t.description));
    window.open(link, '', 'menubar=no, toolbar=no, resizable=yes,scrollbars=yes,height=400,width=400');
  }

  render() {
    return (
      <FormattedMessage id='share.description'>
        {description => (
          <FormattedMessage id='share.title'>
            {title => (
              <div className='share-panel__social'>
                {this.social.map(sns => (
                  <SocialButton
                    key={sns}
                    name={sns}
                    cb={s => this.handleClick(s, { description, title })}
                  />))}
              </div>)}
          </FormattedMessage>)}
      </FormattedMessage>
    );
  }
}

class ResultWrapper extends React.Component {
  state = {
    class: 'input_status'
  }

  onCopy() {
    this.setState({ class: 'input_status_visible' });
    setTimeout(() => {
      this.setState({ class: 'input_status' });
    }, 2000);
  }

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
            onCopy={() => this.onCopy()}
          >
            <div style={{display: 'flex', flexDirection: 'row' }}>
              <span style={{ display: 'inline-block', width: '40px' }}>
                URL:
              </span>
              <input type='text' value={url} readOnly onFocus={e => e.target.select()} />
            </div>
          </CopyToClipboard>
          <span className={this.state.class}>
            <FormattedMessage id='share.linkcopy' />
          </span>
        </div>
      </div>
    );
  }
}

class SharePanel extends React.Component {
  render() {
    return (
      <div className='share-panel layer-4'>
        <SocialButtonWrapper result={this.props.result} />
        <ResultWrapper result={this.props.result} shared={this.props.shared} />
      </div>
    );
  }
}


export default SharePanel;
