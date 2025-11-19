// Variabel Global
let state = 'menu';
const c = 299792458;
let v = 0, gamma = 1, t0 = 10, t = 10, L0 = 100, L = 100;

// Quiz
let soal = [
  ['Waktu di roket cepat akan:', ['Cepat', 'Lambat', 'Sama', 'Stop'], 1],
  ['Rumus Lorentz:', ['γ=1/√(1-v²/c²)', 'γ=√(1-v²/c²)', 'γ=v/c', 'γ=c/v'], 0],
  ['Benda cepat terlihat:', ['Panjang', 'Pendek', 'Sama', 'Hilang'], 1],
  ['Penemu Relativitas:', ['Newton', 'Einstein', 'Galileo', 'Hawking'], 1]
];
let no = 0, skor = 0, jawab = false, ans = -1;

function setup() {
  createCanvas(900, 650);
  textFont('Arial');
}

function draw() {
  background(15, 15, 40);
  
  if (state === 'menu') menu();
  else if (state === 'tutorial') tutorial();
  else if (state === 'simulasi') simulasi();
  else if (state === 'quiz') quiz();
}

// ===== MENU =====
function menu() {
  fill(100, 200, 255);
  textSize(48);
  textAlign(CENTER);
  text('🚀 RELATIVITAS KHUSUS', width/2, 80);
  
  fill(200, 220, 255);
  textSize(20);
  text('Time Dilation & Length Contraction', width/2, 120);
  
  box(80, 160, width - 160, 210);
  fill(255, 255, 100);
  textSize(18);
  textAlign(LEFT);
  text('📚 Konsep Fisika Kelas 12:', 110, 190);
  
  fill(220, 220, 255);
  textSize(15);
  text('• Dilatasi Waktu: t = γ·t₀', 120, 220);
  text('• Kontraksi Panjang: L = L₀/γ', 120, 245);
  text('• Faktor Lorentz: γ = 1/√(1-v²/c²)', 120, 270);
  text('• Kecepatan cahaya: c = 299,792,458 m/s', 120, 295);
  text('• Waktu melambat pada objek cepat', 120, 320);
  text('• Panjang menyusut searah gerak', 120, 345);
  
  btn(width/2 - 280, 420, 160, 55, '🔬 SIMULASI', color(60, 150, 255));
  btn(width/2 - 80, 420, 160, 55, '📖 TUTORIAL', color(100, 200, 100));
  btn(width/2 + 120, 420, 160, 55, '🎯 KUIS', color(255, 150, 60));
  
  fill(150, 150, 200);
  textSize(12);
  textAlign(CENTER);
  text('Fisika SMA/SMK Kelas 12 - Einstein 1905', width/2, height - 15);
}

// ===== TUTORIAL =====
function tutorial() {
  fill(255);
  textSize(34);
  textAlign(CENTER);
  text('📖 Tutorial Relativitas', width/2, 50);
  
  box(50, 90, width - 100, 470);
  fill(255, 255, 100);
  textSize(20);
  textAlign(LEFT);
  
  text('1️⃣ Dilatasi Waktu (Time Dilation)', 80, 125);
  fill(220, 220, 255);
  textSize(15);
  text('• Waktu objek bergerak berjalan lebih LAMBAT', 90, 155);
  text('• Rumus: t = γ·t₀ dimana γ = 1/√(1-v²/c²)', 90, 180);
  text('• Contoh: v=0.9c → 1 jam di roket = 2.3 jam di Bumi', 90, 205);
  
  fill(255, 255, 100);
  textSize(20);
  text('2️⃣ Kontraksi Panjang (Length Contraction)', 80, 250);
  fill(220, 220, 255);
  textSize(15);
  text('• Panjang menyusut searah gerak (LEBIH PENDEK)', 90, 280);
  text('• Rumus: L = L₀/γ atau L = L₀·√(1-v²/c²)', 90, 305);
  text('• Contoh: v=0.9c → roket 100m jadi 43.6m', 90, 330);
  
  fill(255, 255, 100);
  textSize(20);
  text('3️⃣ Postulat Einstein (1905)', 80, 375);
  fill(220, 220, 255);
  textSize(15);
  text('• Hukum fisika sama di semua kerangka inersial', 90, 405);
  text('• Kecepatan cahaya SELALU konstan (299,792,458 m/s)', 90, 430);
  text('• Tidak ada yang bisa lebih cepat dari cahaya', 90, 455);
  
  btn(width/2 - 80, 580, 160, 40, '← Kembali', color(100, 100, 150));
}

