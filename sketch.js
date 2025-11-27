// Variabel Global
let state = 'menu';
const c = 299792458;
let v = 0, gamma = 1, t0 = 10, t = 10, L0 = 100, L = 100;
let stars = [];
let rocketX = 0;

function setup() {
  createCanvas(900, 650);
  textFont('Arial');
  for (let i = 0; i < 150; i++) {
    stars.push({x: random(width), y: random(height), size: random(1, 3), speed: random(0.5, 2)});
  }
}

function draw() { 
  background(10, 10, 30);
  
  // Bintang bergerak
  for (let star of stars) {
    fill(255, 255, 255, random(150, 255));
    noStroke();
    circle(star.x, star.y, star.size);
    star.x -= star.speed * (1 + v * 2);
    if (star.x < 0) {
      star.x = width;
      star.y = random(height);
    }
  }
  
  if (state === 'menu') menu();
  else if (state === 'simulasi') simulasi();
}

// ===== MENU =====
function menu() {
  fill(100, 200, 255);
  textSize(52);
  textAlign(CENTER, CENTER);
  text('🚀 RELATIVITAS KHUSUS', width/2, 100);
  
  fill(200, 220, 255);
  textSize(22);
  text('Time Dilation & Length Contraction', width/2, 150);
  
  fill(20, 30, 60, 240);
  stroke(100, 150, 255);
  strokeWeight(3);
  rect(70, 200, width - 140, 240, 12);
  
  noStroke();
  fill(255, 255, 100);
  textSize(22);
  textAlign(LEFT);
  text('📚 Konsep Fisika Kelas 12:', 100, 240);
  
  fill(220, 220, 255);
  textSize(17);
  text('• Dilatasi Waktu: t = γ·t₀', 110, 280);
  text('   Waktu melambat pada objek cepat', 110, 305);
  text('• Kontraksi Panjang: L = L₀/γ', 110, 340);
  text('   Panjang menyusut searah gerak', 110, 365);
  text('• Faktor Lorentz: γ = 1/√(1-v²/c²)', 110, 400);
  
  btn(width/2 - 100, 480, 200, 65, '🔬 SIMULASI', color(60, 150, 255));
  
  fill(150, 150, 200);
  textSize(13);
  textAlign(CENTER);
  text('Fisika SMA Kelas 12 - Einstein 1905', width/2, height - 15);
}

// ===== SIMULASI =====
function simulasi() {
  fill(255);
  textSize(28);
  textAlign(CENTER, CENTER);
  text('🔬 Simulasi Interaktif', width/2, 40);
  
  fill(20, 30, 60, 240);
  stroke(100, 150, 255);
  strokeWeight(3);
  rect(25, 65, width - 50, 85, 10);
  
  noStroke();
  fill(255, 200, 100);
  textSize(16);
  textAlign(LEFT);
  text('⚡ Kecepatan Roket:', 45, 90);
  
  fill(50, 50, 80);
  rect(45, 105, width - 90, 15, 7);
  
  if (mouseIsPressed && mouseY > 100 && mouseY < 125 && mouseX > 45 && mouseX < width - 45) {
    v = constrain(map(mouseX, 45, width - 45, 0, 0.99), 0, 0.99);
  }
  
  fill(100, 200, 255);
  rect(45, 105, map(v, 0, 0.99, 0, width - 90), 15, 7);
  fill(255);
  circle(map(v, 0, 0.99, 45, width - 45), 112.5, 20);
  
  fill(255, 255, 100);
  textSize(14);
  textAlign(CENTER);
  text((v * 100).toFixed(1) + '% c', width/2, 135);
  
  gamma = 1 / sqrt(1 - v * v);
  t = gamma * t0;
  L = L0 / gamma;
  
  fill(20, 30, 60, 240);
  stroke(255, 150, 150);
  strokeWeight(3);
  rect(25, 165, (width - 60) / 2, 115, 10);
  
  noStroke();
  fill(255, 150, 150);
  textSize(18);
  text('⏱️ DILATASI WAKTU', 25 + (width - 60) / 4, 190);
  
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text('γ = ' + gamma.toFixed(3), 45, 220);
  text('Waktu Roket: ' + t0 + ' jam', 45, 245);
  fill(255, 100, 100);
  text('Waktu Bumi: ' + t.toFixed(2) + ' jam', 45, 265);
  
  fill(20, 30, 60, 240);
  stroke(150, 255, 150);
  strokeWeight(3);
  rect(width/2 + 5, 165, (width - 60) / 2, 115, 10);
  
  noStroke();
  fill(150, 255, 150);
  textSize(18);
  textAlign(CENTER);
  text('📏 KONTRAKSI PANJANG', width/2 + 5 + (width - 60) / 4, 190);
  
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text('L₀ = ' + L0 + ' m', width/2 + 25, 220);
  fill(255, 100, 100);
  text('L = ' + L.toFixed(2) + ' m', width/2 + 25, 245);
  fill(255, 255, 100);
  text('Rasio: ' + ((L/L0) * 100).toFixed(1) + '%', width/2 + 25, 265);
  
  fill(10, 10, 30, 250);
  stroke(100, 150, 255);
  strokeWeight(3);
  rect(25, 295, width - 50, 285, 10);
  
  noStroke();
  fill(255, 200, 100);
  textSize(17);
  textAlign(CENTER);
  text('🌌 Visualisasi', width/2, 320);
  
  fill(150, 150, 200);
  textSize(13);
  text('Roket Diam (L₀ = ' + L0 + ' m)', width/2, 355);
  roketStatis(width/2, 380, L0, color(100, 100, 200, 180));
  
  fill(255, 150, 150);
  text('Roket Bergerak (L = ' + L.toFixed(1) + ' m)', width/2, 430);
  
  rocketX += v * 3;
  if (rocketX > width + 100) rocketX = -100;
  
  roketBergerak(rocketX, 455, L, color(255, 100, 100));
  
  jam(130, 530, 32, t0, 'Roket', color(100, 255, 100));
  jam(width - 130, 530, 32, t, 'Bumi', color(255, 100, 100));
  
  btn(25, 595, 100, 35, 'Reset', color(200, 80, 80));
  btn(width - 125, 595, 100, 35, '← Menu', color(100, 100, 150));
}

