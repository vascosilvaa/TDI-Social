import React, { Component } from 'react';
import Card from '../Card/card'
import Fab from '../Fab/fab'
import { Grid, Row, Col, OverlayTrigger, Tooltip, Button, Popover, Modal, FormGroup, FormControl } from 'react-bootstrap';
import ModalDef from '../Modal/modal';
import './feed.css';
import '../../App.css';
import { getPosts, getSubjects, searchPosts, filterPosts } from '../../Requests/Posts';
import { getUsers } from '../../Requests/Users';
import NoResults from '../NoResults/noresults';
import _ from 'lodash';
import { getAuthID } from '../../Requests/Auth';
import {withRouter} from 'react-router-dom'

 class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: true,
      posts: [],
      auth: [],
      auth_id: '',
      auth_name: '',
      auth_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      ready: false
    };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  postPost(id, title, desc, subject, created_at, icon) {
    const new_post = this.state.posts;
    new_post.unshift({
      type: 1,
      liked: 0,
      auth_id: this.state.auth_id,
      like: 0,
      number_likes: 0,
      number_comments: 0,
      user_name: this.state.auth_name,
      description: desc,
      title: title,
      user_id: this.state.auth_id,
      subject_id: subject,
      created_at: created_at,
      id: id,
      url: this.state.auth_url,
      subject_icon: icon
    });
    this.setState({
      posts: new_post
    })
    console.log(this.state.posts)
  }

  filter(id) {
    this.setState({
      loading: true
    })
    filterPosts(id).then((response) => {
      if (response) {
        this.setState({
          posts: response.data.data,
          loading: false,
        })
      } else {
        this.setState({
          posts: '',
          loading: false
        })
      }

    })
  }

  search = (event) => {
    if (event.key == 'Enter') {
      this.setState({
        loading: true
      })
      searchPosts(this.state.search).then((response) => {
        if (response) {
          this.setState({
            posts: response.data.data,
            loading: false,
          })
        } else {
          this.setState({
            posts: '',
            loading: false
          })
        }

      })
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ ready: false })    
      this.props.history.push('/login');
    } else {
        getAuthID().then((response) => {
          if(response) {
          this.setState({
            auth_id: response.data.data.id,
            auth_name: response.data.data.name,
            auth_url: response.data.data.img
          })
        } else {
          this.props.login();                  
        }
        })
        this.setState({ ready: true });
        getPosts().then((response) => {
          this.setState({
            posts: response.data.data,
            loading: false,
          })
        })
        getUsers().then((response) => {
          this.setState({
            users: response.data.data,
          })
        })
        getSubjects().then((response) => {
          this.setState({
            subjects: response.data.data,
          })
        })
    }
  }


  render() {
    const posts = () => {
      const result = []
      if (this.state.loading) {
        result.push(
          <div className="spinner"></div>
        )
      } else {
        if (this.state.posts != '') {
          _.map(this.state.posts, (post) => {
            result.push(
              <Card type='1' subject_icon={post.subject_icon} url={post.url} auth_url={this.state.auth_url} liked={post.liked} like_id={post.like_id} auth_id={this.state.auth_id} like={post.like} number_likes={post.number_likes} number_comments={post.number_comments} user_name={post.user_name} desc={post.description} title={post.title} user_id={post.user_id} subject_id={post.subject_id} created_at={post.created_at} id={post.id} />
            )
          });
        } else {
          result.push(
            <NoResults />
          )
        }

      };
      return result;
    };

    return (
      <div className="">
        <FormGroup className="search-bar">
          <FormControl className="search-input" type="text" onKeyPress={this.search} onChange={(e) => { this.setState({ search: e.target.value }) }} placeholder="Procurar publicações..." />
        </FormGroup>
        <Grid className="container-fluid">
          <Row className="">
            <Col xs={12} sm={4} md={3}><Card type='2' filter={(id) => this.filter(id)} subjects={this.state.subjects} /></Col>
            <Col xs={12} sm={4} md={6}>
              {posts()}
            </Col>
            <Col xs={12} sm={4} md={3}><Card type='3' users={this.state.users} /> </Col>
          </Row>
          <Fab open={() => this.setState({ showModal: true }, function () { console.log(this.state.showModal); })} />
        </Grid>
        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}><ModalDef subjects={this.state.subjects} url={this.state.auth_url} hide={this.close} postPost={(id, title, desc, subject, created_at, icon) => this.postPost(id, title, desc, subject, created_at, icon)} /></Modal>
      </div>


    );
  }
}

export default withRouter(Feed)