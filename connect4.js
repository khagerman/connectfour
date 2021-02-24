/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;

let currentPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
// This code creates an array to represent the board based on the given height and width
function makeBoard() {
  for (let i = 0; i < height; i++) {
    // pushes number of empty arrays that equal height ( 6 in this case)
    board.push([]);
    for (let j = 0; j < width; j++) {
      board[i].push(null);
      // this pushes a number of nulls into each array created before based on the width
    }
  }
}
//    x
// // [null, null, null, null, null, null, null]
// // [null, null, null, null, null, null, null]
// // [null, null, null, null, null, null, null]y
// // [null, null, null, null, null, null, null]
// // [null, null, null, null, null, null, null]
// // [null, null, null, null, null, null, null]

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.querySelector("#board");
  // this makes the top row of the board
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // code adds table cells to table row based on width and gives each a number id
  for (let i = 0; i < width; i++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", i);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // This code creates the height of the table based on the height variable and gives it a number id based on column and row
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// this code checks to see if the column x has a open y spot. If it checks the board array if
// a spot is open starting at the bottom of the column and going up. If it is full it returns null
function findSpotForCol(x) {
  for (let i = height - 1; i >= 0; i--) {
    if (!board[i][x]) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  const gamePieceDiv = document.createElement("div");
  gamePieceDiv.classList.add("piece");
  // gamePieceDiv.classList.add("filled");

  currentPlayer === 1
    ? gamePieceDiv.classList.add("p1")
    : gamePieceDiv.classList.add("p2");
  const gamePieceLocation = document.getElementById(`${y}-${x}`);
  gamePieceLocation.append(gamePieceDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}
// /resets board
function resetGame() {
  location.reload();
}
/** handleClick: handle click of column top to play piece */

function handleClick(e) {
  const x = +e.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currentPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    setTimeout(function () {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      endGame(`Player ${currentPlayer} won!`);
      resetGame();
    }, 400);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  const boardFilled = board.flat(Infinity).every((el) => el !== null);
  if (boardFilled) {
    setTimeout(function () {
      endGame(`Board full---it's a tie!`);
      resetGame();
    }, 400);
  }
  // this switches between players
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  // update who's turn it is in html
  turn.innerText = currentPlayer;
}

/** checkForWin: check board celboardFillel-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currentPlayer
    );
  }

  // This code checks for winners by looking through the board array and seeing if there are
  // 4 numbers aligned horizontally, vertically, and diagonally.

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
const turn = document.querySelector(".turn");
