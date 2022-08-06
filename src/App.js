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
     <div className="board">
      {state.board.map((item, index) => <div className="xo empty" key={index} onClick={handleUserClick}>{item.text}</div>)}
     </div>
     <form>
      <button className="btn-prim btn" type="button">
        Start
      </button>
      <button className="btn" type="button">
        Reset
      </button>
     </form>
    </div>
  );
}

export default App;
