// Global variables
let gameState = 'menu'; // menu, tutorial, simulation, quiz
let c = 299792458; // Speed of light (m/s)

// Simulation variables
let velocity = 0; // Kecepatan roket (m/s)
let velocityPercent = 0; // Persentase dari c

// Time Dilation
let properTime = 1; // Waktu di roket (t₀) dalam jam
let dilatedTime = 1; // Waktu di Bumi (t) dalam jam
let gamma = 1; // Faktor Lorentz

// Length Contraction
let properLength = 200; // Panjang sebenarnya (L₀) dalam meter
let contractedLength = 200; // Panjang terkontraksi (L) dalam meter

// Visualization
let rocketX = 100;
let stars = [];

// Quiz
let quizQuestions = [
  {
    question: 'Apa yang terjadi pada waktu di roket yang bergerak sangat cepat?',
    options: ['Waktu lebih cepat', 'Waktu lebih lambat', 'Waktu tetap sama', 'Waktu berhenti'],
    correct: 1,
    explanation: 'Waktu di roket berjalan LEBIH LAMBAT dibanding pengamat di Bumi. Ini disebut Time Dilation.'
  },
  {
    question: 'Rumus faktor Lorentz (γ) adalah:',
    options: ['γ = 1/√(1-v²/c²)', 'γ = √(1-v²/c²)', 'γ = 1/(1-v²/c²)', 'γ = v/c'],
    correct: 0,
    explanation: 'Faktor Lorentz γ = 1/√(1-v²/c²) adalah kunci untuk menghitung efek relativistik.'
  },
  {
    question: 'Jika roket bergerak dengan v = 0.8c, benda di dalamnya akan:',
    options: ['Lebih panjang', 'Lebih pendek', 'Sama saja', 'Hilang'],
    correct: 1,
    explanation: 'Length Contraction: Benda yang bergerak terlihat LEBIH PENDEK dalam arah geraknya.'
  },
  {
    question: 'Pada kecepatan rendah (v << c), efek relativitas:',
    options: ['Sangat besar', 'Tidak ada', 'Dapat diabaikan', 'Negatif'],
    correct: 2,
    explanation: 'Pada kecepatan sehari-hari, γ ≈ 1, sehingga efek relativitas sangat kecil.'
  },
  {
    question: 'Siapa yang menemukan Teori Relativitas Khusus?',
    options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
    correct: 1,
    explanation: 'Albert Einstein merumuskan Teori Relativitas Khusus pada tahun 1905.'
  }
];

let currentQuiz = 0;
let quizScore = 0;
let quizAnswered = false;
let selectedAnswer = -1;

function setup() {
  createCanvas(1100, 750);
  textFont('Arial');
  
  // Initialize stars
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height - 150),
      size: random(1, 3),
      speed: random(0.5, 2)
    });
  }
}

function draw() {
  if (gameState === 'menu') {
    drawMenu();
  } else if (gameState === 'tutorial') {
    drawTutorial();
  } else if (gameState === 'simulation') {
    drawSimulation();
  } else if (gameState === 'quiz') {
    drawQuiz();
  }
}

function drawMenu() {
  background(10, 10, 30);
  drawStars();
  
  // Title
  fill(100, 200, 255);
  textSize(60);
  textAlign(CENTER, CENTER);
  text('🚀 RELATIVITAS KHUSUS', width/2, 100);
  
  fill(180, 220, 255);
  textSize(28);
  text('Time Dilation & Length Contraction', width/2, 160);
  
  // Info box
  fill(20, 30, 60, 230);
  stroke(100, 150, 255);
  strokeWeight(2);
  rect(100, 210, width - 200, 300, 15);
  
  noStroke();
  fill(255, 255, 100);
  textSize(24);
  textAlign(LEFT);
  text('📚 Konsep Fisika:', 130, 250);
  
  fill(220, 220, 255);
  textSize(18);
  text('• Dilatasi Waktu: Waktu melambat pada objek cepat', 140, 290);
  text('• Kontraksi Panjang: Panjang menyusut searah gerak', 140, 320);
  text('• Faktor Lorentz: γ = 1/√(1-v²/c²)', 140, 350);
  text('• Kecepatan cahaya: c = 299,792,458 m/s', 140, 380);
  text('• Rumus: t = γ·t₀  dan  L = L₀/γ', 140, 410);
  text('• Postulat Einstein tentang relativitas khusus', 140, 440);
  text('• Konsekuensi: Paradoks Kembar', 140, 470);
  
  // Buttons
  drawButton(width/2 - 350, 560, 220, 70, '🔬 SIMULASI', color(60, 150, 255));
  drawButton(width/2 - 100, 560, 220, 70, '📖 TUTORIAL', color(100, 200, 100));
  drawButton(width/2 + 150, 560, 220, 70, '🎯 KUIS', color(255, 150, 60));
  
  // Footer
  fill(150, 150, 200);
  textSize(14);
  textAlign(CENTER);
  text('Simulasi Fisika Relativitas - Kelas 12 SMA/SMK', width/2, height - 20);
}

