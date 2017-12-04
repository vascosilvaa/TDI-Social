import React, { Component } from 'react';
import Avatar from '../Avatar/avatar'
import { Grid, Row, Col, FormControl, FormGroup } from 'react-bootstrap';
import { getUser, searchUsers, getUsers } from '../../Requests/Users';
import NoResults from '../NoResults/noresults';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import UserPanel from './userPanel'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            search: '',
        }
    }

    search = (event) => {
        if (event.key == 'Enter') {
            this.setState({
                loading: true
            })
            searchUsers(this.state.search).then((response) => {
                if (response) {
                    this.setState({
                        users: response.data.data,
                        loading: false,
                    })
                } else {
                    this.setState({
                        users: '',
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
            getUsers().then((response) => {
                this.setState({
                    users: response.data.data,
                    loading: false
                })
            })
        }


    }
    render() {
        const users = () => {
            const result = [];
            if (this.state.loading) {
                result.push(
                    <div className="spinner"></div>
                )
            } else {
                if (this.state.users != '') {
                    _.map(this.state.users, (user) => {
                        result.push(
                            <Col md={3}>
                                <UserPanel url={user.img} id={user.id} name={user.name} email={user.email} type={user.type} />
                            </Col>
                        )
                    })
                } else {
                    result.push(
                        <NoResults />
                    )
                }
            }
            return result;

        }
        return (
            <div>
                <FormGroup className="search-bar">
                    <FormControl className="search-input" type="text" onKeyPress={this.search} onChange={(e) => { this.setState({ search: e.target.value }) }} placeholder="Procurar pessoas..." />
                </FormGroup>
                <Grid>
                    <Row className="show-grid">
                        {users()}
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Users)