import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notfound: false,
      languages: []
    };
  }

  componentDidMount() {
    console.log('this.props.match.params.id', this.props.match.params.id);
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query: `{ post(id:${this.props.match.params.id}) { id title languages}}` })
    })
      .then(r => r.json())
      // .then(r => console.log('r', r))
      .then(data => this.passData(data));
  }

  passData(data) {
    console.log('data returned:', data);
    if (data.data.post != null) {
      console.log('yes data', data.data.post.languages);
      this.setState({ languages: data.data.post.languages });
      this.props.store.data.countries = data.data.post.languages;
    } else {
      console.log('no data');
      this.setState({ notfound: true });
    }
  }

  render() {
    if (this.state.notfound === true) {
      return (
        <div className='language-setup layer-3'>
          <h1> Not Found </h1>
        </div>
      );
    }
    return (
      <div className='language-setup layer-3'>
        <h1> Result </h1>
        <h3> Id: {this.props.match.params.id} </h3>
        <h3> Languages: {this.state.languages.join(' ')} </h3>
      </div>
    );
  }
}

export default Result;
