import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { postLogin, getAuthID } from '../../Requests/Auth';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 'loading...',
    };
  }
  componentDidMount() {
    const code = this.props.location.search.substring(6);
    postLogin(code).then((response) => {
      if (response && response.status == 200) {
        console.log(response.data)
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("id", response.data.id); 
        this.props.history.push('/feed')
      } else {
        localStorage.removeItem("token");
        this.setState({ response: 'Ocorreu um erro na autenticação.' })
      }
    })
  }

  render() {
    return (
      <div>{this.state.response}</div>
    );
  }
}

export default withRouter(Callback)