// ===== SIMULASI =====
function simulasi() {
  fill(255);
  textSize(26);
  textAlign(CENTER);
  text('🔬 Simulasi Interaktif', width/2, 40);
  
  // Kontrol
  box(30, 60, width - 60, 80);
  fill(255, 200, 100);
  textSize(15);
  textAlign(LEFT);
  text('Kecepatan Roket (geser slider):', 50, 85);
  
  // Slider
  fill(60, 60, 90);
  rect(50, 95, width - 100, 12, 5);
  
  if (mouseIsPressed && mouseY > 85 && mouseY < 115 && mouseX > 50 && mouseX < width - 50) {
    v = constrain(map(mouseX, 50, width - 50, 0, 0.99), 0, 0.99);
  }
  
  fill(100, 200, 255);
  rect(50, 95, map(v, 0, 0.99, 0, width - 100), 12, 5);
  fill(255);
  circle(map(v, 0, 0.99, 50, width - 50), 101, 16);
  
  fill(255, 255, 100);
  textSize(13);
  textAlign(CENTER);
  text((v * 100).toFixed(1) + '% c = ' + (v * c).toExponential(2) + ' m/s', width/2, 125);
  
  // Hitung
  gamma = 1 / sqrt(1 - v * v);
  t = gamma * t0;
  L = L0 / gamma;
  
  // Hasil Waktu
  box(30, 155, (width - 70) / 2, 105);
  fill(255, 150, 150);
  textSize(17);
  text('⏱️ DILATASI WAKTU', 30 + (width - 70) / 4, 175);
  fill(255);
  textSize(13);
  textAlign(LEFT);
  text('Faktor γ = ' + gamma.toFixed(3), 50, 200);
  text('Waktu Roket (t₀) = ' + t0 + ' jam', 50, 220);
  fill(255, 100, 100);
  text('Waktu Bumi (t) = ' + t.toFixed(2) + ' jam', 50, 240);
  
  // Hasil Panjang
  box(width/2 + 5, 155, (width - 70) / 2, 105);
  fill(150, 255, 150);
  textSize(17);
  textAlign(CENTER);
  text('📏 KONTRAKSI PANJANG', width/2 + 5 + (width - 70) / 4, 175);
  fill(255);
  textSize(13);
  textAlign(LEFT);
  text('Panjang Diam (L₀) = ' + L0 + ' m', width/2 + 25, 200);
  fill(255, 100, 100);
  text('Panjang Gerak (L) = ' + L.toFixed(2) + ' m', width/2 + 25, 220);
  fill(255, 255, 100);
  text('Persentase = ' + ((L/L0) * 100).toFixed(1) + '%', width/2 + 25, 240);
  
  // Visualisasi
  box(30, 280, width - 60, 300);
  fill(255, 200, 100);
  textSize(16);
  textAlign(CENTER);
  text('Visualisasi Efek Relativistik', width/2, 305);
  
  fill(150, 150, 200);
  textSize(13);
  text('Roket Diam (L₀ = ' + L0 + ' m)', width/2, 335);
  roket(width/2, 360, L0, color(100, 100, 200, 150));
  
  fill(255, 150, 150);
  text('Roket Bergerak (L = ' + L.toFixed(1) + ' m)', width/2, 410);
  roket(width/2, 435, L, color(255, 100, 100));
  
  // Jam
  jam(130, 510, 30, t0, 'Roket', color(100, 255, 100));
  jam(width - 130, 510, 30, t, 'Bumi', color(255, 100, 100));
  
  btn(30, 595, 90, 30, 'Reset', color(200, 80, 80));
  btn(width - 120, 595, 90, 30, '← Menu', color(100, 100, 150));
}

// ===== QUIZ =====
function quiz() {
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text('🎯 Kuis Relativitas', width/2, 50);
  
  fill(255, 255, 100);
  textSize(16);
  text('Soal ' + (no + 1) + ' dari ' + soal.length + ' | Skor: ' + skor, width/2, 80);
  
  if (no < soal.length) {
    let s = soal[no];
    
    box(50, 110, width - 100, 65);
    fill(255);
    textSize(17);
    text(s[0], width/2, 143);
    
    for (let i = 0; i < 4; i++) {
      let y = 195 + i * 65;
      let hover = mouseX > 80 && mouseX < width - 80 && mouseY > y && mouseY < y + 50;
      
      if (jawab) {
        if (i === s[2]) fill(100, 255, 100);
        else if (i === ans) fill(255, 100, 100);
        else fill(40, 40, 80);
      } else {
        fill(hover ? color(80, 120, 200) : color(40, 60, 120));
        if (hover) cursor(HAND);
      }
      
      stroke(100, 150, 255);
      strokeWeight(2);
      rect(80, y, width - 160, 50, 8);
      
      noStroke();
      fill(255);
      textSize(15);
      textAlign(LEFT, CENTER);
      text(String.fromCharCode(65 + i) + '. ' + s[1][i], 105, y + 25);
    }
    
    if (jawab) {
      btn(width/2 - 75, 530, 150, 40, no < soal.length - 1 ? 'Lanjut →' : 'Lihat Hasil', color(60, 150, 255));
    }
  } else {
    box(150, 130, width - 300, 270);
    
    let p = (skor / soal.length) * 100;
    if (p >= 75) {
      fill(100, 255, 100);
      textSize(36);
      text('🎉 HEBAT!', width/2, 180);
    } else if (p >= 50) {
      fill(255, 255, 100);
      textSize(36);
      text('👍 BAGUS!', width/2, 180);
    } else {
      fill(255, 150, 150);
      textSize(36);
      text('📚 BELAJAR LAGI', width/2, 180);
    }
    
    fill(255);
    textSize(26);
    text('Skor Akhir: ' + skor + ' dari ' + soal.length, width/2, 240);
    fill(255, 255, 100);
    textSize(22);
    text('Nilai: ' + p.toFixed(0) + '%', width/2, 280);
    
    fill(200, 200, 255);
    textSize(14);
    text('Terus semangat belajar Fisika!', width/2, 330);
    
    btn(width/2 - 165, 450, 130, 40, '🔄 Ulangi', color(255, 150, 60));
    btn(width/2 + 35, 450, 130, 40, '← Menu', color(100, 100, 150));
  }
}

