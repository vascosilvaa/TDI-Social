import React, { Component } from 'react';
import Avatar from '../Avatar/avatar';
import moment from 'moment'
import {withRouter} from 'react-router-dom'
import './cardUser.css'

class CardUser extends Component {
  render() {
    const url = this.props.url
    const time = this.props.created_at;
    const subject_icon = () => {
      if (this.props.subject_icon) {
        return (
          <span className={this.props.subject_icon} aria-hidden="true"></span>
        )
      } else {
        return " "
      }
    }
    if (this.props.type == 1) { // CARD
      return (
        <div className="user" onClick={() => this.props.history.push('/profile/'+this.props.id)}>
          <Avatar marginBottom='0' url={url} height={this.props.height} width={this.props.width} />
          <div>
            <div className="title ml-7">{this.props.user_name}</div>
            <div className="desc ml-7">{moment(time).fromNow()} , {subject_icon()} 
            </div>
          </div>
        </div>
      );
    } else {
      if (this.props.type == 2) {
        //COMMENTS
        return (
          <div className="user" onClick={() => this.props.history.push('/profile/'+this.props.id)}>
            <Avatar marginBottom='0' url={url} height={this.props.height} width={this.props.width} />
            <div>
              <div className="title-comments ml-7">{this.props.user_name}</div>
              <div className="desc-comments ml-7">{moment(time).fromNow()}</div>
            </div>
          </div>
        );
      }
    }

  }
}

export default withRouter(CardUser)



