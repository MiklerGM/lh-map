import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage } from 'react-intl';
import ym from 'react-yandex-metrika';
import ReactGA from 'react-ga';

import SocialButton from '../components/SocialButton';
import './SharePanel.less';

const urls = {
  twitter: 'https://twitter.com/intent/tweet?url=',
  facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
  gplus: 'https://plus.google.com/share?url=',
  vk: 'https://vk.com/share.php?url=',
  ok: 'https://connect.ok.ru/offer?url=',
};

class SocialButtonWrapper extends React.Component {
  url = window.location.href;

  social = ['twitter', 'facebook', 'gplus', 'vk', 'ok'];

  link = (s, title, desc) => {
    switch (s) {
      case 'twitter': return `${urls.twitter}${encodeURI(this.props.result.url)}&text=${desc}&via=chronist`;
      case 'facebook': return `${urls.facebook}${encodeURI(this.props.result.url)}&title=${title}&description=${desc}`;
      case 'gplus': return `${urls.gplus}${encodeURI(this.props.result.url)}`;
      case 'vk': return `${urls.vk}${encodeURI(this.props.result.url)}&title=${title}&description=${desc}`;
      case 'ok': return `${urls.ok}${encodeURI(this.props.result.url)}&description=${desc}`;
      default: return 'error';
    }
  }

  handleClick(s, t) {
    console.log('handleClick', s, t);
    ym('reachGoal', 'resultSharedSNS');
    ym('reachGoal', s);
    ReactGA.event({
      category: 'Share',
      action: 'Used circle button',
      value: s
    });
    const link = this.link(s, encodeURI(t.title), encodeURI(t.description));
    window.open(link, '', 'menubar=no, toolbar=no, resizable=yes,scrollbars=yes,height=400,width=400');
  }

  render() {
    return (
      <FormattedMessage id='share.description'>
        {(description) => (
          <FormattedMessage id='share.title'>
            {(title) => (
              <div className='meme-panel__circles'>
                {this.social.map((sns) => (
                  <SocialButton
                    key={sns}
                    name={sns}
                    cb={(s) => this.handleClick(s, { description, title })}
                  />
                ))}
              </div>
            )}
          </FormattedMessage>
        )}
      </FormattedMessage>
    );
  }
}

const ResultWrapper = ({ result }) => (
  <div className='meme-panel__result'>
    <div className='meme-panel_picwrapper'>
      <img src={result.img} alt='Richpreview sharing' width='100%' />
    </div>
  </div>
);

class UrlCopy extends React.Component {
  state = {
    class: 'input_status'
  }

  onCopy() {
    ym('reachGoal', 'linkCopied');
    ReactGA.event({
      category: 'Share',
      action: 'Link copied'
    });
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
              URL:
            </span>
            <input type='text' value={url} readOnly onFocus={(e) => e.target.select()} />
          </div>
        </CopyToClipboard>
        <span className={this.state.class}>
          <FormattedMessage id='share.linkcopy' />
        </span>
      </div>
    );
  }
}

const SharePanel = (props) => (
  <div className='meme-panel layer-5'>
    <div className='meme-panel__header' style={{ backgroundColor: '#C6E5EE' }}>
      <button
        className='button-wide__red'
        onClick={() => {
          ym('reachGoal', 'joinLinkClicked');
          ReactGA.event({
            category: 'Share',
            action: 'Join Link Clicked'
          });
          window.location.href = 'http://lh12.ru/';
          return 0;
        }}
      >
        <FormattedMessage id='share.button' />
      </button>
      <button
        style={{ alignSelf: 'flex-end' }}
        onClick={props.refresh}
        className='close-window'
        type='button'
      >
        <span className="lnr lnr-sync" />
      </button>
      <button
        style={{ alignSelf: 'flex-end' }}
        onClick={() => props.updateUI({ sharePanel: false })}
        className='close-window'
        type='button'
      >
        <span className='lnr lnr-cross' />
      </button>
    </div>
    <SocialButtonWrapper result={props.result} />
    <ResultWrapper result={props.result} shared={props.shared} />
    <div className='meme-panel__footer'>
      <UrlCopy result={props.result} />
    </div>
  </div>
);

export default SharePanel;
