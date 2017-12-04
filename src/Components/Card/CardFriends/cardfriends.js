import React, { Component } from 'react';
import Avatar from '../../Avatar/avatar'
import './cardfriends.css'
import {withRouter} from 'react-router-dom'

 class CardFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            name: this.props.name,
            id: this.props.id,
            email: this.props.email
        }
    }


    render() {
        return (

            <div className="user-block" onClick={() => this.props.history.push('/profile/'+this.props.id)}>
                <div><Avatar url={this.state.url} marginRight='7' height='50' width='50' /></div>
                <div>
                    <div className="user-name">{this.props.name}</div>
                    <div className="user-email">{this.props.email}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(CardFriends)