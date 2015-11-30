/* DEMO */

/* McCarthy evaluation */
var time = performance || Date;

/* commom Drone constructor */
var Drone = function() {
  this.createCanvas();
  this.createObjects();
  this.initSpeedInput();
  // this.addListeners();

  this.frames = new Frames(function() {
    this.moveObjects();
    this.clearCanvas();
    this.renderGraphics();
    this.renderFrameRate();
  }.bind(this));
};

Drone.prototype = {
  // addListeners: function() {
    /* make this responsive to samll screens */
    // window.addEventListener('resize', this.moveCannon.bind(this));
  // },

  createCanvas: function() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 642;
    this.canvas.height = 550;
    this.canvas.ctx = this.canvas.getContext('2d');
    document.getElementById('droneCanvas').appendChild(this.canvas);
  },

  createObjects: function() {
    /* create drone */
    this.drone = {
      altitude: 0,
      img: document.createElement('img'),
      x: 292,
      y: 451,
      height: 64,
      width: 56,
      initY: 454,
      speed: 0 /* pixels per second */
    };
    this.drone.img.src = 'https://d30y9cdsu7xlg0.cloudfront.net/png/103844-200.png';

    /* create background */
    // .......
    // ......
  
    /* update init X, Y based on screen size */
    // ......
    // ......

    /* setup framerate display and height display */
    this.framerateDisplay = document.getElementById('framerate');
    this.framerateDisplay.timer = 0;
    this.altitudeDisplay = document.getElementById('altitude');
  },

  initSpeedInput: function() {
    var updateSpeed = function() {
      this.drone.speed = this.speedInput.value;
    }.bind(this);

    this.speedInput = document.getElementById('speedInput');
    this.speedInput.value = this.drone.speed;
    this.speedInput.addEventListener('keyup', updateSpeed);
    this.speedInput.addEventListener('keyup', updateSpeed);
  },

  /* move background based on screen size */
  // ......
  // ......
  
  /* below is the frams thingy*/
  clearCanvas: function() {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  
  moveObjects: function() {

    /* move drone's y position */
    var delta = this.frames.delta;
    var velocity = this.drone.speed * delta;
    this.drone.y = this.drone.y - velocity;
    
    /* log the altitude: this should be move to somewhere else,
     * but it is good enough for right now*/
    this.drone.altitude += velocity;
    console.log('this.delta', this.drone.altitude);
    this.altitudeDisplay.innerHTML = Math.round(this.drone.altitude);

    /* reset when off screen */
    if (this.drone.x < - this.drone.height) {
      document.getElementById("droneCanvas").style.background = "blue";
      this.drone.y = this.drone.initY;
    }
  },
  
  renderFrameRate: function() {
    /* Render Framerate every 1/4 second */
    if(this.framerateDisplay.timer > 1) {
      /* round to whole pixel */
      this.framerateDisplay.innerHTML = (1 / this.frames.delta) | 0;
      this.framerateDisplay.timer = 0;
    }
    else {
      this.framerateDisplay.timer += this.frames.delta;
    }
  },

  renderGraphics: function() {
    /* round to whole pixel */
    var wholePixelDroneY = (this.drone.y + 0.5) | 0;
    this.canvas.ctx.drawImage(this.drone.img, this.drone.x, 
        wholePixelDroneY, this.drone.width, this.drone.height);
  }
};

var Frames = function(callback) {
  this.callback = callback;
  this.then = time.now();
};

Frames.prototype = {
  pause: function() {
    window.cancelAnimationFrame(this.animationFrame);
    this.isRunning = false;
  },

  play: function() {
    if(!this.isRunning) {
      this.then = time.now();
      this.frame();
      this.isRunning = true;
    }
  },
  
  restart: function() {
     /* good enough for demo right now :) */
     location.reload();
  },

  frame: function(timestamp) {
    var frame = this.frame.bind(this);
    this.setDelta(timestamp);
    this.callback();
    this.animationFrame = window.requestAnimationFrame(frame);
  },

  setDelta: function(timestamp) {
    this.now = timestamp || time.now();
    /* seconds since last frame */
    this.delta = (this.now - this.then) / 1000;
    this.then = this.now;
  },
};

var animation = new Drone();
animation.frames.play();
