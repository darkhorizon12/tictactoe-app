import React, { Component } from 'react';
import Board from './components/Board';
import "./Game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
        squares: Array(9).fill(null),
        idx: 0,
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleSort = () => {
    this.setState({
    history: this.state.history.reverse(),
    });
  }

  // position 계산
  calcPosition = i => {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    return `(${ row }, ${ col })`;
  }

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          idx: history.length, // 순서바꾸기 할 때 인덱스 조정
          position: this.calcPosition(i),
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  };

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  };

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] &&
        squares[a] === squares[c]) {
        // return squares[a];
        return lines[i];
      }
    }
    return null;
  }

  render() {  
    const { history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];
    const winner = this.calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = step.idx ?
                  `Go to move # ${ step.idx } ${ step.position }` :
                  `Go to game start`;

      return (
        <li key={ move }>
        <button onClick={ () => this.jumpTo(move) }>{ desc }</button>
        </li>
      );

    });

    let status;
    if (winner) {
      status = `Winner: ${ current.squares[winner[0]] }`;
    } else {
      status = history.length < 10 ? 
              `Next player: ${ (xIsNext ? "X" : "O")}` : 
              `This game is drawn`;
    }

    return (
      <div className="game">
      <div className="game-board">
        <Board
          winner={ winner }
          squares={ current.squares }
          onClick={ i => this.handleClick(i) }
        />
      </div>
      <div className="game-info">
      <div>{ status }</div>
      <ol>{ moves }</ol>
      </div>
      <div><button onClick={ this.handleSort }>순서 바꾸기</button></div>
      </div>
    );
  }
}

export default Game;