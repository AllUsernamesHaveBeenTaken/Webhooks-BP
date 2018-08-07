import React, { Component } from 'react';
import Toggle from 'react-toggle'

const text = {
  color: '#fff',
  fontSize: '14px',
  marginRight: 15
}

const wrapper = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}

class EventSwitch extends Component {
  render() {
    return (
      <div style={wrapper}>
        <p style={text}>{this.props.text}</p>
        <label>
          <Toggle
            defaultChecked={this.props.checked}
            icons={false}
            onChange={this.props.onChange} 
            name={this.props.name} />
        </label>
      </div>
    );
  }
}

export default EventSwitch;
