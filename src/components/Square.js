import React from 'react';

export default class Square extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    const baseCSSClass = 'square';

    return (
      <button className={this.props.highlight ? baseCSSClass + " highlight" : baseCSSClass} onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}
