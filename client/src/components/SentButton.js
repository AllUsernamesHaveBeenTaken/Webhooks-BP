import React, { Component } from 'react';

class SentButton extends Component {
  render() {
    return (
      <div>
        <input value={this.props.text} type="submit" onClick={() => this.props.onButtonClick(this.props.type)} className='btn btn-4 btn-4c icon-arrow-right'/>
      </div>
    );
  }
}

export default SentButton;
