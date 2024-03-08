MyGame.states.main = function(graphics) {

  function render() {
    const canvasContainer = document.getElementById("game");

    let centerButtons = document.createElement('div');
    centerButtons.setAttribute('class', 'button-container');

    makeButton('start', 'Start game', centerButtons);
    makeButton('scores', 'High Scores', centerButtons);
    makeButton('controls', 'Controls', centerButtons);
    makeButton('credits', 'Credits', centerButtons);

    canvasContainer.appendChild(centerButtons);
  }

  function makeButton(id, text, parent) {
    let button = document.createElement('button');

    button.setAttribute('id', id);
    button.setAttribute('class', 'mdc-button mdc-button--raised button');
    button.innerHTML = text;
    parent.appendChild(button);
  }


  let api = {
    render: render
  }

  return api;
}