// Konstanta
const c = 299792458; // Kecepatan cahaya (m/s)

// Variabel simulasi
let velocity = 0; // Kecepatan (m/s)
let velocityPercent = 0; // Persentase dari c (0-0.99)
let gamma = 1; // Faktor Lorentz
let properTime = 10; // Waktu di roket (jam)
let dilatedTime = 10; // Waktu di Bumi (jam)
let properLength = 100; // Panjang roket diam (m)
let contractedLength = 100; // Panjang roket bergerak (m)

function setup() {
  createCanvas(900, 600);
  textFont('Arial');
}

function draw() {
  background(15, 15, 40);
  
  // Judul
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('🚀 Simulasi Relativitas Khusus', width/2, 40);
  
  // Panel kontrol
  drawControlPanel();
  
  // Hitung efek relativitas
  calculateRelativity();
  
  // Tampilkan hasil perhitungan
  drawResults();
  
  // Visualisasi roket
  drawVisualization();
}

function drawControlPanel() {
  // Box
  fill(30, 30, 60, 200);
  stroke(100, 150, 255);
  strokeWeight(2);
  rect(50, 70, width - 100, 80, 10);
  
  // Label
  noStroke();
  fill(255, 200, 100);
  textSize(18);
  textAlign(LEFT);
  text('Kecepatan Roket:', 70, 95);
  
  // Slider
  fill(60, 60, 90);
  rect(70, 105, width - 140, 15, 5);
  
  // Update kecepatan dengan mouse
  if (mouseIsPressed && mouseY > 100 && mouseY < 125) {
    velocityPercent = map(mouseX, 70, width - 70, 0, 0.99);
    velocityPercent = constrain(velocityPercent, 0, 0.99);
  }
  
  // Slider fill
  fill(100, 200, 255);
  let sliderWidth = map(velocityPercent, 0, 0.99, 0, width - 140);
  rect(70, 105, sliderWidth, 15, 5);
  
  // Handle
  fill(255);
  noStroke();
  let handleX = map(velocityPercent, 0, 0.99, 70, width - 70);
  circle(handleX, 112.5, 20);
  
  // Display nilai
  fill(255, 255, 100);
  textSize(16);
  textAlign(CENTER);
  text((velocityPercent * 100).toFixed(1) + '% c', width/2, 135);
  
  velocity = velocityPercent * c;
  fill(200, 200, 255);
  textSize(14);
  text('v = ' + velocity.toExponential(2) + ' m/s', width/2, 150);
}

function calculateRelativity() {
  // Faktor Lorentz: γ = 1/√(1-v²/c²)
  let vSquared = velocityPercent * velocityPercent;
  gamma = 1 / sqrt(1 - vSquared);
  
  // Dilatasi Waktu: t = γ × t₀
  dilatedTime = gamma * properTime;
  
  // Kontraksi Panjang: L = L₀/γ
  contractedLength = properLength / gamma;
}

function drawResults() {
  // Box Dilatasi Waktu
  fill(30, 30, 60, 200);
  stroke(255, 150, 150);
  strokeWeight(2);
  rect(50, 180, (width - 120) / 2, 140, 10);
  
  noStroke();
  fill(255, 150, 150);
  textSize(20);
  textAlign(CENTER);
  text('⏱️ Dilatasi Waktu', 50 + (width - 120) / 4, 205);
  
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text('Faktor Lorentz (γ):', 70, 240);
  fill(255, 255, 100);
  text(gamma.toFixed(4), 280, 240);
  
  fill(255);
  text('Waktu di Roket (t₀):', 70, 270);
  fill(100, 255, 100);
  text(properTime.toFixed(2) + ' jam', 280, 270);
  
  fill(255);
  text('Waktu di Bumi (t):', 70, 300);
  fill(255, 100, 100);
  text(dilatedTime.toFixed(2) + ' jam', 280, 300);
  
  // Box Kontraksi Panjang
  fill(30, 30, 60, 200);
  stroke(150, 255, 150);
  strokeWeight(2);
  rect(width/2 + 10, 180, (width - 120) / 2, 140, 10);
  
  noStroke();
  fill(150, 255, 150);
  textSize(20);
  textAlign(CENTER);
  text('📏 Kontraksi Panjang', width/2 + 10 + (width - 120) / 4, 205);
  
  fill(255);
  textSize(16);
  textAlign(LEFT);
  let offset = width/2 + 30;
  text('Panjang Diam (L₀):', offset, 240);
  fill(100, 255, 100);
  text(properLength + ' m', offset + 210, 240);
  
  fill(255);
  text('Panjang Bergerak (L):', offset, 270);
  fill(255, 100, 100);
  text(contractedLength.toFixed(2) + ' m', offset + 210, 270);
  
  fill(255, 255, 100);
  textSize(14);
  text('Rasio: ' + (contractedLength/properLength * 100).toFixed(1) + '%', offset, 300);
}

function drawVisualization() {
  // Area visualisasi
  fill(10, 10, 30);
  stroke(100, 150, 255);
  strokeWeight(2);
  rect(50, 340, width - 100, 220, 10);
  
  noStroke();
  fill(255, 200, 100);
  textSize(18);
  textAlign(CENTER);
  text('Visualisasi Roket', width/2, 365);
  
  // Roket Diam (referensi)
  fill(150, 150, 200);
  textSize(14);
  text('Roket Diam (L₀ = ' + properLength + ' m)', width/2, 400);
  drawRocket(width/2, 425, properLength, color(100, 100, 200, 150));
  
  // Roket Bergerak (terkontraksi)
  fill(255, 150, 150);
  text('Roket Bergerak (L = ' + contractedLength.toFixed(1) + ' m)', width/2, 480);
  drawRocket(width/2, 505, contractedLength, color(255, 100, 100));
  
  // Info tambahan
  fill(200, 200, 255);
  textSize(12);
  text('Geser slider untuk mengubah kecepatan', width/2, 545);
}

function drawRocket(x, y, length, col) {
  push();
  translate(x, y);
  
  let scale = length / properLength;
  
  // Body roket
  fill(col);
  stroke(255);
  strokeWeight(2);
  rect(-60 * scale, -12, 120 * scale, 24, 5);
  
  // Nose cone
  noStroke();
  triangle(60 * scale, -12, 60 * scale, 12, 80 * scale, 0);
  
  // Window
  fill(100, 200, 255);
  circle(-10 * scale, 0, 10);
  
  // Fin
  fill(col);
  stroke(255);
  strokeWeight(2);
  triangle(-60 * scale, -12, -75 * scale, -20, -60 * scale, 0);
  triangle(-60 * scale, 12, -75 * scale, 20, -60 * scale, 0);
  
  // Flame effect
  if (velocityPercent > 0.1) {
    noStroke();
    fill(255, 200, 0, 200);
    triangle(-60 * scale, -8, -60 * scale, 8, -80 * scale - velocityPercent * 20, 0);
    fill(255, 100, 0, 150);
    triangle(-60 * scale, -5, -60 * scale, 5, -70 * scale - velocityPercent * 15, 0);
  }
  
  pop();
}

// Info di pojok
function mouseMoved() {
  cursor(ARROW);
  if (mouseY > 100 && mouseY < 125 && mouseX > 70 && mouseX < width - 70) {
    cursor(HAND);
  }
}