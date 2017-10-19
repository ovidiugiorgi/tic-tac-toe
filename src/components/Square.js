import React from 'react';

export default class Square extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <button className="square" onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}
