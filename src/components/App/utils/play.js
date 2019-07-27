/* eslint-disable no-param-reassign */
import produce from 'immer';
import constants from '../../constants';
import checkWinner from './checkWinner';

const {
  CPU_TURN, USER_TURN, WIN,
} = constants;

const play = (position, gamePoints, setPoints, setGameStatus, gameStatus, setTurnCount, turnCount) => {
  console.log(turnCount)
  if (gameStatus === USER_TURN) {
    const userClickedOnEmptyBox = gamePoints[position[0]][position[1]] === '';
    if (userClickedOnEmptyBox) {
      const nextState = produce(gamePoints, (draftState) => {
        draftState[position[0]][position[1]] = 'X';
      });
      setPoints(nextState);
      const result = checkWinner(nextState);
      setTurnCount(turnCount + 1);
      if (result) {
        setGameStatus(WIN);
      } else {
        setGameStatus(CPU_TURN);
      }
    }
  }
};

export default play;
