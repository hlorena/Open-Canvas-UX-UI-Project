const myCanvas = document.querySelector("canvas");

function _(selector) {
  return document.querySelector(selector);
}

//Variables:
//creative prompt
var words = ["Song", "Scenery", "Dance", "Memory", "Film", "Emotion", "Season"];
var prompts = ["Draw a favourite:", "Draw a memorable:", "Draw a vivid:"];

//timer animation
var gif;

//background music
var soundtrack;
var playbutton;
var stopbutton;

function preload() {
  //timer
  gif = createImg("images/timer.gif");

  //background music
  soundtrack = loadSound('media/RagtimeGetdown.mp3');
}

function setup() {
  var canvas = createCanvas(800, 550);
  canvas.parent('canvas');
  background(255);
  console.log('setup has run');

  //creative prompt
  textFont("Arial", 20);
  noLoop();
  var randomword = random(prompts); //pick a random word!
  text(randomword, 50, 50);
  //word
  fill(155, 205, 217);
  var randomword = random(words); //pick a random word!
  fill(201, 123, 174);
  text(randomword, 50, 80);

  //save Canvas
  saveImageBtn = createButton("Save Canvas");
  saveImageBtn.position(80, 160);
  saveImageBtn.mousePressed(saveAsCanvas);

  //background music
  // loop sound
  soundtrack.loop();

  // stops the sound to prevent it from automatically playing
  soundtrack.stop();

  // play button
  playbutton = createButton('Play Music');
  playbutton.position(80, 250);
  playbutton.mousePressed(playsound);

  // stop button
  stopbutton = createButton('Stop Music');
  stopbutton.position(260, 250);
  stopbutton.mousePressed(stopsound);
}

function draw() {
  //loop function enables the pencil tool to work
  loop();
  //timer animation
  gif.position(50, 570);
  gif.size(300, 311);
}

function mouseDragged() {
  //Pen Types
  let brushtype = _("#pen-pencil").checked ? "pencil" : "brush";
  let size = parseInt(_("#tool-size").value);
  let color = _("#tool-color").value;
  fill(color);
  stroke(color);
  //pen types
  if (brushtype == "pencil") {
    line(pmouseX, pmouseY, mouseX, mouseY);
  } else {
    //rainbow brushtool
    colorMode(HSB);
    noStroke();
    fill((8 * frameCount) % 360, 100, 100);
    //stroke was removed to get rid of the outline around the ellipse
    ellipse(mouseX, mouseY, size, size);
  }
}

//Stamp Types
function mousePressed() {
  let shapetype = _("#shape-square").checked ? "square" : "circle";
  let size = parseInt(_("#tool-size").value);
  let color = _("#tool-color").value;
  fill(color);
  //pen types
  if (shapetype == "square") {
    stroke(0);
    strokeWeight(3);
    square(mouseX, mouseY, size);
  } else {
    stroke(0);
    strokeWeight(3);
    ellipse(mouseX, mouseY, size, size);
  }
}

//Actions
//save canvas as png file
function saveAsCanvas() {
  save("OpenCanvas_artwork.png");
}

//Clears the canvas and initialises a new creative prompt
function keyPressed() {
  if (keyCode === BACKSPACE)
    background(255);
  noStroke();
  textFont("Arial", 20);
  fill(236, 143, 204);
  noLoop();
  fill(0);
  var randomword = random(prompts); //pick a random word!
  text(randomword, 50, 50);
  //word
  var randomword = random(words); //pick a random word!
  fill(236, 143, 204);
  text(randomword, 50, 80);
  //canvas random colour personalisation and memorability tool
  if (keyCode === TAB)
    background(random(255), random(255), random(255));
}

//Background music
function playsound() {
  if (soundtrack.isPlaying() == false) {
    soundtrack.play();
  }
}

function stopsound() {
  if (soundtrack.isPlaying() == true) {
    soundtrack.pause();
  }
}
