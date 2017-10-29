import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    const { value, highlight } = this.props.squares[i];
    
    return (
      <Square key={i}
        value = {value}
        highlight = {highlight}
        onClick = {() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
      {[...Array(3)].map((boardRow, row) => {
        return (
          <div key={row} className="board-row">
          {[...Array(3)].map((square, col) => {
            return this.renderSquare(row * 3 + col);
          })}
          </div>
        )
      })}
      </div>
    )
  }
}
