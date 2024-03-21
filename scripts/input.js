MyGame.input = (function () {
  function Keyboard() {
      let that = {
          keys: {},
          handlers: {},
          names: {},
          userFriendlyKeyNames: {}
      };

      const keyMap = {
        "ArrowLeft": "Left Arrow",
        "ArrowUp": "Up Arrow",
        "ArrowRight": "Right Arrow",
        "ArrowDown": "Down Arrow"
      }
      function keyPress(e) {
          that.keys[e.key] = e.timeStamp;
      }
      function keyRelease(e) {
        if (that.handlers[e.key]) {
            that.handlers[e.key](-1);
        }
        delete that.keys[e.key];
      }

      that.registerCommand = function(key, name, handler) {
          that.handlers[key] = handler;
          that.names[name] = key in keyMap ? keyMap[key] : key.toUpperCase();;
      }

      that.unregisterCommand = function(oldKey, newKey, name) {
        for (let key in keyMap) {
            if (keyMap[key] === oldKey) {
                oldKey = key;
            }
        }
        that.registerCommand(newKey, name, that.handlers[oldKey]);
        delete that.handlers[oldKey];
      }

      that.getKeys = function() {
        return that.names;
      }

      that.update = function(elapsedTime) {
          for (let key in that.keys) {
              if (that.keys.hasOwnProperty(key)) {
                  if (that.handlers[key]) {
                      that.handlers[key](elapsedTime);
                  }
              }
          }
      };

      window.addEventListener('keydown', keyPress);
      window.addEventListener('keyup', keyRelease);
      
      return that;
  }
  return {
      Keyboard: Keyboard
  };
}());