function drawStars() {
  for (let star of stars) {
    fill(255, 255, 255, 200);
    noStroke();
    circle(star.x, star.y, star.size);
    
    star.x -= star.speed * (1 + velocityPercent * 5);
    if (star.x < 0) {
      star.x = width;
      star.y = random(height - 150);
    }
  }
}

function drawButton(x, y, w, h, label, col) {
  let isHover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  
  if (isHover) {
    fill(col.levels[0] + 30, col.levels[1] + 30, col.levels[2] + 30);
    cursor(HAND);
  } else {
    fill(col);
    cursor(ARROW);
  }
  
  stroke(255);
  strokeWeight(2);
  rect(x, y, w, h, 12);
  
  fill(255);
  noStroke();
  textSize(22);
  textAlign(CENTER, CENTER);
  text(label, x + w/2, y + h/2);
}

function drawTutorial() {
  background(10, 10, 30);
  drawStars();
  
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text('📖 Tutorial Relativitas Khusus', width/2, 60);
  
  fill(20, 30, 60, 230);
  stroke(100, 150, 255);
  strokeWeight(2);
  rect(50, 120, width - 100, 520, 15);
  
  noStroke();
  fill(255, 255, 100);
  textSize(26);
  textAlign(LEFT);
  text('1️⃣ Postulat Einstein (1905):', 80, 160);
  
  fill(220, 220, 255);
  textSize(18);
  text('• Hukum fisika sama di semua kerangka inersial', 100, 195);
  text('• Kecepatan cahaya (c) konstan untuk semua pengamat', 100, 220);
  
  fill(255, 255, 100);
  textSize(26);
  text('2️⃣ Dilatasi Waktu:', 80, 270);
  
  fill(220, 220, 255);
  textSize(18);
  text('• Rumus: t = γ · t₀  dimana γ = 1/√(1-v²/c²)', 100, 305);
  text('• t₀ = waktu proper (di roket)', 100, 330);
  text('• t = waktu terdilatasi (di Bumi)', 100, 355);
  text('• Semakin cepat, waktu semakin melambat!', 100, 380);
  
  fill(255, 255, 100);
  textSize(26);
  text('3️⃣ Kontraksi Panjang:', 80, 430);
  
  fill(220, 220, 255);
  textSize(18);
  text('• Rumus: L = L₀/γ  atau  L = L₀ · √(1-v²/c²)', 100, 465);
  text('• L₀ = panjang proper (panjang diam)', 100, 490);
  text('• L = panjang terkontraksi (terlihat pendek)', 100, 515);
  text('• Kontraksi HANYA searah gerak', 100, 540);
  
  drawButton(width/2 - 110, 660, 220, 50, '← Menu', color(100, 100, 150));
}

