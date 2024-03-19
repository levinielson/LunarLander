MyGame.states.controls = function() {
  const container = document.getElementById('container');

  function render() {
    let names = MyGame.keyboard.getKeys();
    
    if (container.children.length < 2) {
      let help = document.createElement('div');
      help.className = "text";
      help.innerHTML = "To change the inputs, click one of the buttons and then press the key you want";
      container.appendChild(help);

      let back = document.createElement('div');
      back.className = 'back';
      back.innerHTML = 'BACK';
      back.addEventListener('click', () => {
        destroy();
        MyGame.state = MyGame.states.main();
      });
      container.appendChild(back);
      for (let name in names) {
        makeButton(names[name], name, container);
      }
    }
    else {
      for (let name in names) {
        updateButton(names[name], name);
      }
    }
  }

  function changeInputWithParams(e, input, name) {
    MyGame.keyboard.unregisterCommand(input, e.key, name);
  }
  
  function makeButton(input, action, parent) {
    let button = document.createElement('button');
    button.className = "mdc-button mdc-button--raised button";
    button.id = action;
    button.innerHTML = `${input}: ${action}`;
    function changeInput(e) {
      changeInputWithParams(e, input, action);
      window.removeEventListener('keydown', changeInput);
    }
    button.addEventListener('click', () => {
      window.addEventListener('keydown', changeInput);
    });

    parent.appendChild(button);
  }

  function updateButton(input, action) {
    document.getElementById(action).innerHTML = `${input}: ${action}`;
  }

  function destroy() {
    let children = [...container.children];
    for (let child of children) {
      if (child.nodeName != "CANVAS") {
        container.removeChild(child);
      }
    }
  }

  let api = {
    render: render,
    pauseGame: true
  };

  return api;
}