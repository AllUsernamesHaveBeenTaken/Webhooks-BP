import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { SentButton, EventSwitch } from './components'
import { touchAPI, payloads } from './webhooks'

const buttonsWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'space-between',
}

const appWrapper = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0 auto',
  width: '50%',
  height: document.documentElement.clientHeight
}

const inputWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 10
}

const webhooksWrapper = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
  fontSize: '24px',
  alignSelf: 'center'
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
      password: 'Azerty123',
      userLiked: false,
      userPosted: false, 
      newUser: false, 
      userUpdatedDetails: false, 
      userUploadedPhoto: false, 
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  _onButtonClick = (webhookType) => {
    let API_Endpoint
    let type = this._whichWebhookType(webhookType)
    switch (webhookType) {
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
      webhooks_type: {...type},
      user: {
        username: this.state.username,
        password: this.state.password
      },
      payload: {...payloads[this._randomEventPicker()]}
    })
  }

  _whichWebhookType = (type) => {
    switch (type) {
      case 'signed':
        return {
          'type': 'SIGNED',
          'event': 'SIGNED BUTTON CLICK',
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

  _handleCheckedChange = (event) => this.setState({[event.target.name]: !this.state[event.target.name]})
  
  _randomEventPicker = () => {
    let chooses =  ['userLiked', 'userPosted', 'newUser', 'userUpdatedDetails', 'userUploadedPhoto']
    let choice = false
    let check = false
    
    chooses.forEach(choice => {
      if (this.state[choice]) {
        check = this.state[choice]
      }
    });

    if (check === true) {
      do {
        choice = chooses[Math.floor(Math.random() * (chooses.length - 0)) + 0]
        } while (this.state[choice] === false)
    } 
    return choice
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
          <div style={webhooksWrapper} >
            <p style={title}>Webhooks</p>          
            <EventSwitch text={'User liked something'} checked={this.state.userLiked} onChange={this._handleCheckedChange} name="userLiked" />          
            <EventSwitch text={'User posted someting'} checked={this.state.userPosted} onChange={this._handleCheckedChange} name="userPosted" />          
            <EventSwitch text={'New user registered'} checked={this.state.newUser} onChange={this._handleCheckedChange} name="newUser" />          
            <EventSwitch text={'User updated their details'} checked={this.state.userUpdatedDetails} onChange={this._handleCheckedChange} name="userUpdatedDetails" />          
            <EventSwitch text={'User uploaded a new photo'} checked={this.state.userUploadedPhoto} onChange={this._handleCheckedChange} name="userUploadedPhoto" />             
          </div>
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