function drawSimulation() {
  background(10, 10, 30);
  drawStars();
  
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('🔬 Simulasi Interaktif', width/2, 35);
  
  // Control panel
  fill(20, 30, 60, 230);
  stroke(100, 150, 255);
  strokeWeight(2);
  rect(20, 70, width - 40, 100, 10);
  
  noStroke();
  fill(255, 200, 100);
  textSize(20);
  textAlign(LEFT);
  text('Geser Slider Kecepatan:', 40, 95);
  
  // Slider background
  fill(60, 60, 90);
  rect(40, 110, width - 80, 20, 5);
  
  // Update velocity from slider
  if (mouseIsPressed && mouseY > 105 && mouseY < 135 && mouseX > 40 && mouseX < width - 40) {
    velocityPercent = map(mouseX, 40, width - 40, 0, 0.99);
    velocityPercent = constrain(velocityPercent, 0, 0.99);
  }
  
  velocity = velocityPercent * c;
  
  // Slider fill
  fill(100, 200, 255);
  let sliderW = map(velocityPercent, 0, 0.99, 0, width - 80);
  rect(40, 110, sliderW, 20, 5);
  
  // Slider handle
  let handleX = map(velocityPercent, 0, 0.99, 40, width - 40);
  fill(255);
  stroke(100, 200, 255);
  strokeWeight(3);
  circle(handleX, 120, 25);
  
  noStroke();
  fill(255, 255, 100);
  textSize(16);
  textAlign(CENTER, CENTER);
  text((velocityPercent * 100).toFixed(1) + '%c', 40, 150);
  text('v = ' + velocity.toExponential(2) + ' m/s', width/2, 150);
  
  // Calculate effects
  let vSquared = velocityPercent * velocityPercent;
  gamma = 1 / sqrt(1 - vSquared);
  dilatedTime = gamma * properTime;
  contractedLength = properLength / gamma;
  
  // Results - Time Dilation
  fill(20, 30, 60, 230);
  stroke(255, 150, 150);
  strokeWeight(2);
  rect(20, 180, (width - 50) / 2, 150, 10);
  
  noStroke();
  fill(255, 150, 150);
  textSize(22);
  textAlign(CENTER);
  text('⏱️ DILATASI WAKTU', (width - 50) / 4 + 20, 205);
  
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text('γ = ' + gamma.toFixed(4), 40, 240);
  text('Waktu Roket (t₀): ' + properTime.toFixed(2) + ' jam', 40, 270);
  fill(255, 100, 100);
  text('Waktu Bumi (t): ' + dilatedTime.toFixed(2) + ' jam', 40, 295);
  
  // Results - Length Contraction
  fill(20, 30, 60, 230);
  stroke(150, 255, 150);
  strokeWeight(2);
  rect((width - 50) / 2 + 30, 180, (width - 50) / 2, 150, 10);
  
  noStroke();
  fill(150, 255, 150);
  textSize(22);
  textAlign(CENTER);
  text('📏 KONTRAKSI PANJANG', (width - 50) * 3/4 + 20, 205);
  
  fill(255);
  textSize(16);
  textAlign(LEFT);
  let offsetX = (width - 50) / 2 + 50;
  text('Panjang Diam (L₀): ' + properLength + ' m', offsetX, 240);
  fill(255, 100, 100);
  text('Panjang Gerak (L): ' + contractedLength.toFixed(2) + ' m', offsetX, 270);
  fill(255, 255, 100);
  text('Rasio: ' + (contractedLength / properLength * 100).toFixed(1) + '%', offsetX, 295);
  
  // Visualization
  fill(10, 20, 40);
  stroke(100, 150, 255);
  strokeWeight(2);
  rect(20, 350, width - 40, 300, 10);
  
  noStroke();
  fill(255, 200, 100);
  textSize(18);
  textAlign(CENTER);
  text('Visualisasi Efek Relativistik', width/2, 375);
  
  // Stationary rocket
  fill(150, 150, 200);
  textSize(14);
  text('Roket Diam (L₀ = ' + properLength + ' m)', width/2, 420);
  drawRocket(width/2 - 100, 450, properLength, color(100, 100, 150, 150));
  
  // Moving rocket
  fill(255, 180, 180);
  text('Roket Bergerak (L = ' + contractedLength.toFixed(1) + ' m)', width/2, 510);
  
  rocketX += velocityPercent * 2;
  if (rocketX > width) rocketX = 0;
  
  push();
  translate(rocketX % (width - 200), 0);
  drawRocket(width/2 - 100, 540, contractedLength, color(255, 100, 100));
  pop();
  
  // Clocks
  drawClock(150, 600, 35, properTime, 'Roket', color(100, 255, 100));
  drawClock(width - 150, 600, 35, dilatedTime, 'Bumi', color(255, 100, 100));
  
  // Buttons
  drawButton(20, 670, 120, 35, 'Reset', color(200, 100, 100));
  drawButton(width - 160, 670, 140, 35, '← Menu', color(100, 100, 150));
}

