import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { SentButton } from './components'
import { touchAPI } from './webhooks'

const buttonsWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'space-between',
}

const appWrapper = {
  display: 'flex',
  flexDirection: 'column',
  //justifyContent: 'center',  
  //alignItems: 'center',  
  margin: '0 auto',
  width: '50%',

  position: 'absolute',
  top: '25%',
  left: '25%'
}

const inputWrapper = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10
}

const endpointInput = {
  borderRadius: '50px',
	border: '3px solid #fff',
	width: '100%',
  overflow: 'hidden',
  textAlign: 'center'
}

const endpointText = {
  color: '#fff',
  overflow: 'hidden',
  fontSize: '24px'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: 'https://webhook.site/82622838-00f2-4143-8244-aaa4775bd5b3'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({endpoint: event.target.value});
  }

  _onButtonClick = (payloadType) => {
    let API_Endpoint
    let payload = this._whichPayload(payloadType)
    switch (payloadType) {
      case 'signed':
        API_Endpoint = '/signed_webhook'
        break;
      case 'http':
        API_Endpoint = '/http_auth_webhook'
        break;
      case 'api':
        API_Endpoint = '/api_retrieval_webhook'
        break;
    
      default:
        break;
    }
    touchAPI(API_Endpoint, {endpoint: this.state.endpoint, ...payload})
  }

  _whichPayload = (type) => {
    switch (type) {
      case 'signed':
        return {
          'type': 'SIGNED',
          'event': 'SIGNED BUTTON CLICK'
        }
        break;
      case 'http':
        return {
          'type': 'HTTP AUTHENTICATION',
          'event': 'HTTP AUTHENTICATION BUTTON CLICK'
        }
        break;
      case 'api':
        return {
          'type': 'API RETRIEVAL',
          'event': 'API RETRIEVAL CLICK'
        }
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      <div style={appWrapper}>
        <div style={inputWrapper}>
          <p style={endpointText}>Insert your endpoint below</p>
          <input type="text" value={this.state.endpoint} onChange={this.handleChange} style={endpointInput}/>
        </div>
        <div style={buttonsWrapper}>
          <SentButton text={'Signed Webhook'} type={'signed'} onButtonClick={this._onButtonClick}/>
          <SentButton text={'HTTP Auth Webhook'} type={'http'} onButtonClick={this._onButtonClick} />
          <SentButton text={'API Retieval Webhook'} type={'api'} onButtonClick={this._onButtonClick} />
        </div>
      </div>
    );
  }
}

export default App;
