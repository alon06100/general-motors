/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import constants from '../constants';
import checkWinner from './utils/checkWinner';
import play from './utils/play';
import LottieControl from '../Lottie';
import x from '../../animations/x';
import o from '../../animations/o';
import restartIcon from '../../restart-icon.png';
import './style.scss';


const {
  CPU_TURN, USER_TURN, LOSE, WIN,
} = constants;

const initialGameState = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const serverUrl = '/api';

const getEndGameText = (gameStatus) => {
  if (gameStatus === WIN) {
    return 'YOU WON!';
  }
  if (gameStatus === LOSE) {
    return 'YOU LOST!';
  }
  return 'Tic Tac Toe';
};

const getAnimation = (box) => {
  if(box === 'X') {
    return x;
  }
  if(box === 'O') {
    return o;
  }
  return ''
}

const GameTable = ({
  gamePoints, setGamePoints, setGameStatus, gameStatus, setTurnCount, turnCount
}) => (
    gamePoints.map((row, index) => (
      <div key={index} className="row-wrapper">
        {row.map((box, boxIndex) => (
          <div onClick={() => play([index, boxIndex], gamePoints, setGamePoints, setGameStatus, gameStatus, setTurnCount, turnCount)} key={boxIndex} className="game-box">
            <LottieControl
                animationData={getAnimation(box)}
                width={'80%'}
                height={'80%'}
              />
          </div>
        ))}
      </div>
    ))
  );

const restartGame = (setGamePoints, setGameStatus, endGame, setTurnCount ) => {
  setGamePoints(initialGameState);
  setTurnCount(1);
  endGame(false);
  setGameStatus(USER_TURN);
};  

const App = () => {
  const [gamePoints, setGamePoints] = useState(initialGameState);
  const [gameStatus, setGameStatus] = useState(USER_TURN);
  const [isGameFinished, endGame] = useState(false);
  const [turnCount, setTurnCount] = useState(1);

  useEffect(() => {
    if (gameStatus === CPU_TURN) {
      axios.post(`${serverUrl}/play`,
        { gamePoints }).then((res) => {
          setGamePoints(res.data);
          setTurnCount(turnCount + 1);
          const result = checkWinner(res.data);
          if (result) {
            setGameStatus(LOSE);
          } else {
            setGameStatus(USER_TURN);
          }
        });
    }

    if(gameStatus === WIN || gameStatus === LOSE || turnCount === 10) {
      endGame(true);
    }
  }, [gameStatus]);
  return (
    <div id="app-container">
      <div id="game-result">{getEndGameText(gameStatus)}</div>
      <div id="game-container">
        <GameTable
          gamePoints={gamePoints}
          setGamePoints={setGamePoints}
          setGameStatus={setGameStatus}
          gameStatus={gameStatus}
          setTurnCount={setTurnCount}
          turnCount={turnCount}
        />
      </div>
    { isGameFinished && 
    <div onClick={()=> restartGame(setGamePoints, setGameStatus, endGame, setTurnCount)} id="restart-container">
     RESTART
     <img src = {restartIcon} />
    </div>
   }
    </div>
  );
};

export default App;
