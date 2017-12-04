import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormControl, Form, FormGroup, Button } from 'react-bootstrap';
import Avatar from '../Avatar/avatar';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import './header.css';
import { withRouter } from 'react-router-dom';
import {getAuthID} from '../../Requests/Auth'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: true,
      posts: '',
      search: '',
    };
  }

  render() {
    const logout = () => {
      this.props.logout();
      localStorage.removeItem("token");  
      this.props.history.push('/login')
    }
    
    return (
        <Navbar className="navbar" collapseOnSelect inline>
            <Navbar.Header>
                <Navbar.Brand>
                <Link to='/feed'>TdiSocial</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Navbar.Form pullLeft>
                
                {' '}
            </Navbar.Form>
          <Nav pullRight>
          <LinkContainer to="/users">
          <NavItem eventKey={1}>Pessoas</NavItem>
      </LinkContainer>
            <NavDropdown eventKey={3} 
                title={<span><Avatar marginBottom='0'  url={this.props.url} height='25' width='25'/></span>}
                id="basic-nav-dropdown">
              <LinkContainer to={'/profile/'+this.props.auth_id}>
                <NavItem eventKey={3.1}>Perfil</NavItem>
            </LinkContainer>
              <MenuItem eventKey={3.2}>Definições</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} onClick={()=>logout()}>Sair</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    );

      
  }
}

export default withRouter(Header)


