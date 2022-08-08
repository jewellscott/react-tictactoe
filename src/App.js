import './App.css';
import { useState } from 'react';

function App() {

  const initialState = {
    // it wouild be easier to handle if i made board an array full of objects that had a persistent key instead of an index... i think
    board: ['', '', '', '', '', '', '', '', ''],
    isPlaying: false
  }

  const [ state, setState ] = useState(initialState)

  function handleUserTurn(e) {
    let newBoard = state.board;
    newBoard[e.target.dataset.key] = "⨉"
    setState({...state, board: newBoard});

    checkIfEmpty();
  }

  function checkIfEmpty() {
    if (x) {
      handleBotTurn();
    }
    evaluateWinner();
  }
  
  function handleBotTurn() {

  }

  function evaluateWinner() {
    console.log("Someone won lol")
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
    </main>
    </div>
  );
}

export default App;
