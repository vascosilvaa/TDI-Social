import React, { Component } from 'react';
import './card.css';
import axios from 'axios';
import Avatar from '../Avatar/avatar';
import { FormGroup, Checkbox, Panel, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Comments from '../Comments/comments';
import CardUser from '../cardUser/cardUser';
import _ from 'lodash';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'
import { getUsers } from '../../Requests/Users';
import { getAuthID } from '../../Requests/Auth';
import { getComments, postComment, postLike, putLike, filterPosts } from '../../Requests/Posts';
import { withRouter } from 'react-router-dom'
import '../../App.css';
import Subject from '../Subject/subject';
import CardFriends from './CardFriends/cardfriends'

/*  
    Tipo 1 -> Card de publicação
    Tipo 2 -> Card de filtros
    Tipo 3 -> Card de amigos
    Tipo 4 -> Auth Card
*/
class Card extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        this.state = {
            openComment: false,
            users: [],
            number_likes: this.props.number_likes,
            like_state: '',
            like_id: this.props.like_id,
            liked: this.props.liked,
            comments: [],
            number_comments: this.props.number_comments,
            auth_url: this.props.auth_url
        };
    }

    date = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    }

    componentDidMount() {
        if (this.props.like == 0) {
            this.setState({
                like_state: 0
            })
        } else if (this.props.like == 1) {
            this.setState({
                like_state: 1
            })
        }
    }

    //Enviar comentário
    sendComment = (event) => {
        if (event.key == 'Enter') {
            this.nameInput.focus();
            this.nameInput.value = "";

            postComment(this.state.comment, this.props.id, this.date()).then((response) => {
                if (response.status === 200) {
                    const new_comment = this.state.comments
                    new_comment.push({
                        id: response.data.comment.id,
                        content: this.state.comment,
                        user_id: this.props.user_id,
                        user_name: this.props.user_name,
                        user_url: this.props.auth_url,
                        post_id: this.props.id,
                        created_at: this.date()
                    })
                    const n_comments = this.state.number_comments
                    this.setState({
                        comments: new_comment,
                        number_comments: n_comments + 1
                    })
                    console.log(new_comment);
                }
            })
        }
    }
    //Enquanto escreve vai sendo alterado o state dos comentários
    changeComment = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    // Fazer Like
    like = (e) => {
        console.log(e);
        let n_likes = this.state.number_likes;
        this.setState({
            number_likes: n_likes + 1,
            like_state: 1,
        })
        if (this.state.liked == 0) {
            postLike(this.props.id, this.props.auth_id).then((response) => {
                if (response && response.status != 200) { // se post der erro
                    this.setState({
                        number_likes: n_likes - 1,
                        like_state: 0,
                    })
                } else { //post da certo
                    if (response && response.data.id) {
                        this.setState({
                            like_id: response.data.id,
                            liked: 1,
                        })
                    }
                }
            })
        } else if (this.state.liked == 1) {
            putLike(this.props.id, this.props.auth_id, this.state.like_id, 1).then((response) => { // tenta put
                if (response && response.status != 200) { // se put der erro
                    this.setState({
                        number_likes: n_likes - 1,
                        like_state: 0
                    })
                } else { // se o put der certo
                    this.setState({
                    })
                }
            })
        }

    }

    // Fazer Dislike
    dislike = (e) => {
        e.stopPropagation();
        let n_likes = this.state.number_likes;
        this.setState({
            number_likes: n_likes - 1,
            like_state: 0
        })
        putLike(this.props.id, this.props.auth_id, this.state.like_id, 0).then((response) => {
            if (response && response.status != 200) {
                this.setState({
                    number_likes: n_likes + 1,
                    like_state: 1
                })
            } else { }
        })

    }
    render() {
        const url = "https://www.menshairstylestoday.com/wp-content/uploads/2017/04/Ragnar-Lothbrok-Hair-and-Beard.jpg"
        const cardType = this.props.type;



        // Mostrar comentários
        const showComments = (id) => {
            getComments(id).then((response) => {
                if (response) {
                    this.setState({
                        comments: response.data.data
                    })
                }
                this.nameInput.focus();
            })
        }

        // Mapear comentários
        const comments = () => {
            const result = [];
            if (this.state.comments.length == 0 && this.state.number_comments > 0) {
                result.push(
                    <div className="spinner"></div>
                )
            } else {
                _.map(this.state.comments, (comment) => {
                    result.push(
                        <Comments url={comment.user_url} user_id={comment.user_id} content={comment.content} created_at={comment.created_at} user_name={comment.user_name} />
                    )
                    this.nameInput.focus()
                });
            }
            return result;
        }

        //Filtrar posts
        const filter = (id) => {
            this.props.filter(id);
            /* 
             */
        }

        // Mapear categorias
        const subjects = () => {
            const result = [];
            if (!this.props.subjects) {
                result.push(
                    <div className="spinner"></div>
                )
            } else {
                _.map(this.props.subjects, (subject) => {
                    result.push(
                        <Subject id={subject.id} name={subject.name} icon={subject.icon} filter={(id) => filter(id)} />

                    )
                })
            }
            return result;
        }

        // Mapear utilizadores
        const users = () => {
            const result = []
            if (!this.props.users) {
                result.push(
                    <div className="spinner"></div>
                )
            } else {
                _.map(this.props.users, (user) => {
                    result.push(
                        <CardFriends email={user.email} url={user.img} name={user.name} id={user.id}/>
                    )
                })
            }
            return result;
        }

        // Mapear numero de comentários
        const number_comments = () => {
            if (this.state.number_comments > 0) {
                return (
                    <div onClick={() => { this.setState({ openComment: !this.state.openComment, number_comments: this.state.number_comments }); showComments(this.props.id) }} className="">{this.state.number_comments} Comentários</div>
                )
            } else {
                return (
                    <div className="" onClick={() => { this.setState({ openComment: !this.state.openComment, number_comments: 0 }) }}>Comentar</div>
                )
            }
        }

        // Likes
        const number_likes = () => {
            console.log(this.props.like)
            if (this.state.like_state == 0) { // Não tem like
                return (
                    <div className='likes'>
                        <span onClick={this.like} className='glyphicon glyphicon-heart-empty' aria-hidden="true"></span>
                        <div className="">{this.state.number_likes}</div>
                    </div>
                )
            } else if (this.state.like_state == 1) { // Tem like
                return (
                    <div className='likes'>
                        <span onClick={this.dislike} className='glyphicon glyphicon-heart red' aria-hidden="true"></span>
                        <div className="">{this.state.number_likes}</div>
                    </div>
                )
            }

        }

        if (cardType == '1') { // Publicação
            return (
                <div>
                    <div className="card">
                        <div className="card-header">
                            <CardUser height='36' width='36' type='1' subject_icon={this.props.subject_icon} url={this.props.url} id={this.props.user_id} user_name={this.props.user_name} created_at={this.props.created_at} />
                            <div className="actions">
                                <span className="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-title">{this.props.title}</div>
                            <div className="card-text">{this.props.desc}</div>
                        </div>

                        <div className="card-footer">
                            {number_likes()}
                            <div className="comments">
                                <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                                {number_comments()}
                            </div>
                        </div>
                    </div>
                    <Panel collapsible expanded={this.state.openComment}>
                        <div className="comments-area">
                            {comments()}
                        </div>
                        <div className="comment-area">
                            <Avatar url={this.props.auth_url} marginRight='7' height='25' width='25' />
                            <input onKeyPress={this.sendComment} onChange={this.changeComment} type="text" className="comment-input" ref={(input) => { this.nameInput = input; }} />
                        </div>
                    </Panel>
                </div>
            );
        } else if (cardType == '2') { // Filtros
            return (
                <div className="card">
                    <div className="card-header">
                        <div className="user">
                            <div>
                                <div className="title">Filtrar por categoria</div>
                            </div>

                        </div>
                    </div>
                    <div className="card-filter-body">
                        {subjects()}
                    </div>
                </div>
            );
        } else if (cardType == '3') { // Amigos
            return (
                <div className="card">
                    <div className="card-header">
                        <div className="user">
                            <div>
                                <div className="title">Encontrar amigos</div>
                            </div>

                        </div>
                    </div>
                    <div className="card-filter-body">
                        {users()}
                    </div>
                </div>
            );
        } else if (cardType == '4') {
            return (
                <div className="card">
                    <div className="card-header">
                        <div className="user-c">
                            <div>
                                <div className="title">Get started with TdiSocial!</div>
                            </div>

                        </div>
                    </div>

                </div>
            );
        } 

    }
}

export default withRouter(Card)
