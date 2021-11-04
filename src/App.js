import './App.css';
import Menu from './menu/Menu';
import GameContext from './Context/Game';
import {  useState, useMemo } from 'react';
function App() {
  const [gameContext, setGameContext] = useState("all-games");
  const value = useMemo(
    () => ({ gameContext, setGameContext }), 
    [gameContext]
  );
  return (
    <div className="App">
      <GameContext.Provider value={value}>
        <Menu />
      </GameContext.Provider>
    </div>
  );
}

export default App;
