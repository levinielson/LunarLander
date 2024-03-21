MyGame.persistence = (function () {
  let highScores = {};
  let previousScores = localStorage.getItem('MyGame.highScores');

  if (previousScores !== null) {
    highScores = JSON.parse(previousScores);
  }

  if (!highScores["scores"]) {
    highScores["scores"] = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
  }

  function initialize() {
    if (!highScores["keys"]) {
      highScores["keys"] = {
        "Rotate Left": "ArrowLeft",
        "Rotate Right": "ArrowRight",
        "Thrusters": "ArrowUp"
      };
    }
  }

  function addScore(value) {
    let currentValue = value;
    let added = false;
    let scores = highScores["scores"]
    if (Object.keys(scores).length == 0) {
      scores[1] = value;
      added = true;
    }
    for (let i = 1; i < 6; i++) {
      if (scores[i] && scores[i] < currentValue) {
        temp = currentValue;
        currentValue = scores[i];
        scores[i] = temp;
        added = true;
      }
      if (!scores[i] && !added) {
        scores[i] = currentValue;
        added = true;
      }
    }
    highScores["scores"] = scores;
    localStorage['MyGame.highScores'] = JSON.stringify(highScores);
  }

  function addKey(key, value) {
    let keys = highScores["keys"];
    keys[key] = value;
    highScores["keys"] = keys;
    localStorage["MyGame.highScores"] = JSON.stringify(highScores);
  }

  function remove(key) {
    delete highScores[key];
    localStorage['MyGame.highScores'] = JSON.stringify(highScores);
  }

  return {
    addScore: addScore,
    addKey: addKey,
    remove: remove,
    initialize: initialize,
    get highScores() { return highScores["scores"]; },
    get keys() { return highScores["keys"]; }
  };
}());