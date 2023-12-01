
import './App.css';
import {Chessboard} from 'react-chessboard';
import {Chess} from 'chess.js'
import { useState } from 'react';

function App() {

  const [game,setGame] = useState(new Chess());
  
  function safeGameMutate(modify){
    setGame((g)=>{
      const update = {...g}
      modify(update)
      return update;
    })
  }

  function makeRandomMove(){
    const possibleMove = game.move();

    if(game.game_over() || game.in_draw() || possibleMove.length===0) return;


    const randomIndex = Math.floor(Math.random() * possibleMove.length)

    safeGameMutate((game)=>{
      game.move(possibleMove[randomIndex])
    })
  }

  function onDrop(source,target){
    let move = null;
    safeGameMutate((game)=>{
      move = game.move({
        from:source,
        to:target,
        promotion:'q'
      })
    })

    if(move==null) return false

    setTimeout(makeRandomMove, 200);
    return true
  }
  return (
    <div className='app'>
       <Chessboard 
       position={game.fen()}
       onPieceDrop={onDrop}
       />
      
    </div>
   
  );
}

export default App;
