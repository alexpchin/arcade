(function(){
  var level,
      hole,
      pointer,
      body,
      moves = [],
      go,
      left,
      right,
      up,
      down,
      directions,
      keycode,
      move,

  setup = function(callback){
    level     = 3;
    left      = 37;
    up        = 38;
    right     = 39;
    down      = 40;
    directions = [left, up, down  , right];
    console.log(directions)
    hole     = document.createElement('div');
    pointer  = document.createElement('div');
    body     = document.querySelector("body");

    var width         = 50 * level;
    hole.className    = "hole";
    hole.style.width  = width + "px";
    hole.style.height = width + "px";
    hole.style.marginTop = -(0.5 * width) + "px";
    hole.style.marginLeft = -(0.5 * width) + "px";
    hole.style.left   = (Math.random * 100) + "%";
    body.appendChild(hole);
    
    pointer.className        = "pointer";
    pointer.style.width      = width-10 + "px";
    pointer.style.height     = width-10 + "px";
    pointer.style.marginLeft = 0;
    pointer.style.marginRight = 0;
    pointer.style.marginTop = 0;
    pointer.style.marginBottom = 0;
    body.appendChild(pointer);
    callback();
  },

  go = function(keycode) {
    var newMargin;
    // Opposite
    switch (keycode) {
      case 37:
        direction = "marginLeft";
        newMargin = -parseInt(pointer.style[direction]) + 5; 
        break;
      case 39:
        direction = "marginLeft";
        newMargin = parseInt(pointer.style[direction]) + 5; 
        break;
      case 38:
        direction = "marginTop";
        newMargin = -parseInt(pointer.style[direction]) + 5; 
        break;
      case 40:
        direction = "marginTop";
        newMargin = parseInt(pointer.style[direction]) + 5;
        break;
    }

    return pointer.style[direction] = newMargin + "px";
  },

  bind = function(){
    window.addEventListener("keydown", function(){
      keycode = event.keyCode || event.which;

      if (directions.indexOf(keycode) !== -1){
        move = setTimeout(function(){
          go(keycode)
        }, 200, keycode);
      }
    });

    window.addEventListener("keyup", function(){
      keycode = event.keyCode || event.which;
      if (directions.indexOf(keycode) !== -1) {
        directions.splice(directions.indexOf(keycode), 1);
        console.log(directions);

        var p = pointer.getBoundingClientRect();
        console.log(p.top, p.right, p.bottom, p.left);

        var h = hole.getBoundingClientRect();
        console.log(h.top, h.right, h.bottom, h.left);

      }
    })
  },

  play = function() {
    setup(bind);
  }

window.onload = play;

})()