import React from 'react';
import Styles from './App.module.scss';
import TicTacToe from './components/TicTacToe/TicTacToe';

const App: React.FC = () => {    
  return (
    <div className={Styles.App}>
      <TicTacToe />
    </div>
  );
}

export default App;
