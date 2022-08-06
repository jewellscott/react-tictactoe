import './App.css';
import { useState } from 'react';

function App() {

  const initialState = {
    board: ['', '', '', '', '', '', '', '', ''],
    isPlaying: false
  }

  const [ state, setState ] = useState(initialState)

  function handleUserMove(e) {
    let newBoard = state.board;
    newBoard[e.target.dataset.key] = "⨉"
    setState({...state, board: newBoard});

    // if there is an empty string on the board, call the handleBotMove 
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
        {state.board.map((pawn, index) => <li key={index} data-key={index} className='xo' onClick={handleUserMove}>{pawn}</li>)}
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