// ===== HELPER =====
function box(x, y, w, h) {
  fill(30, 30, 70, 230);
  stroke(100, 150, 255);
  strokeWeight(2);
  rect(x, y, w, h, 8);
  noStroke();
}

function btn(x, y, w, h, txt, col) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  fill(hover ? color(col.levels[0] + 30, col.levels[1] + 30, col.levels[2] + 30) : col);
  stroke(255);
  strokeWeight(2);
  rect(x, y, w, h, 8);
  fill(255);
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  text(txt, x + w/2, y + h/2);
  cursor(hover ? HAND : ARROW);
}

function roket(x, y, len, col) {
  push();
  translate(x, y);
  let s = len / L0;
  fill(col);
  stroke(255);
  strokeWeight(2);
  rect(-45 * s, -12, 90 * s, 24, 4);
  triangle(45 * s, -12, 45 * s, 12, 60 * s, 0);
  fill(100, 200, 255);
  circle(0, 0, 10);
  fill(col);
  triangle(-45 * s, -12, -55 * s, -20, -45 * s, 0);
  triangle(-45 * s, 12, -55 * s, 20, -45 * s, 0);
  if (v > 0.05) {
    fill(255, 200, 0, 200);
    noStroke();
    triangle(-45 * s, -6, -45 * s, 6, -60 * s - v * 10, 0);
  }
  pop();
}

function jam(x, y, r, waktu, lbl, col) {
  fill(30, 30, 50);
  stroke(col);
  strokeWeight(2);
  circle(x, y, r * 2);
  noStroke();
  fill(col);
  for (let i = 0; i < 12; i++) {
    let a = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
    circle(x + cos(a) * (r - 3), y + sin(a) * (r - 3), 2);
  }
  let a = map(waktu % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  stroke(col);
  strokeWeight(2);
  line(x, y, x + cos(a) * (r - 8), y + sin(a) * (r - 8));
  noStroke();
  fill(col);
  circle(x, y, 4);
  fill(255);
  textSize(10);
  textAlign(CENTER);
  text(lbl, x, y + r + 11);
  text(waktu.toFixed(1) + 'h', x, y + r + 22);
}

// ===== EVENT =====
function mousePressed() {
  if (state === 'menu') {
    if (mouseX > width/2 - 280 && mouseX < width/2 - 120 && mouseY > 420 && mouseY < 475) state = 'simulasi';
    else if (mouseX > width/2 - 80 && mouseX < width/2 + 80 && mouseY > 420 && mouseY < 475) state = 'tutorial';
    else if (mouseX > width/2 + 120 && mouseX < width/2 + 280 && mouseY > 420 && mouseY < 475) {
      state = 'quiz';
      no = 0;
      skor = 0;
      jawab = false;
    }
  } else if (state === 'tutorial') {
    if (mouseX > width/2 - 80 && mouseX < width/2 + 80 && mouseY > 580 && mouseY < 620) state = 'menu';
  } else if (state === 'simulasi') {
    if (mouseX > 30 && mouseX < 120 && mouseY > 595 && mouseY < 625) v = 0;
    else if (mouseX > width - 120 && mouseX < width - 30 && mouseY > 595 && mouseY < 625) state = 'menu';
  } else if (state === 'quiz') {
    if (no < soal.length && !jawab) {
      for (let i = 0; i < 4; i++) {
        let y = 195 + i * 65;
        if (mouseX > 80 && mouseX < width - 80 && mouseY > y && mouseY < y + 50) {
          ans = i;
          jawab = true;
          if (i === soal[no][2]) skor++;
          break;
        }
      }
    } else if (jawab && no < soal.length) {
      if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > 530 && mouseY < 570) {
        no++;
        jawab = false;
        ans = -1;
      }
    } else if (no >= soal.length) {
      if (mouseX > width/2 - 165 && mouseX < width/2 - 35 && mouseY > 450 && mouseY < 490) {
        no = 0;
        skor = 0;
        jawab = false;
      } else if (mouseX > width/2 + 35 && mouseX < width/2 + 165 && mouseY > 450 && mouseY < 490) state = 'menu';
    }
  }
}