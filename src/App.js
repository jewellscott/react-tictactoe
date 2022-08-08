import './App.css';
import { useState } from 'react';
import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils';

function App() {

  // TODO
  // add validation so the user can't click on a full slot

  const initialState = {
    // it wouild be easier to handle if i made board an array full of objects that had a persistent key instead of an index... i think
    board: ['', '', '', '', '', '', '', '', ''],
    isPlaying: false,
    message: null
  }

  const [ state, setState ] = useState(initialState)

  function handleUserTurn(e) {
    let newBoard = state.board;
    newBoard[e.target.dataset.key] = "⨉"
    setState({...state, board: newBoard});
    evaluateWinner();
  }

  function checkIfFull() {
    return (state.board.every(element => element !== ''))
  }

  function getRandomArray(a) {    // Fisher Yates shuffle
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  
  const handleBotTurn = async () => {
    let newBoard = state.board;
    let boardOccupants = newBoard.map((elem, index) => [elem, index])
    let empty = boardOccupants.filter(elem => elem[0] == '').map(elem => elem[1]);
    let index = getRandomArray(empty)[0];
    newBoard[index] = "o";
    setState({...state, board: newBoard});
  }

  // refactor to check for a winner after every human and bot turn
  function evaluateWinner() {
    let newMessage = state.message;
    let newBoard = state.board;
    // turn the stateboard into a mini board like this?
    const evalBoard = [
      [newBoard[0], newBoard[1], newBoard[2]],
      [newBoard[3], newBoard[4], newBoard[5]],
      [newBoard[6], newBoard[7], newBoard[8]],
      [newBoard[0], newBoard[3], newBoard[6]],
      [newBoard[1], newBoard[4], newBoard[7]],
      [newBoard[2], newBoard[5], newBoard[8]],
      [newBoard[0], newBoard[4], newBoard[8]],
      [newBoard[2], newBoard[4], newBoard[6]],
    ]

    let xArr = ['⨉', '⨉', '⨉'];
    let oArr = ['o', 'o', 'o'];
    let winner;

    // learned that .includes takes a STRING as a param only
    if (false) {
        let newMessage = "You won! Press RESET to play again!"
        setState({...state, message: newMessage})
        console.log("user")
    } else if (winner == "bot") {
        let newMessage = "You let a dumb computer beat you. That's embarrassing. If your ego can handle it, press RESET to play again."
        setState({...state, message: newMessage})
        console.log("bot")
    } else {
      if (checkIfFull()) {
        let newMessage = "Awww, it's a draw. Too bad. Press RESET to play again... maybe you'll actually win this time."
        setState({...state, message: newMessage})
        console.log("full -- draw")
      }
      else {
        console.log("not full -- bot's turn")
        handleBotTurn();
      }
    }
  }

  function resetBoard(e) {
    setState(initialState);
  }

  return (
    <div className="App">
    <header>
      <h1>Tic Tac Toe</h1>
    </header>
    <main>
      <ul className="board">
        {state.board.map((pawn, index) => <li key={index} data-key={index} className='xo' onClick={handleUserTurn}>{pawn}</li>)}
      </ul>
      <form>
        <button className="btn-prim btn" type="button">
          Start
        </button>
        <button className="btn" type="button" onClick={resetBoard}>
          Reset
        </button>
      </form>
      <p>{state.message}</p>
    </main>
    </div>
  );
}

export default App;
