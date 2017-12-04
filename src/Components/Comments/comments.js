import React, { Component } from 'react';
import CardUser from '../cardUser/cardUser';
import './comments.css';
import Avatar from '../Avatar/avatar'
import {withRouter} from 'react-router-dom'
class Comments extends Component {
  render() {
    return (
      <div className="">
        <div class="comment">
        <div className="card-header">
                <CardUser  onClick={() => this.props.history.push('/profile/'+this.props.user_id)} url={this.props.url} height='25' width='25' type='2' user_name={this.props.user_name} id={this.props.user_id} created_at={this.props.created_at}/>
                <div className="actions">
                    <span className="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                </div>
            </div>
            <div className="comment-body">
                {this.props.content}
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Comments)

