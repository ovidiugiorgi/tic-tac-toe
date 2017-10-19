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
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.keyPressThrottle = false;
  }

  handleKeyPress = (e) => {
    // Up and down arrow keys
    var keys = [38, 40];

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

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (Utils.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        lastSquareIndex: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    document.addEventListener("keyup", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    document.removeEventListener("keyup", this.handleKeyPress, false);
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
      /* There are still empty squares */
      if (squares.some((square) => {
        return square !== 'X' && square !== 'O';
      })) {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      } else {
        status = 'Draw';
      }
    }

    const moves = history.map((step, move) => {
      let desc = 'Game start';
      if (move) {
        const squareIndex =  step['lastSquareIndex'];
        desc = `Move (${Math.floor(squareIndex / 3) + 1}, ${squareIndex % 3 + 1})`;
      }
      const currentStep = move === this.state.stepNumber ? 'current' : '';

      return (
        <li key={move}>
          <a href="#" className={currentStep} onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
