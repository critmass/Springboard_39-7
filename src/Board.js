import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array(ncols).fill( Array(nrows).fill(false) );
    // TODO: create array-of-arrays of true/false values
    for( let y = 0; y < ncols; y++ ){
      for( let x = 0; x < nrows; x++){
        if( Math.random() < Math.abs(chanceLightStartsOn - initialBoard[y][x]) ){
          initialBoard = flipCellsAround(`${y}-${x}`, initialBoard)
        }
      }
    }
    return initialBoard;
  }

  function hasWon() {
    return !board.flat(1).includes(true)
  }

  function flipCellsAround(coord, oldBoard) {


    const [y, x] = coord.split("-").map(Number);

    const flipCell = (y, x, boardCopy) => {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };

    // TODO: Make a (deep) copy of the oldBoard :DONE
    let newBoard = oldBoard.map(col => [...col])

    // TODO: in the copy, flip this cell and the cells around it
    flipCell(y, x, newBoard);
    flipCell(y, x - 1, newBoard);
    flipCell(y, x + 1, newBoard);
    flipCell(y - 1, x, newBoard);
    flipCell(y + 1, x, newBoard);

    // TODO: return the copy
    return newBoard
  }

  const setFlippedCells = ( coord ) => {
    setBoard( oldBoard =>{
      return flipCellsAround(coord, oldBoard)
    })
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  console.log(hasWon())

  if( hasWon() ){
    let style = {
      height : `${ncols*100}px`,
      width : `${nrows*100}px`
    }
    return <div style={style} className="winner">YOU WIN!!!</div>
  }
  else{
    // make table board

    // TODO
    return (<table className = "Board">
      {board.map( (col, y) => {
        return (<tr>
          {col.map( (cell, x) => {
            return <Cell
                    key={`${y}-${x}`}
                    isLit={cell}
                    flipCellsAroundMe={
                      e => setFlippedCells(`${y}-${x}`)
                    }
                  />
          })}
        </tr>)
      })}
    </table>)
  }
}

export default Board;
