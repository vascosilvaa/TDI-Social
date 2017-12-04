import React, { Component } from 'react';
import './auth.css';
import Card from "../Card/card";
import { withRouter } from 'react-router-dom'
import Callback from './callback'


class Auth extends Component {
    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            this.props.history.push('/feed');
        }
    }
    render() {


        return (
            <div className="auth-back">
                <div className="login-area">
                    <div className="login-title">Bem vindo ao TDI Social</div>
                    <div className="login-desc">Tecnologias Dinámicas para a Internet - Comunicação Multimédia</div>
                    <div className="button-f-w">
                        <a href="http://vascosilva.hopto.org/oauth/authorize?client_id=1&redirect_uri=http://localhost:3000/callback&response_type=code&scope"  >Entrar na plataforma</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Auth)
