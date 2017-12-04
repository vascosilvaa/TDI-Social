import React, { Component } from 'react';

export default class Subject extends Component {
    constructor(props) {
        super(props);
    };
    randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    filter(id) {
        this.props.filter(id);
    }
    render() {
        const icon_color = {
            color: this.randomColor()
        }
        return (
            <div onClick={() => this.filter(this.props.id)}>
                <div className="subjects">
                    <span className={this.props.icon} aria-hidden="true" style={icon_color}></span>
                    {this.props.name}
                </div>
            </div>
        );
    }
}

