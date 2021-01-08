/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let gameOver = false;
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  repeat(HEIGHT, (y) => {
    // a row for each row
    board.push([]);
    repeat(WIDTH, () => {
      board[y].push(null);
    });
  });
}

/**
 * repeats a function itertations times. each time the function is run, it is passed the iteration it is on,
 *    and all the other params passed in to the repeat function
 *
 * @param {number} iterations how many times do you want the selected function repeated
 * @param {*} func the function to repeat
 * @param  {...any} rest other paramaters you want passed into the repeated function
 */

function repeat(iterations, func, ...rest) {
  for (let i = 0; i < iterations; i++) func(i, ...rest);
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  //  get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // creating the top row of the connect four board
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //creating the individual td's in the top row of the board
  repeat(WIDTH, (x) => {
    const headCell = document.createElement("td");
    //Sets each id to the horizontal index it is in
    headCell.setAttribute("id", x);
    //appends it to the row in order
    top.append(headCell);
  });
  //appends the whole top row to the board
  htmlBoard.append(top);

  // creates the rest of the rows for the board
  repeat(HEIGHT, (y) => {
    // a row for each row
    const row = document.createElement("tr");
    repeat(WIDTH, (x) => {
      // and a cell for each column on that row
      const cell = document.createElement("td");
      // each cells id contains it's cordinates of format '3-2' meaning 
      //    the fourth row from the top, and the third cell from the left
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    });
    htmlBoard.append(row);
  });
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  return board.reduce((accecptableRow, row, i) => {
    return row[x] == null ? i : accecptableRow;
  }, null);
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make a div named piece
  const piece = document.createElement('div');
  // add the classes based on whose turn it is
  piece.classList.add('piece', 'p' + currPlayer);
  // insert into correct table cell
  document.getElementById(`${y}-${x}`).append(piece);
}

function removeFromTable(y, x) {

}

/** endGame: announce game end */

function endGame(msg) {
  gameOver = true;
  setTimeout(() => { alert(msg) }, 300);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  //if the game has already ended, no more clicks
  if (gameOver) return;

  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (checkForTie()) {
    endGame('Both Players Tied');
  }
  // switch players
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

function checkForTie() {
  return board.every((row) => row.every((cell) => cell != null));
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // loop through every y and x coordinate from 0 to height or width
  repeat(HEIGHT, (y) => {
    repeat(WIDTH, (x) => {
      // make a set of coordinates for every direction from the x and y coordinates you are on
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // check every pattern from the current coordinate pair for a win
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        //if any of them are a win, return true
        return true;
      }
    });
  });
  return false;
}



// make the board variable
makeBoard();
// make the board for the user
makeHtmlBoard();
