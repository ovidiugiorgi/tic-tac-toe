import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
      />
    )
  }

  render() {
    const squares = [];
    for (let row = 0; row < 3; row++) {
      const squaresRow = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        squaresRow.push(this.renderSquare(index));
      }
      squares.push(<div className="board-row"> {squaresRow} </div>)
    }

    return (
      <div>
      {squares}
      </div>
    );
  }
}
