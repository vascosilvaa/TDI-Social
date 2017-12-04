import React, { Component } from 'react';
import './fab.css';
import Feed from '../Feed/feed';
export default class Fab extends Component {
  constructor(props) {
    super(props);
    };

click = () => {
    this.props.open();
}
  render() {
    return (
        <div onClick={this.click} class="fab"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></div>
      );
  }
}