function drawRocket(x, y, length, col) {
  push();
  translate(x, y);
  
  let scale = length / properLength;
  
  fill(col);
  stroke(255);
  strokeWeight(2);
  
  // Body
  rect(-40 * scale, -15, 80 * scale, 30, 5);
  
  // Nose
  triangle(40 * scale, -15, 40 * scale, 15, 55 * scale, 0);
  
  // Window
  fill(100, 200, 255);
  circle(0, 0, 12);
  
  // Fins
  fill(col);
  triangle(-40 * scale, -15, -50 * scale, -25, -40 * scale, -5);
  triangle(-40 * scale, 15, -50 * scale, 25, -40 * scale, 5);
  
  // Flame
  if (velocityPercent > 0.05) {
    fill(255, 200, 0, 200);
    noStroke();
    triangle(-40 * scale, -8, -40 * scale, 8, -55 * scale - velocityPercent * 15, 0);
  }
  
  pop();
}

function drawClock(x, y, r, time, label, col) {
  // Face
  fill(30, 30, 50);
  stroke(col);
  strokeWeight(2);
  circle(x, y, r * 2);
  
  // Markers
  noStroke();
  fill(col);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
    let x1 = x + cos(angle) * (r - 4);
    let y1 = y + sin(angle) * (r - 4);
    circle(x1, y1, 2);
  }
  
  // Hour hand
  let hourAngle = map(time % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  stroke(col);
  strokeWeight(3);
  line(x, y, x + cos(hourAngle) * (r - 12), y + sin(hourAngle) * (r - 12));
  
  // Minute hand
  let minuteAngle = map((time * 60) % 60, 0, 60, 0, TWO_PI) - HALF_PI;
  strokeWeight(2);
  line(x, y, x + cos(minuteAngle) * (r - 6), y + sin(minuteAngle) * (r - 6));
  
  // Center
  noStroke();
  fill(col);
  circle(x, y, 5);
  
  // Label
  fill(255);
  textSize(12);
  textAlign(CENTER);
  text(label, x, y + r + 12);
  text(time.toFixed(2) + 'h', x, y + r + 25);
}

function drawQuiz() {
  background(10, 10, 30);
  drawStars();
  
  fill(255);
  textSize(36);
  textAlign(CENTER, CENTER);
  text('🎯 Kuis Relativitas', width/2, 50);
  
  fill(255, 255, 100);
  textSize(20);
  text('Soal ' + (currentQuiz + 1) + '/' + quizQuestions.length, width/2, 90);
  text('Skor: ' + quizScore, width/2, 115);
  
  if (currentQuiz < quizQuestions.length) {
    let q = quizQuestions[currentQuiz];
    
    // Question
    fill(20, 30, 60, 230);
    stroke(100, 150, 255);
    strokeWeight(2);
    rect(50, 150, width - 100, 80, 10);
    
    noStroke();
    fill(255);
    textSize(20);
    text(q.question, width/2, 190);
    
    // Options
    for (let i = 0; i < q.options.length; i++) {
      let optY = 260 + i * 70;
      let isHover = mouseX > 100 && mouseX < width - 100 && 
                    mouseY > optY && mouseY < optY + 55;
      
      if (quizAnswered) {
        if (i === q.correct) {
          fill(100, 255, 100);
          stroke(50, 200, 50);
        } else if (i === selectedAnswer) {
          fill(255, 100, 100);
          stroke(200, 50, 50);
        } else {
          fill(40, 40, 80);
          stroke(80, 80, 120);
        }
      } else {
        if (isHover) {
          fill(80, 120, 200);
          stroke(150, 180, 255);
          cursor(HAND);
        } else {
          fill(40, 60, 120);
          stroke(80, 100, 180);
        }
      }
      
      strokeWeight(2);
      rect(100, optY, width - 200, 55, 8);
      
      noStroke();
      fill(255);
      textSize(16);
      textAlign(LEFT, CENTER);
      text(String.fromCharCode(65 + i) + '. ' + q.options[i], 120, optY + 27);
    }
    
    // Explanation
    if (quizAnswered) {
      fill(20, 50, 80, 240);
      stroke(255, 255, 100);
      strokeWeight(2);
      rect(50, 560, width - 100, 70, 10);
      
      noStroke();
      fill(255, 255, 150);
      textSize(15);
      textAlign(CENTER, CENTER);
      text('💡 ' + q.explanation, width/2, 595);
      
      drawButton(width/2 - 100, 650, 200, 45, 
                 currentQuiz < quizQuestions.length - 1 ? 'Lanjut →' : 'Hasil',
                 color(60, 150, 255));
    }
  } else {
    // Final score
    fill(20, 30, 60, 230);
    stroke(100, 255, 100);
    strokeWeight(3);
    rect(width/2 - 300, 180, 600, 300, 15);
    
    noStroke();
    let pct = (quizScore / quizQuestions.length) * 100;
    
    if (pct >= 80) {
      fill(100, 255, 100);
      textSize(42);
      text('🎉 LUAR BIASA!', width/2, 240);
    } else if (pct >= 60) {
      fill(255, 255, 100);
      textSize(42);
      text('👍 BAGUS!', width/2, 240);
    } else {
      fill(255, 150, 150);
      textSize(42);
      text('📚 BELAJAR LAGI', width/2, 240);
    }
    
    fill(255);
    textSize(32);
    text('Skor: ' + quizScore + '/' + quizQuestions.length, width/2, 300);
    
    textSize(28);
    fill(255, 255, 100);
    text('Nilai: ' + pct.toFixed(0) + '%', width/2, 350);
    
    fill(200, 200, 255);
    textSize(16);
    text('Terus belajar Fisika Relativitas!', width/2, 400);
    
    drawButton(width/2 - 220, 450, 180, 45, '🔄 Ulangi', color(255, 150, 60));
    drawButton(width/2 + 40, 450, 180, 45, '← Menu', color(100, 100, 150));
  }
}

