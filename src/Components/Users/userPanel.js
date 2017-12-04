import React, { Component } from 'react';
import Avatar from '../Avatar/avatar'
import { withRouter } from 'react-router-dom'
import CardUser from '../cardUser/cardUser'
import './users.css'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="user-panel" onClick={() => this.props.history.push('/profile/' + this.props.id)}>
                <Avatar marginBottom='0' url={this.props.url} height='45' width='45' />
                <div>
                    <div className="title-user ml-7">{this.props.name}</div>
                    <div className="desc-user ml-7">{this.props.email}</div>
                </div>
            </div>
        )
    }


}

export default withRouter(Users)