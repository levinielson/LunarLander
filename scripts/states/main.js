MyGame.states.main = function(graphics) {

  function render() {
    const centerButtons = document.getElementById("container");

    if (centerButtons.children.length < 2) {
      makeButton('start', 'Start game', MyGame.states.game, centerButtons);
      makeButton('scores', 'High Scores', MyGame.states.credits, centerButtons);
      makeButton('controls', 'Controls', MyGame.states.controls, centerButtons);
      makeButton('credits', 'Credits', MyGame.states.credits, centerButtons);
    }
  }

  function makeButton(id, text, state, parent) {
    let button = document.createElement('button');

    button.setAttribute('id', id);
    button.setAttribute('class', 'mdc-button mdc-button--raised button');
    button.innerHTML = text;
    button.addEventListener('click', () => {
      MyGame.state = state(graphics);
      destroy();
      console.log(MyGame.state);
    })
    parent.appendChild(button);
  }

  function destroy() {
    let container = document.getElementById("container");
    let children = [...container.children];
    for (let child of children) {
      if (child.nodeName != "CANVAS") {
        container.removeChild(child);
      }
    }
  }

  let api = {
    render: render,
    destroy: destroy,
    pauseGame: true
  }

  return api;
}