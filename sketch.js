var resolution = 10;
var columns;
var rows;
var field = new Array(columns);
var noiseField;
var zOffset = 0;

function setup() {
  createCanvas(1000, 500);
  colorMode(HSB, 100);
  columns = 1 + width / resolution;
  rows = 1 + height / resolution;
  noiseField = new OpenSimplexNoise(Date.now());

  for (var i = 0; i < columns; i += 1) {
    field[i] = new Array(rows);
    for (var j = 0; j < rows; j += 1) {
      field[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  var xOffset = 0;
  for (var i = 0; i < columns; i += 1) {
    xOffset += 0.1;
    var yOffset = 0;
    for (var j = 0; j < rows; j += 1) {
      yOffset += 0.15;
      field[i][j] = float(noiseField.noise3D(xOffset, yOffset, zOffset));
    }
  }
  zOffset += 0.008;

  for (var i = 0; i < columns; i += 1) {
    for (var j = 0; j < rows; j += 1) {
      var saturation = map(field[i][j], 0, 1, 72, 100);
      var brightness = map(field[i][j], 0, 1, 70, 100);
      noStroke();
      fill(90, saturation, brightness);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }

  for (var i = 0; i < columns - 1; i += 1) {
    for (var j = 0; j < rows - 1; j += 1) {
      var x = i * resolution;
      var y = j * resolution;
      var a = createVector(x + resolution * 0.5, y);
      var b = createVector(x + resolution, y + resolution * 0.5);
      var c = createVector(x + resolution * 0.5, y + resolution);
      var d = createVector(x, y + resolution * 0.5);
      var state = getState(ceil(field[i][j]), ceil(field[i + 1][j]), ceil(field[i + 1][j + 1]), ceil(field[i][j + 1]));
      stroke(30, 70, 100);
      strokeWeight(5);
      drawContour(state, a, b, c, d);
    }
  }
}

function drawContour(state, a, b, c, d) {
  switch (state) {
    case 1:
      quickLine(c, d);
      break;
    case 2:
      quickLine(b, c);
      break;
    case 3:
      quickLine(b, d);
      break;
    case 4:
      quickLine(a, b);
      break;
    case 5:
      quickLine(b, c);
      quickLine(a, d);
      break;
    case 6:
      quickLine(a, c);
      break;
    case 7:
      quickLine(a, d);
      break;
    case 8:
      quickLine(a, d);
      break;
    case 9:
      quickLine(a, c);
      break;
    case 10:
      quickLine(a, b);
      quickLine(c, d);
      break;
    case 11:
      quickLine(a, b);
      break;
    case 12:
      quickLine(b, d);
      break;
    case 13:
      quickLine(b, c);
      break;
    case 14:
      quickLine(c, d);
      break;
    default:
      break;
  }
}

function quickLine(a, b) {
  line(a.x, a.y, b.x, b.y);
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}
