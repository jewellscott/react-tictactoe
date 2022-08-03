import './App.css';
import { useState } from 'react';

function App() {

  const [ state, setState ] = useState({
    board: ['', '', '', '', '', '', '', '', ''],
    isPlaying: false
  })

  function pushToRandEmpty() {
    let random = Math.floor(Math.random() * 10);
    let newBoard = state.board;
    newBoard[random] = "X";
    setState({...state, board: newBoard})
  }

  function computerRound() {
    setState({...state, isPlaying: true})
  }

  function userRound() {
    newBoard[]
  
  }

  function playGame() {
    setState({...state, isPlaying: true});
  }


  return (
    <div className="App">
    <header>
      <h1>Tic Tac Toe</h1>
    </header>
     <div className="board">
      {state.board.map(i => <div className="xo">{i}</div>)}
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
