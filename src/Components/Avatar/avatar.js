import React, { Component } from 'react';
import './avatar.css';
import { Tooltip, OverlayTrigger} from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      users: [],
      url: this.props.url
    };
}
  render() {
    const tooltip = (
      <Tooltip id="tooltip"><strong>{this.props.name}</strong></Tooltip>
    );
      var size = {
        height: this.props.height + 'px',
        width: this.props.width + 'px',
        marginBottom: this.props.marginBottom +'px',
        marginRight: this.props.marginRight +'px',
        cursor: 'pointer',
      }
    if(this.props.tooltip) {
      return (
        <OverlayTrigger placement="right" overlay={tooltip}>
          <img onClick={() => this.props.history.push('/profile/'+this.props.id)} src={this.state.url} style={size}/>
        </OverlayTrigger>
      );
    } else {
      return (
        <img src={this.props.url} style={size}/>
      );
    }
  
      
  }
}
export default withRouter(Avatar)