function btn(x, y, w, h, txt, col) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  fill(hover ? color(col.levels[0] + 40, col.levels[1] + 40, col.levels[2] + 40) : col);
  cursor(hover ? HAND : ARROW);
  stroke(255);
  strokeWeight(3);
  rect(x, y, w, h, 10);
  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(txt, x + w/2, y + h/2);
}

function roketStatis(x, y, col) {
  push(); 
  translate(x, y);
  fill(col);
  stroke(255);
  strokeWeight(2);
  rect(-50, -13, 100, 26, 5);
  triangle(50, -13, 50, 13, 67, 0);
  fill(100, 200, 255);
  circle(0, 0, 11);
  fill(col);
  triangle(-50, -13, -60, -22, -50, -2);
  triangle(-50, 13, -60, 22, -50, 2);
  pop();
}


function roketBergerak(x, y, len, col) {  //len ukuran roket yang terlihat  //lo panjang roket diam
  fill(col);
  push();
  translate(x, y);
  let s = len / L0;   
  fill(col);
  stroke(255);
  strokeWeight(2);
  rect(-50 * s, -13, 100 * s, 26, 5);
  triangle(50 * s, -13, 50 * s, 13, 67 * s, 0);
  fill(100, 200, 255);
  circle(0, 0, 11);
  fill(col);
  triangle(-50 * s, -13, -60 * s, -22, -50 * s, -2);
  triangle(-50 * s, 13, -60 * s, 22, -50 * s, 2);
  
  if (v > 0.02) {
    fill(255, 200, 0, 220);
    noStroke();
    triangle(-50 * s, -7, -50 * s, 7, -67 * s - v * 25, 0);
    fill(255, 100, 0, 180);
    triangle(-50 * s, -4, -50 * s, 4, -60 * s - v * 18, 0);
  }
  pop();
}

function jam(x, y, r, waktu, lbl, col) {
  fill(20, 20, 40);     //background jam
  stroke(col);
  strokeWeight(3);
  circle(x, y, r * 2);
  noStroke();
  fill(col);
  for (let i = 0; i < 12; i++) {    //titik jam
    let a = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
    circle(x + cos(a) * (r - 4), y + sin(a) * (r - 4), 3);
  }
  let a = map(waktu % 12, 0, 12, 0, TWO_PI) - HALF_PI; //sudut jam
  stroke(col);  //jarum
  strokeWeight(3);

  line(x, y, x + cos(a) * (r - 10), y + sin(a) * (r - 10)); //jarum jam

  noStroke();
  fill(col);
  circle(x, y, 6); //titik tengah jam

  fill(255);
  textSize(11);
  textAlign(CENTER, CENTER); //posisi teks
  text(lbl, x, y + r + 13);
  text(waktu.toFixed(1) + 'h', x, y + r + 26); //angka waktu  
}

function mousePressed() {
  if (state === 'menu') {
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > 480 && mouseY < 545) {
      state = 'simulasi';
      rocketX = 0;
    }
  } else if (state === 'simulasi') {
    if (mouseX > 25 && mouseX < 125 && mouseY > 595 && mouseY < 630) {
      v = 0;
      rocketX = 0;
    } else if (mouseX > width - 125 && mouseX < width - 25 && mouseY > 595 && mouseY < 630) {
      state = 'menu';
    }
  }
}