function mousePressed() {
  if (gameState === 'menu') {
    if (mouseX > width/2 - 350 && mouseX < width/2 - 130 && mouseY > 560 && mouseY < 630) {
      gameState = 'simulation';
    } else if (mouseX > width/2 - 100 && mouseX < width/2 + 120 && mouseY > 560 && mouseY < 630) {
      gameState = 'tutorial';
    } else if (mouseX > width/2 + 150 && mouseX < width/2 + 370 && mouseY > 560 && mouseY < 630) {
      gameState = 'quiz';
      currentQuiz = 0;
      quizScore = 0;
      quizAnswered = false;
      selectedAnswer = -1;
    }
  }
  else if (gameState === 'tutorial') {
    if (mouseX > width/2 - 110 && mouseX < width/2 + 110 && mouseY > 660 && mouseY < 710) {
      gameState = 'menu';
    }
  }
  else if (gameState === 'simulation') {
    if (mouseX > 20 && mouseX < 140 && mouseY > 670 && mouseY < 705) {
      velocityPercent = 0;
      velocity = 0;
      rocketX = 100;
    } else if (mouseX > width - 160 && mouseX < width - 20 && mouseY > 670 && mouseY < 705) {
      gameState = 'menu';
    }
  }
  else if (gameState === 'quiz') {
    if (currentQuiz < quizQuestions.length && !quizAnswered) {
      for (let i = 0; i < quizQuestions[currentQuiz].options.length; i++) {
        let optY = 260 + i * 70;
        if (mouseX > 100 && mouseX < width - 100 && 
            mouseY > optY && mouseY < optY + 55) {
          selectedAnswer = i;
          quizAnswered = true;
          if (i === quizQuestions[currentQuiz].correct) {
            quizScore++;
          }
          break;
        }
      }
    } else if (quizAnswered && currentQuiz < quizQuestions.length) {
      if (mouseX > width/2 - 100 && mouseX < width/2 + 100 && 
          mouseY > 650 && mouseY < 695) {
        currentQuiz++;
        quizAnswered = false;
        selectedAnswer = -1;
      }
    } else if (currentQuiz >= quizQuestions.length) {
      if (mouseX > width/2 - 220 && mouseX < width/2 - 40 && 
          mouseY > 450 && mouseY < 495) {
        currentQuiz = 0;
        quizScore = 0;
        quizAnswered = false;
        selectedAnswer = -1;
      } else if (mouseX > width/2 + 40 && mouseX < width/2 + 220 && 
                 mouseY > 450 && mouseY < 495) {
        gameState = 'menu';
      }
    }
  }
}