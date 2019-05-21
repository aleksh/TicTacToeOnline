import React from 'react';
import Styles from './App.module.scss';
import TicTacToe from './components/TicTacToe/TicTacToe';
import GameSettings from './components/GameSettings/GameSettings';


const App: React.FC = () => {    
  return (
    <div className="container-fluid">
        <div className="d-flex justify-content-center">
            <div className="d-flex">USER 1</div>
            <div className="d-flex flex-column">
                <GameSettings />
                <TicTacToe />
            </div>
            <div className="d-flex">USER 2</div>
        </div>
    </div>
  );
}

export default App;
