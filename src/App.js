import './App.css';
import { useState } from 'react';

function App() {

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

    checkIfEmpty();
  }

  function checkIfEmpty() {
    if ((state.board.some(element => element == ''))) {
      handleBotTurn();
    } else {
      evaluateWinner();
    }
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
    console.log("bot");
    setState({...state, board: newBoard});
  }

  // refactor to check for a winner after every human and bot turn
  function evaluateWinner() {
    setState({...state, message: "the game is over"})
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
