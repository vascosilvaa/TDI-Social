import React, { Component } from 'react';
import Avatar from '../Avatar/avatar'
import './profile.css'
import { Grid, Row, Col, FormControl, FormGroup } from 'react-bootstrap';
import Card from '../Card/card';
import { getUser, getUserPosts, searchUserPosts } from '../../Requests/Users';
import Header from '../Header/header';
import NoResults from '../NoResults/noresults';
import _ from 'lodash';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      email: '',
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX19fWFeXv///+BdXf5+fiYjo/09PR+cXOCdnj8/Px9cHOtpaaNgoSooKHPysvy8fG1rq/h3t+jmpvDvb7GwMHW0tPZ1daIfX/s6uqSh4nm5OSelJa+t7jQzMybkZLX09QrC1YOAAAFGElEQVR4nO2c23rqIBCFkwE5aDQHD0k02vd/yw2pttFaDWwhY7/5L3rlhcthDsCiSUIQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBCaEmPobvACuNRi05lN/k/+AGwX5vvxYrba7fW4E8eQdY6Mh/ygObcp6VHYqjo3V8laIBPRukTHJVHpGMSnr5TEB/k5RAX08sPmXiIGYdpPA1N9uLIJDWUl2q+ITNm+PoKf+iuMA3il5X0YvRS6btwgKNCf5Y1FdMc92b6AEdtmDcJyDojboyxcc01+yY4iSHXIlsFUjdBiMkqm/6yOgTB+nx0DJBrES3WTj4mFXl/oArK2RJ7Onef4Ny3KNVAl08/E6zOJaIl1cel+PTZCzkhXOxQVLh4VlYW2CsAYLKN3iYUOyxri4nANiKhfGkOi9q4wUZ5ZA5xwQI+SAb6Lns9G9cMgemxJdeukwgwqutSW8VhbGpuhRsyzo6hZPWucu8gmyJNFN7adDbnGtLe3e1s9CkG1LYOuVIvh2irBymuAHQoo/IoQtSEgQ/s7S2npNKPiSXZd+OuwgP/V3v4Lnjvv1CwzbMbDnFK/qBteslcDCqyOyGTIdAjZ+YzyyouW5ZTdCjsg2VkbJwSNJVJYjW1qea0si6+sWnmfuBRhd8bVA4RwSjKdB/SbRNSRme4gt1S3OBymyQriwkv4AwqlwKWwHDxcE7JyEYBt8Bzjlu6zweri4rkYrYW2D9QrRLC6djx2CWVqirFgXoGlHxYSlGFvhAAHNmCtqWSPXYYD8eZ7ItkSvw+SJ7tjDRFFymePXkVhz6W72u2NLyWzzLha6BJJ1dt8LqGRaNPA2rlnBoeladhsWxWRW7N8mHJ9wENveL8uYsjApZVZt8neRAfDl6+UAYrdeHNq2rrP2tOy2ub7Y5kzINOYFpmF3WIhLRRK9pxySvGlyYR3y345yU9lmK420dAnT1pdMzmf7m9+aW64+aj5oVtqhxOnK1npT21bI6s3j3xrg2BtRmSoEwqBAU52rlJJVaXL67o9twmZt2udyNp+V6DIFPgZ2X6YW5d2HCSbHy0X6/UGZIjMAc1hf22RlutyKsxbR05exfHW4dpsrudCItiVcFz9mEibbYtsk/XueHt0cF3f6vawEmtbC9d2jeCVZ3VaLolsbuqKq5d0JTJ6wuE25/tWHopjp6HNTas0f9tscKWc5hpiYJu13NTJUgmJ1eRyV/lBS8elrl+cNz42SyU/l7aGcp53mWsnUxlkXW/8jlNpNejrkciL3mIkt/7B+kQ4zd03obhR6P/rdy3OmNDN7XYD+BpvsYlTA6mULyzJZDea528XOU9Q054/C8QHPc2Q1yaTicfn5DDZJM3nBjPVDyBQhCRCQSQwEvq7+J0LiX1i73kWPRMW+sX51D7kQ37+lD0GERPc9vXTKGjKP6zoNk+qW2P4UT1PpCOomZrp7Pg0bQ9TnY+FWVuxW8tKNyDWqjli3gownF1jEV1eBuuEnMXvifx+SPoLN4pWtcMXXEs/3z0OmSMyniY7eRWchXaROErKLWFi0o7qguW4fIsfKEX0KurSivfLxsvM7KSnjFGDPNy/jibUnCVy04lm0vV+BjhYSaUgJXH3jTfIBjhhvhJziJDssA+dIrH+OBFVgIaqNs7cK3A/jdcSwQ3xEIUloIZFOgM2EIllY5nGOsnXXzsKyjPR/eIAHBpfPkSAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIvPwVk8E/F9JIheXc51MAAAAASUVORK5CYII=',
      loading: true
    }
  }

  search = (event) => {
    if (event.key == 'Enter') {
      this.setState({
        loading: true
      })
      searchUserPosts(this.state.search, this.state.id).then((response) => {
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
      getUser(this.state.id).then((response) => {
        this.setState({
          user: response.data.data,
          name: response.data.data.name,
          email: response.data.data.email,
          url: response.data.data.img,
          loading: false
        }, () => console.log(this.state.user.name))
      })
      getUserPosts(this.state.id).then((response) => {
        this.setState({
          posts: response.data.data
        })
        console.log(response);
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
              <Card type='1' subject_icon={post.subject_icon} url={post.url} liked={post.liked} like_id={post.like_id} auth_id={this.state.auth_id} like={post.like} number_likes={post.number_likes} number_comments={post.number_comments} user_name={post.user_name} desc={post.description} title={post.title} user_id={post.user_id} subject_id={post.subject_id} created_at={post.created_at} id={post.id} />
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

    const user = () => {
      const result = []
      if (this.state.loading) {
        result.push(
          <div className="spinner"></div>
        )
      } else {
        if (this.state.name) {
          result.push(
            <div>
              <div class="title-user">{this.state.name}</div>
              <div class="desc-user">{this.state.email}</div>
            </div>
          )
        } else {
          result.push(
            <NoResults />
          )
        }

      };
      return result;
    };
    return (
      <div>
        <FormGroup className="search-bar">
          <FormControl className="search-input" type="text" onKeyPress={this.search} onChange={(e) => { this.setState({ search: e.target.value }) }} placeholder="Procurar publicações..." />
        </FormGroup>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={3}>
              <div className="user-section">
                <Avatar height="140" width="140" url={this.state.url} />
                <div>
                  {user()}

                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {posts()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

