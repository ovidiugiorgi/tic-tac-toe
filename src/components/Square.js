import React from 'react';

export default class Square extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    const highlight = this.props.highlight ? 'highlight': '';
    const classes = `square ${highlight}`;

    return (
      <button className={classes} onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}
