import React, { Component } from 'react';
import './app.css';
import {
  EuiPageTemplate,
  EuiEmptyPrompt,
  EuiText
} from '@elastic/eui';
import JIBELogo from './jibe-logo.svg';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/username')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    const title = (
      <EuiText>
        {username ? <h1>{`Hi ${username}, let's `}</h1> : <h1>Loading.. please wait!</h1>}
      </EuiText>
    );
    const content = (
      <img src={JIBELogo} alt="jibe" />
    );
    return (
      <div>
        <EuiPageTemplate
          template="centeredBody"
          pageContentProps={{ paddingSize: 'none' }}
        >
          <EuiEmptyPrompt
            title={title}
            body={content}
          />
        </EuiPageTemplate>

      </div>
    );
  }
}
