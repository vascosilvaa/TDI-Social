import React, { Component } from 'react';
import Card from '../Card/card'
import Fab from '../Fab/fab'
import { Grid, Row, Col, Modal, OverlayTrigger, Tooltip, Button, Popover, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import CardUser from '../cardUser/cardUser';
import Avatar from '../Avatar/avatar';
import { postPost, getSubjects } from '../../Requests/Posts'
import './modal.css';
import _ from 'lodash';
export default class ModalDef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      loading: false,
      subjects: this.props.subjects,
      subject: 1
    };
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  changeSubject = (e) => {
    this.setState({
      subject: e.target.value,
      subject_icon: this.state.subjects[e.target.value].icon
    })
  }

  changeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }
  hide = () => {
    this.props.hide();
  }
  render() {
    const url = this.props.url
    const result = []

    const post = () => {
      this.setState({ loading: true })
      postPost(this.state.title, this.state.description, this.state.subject).then((response) => {
        if (response && response.status != 200) { // se post der erro
          console.log(response)
        } else { //post da certo
          this.props.postPost(response.data.post.id, response.data.post.title, response.data.post.description, response.data.post.subject_id, response.data.post.created_at,  response.data.icon);
          this.setState({ loading: false })
          this.props.hide();
        }
      })
    }
    if (this.state.loading) {
      result.push(
        <div className="spinner"></div>
      )
    } else {
      result.push(
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Escrever publicação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="body-modal">
              <Avatar marginBottom='0' url={url} height='30' width='30' />
              <FormGroup controlId="formControlsTextarea" className="post-form">
                <FormControl onChange={this.changeTitle} className="post-form-input" placeholder="Escrever título..." />
              </FormGroup>
              <FormGroup controlId="formControlsSelect" className="post-form">
                <FormControl onChange={this.changeSubject} componentClass="select"  className="post-form-input"  placeholder="select">
                  {
                    this.state.subjects.map(function (subject) {
                      return <option key={subject.id}
                        value={subject.id}>
                        {subject.name}
                      </option>;
                    })
                  }
                </FormControl>
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="formControlsTextarea" className="post-desc">
                <FormControl onChange={this.changeDescription} componentClass="textarea" className="post-desc-input" placeholder="Escrever corpo da publicação..." />
              </FormGroup>
            </div>
            <div className="buttons-input">
              <Button bsStyle="default" onClick={this.hide}>Cancelar</Button>
              <Button bsStyle="primary" onClick={() => post()}>Publicar</Button>
            </div>

          </Modal.Body>

        </div>

      );
    }
    return result;
  }
}

