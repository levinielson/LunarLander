MyGame.states.highScores = function(graphics) {

  let scores = MyGame.persistence.highScores;

  function update() {
    const centerButtons = document.getElementById("container");

    if (centerButtons.children.length < 2) {
      for (let key in scores) {
        makeDiv(key, Math.round(scores[key]), centerButtons);
      }

      let back = document.createElement('div');
      back.className = 'back';
      back.innerHTML = 'BACK';
      back.addEventListener('click', () => {
        destroy();
        MyGame.state = MyGame.states.main(graphics);
      });
      container.appendChild(back);
    }
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

  function makeDiv(id, text, parent) {
    let div = document.createElement('div');

    div.setAttribute('id', id);
    div.setAttribute('class', 'text');
    div.innerHTML = `${parseInt(id)}. ${text}`;
    
    if (parseInt(text) !== 0) {
      parent.appendChild(div);
    }
  }

  function render() {

  }

  return {
    update: update,
    destroy: destroy,
    render: render,
    pauseGame: true
  }
}