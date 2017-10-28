import React from 'react';

export default class ToggleButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isOn: false,
    };
  }

  handleClick = (e) => {
    e.preventDefault();

    this.props.onClick();

    this.setState({
      isOn: !this.state.isOn,
    });
  }

  render() {
    return (
      <div className="toggle-btn">
        <span>{this.props.text}</span>
        <div className="container" onClick={this.handleClick}>
          <div className={this.state.isOn ? 'on' : 'off'} />
        </div>
      </div>
    );
  }
}
