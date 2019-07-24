const express = require('express');

const router = express.Router();

const checkForAvailablePoints = (flatGamePoints) => {
  const arr = [];
  flatGamePoints.forEach((point, index) => {
    if (!point) {
      arr.push(index);
    }
  });
  return arr;
};

const convertBackToMatrix = flatGamePoints => (
  flatGamePoints.reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key])
    : rows[rows.length - 1].push(key)) && rows, [])
);

const catcher = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    res.status(e.code).send({ msg: e.msg });
  }
};

router.get('/', catcher((req, res) => {
  res.json({ success: true });
}));

router.post('/play', catcher((req, res) => {
  const { gamePoints } = req.body;
  const flatGamePoints = gamePoints.toString().split(',');
  const availablePoints = checkForAvailablePoints(flatGamePoints);
  const selectedPointIndex = Math.floor(Math.random() * (availablePoints.length - 1));
  const selectedPoint = availablePoints[selectedPointIndex];
  flatGamePoints[selectedPoint] = 'O';
  const result = convertBackToMatrix(flatGamePoints);
  res.json(result);
}));

module.exports = router;
