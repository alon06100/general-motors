const checkWinner = (gamePoints) => {
  // check row
  for (let i = 0; i < 3; i += 1) {
    if (gamePoints[i][0] !== '' && gamePoints[i][0] === gamePoints[i][1]
      && gamePoints[i][0] === gamePoints[i][2]) return gamePoints[i][0];
  }
  // check column
  for (let i = 0; i < 3; i += 1) {
    if (gamePoints[0][i] !== '' && gamePoints[0][i] === gamePoints[1][i]
      && gamePoints[0][i] === gamePoints[2][i]) return gamePoints[0][i];
  }
  // check diagonal
  if (gamePoints[0][0] !== '' && gamePoints[0][0] === gamePoints[1][1]
    && gamePoints[1][1] === gamePoints[2][2]) { return gamePoints[0][0]; }

  if (gamePoints[0][2] !== '' && gamePoints[0][2] === gamePoints[1][1]
    && gamePoints[1][1] === gamePoints[2][0]) { return gamePoints[0][2]; }

  return '';
};

export default checkWinner;
