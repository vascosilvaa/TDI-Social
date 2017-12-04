import React, { Component } from 'react';
import './noresults.css'

export default class NoResults extends Component {
 
  render() {
    return (
        <div className="no-results">
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            <div>Ups! Não foram encontrados resultados.</div>
        </div>
    );
  }
}

