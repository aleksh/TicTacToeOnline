import React from 'react';
import Styles from './App.module.scss';
import TicTacToe from './components/TicTacToe/TicTacToe';
import GameSettings from './components/GameSettings/GameSettings';
import UsersList from './components/UsersList/UsersList';


const App: React.FC = () => {    
  return (
    <div className="container-fluid">
        <div className="row">     
            <div className="col-2 bd-highlight">USER 1</div>
            <div className="col-8 bd-highlight">
                <GameSettings />
                <TicTacToe />
            </div>
            <div className="col-2 bd-highlight">USER 2
                <UsersList />
            </div>
        </div>
    </div>
  );
}

export default App;
