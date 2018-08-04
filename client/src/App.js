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

const inputItem = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40%'
}

const input = {
  borderRadius: '50px',
	border: '3px solid #fff',
	width: '100%',
  overflow: 'hidden',
  textAlign: 'center'
}

const title = {
  color: '#fff',
  overflow: 'hidden',
  fontSize: '24px'
}

const inputText = {
  color: '#fff',
  fontSize: '14px',
  marginRight: 15
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: 'http://localhost:8000/webhook_endpoint',
      username: 'seppesnoeck',
      password: 'Azerty123'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
    touchAPI(API_Endpoint, {
      endpoint: this.state.endpoint, 
      payload: {...payload},
      user: {
        username: this.state.username,
        password: this.state.password
      }
    })
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
          <p style={title}>&#x1F447; Compose your subscription &#x1F447;</p>
          <div style={inputItem}>
            <p style={inputText}>Endpoint</p>
            <input type="text" value={this.state.endpoint} name="endpoint" onChange={this.handleChange} style={input}/>
          </div>
          <div style={inputItem}>
            <p style={inputText}>Username</p>
            <input type="text" value={this.state.username} name="username" onChange={this.handleChange} style={input}/>
          </div>
          <div style={inputItem}>
            <p style={inputText}>Password</p>
            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} style={input}/>
          </div>
          <p style={title}>Webhooks</p>          
          <p style={inputText}>Switches voor interests!</p>          
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
