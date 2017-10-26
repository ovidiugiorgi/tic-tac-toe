import React from 'react';
import Board from './Board';
import Utils from '../helpers/Utils'

export default class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastSquareIndex: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      sortAscending: true,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.keyPressThrottle = false;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    document.addEventListener("keyup", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    document.removeEventListener("keyup", this.handleKeyPress, false);
  }

  areSomeSquaresTicked(squares) {
    return squares.some((square) => {
      return square;
    });
  }

  handleKeyPress(e) {
    // Up and down arrow keys
    const keys = [38, 40];

    if (keys.includes(e.keyCode)) {
      e.preventDefault();

      if (!this.keyPressThrottle) {
        this.keyPressThrottle = true;

        let stepNumber = this.state.stepNumber;

        if (e.keyCode === 38) {
          // Up key
          stepNumber = Math.max(0, stepNumber - 1);
        } else {
          // Down key
          stepNumber = Math.min(this.state.history.length - 1, stepNumber + 1);
        }

        this.jumpTo(stepNumber);

        setTimeout(() => {
          this.keyPressThrottle = false;
        }, 200);
      }
    }
  }

  handleSquareClick(i) {
    const history = this.state.sortAscending
      ? this.state.history.slice(0, this.state.stepNumber + 1)
      : this.state.history.slice(this.state.stepNumber);
    const current = history[this.state.sortAscending ? history.length - 1 : 0];
    const squares = current.squares.slice();

    if (Utils.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    const step = {
      squares: squares,
      lastSquareIndex: i,
    };

    this.setState({
      history: this.state.sortAscending
        ? history.concat([step])
        : [step].concat(history),
      stepNumber: this.state.sortAscending ? history.length : 0,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: ((step) => {
        return step % 2 == 0;
      })(this.state.sortAscending ? step : this.state.history.length - step - 1),
    });
  }

  handleMovesBtnClick() {
    const sortAscending = !this.state.sortAscending;
    const history = this.state.history;

    this.setState({
      history: history.reverse(),
      sortAscending: sortAscending,
    });
  }

  hasEmptySquares(squares) {
    return squares.some((square) => {
      return square !== 'X' && square !== 'O'
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const winner = Utils.calculateWinner(squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      const hasEmptySquares = squares.some((square) => {
        return !square;
      });

      if (hasEmptySquares) {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      } else {
        status = 'Draw';
      }
    }

    const moves = history.map((step, move) => {
      let desc = 'Game start';

      if (this.areSomeSquaresTicked(step.squares)) {
        const squareIndex =  step['lastSquareIndex'];
        desc = `Move (${Math.floor(squareIndex / 3) + 1}, ${squareIndex % 3 + 1})`;
      }

      return (
        <li key={move}>
          <a href="#" className={move === this.state.stepNumber ? 'current' : ''}
            onClick={() => {
              this.jumpTo(move);
            }}>
            {desc}
          </a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleSquareClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleMovesBtnClick()}>
            {this.state.sortAscending ? 'Sort descending' : 'Sort ascending'}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
