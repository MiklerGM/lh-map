import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage } from 'react-intl';
import { ym } from 'react-yandex-metrika';

import SocialButton from '../components/SocialButton';
import './SharePanel.less';

class SocialButtonWrapper extends React.Component {
  url = window.location.href;

  social = ['twitter', 'facebook', 'gplus', 'vk', 'ok'];

  link = (s, title, desc) => {
    switch (s) {
      case 'twitter': return `https://twitter.com/intent/tweet?url=${encodeURI(this.props.result.url)}&text=${desc}&via=chronist`;
      case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(this.props.result.url)}&title=${title}&description=${desc}`;
      case 'gplus': return `https://plus.google.com/share?url=${encodeURI(this.props.result.url)}`;
      case 'vk': return `https://vk.com/share.php?url=${encodeURI(this.props.result.url)}&title=${title}&description=${desc}`;
      case 'ok': return `https://connect.ok.ru/offer?url=${encodeURI(this.props.result.url)}&description=${desc}`;
      default: return 'error';
    }
  }

  handleClick(s, t) {
    console.log('handleClick', s, t);
    ym('reachGoal', 'resultSharedSNS');
    ym('reachGoal', s);
    const link = this.link(s, encodeURI(t.title), encodeURI(t.description));
    window.open(link, '', 'menubar=no, toolbar=no, resizable=yes,scrollbars=yes,height=400,width=400');
  }

  render() {
    return (
      <FormattedMessage id='share.description'>
        {description => (
          <FormattedMessage id='share.title'>
            {title => (
              <div className='meme-panel__circles'>
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
  render() {
    const { img } = this.props.result;
    return (
      <div className='meme-panel__result'>
        <div className='meme-panel_picwrapper'>
          <img src={img} alt='Richpreview sharing' width='100%' />
        </div>
      </div>
    );
  }
}

class UrlCopy extends React.Component {
  state = {
    class: 'input_status'
  }

  onCopy() {
    ym('reachGoal', 'linkCopied');
    this.setState({ class: 'input_status_visible' });
    setTimeout(() => {
      this.setState({ class: 'input_status' });
    }, 2000);
  }

  render() {
    const { url } = this.props.result;
    return (
      <div className='meme-panel_inputwrapper'>
        <CopyToClipboard
          text={url}
          onCopy={() => this.onCopy()}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span style={{ display: 'inline-block', width: '40px' }}>
              {'URL:'}
            </span>
            <input type='text' value={url} readOnly onFocus={e => e.target.select()} />
          </div>
        </CopyToClipboard>
        <span className={this.state.class}>
          <FormattedMessage id='share.linkcopy' />
        </span>
      </div>
    );
  }
}

class SharePanel extends React.Component {
  render() {
    return (
      <div className='meme-panel layer-5'>
        <div className='meme-panel__head' style={{ backgroundColor: '#C6E5EE' }}>
          <button
            className='button-wide__red'
            onClick={() => {
              ym('reachGoal', 'joinLinkClicked');
              window.location.href = 'http://lh12.ru/';
              return 0;
            }}
          >
            <FormattedMessage id='share.button' />
          </button>
          <button
            style={{ alignSelf: 'flex-end' }}
            onClick={() => console.log('refresh click')}
            className='close-window'
            type='button'
          >
            <span className="lnr lnr-sync" />
          </button>
          <button
            style={{ alignSelf: 'flex-end' }}
            onClick={() => this.props.updateUI({ sharePanel: false })}
            className='close-window'
            type='button'
          >
            <span className='lnr lnr-cross' />
          </button>
        </div>
        <div className='meme-panel__main'>
          <SocialButtonWrapper result={this.props.result} />
          <ResultWrapper result={this.props.result} shared={this.props.shared} />
        </div>
        <div className='meme-panel__footer'>
          <UrlCopy result={this.props.result} />
        </div>
      </div>
    );
  }
}


export default SharePanel;
