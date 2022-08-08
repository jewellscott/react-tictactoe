import './App.css';
import { useState } from 'react';

function App() {

  const [ state, setState ] = useState({
    board: ['', '', '', '', '', '', '', '', ''],
    message: null,
    gameOver: false,
    score: {
      user: 0,
      bot: 0
    }
  })

  function handleUserTurn(e) {
    let newBoard = state.board;
    newBoard[e.target.dataset.key] = "⨉"
    setState({...state, board: newBoard});
    if (evaluateWinner()) {
    } else {
      handleBotTurn();
    }
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
    let empty = boardOccupants.filter(elem => elem[0] === '').map(elem => elem[1]);
    let index = getRandomArray(empty)[0];
    newBoard[index] = "o";
    setState({...state, board: newBoard});
    evaluateWinner();
  }

  function evaluateWinner() {
    let newMessage = state.message;
    let newBoard = state.board;
    const evalBoard = [
      [newBoard[0], newBoard[1], newBoard[2]].join(),
      [newBoard[3], newBoard[4], newBoard[5]].join(),
      [newBoard[6], newBoard[7], newBoard[8]].join(),
      [newBoard[0], newBoard[3], newBoard[6]].join(),
      [newBoard[1], newBoard[4], newBoard[7]].join(),
      [newBoard[2], newBoard[5], newBoard[8]].join(),
      [newBoard[0], newBoard[4], newBoard[8]].join(),
      [newBoard[2], newBoard[4], newBoard[6]].join(),
    ]

    // learned that .includes takes a STRING as a param only
    if (evalBoard.includes('⨉,⨉,⨉')) {
        let newMessage = "You won! Press Reset to play again!"
        setState({...state, message: newMessage, gameOver: true, score: {
          ...state.score, user: (state.score.user + 1)
        }})
        return true;
    } else if (evalBoard.includes('o,o,o')) {
        if (state.score.bot < 4) {
           newMessage = "You let a dumb computer beat you. That's embarrassing. If your ego can handle it, press Reset to play again."
          setState({...state, message: newMessage, gameOver: true, score: {
            ...state.score, bot: (state.score.bot + 1)
          }})
          return true;
        } else {
          newMessage = `You let a dumb bot beat you ${state.score.bot + 1} times already. Are you sure you have a brain? Press Reset to play again.`
          setState({...state, message: newMessage, gameOver: true, score: {
            ...state.score, bot: (state.score.bot + 1)
          }})
          return true;
        }
    } else if (checkIfFull()) {
        newMessage = "Awww, it's a draw. Too bad. Press Reset to play again. Maybe you'll actually win this time."
        setState({...state, message: newMessage, gameOver: true})
        return true;
    } else {
      return false;
    }
  }

  function resetBoard(e) {
    setState({...state, 
      board: ['', '', '', '', '', '', '', '', ''],
      message: null,
      gameOver: false
    });
  }

  return (
    <div className="App">
    <header>
      <h1>Tic Tac Toe</h1>
    </header>
    <main>
      <ul className="board">
        {state.board.map((pawn, index) => <li key={index} data-key={index} className='xo' disabled={pawn === '' && !state.gameOver ? false : true } onClick={handleUserTurn}>{pawn}</li>)}
      </ul>
      <div className="menu">
        <table className="score-table">
          <tr>
            <td>User</td>
            <td>{state.score.user}</td>
          </tr>
          <tr>
            <td>Bot</td>
            <td>{state.score.bot}</td>
          </tr>
        </table>
        <form>
          <button className="btn" type="button" onClick={resetBoard}>
            Reset
          </button>
        </form>
      </div>
      <p className="message">{state.message}</p>
    </main>
    </div>
  );
}

export default App;
