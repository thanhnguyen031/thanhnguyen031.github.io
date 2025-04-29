// Class for floating background stars
class FloatingStar {
    constructor() {
      this.x = random(width);
      this.y = random(height);
      this.size = random(10, 20);
      this.speed = random(0.5, 2);
      this.color = color(random(255), random(255), random(255), 150); // Semi-transparent
    }
  
    move() {
      this.y -= this.speed;
      if (this.y < -this.size) {
        this.y = height + this.size;
        this.x = random(width);
      }
    }
  
    display() {
      push();
      translate(this.x, this.y);
      fill(this.color);
      noStroke();
      this.drawStar(0, 0, this.size / 2, this.size, 5);
      pop();
    }
  
    // Function to draw a 5-point star
    drawStar(x, y, radius1, radius2, npoints) {
      let angle = TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      beginShape();
      for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
  }
  
  let tColor, nColor;
  let tSize = 150;
  let nSize = 150;
  let growing = true;
  let stars = [];
  
  function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas-container');
    tColor = color(0, 102, 153);
    nColor = color(153, 0, 102);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
  
    // Create background floating stars
    for (let i = 0; i < 30; i++) {
      stars.push(new FloatingStar());
    }
  }
  
  function draw() {
    background(220, 220, 240); // Soft background color
  
    // Draw floating stars behind letters
    for (let star of stars) {
      star.move();
      star.display();
    }
  
    // Animate size
    if (growing) {
      tSize += 0.5;
      nSize += 0.5;
      if (tSize > 160) growing = false;
    } else {
      tSize -= 0.5;
      nSize -= 0.5;
      if (tSize < 140) growing = true;
    }
  
    // Animate colors slightly
    tColor = lerpColor(tColor, color(random(255), random(255), random(255)), 0.01);
    nColor = lerpColor(nColor, color(random(255), random(255), random(255)), 0.01);
  
    // Draw 'T'
    fill(tColor);
    textSize(tSize);
    text('T', width / 2 - 80, height / 2);
  
    // Draw 'N'
    fill(nColor);
    textSize(nSize);
    text('N', width / 2 + 80, height / 2);
  }
  
  function mousePressed() {
    // Big jump when clicked
    tSize += 20;
    nSize += 20;
  
    // Instant new colors
    tColor = color(random(255), random(255), random(255));
    nColor = color(random(255), random(255), random(255));
  
    // Add new stars randomly when clicked
    for (let i = 0; i < 5; i++) {
      stars.push(new FloatingStar());
    }
  }
  