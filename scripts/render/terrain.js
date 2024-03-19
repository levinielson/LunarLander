MyGame.render.terrain = function(system, graphics) {
  
  function render() {
    graphics.drawLines(system.terrain, 3, "white");
  }

  return {
    render: render
  };
}