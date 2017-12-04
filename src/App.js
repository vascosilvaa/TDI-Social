import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './Components/Profile/profile'
import Feed from './Components/Feed/feed'
import Auth from './Components/Auth/auth'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import Callback from './Components/Auth/callback'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getAuthID } from './Requests/Auth'
import Header from './Components/Header/header'
import Users from './Components/Users/users'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      auth: [],
      auth_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX19fWFeXv///+BdXf5+fiYjo/09PR+cXOCdnj8/Px9cHOtpaaNgoSooKHPysvy8fG1rq/h3t+jmpvDvb7GwMHW0tPZ1daIfX/s6uqSh4nm5OSelJa+t7jQzMybkZLX09QrC1YOAAAFGElEQVR4nO2c23rqIBCFkwE5aDQHD0k02vd/yw2pttFaDWwhY7/5L3rlhcthDsCiSUIQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBCaEmPobvACuNRi05lN/k/+AGwX5vvxYrba7fW4E8eQdY6Mh/ygObcp6VHYqjo3V8laIBPRukTHJVHpGMSnr5TEB/k5RAX08sPmXiIGYdpPA1N9uLIJDWUl2q+ITNm+PoKf+iuMA3il5X0YvRS6btwgKNCf5Y1FdMc92b6AEdtmDcJyDojboyxcc01+yY4iSHXIlsFUjdBiMkqm/6yOgTB+nx0DJBrES3WTj4mFXl/oArK2RJ7Onef4Ny3KNVAl08/E6zOJaIl1cel+PTZCzkhXOxQVLh4VlYW2CsAYLKN3iYUOyxri4nANiKhfGkOi9q4wUZ5ZA5xwQI+SAb6Lns9G9cMgemxJdeukwgwqutSW8VhbGpuhRsyzo6hZPWucu8gmyJNFN7adDbnGtLe3e1s9CkG1LYOuVIvh2irBymuAHQoo/IoQtSEgQ/s7S2npNKPiSXZd+OuwgP/V3v4Lnjvv1CwzbMbDnFK/qBteslcDCqyOyGTIdAjZ+YzyyouW5ZTdCjsg2VkbJwSNJVJYjW1qea0si6+sWnmfuBRhd8bVA4RwSjKdB/SbRNSRme4gt1S3OBymyQriwkv4AwqlwKWwHDxcE7JyEYBt8Bzjlu6zweri4rkYrYW2D9QrRLC6djx2CWVqirFgXoGlHxYSlGFvhAAHNmCtqWSPXYYD8eZ7ItkSvw+SJ7tjDRFFymePXkVhz6W72u2NLyWzzLha6BJJ1dt8LqGRaNPA2rlnBoeladhsWxWRW7N8mHJ9wENveL8uYsjApZVZt8neRAfDl6+UAYrdeHNq2rrP2tOy2ub7Y5kzINOYFpmF3WIhLRRK9pxySvGlyYR3y345yU9lmK420dAnT1pdMzmf7m9+aW64+aj5oVtqhxOnK1npT21bI6s3j3xrg2BtRmSoEwqBAU52rlJJVaXL67o9twmZt2udyNp+V6DIFPgZ2X6YW5d2HCSbHy0X6/UGZIjMAc1hf22RlutyKsxbR05exfHW4dpsrudCItiVcFz9mEibbYtsk/XueHt0cF3f6vawEmtbC9d2jeCVZ3VaLolsbuqKq5d0JTJ6wuE25/tWHopjp6HNTas0f9tscKWc5hpiYJu13NTJUgmJ1eRyV/lBS8elrl+cNz42SyU/l7aGcp53mWsnUxlkXW/8jlNpNejrkciL3mIkt/7B+kQ4zd03obhR6P/rdy3OmNDN7XYD+BpvsYlTA6mULyzJZDea528XOU9Q054/C8QHPc2Q1yaTicfn5DDZJM3nBjPVDyBQhCRCQSQwEvq7+J0LiX1i73kWPRMW+sX51D7kQ37+lD0GERPc9vXTKGjKP6zoNk+qW2P4UT1PpCOomZrp7Pg0bQ9TnY+FWVuxW8tKNyDWqjli3gownF1jEV1eBuuEnMXvifx+SPoLN4pWtcMXXEs/3z0OmSMyniY7eRWchXaROErKLWFi0o7qguW4fIsfKEX0KurSivfLxsvM7KSnjFGDPNy/jibUnCVy04lm0vV+BjhYSaUgJXH3jTfIBjhhvhJziJDssA+dIrH+OBFVgIaqNs7cK3A/jdcSwQ3xEIUloIZFOgM2EIllY5nGOsnXXzsKyjPR/eIAHBpfPkSAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIvPwVk8E/F9JIheXc51MAAAAASUVORK5CYII=',
    };
  }

  logout() {
    this.setState({
      logged: false
    })
  }


  login() {
    this.setState({
      logged: true
    })
    getAuthID().then((response) => {
      if (response) {
        this.setState({
          auth: response.data.data,
          auth_id: response.data.data.id,
          auth_name: response.data.data.name,
          auth_url: response.data.data.img,
        })
      } else {
        window.location.reload();
      }
    })

  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ logged: false })
    } else {
      this.setState({ logged: true });
      getAuthID().then((response) => {
        if (response) {
          this.setState({
            auth: response.data.data,
            auth_id: response.data.data.id,
            auth_name: response.data.data.name,
            auth_url: response.data.data.img,
          })
        } else {
          this.setState({ logged: false })
        }
      })
    }
  }

  header() {
    if (this.state.logged) {
      return (
        <div>
          <Header url={this.state.auth_url} auth_id={this.state.auth_id} logout={() => this.logout()} />
        </div>
      )
    } else {
      return ('')
    }
  }
  render() {
    return (
      <Router>
        <div>
          <div className="background">
            {this.header()}

            <Switch>
              <Route exact path='/' component={Feed} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/feed' render={(props) => <Feed login={() => this.login()} />} />
              <Route exact path='/users' component={Users} />
              <Route exact path='/login' component={Auth} />
              <Route exact path='/callback' render={(props) => <Callback />} />
              <Route exact path='**' component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
