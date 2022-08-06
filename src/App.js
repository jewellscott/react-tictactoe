import './App.css';
import { useState } from 'react';

function App() {

  const [ state, setState ] = useState({
    board: ['', '', '', '', '', '', '', '', ''],
    isPlaying: false
  })

  return (
    <div className="App">
    <header>
      <h1>Tic Tac Toe</h1>
    </header>
    <main>
      <ul className="board">
        {state.board.map((pawn, index) => <li key={index} className='xo'>{pawn}</li>)}
      </ul>
      <form>
        <button className="btn-prim btn" type="button">
          Start
        </button>
        <button className="btn" type="button">
          Reset
        </button>
      </form>
    </main>
    </div>
  );
}

export default App;
