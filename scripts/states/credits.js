MyGame.states.credits = function(graphics) {

  const container = document.getElementById('container');

  function render() {
    if (container.children.length < 2) {
      let credits = document.createElement('div');
      credits.className = 'text';
      credits.innerHTML = 'Creator: Levi Nielson';
      container.appendChild(credits);

      let back = document.createElement('div');
      back.className = 'back';
      back.innerHTML = 'BACK';
      back.addEventListener('click', () => {
        destroy();
        MyGame.state = MyGame.states.main();
      });
      container.appendChild(back);
    }
  }

  function destroy() {
    let children = [...container.children]
    for (let child of children) {
      if (child.nodeName != "CANVAS") {
        container.removeChild(child);
      }
    }
  }

  let api = {
    render: render,
    pauseGame: true
  }

  return api;
}