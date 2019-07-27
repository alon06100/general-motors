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
import './style.scss';


const {
  CPU_TURN, USER_TURN, LOSE, WIN,
} = constants;

const serverUrl = '/api';

const getEndGameText = (gameStatus) => {
  if (gameStatus === WIN) {
    return 'YOU WON!';
  }
  if (gameStatus === LOSE) {
    return 'YOU LOST!';
  }
  return '';
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
  gamePoints, setGamePoints, setGameStatus, gameStatus,
}) => (
    gamePoints.map((row, index) => (
      <div key={index} className="row-wrapper">
        {row.map((box, boxIndex) => (
          <div onClick={() => play([index, boxIndex], gamePoints, setGamePoints, setGameStatus, gameStatus)} key={boxIndex} className="game-box">
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

const App = () => {
  const [gamePoints, setGamePoints] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [gameStatus, setGameStatus] = useState(USER_TURN);

  useEffect(() => {
    console.log(x)
    if (gameStatus === CPU_TURN) {
      axios.post(`${serverUrl}/play`,
        { gamePoints }).then((res) => {
          setGamePoints(res.data);
          const result = checkWinner(res.data);
          if (result) {
            setGameStatus(LOSE);
          } else {
            setGameStatus(USER_TURN);
          }
        });
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
        />
      </div>
    </div>
  );
};

export default App;
