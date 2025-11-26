// Variabel Global
let state = 'menu';
let v = 0, gamma = 1, t0 = 10, t = 10, L0 = 100, L = 100;
let stars = [];
let rocketX = 0;

// Quiz
let soal = [
  ['Apa yang terjadi pada waktu di roket yang bergerak sangat cepat:', ['Lebih cepat', 'Lebih lambat', 'Tetap sama', 'Berhenti'], 1],
  ['Rumus faktor Lorentz adalah:', ['γ=1/√(1-v²/c²)', 'γ=√(1-v²/c²)', 'γ=v/c', 'γ=c/v'], 0],
  ['Jika roket bergerak dengan v = 0.8c, benda di dalamnya akan:', ['Lebih panjang', 'Lebih pendek', 'Tetap sama', 'Menghilang'], 1],
  ['Siapa Penemu Teori Relativitas khusus:', ['Newton', 'Einstein', 'Galileo', 'Hawking'], 1]
];
let no = 0, skor = 0, jawab = false, ans = -1;

function setup() {
  createCanvas(900, 650);
  textFont('Arial');
  for (let i = 0; i < 100; i++) {
    stars.push({x: random(width), y: random(height), size: random(1, 2.5), speed: random(0.5, 1.5)});
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
  else if (state === 'quiz') quiz();
}

// ===== MENU =====
function menu() {
  fill(100, 200, 255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text('🚀 RELATIVITAS KHUSUS', width/2, 100);
  
  fill(200, 220, 255);
  textSize(20);
  text('Time Dilation & Length Contraction', width/2, 145);
  
  fill(20, 30, 60, 240);
  stroke(100, 150, 255);
  strokeWeight(3);
  rect(70, 190, width - 140, 210, 12);
  
  noStroke();
  fill(255, 255, 100);
  textSize(20);
  textAlign(LEFT);
  text('📚 Konsep Fisika:', 100, 225);
  
  fill(220, 220, 255);
  textSize(16);
  text('• Dilatasi Waktu: t = γ·t₀', 110, 260);
  text('  Waktu melambat pada objek cepat', 110, 285);
  text('• Kontraksi Panjang: L = L₀/γ', 110, 315);
  text('  Panjang menyusut searah gerak', 110, 340);
  text('• Faktor Lorentz: γ = 1/√(1-v²/c²)', 110, 370);
  
  btn(width/2 - 220, 440, 200, 60, '🔬 SIMULASI', color(60, 150, 255));
  btn(width/2 + 20, 440, 200, 60, '🎯 KUIS', color(255, 150, 60));
  
  fill(150, 150, 200);
  textSize(12);
  textAlign(CENTER);
  text('Fisika SMA Kelas 12 - Einstein 1905', width/2, height - 12);
}

// ===== SIMULASI =====
function simulasi() {
  fill(255);
  textSize(26);
  textAlign(CENTER, CENTER);
  text('🔬 Simulasi Interaktif', width/2, 35);
  
  fill(20, 30, 60, 240);
  stroke(100, 150, 255);
  strokeWeight(3);
  rect(25, 60, width - 50, 70, 10);
  
  noStroke();
  fill(255, 200, 100);
  textSize(15);
  textAlign(LEFT);
  text('⚡ Kecepatan Roket:', 45, 82);
  
  fill(50, 50, 80);
  rect(45, 95, width - 90, 12, 6);
  
  if (mouseIsPressed && mouseY > 90 && mouseY < 115 && mouseX > 45 && mouseX < width - 45) {
    v = constrain(map(mouseX, 45, width - 45, 0, 0.99), 0, 0.99);
  }
  
  fill(100, 200, 255);
  rect(45, 95, map(v, 0, 0.99, 0, width - 90), 12, 6);
  fill(255);
  circle(map(v, 0, 0.99, 45, width - 45), 101, 18);
  
  fill(255, 255, 100);
  textSize(13);
  textAlign(CENTER);
  text((v * 100).toFixed(1) + '% c', width/2, 120);
  
  gamma = 1 / sqrt(1 - v * v);
  t = gamma * t0;
  L = L0 / gamma;
  
  fill(20, 30, 60, 240);
  stroke(255, 150, 150);
  strokeWeight(3);
  rect(25, 145, (width - 60) / 2, 100, 10);
  
  noStroke();
  fill(255, 150, 150);
  textSize(17);
  text('⏱️ DILATASI WAKTU', 25 + (width - 60) / 4, 168);
  
  fill(255);
  textSize(13);
  textAlign(LEFT);
  text('γ = ' + gamma.toFixed(3), 45, 195);
  text('Waktu Roket: ' + t0 + ' jam', 45, 215);
  fill(255, 100, 100);
  text('Waktu Bumi: ' + t.toFixed(2) + ' jam', 45, 232);
  
  fill(20, 30, 60, 240);
  stroke(150, 255, 150);
  strokeWeight(3);
  rect(width/2 + 5, 145, (width - 60) / 2, 100, 10);
  
  noStroke();
  fill(150, 255, 150);
  textSize(17);
  textAlign(CENTER);
  text('📏 KONTRAKSI PANJANG', width/2 + 5 + (width - 60) / 4, 168);
  
  fill(255);
  textSize(13);
  textAlign(LEFT);
  text('L₀ = ' + L0 + ' m', width/2 + 25, 195);
  fill(255, 100, 100);
  text('L = ' + L.toFixed(2) + ' m', width/2 + 25, 215);
  fill(255, 255, 100);
  text('Rasio: ' + ((L/L0) * 100).toFixed(1) + '%', width/2 + 25, 232);
  
  fill(10, 10, 30, 250);
  stroke(100, 150, 255);
  strokeWeight(3);
  rect(25, 260, width - 50, 280, 10);
  
  noStroke();
  fill(255, 200, 100);
  textSize(16);
  textAlign(CENTER);
  text('🌌 Visualisasi', width/2, 285);
  
  fill(150, 150, 200);
  textSize(12);
  text('Roket Diam (L₀ = ' + L0 + ' m)', width/2, 315);
  roket(width/2, 345, L0, color(100, 100, 200, 180), false);
  
  fill(255, 150, 150);
  text('Roket Bergerak (L = ' + L.toFixed(1) + ' m)', width/2, 390);
  
  rocketX += v * 3;
  if (rocketX > width + 100) rocketX = -100;
  
  roket(rocketX, 420, L, color(255, 100, 100), true);
  
  jam(130, 490, 28, t0, 'Roket', color(100, 255, 100));
  jam(width - 130, 490, 28, t, 'Bumi', color(255, 100, 100));
  
  btn(25, 560, 90, 32, 'Reset', color(200, 80, 80));
  btn(width - 115, 560, 90, 32, '← Menu', color(100, 100, 150));
}

// ===== QUIZ =====
function quiz() {
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text('🎯 Kuis', width/2, 45);
  fill(255, 255, 100);
  textSize(16);
  text('Soal ' + (no + 1) + '/' + soal.length + ' | Skor: ' + skor, width/2, 78);
  
  if (no < soal.length) {
    let s = soal[no];
    fill(20, 30, 60, 240);
    stroke(100, 150, 255);
    strokeWeight(3);
    rect(40, 110, width - 80, 65, 10);
    noStroke();
    fill(255);
    textSize(17);
    text(s[0], width/2, 143);
    
    for (let i = 0; i < 4; i++) {
      let y = 195 + i * 65;
      let hover = mouseX > 70 && mouseX < width - 70 && mouseY > y && mouseY < y + 50;
      
      if (jawab) {
        if (i === s[2]) fill(100, 255, 100);
        else if (i === ans) fill(255, 100, 100);
        else fill(40, 40, 80);
      } else {
        fill(hover ? color(80, 120, 200) : color(40, 60, 120));
        if (hover) cursor(HAND);
      }
      
      stroke(100, 150, 255);
      strokeWeight(3);
      rect(70, y, width - 140, 50, 10);
      noStroke();
      fill(255);
      textSize(15);
      textAlign(LEFT, CENTER);
      text(String.fromCharCode(65 + i) + '. ' + s[1][i], 90, y + 25);
    }
    
    if (jawab) {
      btn(width/2 - 75, 500, 150, 40, no < soal.length - 1 ? 'Lanjut →' : '📊 Hasil', color(60, 150, 255));
    }
  } else {
    fill(20, 30, 60, 240);
    stroke(100, 255, 100);
    strokeWeight(4);
    rect(150, 120, width - 300, 250, 15);
    noStroke();
    let p = (skor / soal.length) * 100;
    
    if (p >= 75) {
      fill(100, 255, 100);
      textSize(36);
      text('🎉 HEBAT!', width/2, 170);
    } else if (p >= 50) {
      fill(255, 255, 100);
      textSize(36);
      text('👍 BAGUS!', width/2, 170);
    } else {
      fill(255, 150, 150);
      textSize(36);
      text('📚 COBA LAGI', width/2, 170);
    }
    
    fill(255);
    textSize(26);
    text('Skor: ' + skor + '/' + soal.length, width/2, 230);
    fill(255, 255, 100);
    textSize(22);
    text('Nilai: ' + p.toFixed(0) + '%', width/2, 270);
    fill(200, 200, 255);
    textSize(14);
    text('Terus belajar Fisika!', width/2, 315);
    
    btn(width/2 - 160, 420, 130, 40, '🔄 Ulangi', color(255, 150, 60));
    btn(width/2 + 30, 420, 130, 40, '← Menu', color(100, 100, 150));
  }
}

// ===== HELPER =====
function btn(x, y, w, h, txt, col) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  fill(hover ? color(col.levels[0] + 40, col.levels[1] + 40, col.levels[2] + 40) : col);
  cursor(hover ? HAND : ARROW);
  stroke(255);
  strokeWeight(3);
  rect(x, y, w, h, 10);
  fill(255);
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  text(txt, x + w/2, y + h/2);
}

function roket(x, y, len, col, moving) {
  push();
  translate(x, y);
  let s = len / L0;
  fill(col);
  stroke(255);
  strokeWeight(2);
  rect(-50 * s, -12, 100 * s, 24, 5);
  triangle(50 * s, -12, 50 * s, 12, 65 * s, 0);
  fill(100, 200, 255);
  circle(0, 0, 10);
  fill(col);
  triangle(-50 * s, -12, -58 * s, -20, -50 * s, -2);
  triangle(-50 * s, 12, -58 * s, 20, -50 * s, 2);
  
  if (moving && v > 0.02) {
    fill(255, 200, 0, 220);
    noStroke();
    triangle(-50 * s, -6, -50 * s, 6, -65 * s - v * 20, 0);
    fill(255, 100, 0, 180);
    triangle(-50 * s, -3, -50 * s, 3, -58 * s - v * 15, 0);
  }
  
  if (moving && v > 0.3) {
    stroke(255, 255, 255, 150);
    strokeWeight(2);
    for (let i = 0; i < 4; i++) {
      let offset = -75 - i * 18;
      line(offset, -4, offset - 12, -4);
      line(offset, 4, offset - 12, 4);
    }
  }
  pop();
}

function jam(x, y, r, waktu, lbl, col) {
  fill(20, 20, 40);
  stroke(col);
  strokeWeight(2.5);
  circle(x, y, r * 2);
  noStroke();
  fill(col);
  for (let i = 0; i < 12; i++) {
    let a = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
    circle(x + cos(a) * (r - 3), y + sin(a) * (r - 3), 2.5);
  }
  let a = map(waktu % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  stroke(col);
  strokeWeight(2.5);
  line(x, y, x + cos(a) * (r - 8), y + sin(a) * (r - 8));
  noStroke();
  fill(col);
  circle(x, y, 5);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(lbl, x, y + r + 11);
  text(waktu.toFixed(1) + 'h', x, y + r + 22);
}

// ===== EVENT =====
function mousePressed() {
  if (state === 'menu') {
    if (mouseX > width/2 - 220 && mouseX < width/2 - 20 && mouseY > 440 && mouseY < 500) {
      state = 'simulasi';
      rocketX = 0;
    } else if (mouseX > width/2 + 20 && mouseX < width/2 + 220 && mouseY > 440 && mouseY < 500) {
      state = 'quiz';
      no = 0;
      skor = 0;
      jawab = false;
    }
  } else if (state === 'simulasi') {
    if (mouseX > 25 && mouseX < 115 && mouseY > 560 && mouseY < 592) {
      v = 0;
      rocketX = 0;
    } else if (mouseX > width - 115 && mouseX < width - 25 && mouseY > 560 && mouseY < 592) {
      state = 'menu';
    }
  } else if (state === 'quiz') {
    if (no < soal.length && !jawab) {
      for (let i = 0; i < 4; i++) {
        let y = 195 + i * 65;
        if (mouseX > 70 && mouseX < width - 70 && mouseY > y && mouseY < y + 50) {
          ans = i;
          jawab = true;
          if (i === soal[no][2]) skor++;
          break;
        }
      }
    } else if (jawab && no < soal.length) {
      if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > 500 && mouseY < 540) {
        no++;
        jawab = false;
        ans = -1;
      }
    } else if (no >= soal.length) {
      if (mouseX > width/2 - 160 && mouseX < width/2 - 30 && mouseY > 420 && mouseY < 460) {
        no = 0;
        skor = 0;
        jawab = false;
      } else if (mouseX > width/2 + 30 && mouseX < width/2 + 160 && mouseY > 420 && mouseY < 460) {
        state = 'menu';
      }
    }
  }
}