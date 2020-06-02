import React, { Component } from 'react';
import Square from './Square';
import "../Game.css";

class Board extends Component {

  renderSquare = (i, isWin) => {
    return (
      <Square
       key={i}
        win={ isWin }
        value={ this.props.squares[i] }
        onClick={ () => this.props.onClick(i) }
      />
    );
  };
    
  composeDiv = (row, col) => {
    const rows = [];
    let count = 0;
    const { winner } = this.props;
    let win = null;
    
    for (let r = 0; r < row; r++) {
      const cols = [];
      for (let c = 0; c < col; c++) {
        win = winner && winner.some(
                          idx => idx === count
                          );
                          
        cols.push(this.renderSquare(count++, win));
      }
      rows.push(<div key={ r } className="board-row">{ cols }</div>);
    }
    
    return rows;
  }
    
    render() {
      return (
        <div>{ this.composeDiv(3, 3) }</div>
      );
    }
}

export default Board;