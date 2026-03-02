let assetsLoaded = false;
let bumiheroStarted = false;

let devMode = false; //ganti tru kl mau skippoy

let canvas;
let target;
let trashTargetDist;

let video;
let hands = [];
let handPose;

let trashs = [];
let yPos = 0.0;

let pinchedTrash = null;
let result = null;
let resultStay = 0;

let song;
let right;
let error;
let happy;
let hover;

let currentLevel = 1;
let score = 0;
let correctHint = 3;
let unlockHint = false;
let showHint = false;
let unlockTime = 0;
let hintDelay = 2000;
let hintDuration = 2000;
let hintSound = false;

let lastHintTime = 0;
let hintCooldown = 1000;

let lastJedaTime = 0;
let jedaCooldown = 1000;
let jedaVisible = false;

let hintContents = {};
let hintVisible = false;

let rewardLevels = {};
let rewardShow = 0;
let claimDelay = 2000;
let claimUnlocked = false;

let gameState = "landing";
let landingBg;
let delayStartButton = false;
let landingStartTime = 0;

let bgFade = 0;
let isFading = false;
let fadeAlpha = 0;
let fadeDirection = 1;
let nextState = "";

let dragTrash = true;

let bgWin;
let messageWin;
let winPlayed = false;

let winReady = false;
let winStartTime = 0;

let levelCompleted = false;

let landing;

let nextCalibrateStep = null;
// calib intro
let calibrateStep = 1;
let introFinished = false;
// calib hand
let checkingStartTime = 0;
let handValid = false;
let handHoldStart = 0;
let holdDuration = 3000; //
let calibrateFinished = false;
let calibratePhase = "intro";
let phaseStartTime = 0;

let showCorrectIcon = false;
let correctStartTime = 0;
let correctDuration = 3000; //
// calib open
let OpenChecking = false;
let OpenStartTime = 0;
let OpenDuration = 2000;
let openIntro = true;
let openIntroStart = 0;
let openIntroDuration = 3000; //durasi gif open

let pickPhase = "preview";
// calib pinch
let pinchChecking = false;
let pinchStartTime = 0;
let pinchDuration = 1500;
let pinchIntro = true;
let pinchIntroStart = 0;
let pinchIntroDuration = 3000; //durasi gif pinch
// calib pick trash
let calibPickPlayed = false;
let calibPickFinished = false;
let calibrateTrash;
let calibratePinched = false;
let calibrateDone = false;
let pickChecking = false;
let pickStartTime = 0;
let pickDuration = 100; //durasi hold pick
// calibthrow
let calibDragPlayed = false;
let calibDragFinished = false;

let dragDone = false;
let dragChecking = false;
let dragStartTime = 0;
let dragDuration = 800;

let calibBin = {
  pos: null,
};

let pinchedCalibTrash = false;
let showWrongIcon = false;
let wrongStartTime = 0;
let wrongDuration = 3000;

let handMessage = "Arahkan tangan ke dalam kotak";

// calib transition
let calibTransPlayed = false;
// not first time user
let hasCompletedTutorial = false;

let mulaiUnlocked = false;
let mulaiDelay = 3000;
let mulaiStartTime = 0;

let playUnlocked = false;
let playDelay = 2000;
let playStartTime = 0;

// loading page
let loadingDots = "";
let lastDotUpdate = 0;

// chooselevel
let selectedArea = null;
let areaLevels = {
  perumahan: { start: 1, end: 3 },
  sekolah: { start: 4, end: 6 },
  rekreasi: { start: 7, end: 9 }
};
let isCampaignMode = true;

let levelStarted = false;

let minHandHeight = 94; // hand too far if smaller
let maxHandHeight = 122; // hand too close if bigger

// safezone

function preload() {
  // handPose = ml5.handPose({ flipped: true });
  loading = loadImage("background/LOADING.gif");
  font1 = loadFont("font/Qilka.otf");
  song = loadSound("sfx/doodle.mp3");
  // background
  landingBg = loadImage("background/LANDING PAGE.png");
  jedaPage = loadImage("background/JEDA_PAGE.png");
  bg1 = loadImage("background/DAPUR.png");
  bg2 = loadImage("background/HALAMAN.png");
  bg3 = loadImage("background/TAMAN.png");
  bg4 = loadImage("background/KELAS.png");
  bg5 = loadImage("background/KANTIN.png");
  bg6 = loadImage("background/PLAYGROUND.png");
  bg7 = loadImage("background/ZOO.png");
  bg8 = loadImage("background/MONAS.png");
  bg9 = loadImage("background/BEACH.png");

  //   bin
  organicbin = loadImage("bin/ORGANIK_BIN.png");
  inorganicbin = loadImage("bin/ANORGANIK_BIN.png");
  hazardousbin = loadImage("bin/B3_BIN.png");

  // ch 1
  telur = loadImage("sampah/EGG.png");
  leek = loadImage("sampah/LEEK.png");
  milk = loadImage("sampah/MILK.png");
  //   ch 2
  daun = loadImage("sampah/DAUN.png");
  ikan = loadImage("sampah/IKAN.png");
  plastik = loadImage("sampah/PLASTIC.png");
  // ch 3
  koran = loadImage("sampah/NEWS.png");
  pisang = loadImage("sampah/PISANG.png");
  ranting = loadImage("sampah/RANTING.png");
  botol = loadImage("sampah/BOTOL.png");
  snack = loadImage("sampah/SNACK.png");
  //   ch4
  kaleng = loadImage("sampah/KALENGSODA.png");
  kertas = loadImage("sampah/KERTAS.png");
  masker = loadImage("sampah/MASKER.png");
  ayam = loadImage("sampah/AYAM.png");
  // ch 5
  tisu = loadImage("sampah/TISU.png");
  //   ch 6
  apel = loadImage("sampah/APEL.png");
  bunga = loadImage("sampah/BUNGA.png");
  bohlam = loadImage("sampah/BOHLAM.png");
  bungkusKertas = loadImage("sampah/BUNGKUSKERTAS.png");
  gelas = loadImage("sampah/GELAS.png");

  //   CH 7
  terong = loadImage("sampah/TERONG.png");
  bungkusPlastik = loadImage("sampah/BUNGKUSPLASTIK.png");
  botolKaca = loadImage("sampah/BOTOLKACA.png");
  wortel = loadImage("sampah/WORTEL.png");
  handSanitizer = loadImage("sampah/HANDSANITIZER.png");

  //   CH 8
  roti = loadImage("sampah/ROTI.png");

  //   ch 9
  kelapa = loadImage("sampah/KELAPA.png");
  mcd = loadImage("sampah/MCD.png");
  baygon = loadImage("sampah/BAYGON.png");
  batre = loadImage("sampah/BATRE.png");
  sandal = loadImage("sampah/SANDAL.png");

  // ui
  startbutton = loadImage("ui/MULAIGAME_BUTTON.png");
  correct = loadImage("ui/v.png");
  wrong = loadImage("ui/x.png");
  bantuan = loadImage("ui/BANTUAN_ICON.png");
  jeda = loadImage("ui/JEDA_ICON.png");
  lanjutButton = loadImage("ui/LANJUTMAIN_BUTTON.png");
  skip = loadImage("ui/SKIP_ICON.png");

  claimButton = loadImage("ui/KLAIM.png");
  playagain = loadImage("ui/MAINLAGI_BUTTON.png");
  exit = loadImage("ui/KELUAR_BUTTON.png");

  //   Hint
  collecthintlabel = loadImage("hints/UNLOCKLABEL.png");
  closeHint = loadImage("hints/TUTUP_BUTTON.png");
  unlockedhint = loadImage("hints/HINTNOTIF.png");
  hint1 = loadImage("hints/BANTUAN1.png");
  hint2 = loadImage("hints/BANTUAN2.png");
  hint3 = loadImage("hints/BANTUAN3.png");
  hint4 = loadImage("hints/BANTUAN4.png");
  hint5 = loadImage("hints/BANTUAN5.png");
  hint6 = loadImage("hints/BANTUAN6.png");
  hint7 = loadImage("hints/BANTUAN7.png");
  hint8 = loadImage("hints/BANTUAN8.png");
  hint9 = loadImage("hints/BANTUAN9.png");

  //   badge
  badge1 = loadImage("badge/BADGE_1.gif");
  badge2 = loadImage("badge/BADGE_2.gif");
  badge3 = loadImage("badge/BADGE_3.gif");
  badge4 = loadImage("badge/BADGE_4.gif");
  badge5 = loadImage("badge/BADGE_5.gif");
  badge6 = loadImage("badge/BADGE_6.gif");
  badge7 = loadImage("badge/BADGE_7.gif");
  badge8 = loadImage("badge/BADGE_8.gif");
  badge9 = loadImage("badge/BADGE_9.gif");
  shine = loadImage("badge/SHINE.png");

  //   Winning screen
  win1 = loadImage("background/GOLD_PAGE.gif");
  win2 = loadImage("background/SILVER_PAGE.gif");
  win3 = loadImage("background/BRONZE_PAGE.gif");

  // sfx
  click = loadSound("sfx/click3.mp3");
  claim = loadSound("sfx/claim2.mp3");
  unlocked = loadSound("sfx/bantuan_unlock.mp3");
  reward = loadSound("sfx/reward.mp3");
  win = loadSound("sfx/win_sound.mp3");
  right = loadSound("sfx/correct.mp3");
  error = loadSound("sfx/incorrect.mp3");

  calibbg = loadImage("calibrate/CALIB_BG.png");
  calib1 = loadImage("calibrate/CALIB_1.png");
  calib3 = loadImage("calibrate/CALIB_3.png");
  calib4 = loadImage("calibrate/CALIB_4.png");
  calib5 = loadImage("calibrate/CALIB_5.png");
  calib6 = loadImage("calibrate/CALIB_6.png");

  calibintro = loadImage("calibrate/CALIB_INTRO.gif");
  calibpick = loadImage("calibrate/PICK_TUTORIAL2.gif");
  calibdrag = loadImage("calibrate/THROW_TUTORIAL2.gif");
  calibtrans = loadImage("calibrate/CALIB_FINISHED.gif");

  hi5 = loadImage("calibrate/HI5.png");
  openhand = loadImage("calibrate/OPENHAND.png");
  pinchhand = loadImage("calibrate/PINCHHAND.png");

  mulaiButton = loadImage("calibrate/MULAIBERMAIN_BUTTON.png");

  // choose
  perumahan = loadImage("choose/PERUMAHAN.png");
  sekolah = loadImage("choose/SEKOLAH.png");
  rekreasi = loadImage("choose/REKREASI.png");
  chooseBg = loadImage("choose/CHOOSE_LEVEL.png");
  tutor = loadImage("choose/TUTOR_ICON.png");
  beranda = loadImage("choose/BERANDA_ICON.png");
}

function setup() {
  canvas = createCanvas(640, 480);
  imageMode(CENTER);
  textAlign(CENTER);

  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.position(canvas.width + 100, 0);
  // video.hide();

  handPose = ml5.handPose({ flipped: true }, () => {
    handPose.detectStart(video, gotHands);

    assetsLoaded = true;
    // gameState = "landing";
  });

  hintContents = {
    1: hint1,
    2: hint2,
    3: hint3,
    4: hint4,
    5: hint5,
    6: hint6,
    7: hint7,
    8: hint8,
    9: hint9,
  };

  rewardLevels = {
    1: badge1,
    2: badge2,
    3: badge3,
    4: badge4,
    5: badge5,
    6: badge6,
    7: badge7,
    8: badge8,
    9: badge9,
  };

  if (devMode) {
    currentLevel = 1;
    loadLevel(currentLevel);
    gameState = "play";

    //     gameState = "calibrate";
    // calibrateStep = 7;
  }
  // landing = createVideo("background/LANDING.mp4");
  // landing.hide();
  // landing.loop();
}
function draw() {

  //   loading page
  if (!assetsLoaded) {
    image(loading, width / 2, height / 2, width, height);
    textFont(font1);
    fill(255, 255, 255);
    stroke(89, 26, 41);
    strokeWeight(5);
    strokeJoin(ROUND);
    textSize(24);

    if (millis() - lastDotUpdate > 400) {
      lastDotUpdate = millis();

      if (loadingDots.length < 3) {
        loadingDots += ".";
      } else {
        loadingDots = "";
      }
    }

    text("Loading" + loadingDots, width / 2, height / 2 + 70);
    return;
  }

  imageMode(CENTER);
  textFont(font1);
  image(video, width / 2, height / 2, width, height);
  if (gameState === "landing") {
    showLandingPage();
    detectHandStartButton();
    fadeLandingPage();
    if (delayStartButton) {
      if (millis() - landingStartTime > 2000) {
        delayStartButton = false;
      }
    }
  } else if (gameState === "calibrate") {
    calibratePage();
  } else if (gameState === "play") {

    
    playGame();

//     if (hands.length > 0) {

//   let status = getDistanceStatus(hands[0]);

//   fill(255);
//   textSize(28);
//   textAlign(CENTER);

//   if (status === "tooClose") {
//     text("⚠ Mundur sedikit dari kamera", width/2, height/2);
//   }

//   else if (status === "tooFar") {
//     text("⚠ Dekatkan tangan ke kamera", width/2, height/2);
//   }

//   else {
//     text("✅ Posisi Sudah Optimal", width/2, height/2);
//   }

// }
    
      if (showHint) {
        let elapsed = millis() - unlockTime;

        if (elapsed > hintDelay && elapsed < hintDelay + hintDuration) {
          if (!hintSound) {
            unlocked.play();
            hintSound = true;
          }

          promptHint();
        }

        if (elapsed >= hintDelay + hintDuration) {
          showHint = false;
        }
      }

      if (hintVisible) displayHint();
      if (jedaVisible) displayJeda();
    }

    else if (gameState === "reward") {
      rewardScreen();
      detectHandClaimButton();
  } else if (gameState === "win") {
    winScreen();
  } else if (gameState === "choose") {
    chooseLevel();
  }

  if (hands.length > 0) {
    if (
      !(
        gameState === "calibrate" &&
        (calibrateStep === 1 || calibrateStep === 2)
      )
    ) {
      handVisual();
    }
  }
// 🔍 SAFE ZONE DEBUG (temporary)
// if (hands.length > 0) {

//   let hand = hands[0];
//   let xs = [];
//   let ys = [];

//   for (let i = 0; i < hand.keypoints.length; i++) {
//     xs.push(hand.keypoints[i].x);
//     ys.push(hand.keypoints[i].y);
//   }

//   let minX = Math.min(...xs);
//   let maxX = Math.max(...xs);
//   let minY = Math.min(...ys);
//   let maxY = Math.max(...ys);

//   let centerX = (minX + maxX) / 2;
//   let centerY = (minY + maxY) / 2;

//   let margin = 40;

//   // Draw safe frame box
//   noFill();
//   stroke(0, 255, 0);
//   strokeWeight(2);
//   rect(margin, margin, width - margin * 2, height - margin * 2);

//   // Draw hand center
//   fill(255, 0, 0);
//   noStroke();
//   circle(centerX, centerY, 10);

//   handVisual();

// }


  if (isFading) {
    fadeAlpha += 8 * fadeDirection;

    if (fadeAlpha >= 255) {
      fadeAlpha = 255;
      gameState = nextState;
      fadeDirection = -1; // mulai fade in
    }

    if (fadeAlpha <= 0 && fadeDirection === -1) {
      fadeAlpha = 0;
      isFading = false;
    }

    noStroke();
    fill(0, fadeAlpha);
    rectMode(CORNER);
    rect(0, 0, width, height);
  }
}

function getHandBoxHeight(hand) {
  let keypoints = hand.keypoints;

  let minY = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < keypoints.length; i++) {
    let y = keypoints[i].y;

    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return maxY - minY;
}

function getDistanceStatus(hand) {

  let handHeight = getHandBoxHeight(hand);

  console.log("Hand Height:", handHeight);

  if (handHeight > maxHandHeight) {
    return "tooClose";
  } 
  else if (handHeight < minHandHeight) {
    return "tooFar";
  } 
  else {
    return "optimal";
  }
}

function startBumiHero() {
  console.log("Waiting for assets...");

  setTimeout(() => {
    assetsLoaded = true;
    gameState = "landing";
    console.log("Assets ready → Game Start");
  }, 100);
}
// function resetGame(targetState = "play") {
//   currentLevel = 1;
//   score = 0;
//   winPlayed = false;
//   if (!song.isPlaying()) {
//     song.loop();
//   }
//   resetLevelData();
// gameState = targetState;
// }
// function resetLevelData() {
//   trashs = [];
//   yPos = 0.0;

//   pinchedTrash = null;
//   result = null;
//   resultStay = 0;

//   unlockHint = false;
//   showHint = false;
//   hintSound = false;

//   lastHintTime = 0;
//   lastJedaTime = 0;
//   jedaVisible = false;

//   rewardShow = 0;
//   claimUnlocked = false;

//   levelCompleted = false;
//   winPlayed = false;
//   winReady = false;
//   levelCompleted = false;

//   score = 0;
// }

// draw landing
function fadeLandingPage() {
  if (bgFade < 255) {
    bgFade += 6;
    fill(0, 0, 0, 255 - bgFade);
    rect(0, 0, width, height);
  }
}
function showLandingPage() {
  image(landingBg, width / 2, height / 2, width, height);

  textFont(font1);
  fill(255, 255, 255);
  stroke(89, 26, 41);
  strokeWeight(5);
  strokeJoin(ROUND);
  textSize(16);
  text(
    "Satukan jari telunjuk dan ibu jari untuk klik!",
    width / 2,
    height - 100
  );
  image(startbutton, width / 2, height - 50, 226, 60);
}
function detectHandStartButton() {
  if (delayStartButton) return;

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);

    let fingersX = (index.x + thumb.x) * 0.5;
    let fingersY = (index.y + thumb.y) * 0.5;

    fill(255, 0, 0, 150);
    noStroke();
    ellipse(index.x, index.y, 25, 25);
    ellipse(thumb.x, thumb.y, 25, 25);

    if (distBetweenFingers < 25) {
      if (
        fingersX > width / 2 - 113 &&
        fingersX < width / 2 + 113 &&
        fingersY > height - 50 - 30 &&
        fingersY < height - 50 + 30
      ) {
        startGame();
      }
    }
  }
}
function startGame() {

  song.loop();
  click.play();
  winPlayed = false;

  if (hasCompletedTutorial) {

    gameState = "choose";

  } else {

    calibrateStep = 1;
    introFinished = false;

    calibintro.play();
    calibintro.setFrame(0);

    gameState = "calibrate";
  }

}

// draw calib
function resetCalibrateState() {
  calibratePhase = "intro";
  phaseStartTime = 0;

  handValid = false;
  handHoldStart = 0;

  pinchChecking = false;
  pinchStartTime = 0;

  OpenChecking = false;
  OpenStartTime = 0;

  showCorrectIcon = false;
}
function calibratePage() {
  if (nextCalibrateStep !== null) {
    calibrateStep = nextCalibrateStep;
    resetCalibrateState();
    nextCalibrateStep = null;
  }
  if (calibrateStep === 1) {
    showCalibrateIntro();
  } else if (calibrateStep === 2) {
    showCalibratehand();
  } else if (calibrateStep === 3) {
    showCalibrateOpen();
  } else if (calibrateStep === 4) {
    showCalibratePinch();
  } else if (calibrateStep === 5) {
    showCalibratePick();
  } else if (calibrateStep === 6) {
    showCalibrateThrow();
  } else if (calibrateStep === 7) {
    showCalibrateTransition();
  }
}
function showCalibrateIntro() {
  image(calibbg, width / 2, height / 2, width, height);

  image(calibintro, width / 2, height / 2, width, height);

  if (!introFinished && calibintro && calibintro.numFrames) {
    if (calibintro.getCurrentFrame() === calibintro.numFrames() - 1) {
      calibintro.pause();
      introFinished = true;
      nextCalibrateStep = 2;
    }
  }
}
// function showCalibratehand() {
//   image(calib1, width / 2, height / 2, width, height);

//   // ================= INTRO =================
//   if (calibratePhase === "intro") {
//     image(hi5, width / 2, height / 2, 114, 113);

//     if (phaseStartTime === 0) {
//       phaseStartTime = millis();
//     }

//     if (millis() - phaseStartTime >= openIntroDuration) {
//       calibratePhase = "checking";
//       phaseStartTime = 0;
//     }

//     return;
//   }

//   // ================= CORRECT =================
//   if (calibratePhase === "correct") {
//     image(correct, width / 2, height / 2, 100, 100);

//     if (millis() - phaseStartTime >= correctDuration) {
//       calibratePhase = "done";
//       phaseStartTime = 0;
//     }

//     return;
//   }

//   // ================= DONE =================
//   if (calibratePhase === "done") {
//     resetCalibrateState();
//     nextCalibrateStep = 3;
//     return;
//   }

//   // ================= CHECKING =================

//   let left = 71;
//   let right = 569;
//   let top = 105;
//   let bottom = 450;

//   let boxColor = color(255, 0, 0);

//   if (hands.length === 0) {
//     handMessage = "Tangan tidak terdeteksi";
//     handValid = false;
//     handHoldStart = 0;
//   } else {
//     let minX = Infinity;
//     let maxX = -Infinity;
//     let minY = Infinity;
//     let maxY = -Infinity;

//     for (let p of hands[0].keypoints) {
//       if (p.x < minX) minX = p.x;
//       if (p.x > maxX) maxX = p.x;
//       if (p.y < minY) minY = p.y;
//       if (p.y > maxY) maxY = p.y;
//     }

//     let inFrame =
//       minX > left - 15 &&
//       maxX < right + 15 &&
//       minY > top - 15 &&
//       maxY < bottom + 15;

//     if (!inFrame) {
//       handValid = false;
//       handHoldStart = 0;
//       handMessage = "Pastikan seluruh tangan berada di dalam kotak";
//     } else {
//       boxColor = color(0, 255, 0);

//       if (!handValid) {
//         handHoldStart = millis();
//         handValid = true;
//       }

//       handMessage = "Memeriksa pose...";

//       let holdTime = millis() - handHoldStart;

//       if (holdTime >= holdDuration) {
//         calibratePhase = "correct";
//         phaseStartTime = millis();
//         handMessage = "";
//       }
//     }
//   }

//   // SAFEZONE
//   stroke(boxColor);
//   strokeWeight(3);
//   drawingContext.setLineDash([10, 10]);
//   noFill();
//   rect(left, top, right - left, bottom - top);
//   drawingContext.setLineDash([]);

//   // TEXT
//   if (handMessage !== "") {
//     textSize(18);
//     fill(255);
//     stroke(89, 26, 41);
//     strokeWeight(4);
//     text(handMessage, width / 2, height / 2);
//   }
// }
function showCalibratehand() {
  image(calib1, width / 2, height / 2, width, height);

  // ================= INTRO =================
  if (calibratePhase === "intro") {
    image(hi5, width / 2, height / 2, 114, 113);

    if (phaseStartTime === 0) {
      phaseStartTime = millis();
    }

    if (millis() - phaseStartTime >= openIntroDuration) {
      calibratePhase = "checking";
      phaseStartTime = 0;
    }

    return;
  }

  // ================= CORRECT =================
  if (calibratePhase === "correct") {
    image(correct, width / 2, height / 2 - 20, 100, 100);

    textSize(18);
    fill(255);
    stroke(89, 26, 41);
    strokeWeight(4);
    text(
  "Tetap di posisi ini ya,\nsupaya permainan lancar!",
  width / 2,
  height / 2 + 52
);

    if (millis() - phaseStartTime >= 3000) {
      calibratePhase = "done";
      phaseStartTime = 0;
    }

    return;
  }

  // ================= DONE =================
  if (calibratePhase === "done") {
    resetCalibrateState();
    nextCalibrateStep = 3;
    return;
  }

  // ================= CHECKING =================

  let left = 71;
  let right = 569;
  let top = 105;
  let bottom = 450;

  let boxColor = color(255, 0, 0);
  handMessage = "";

  // ================= HAND DETECTION =================

  if (hands.length === 0) {

    handValid = false;
    handHoldStart = 0;
    handMessage = "Tangan tidak terdeteksi";

  } else {

    // ======== HITUNG BOUNDING BOX ========
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let p of hands[0].keypoints) {
      minX = min(p.x, minX);
      maxX = max(p.x, maxX);
      minY = min(p.y, minY);
      maxY = max(p.y, maxY);
    }

    // ======== HITUNG DISTANCE (HEIGHT) ========
    let handHeight = maxY - minY;

    // 🔥 Tampilkan di console biar kamu bisa ukur threshold
    console.log("Hand Height:", handHeight);

    // ================= CHECK SAFEZONE =================

    let inFrame =
      minX > left - 15 &&
      maxX < right + 15 &&
      minY > top - 15 &&
      maxY < bottom + 15;

    if (!inFrame) {

      handValid = false;
      handHoldStart = 0;
      handMessage = "Pastikan seluruh tangan berada di dalam kotak";

    } else {

      // ===== DISTANCE FEEDBACK =====
      let optimalValue = 200;  // nanti ganti pakai data kamu
      let tolerance = 15;

      let minHandHeight = optimalValue - tolerance;
      let maxHandHeight = optimalValue + tolerance;

      if (handHeight < minHandHeight) {
        handMessage = "Dekatkan tangan sedikit";
        boxColor = color(0, 0, 255);
        handValid = false;
        handHoldStart = 0;
      }

      else if (handHeight > maxHandHeight) {
        handMessage = "Mundur sedikit dari kamera";
        boxColor = color(255, 165, 0);
        handValid = false;
        handHoldStart = 0;
      }

      else {

        boxColor = color(0, 255, 0);

        if (!handValid) {
          handHoldStart = millis();
          handValid = true;
        }

        handMessage = "Bagus! Tahan 3 detik…";

        let holdTime = millis() - handHoldStart;

        if (holdTime >= holdDuration) {
          calibratePhase = "correct";
          phaseStartTime = millis();
          handMessage = "";
        }
      }
    }
  }

  // ================= SAFEZONE DRAW =================

  stroke(boxColor);
  strokeWeight(3);
  drawingContext.setLineDash([10, 10]);
  noFill();
  rect(left, top, right - left, bottom - top);
  drawingContext.setLineDash([]);

  // ================= TEXT FEEDBACK =================

  if (handMessage !== "") {
    textSize(18);
    fill(255);
    stroke(89, 26, 41);
    strokeWeight(4);
    textAlign(CENTER);
    text(handMessage, width / 2, height / 2);
  }
}

function showCalibrateOpen() {
  image(calib3, width / 2, height / 2, width, height);

  // ================= INTRO =================
  if (calibratePhase === "intro") {
    image(openhand, width / 2, height / 2, 114, 113);

    if (phaseStartTime === 0) {
      phaseStartTime = millis();
    }

    if (millis() - phaseStartTime >= openIntroDuration) {
      calibratePhase = "checking";
      phaseStartTime = 0;
    }

    return;
  }

  // ================= CORRECT =================
  if (calibratePhase === "correct") {
    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - phaseStartTime >= correctDuration) {
      calibratePhase = "done";
      phaseStartTime = 0;
    }

    return;
  }

  // ================= DONE =================
  if (calibratePhase === "done") {
    nextCalibrateStep = 4;
    return;
  }

  // ================= CHECKING =================

  if (hands.length === 0) {
    handMessage = "Tangan tidak terdeteksi";
    handValid = false;
    handHoldStart = 0;
  } else {
    let kp = hands[0].keypoints;

    let thumbTip = kp[4];
    let thumbBase = kp[2];
    let indexTip = kp[8];
    let indexPIP = kp[6];

    let indexUp = indexTip.y < indexPIP.y;
    let thumbOpen = abs(thumbTip.x - thumbBase.x) > 25;

    let distance = dist(indexTip.x, indexTip.y, thumbTip.x, thumbTip.y);
    let fingersApart = distance > 40;

    let validPose = indexUp && thumbOpen && fingersApart;

    if (!validPose) {
      handMessage = "Pastikan pose tangan sesuai";
      handValid = false;
      handHoldStart = 0;
    } else {
      handMessage = "Memeriksa pose...";

      if (!handValid) {
        handHoldStart = millis();
        handValid = true;
      }

      let holdTime = millis() - handHoldStart;

      if (holdTime >= OpenDuration) {
        calibratePhase = "correct";
        phaseStartTime = millis();
        handMessage = "";
      }
    }
  }

  // TEXT
  if (handMessage !== "") {
    textSize(18);
    fill(255);
    stroke(89, 26, 41);
    strokeWeight(4);
    text(handMessage, width / 2, height / 2);
  }
}
function showCalibratePinch() {
  image(calib4, width / 2, height / 2, width, height);

  if (calibratePhase === "intro") {
    image(pinchhand, width / 2, height / 2, 119, 91);

    if (phaseStartTime === 0) {
      phaseStartTime = millis();
    }

    if (millis() - phaseStartTime >= pinchIntroDuration) {
      calibratePhase = "checking";
      phaseStartTime = 0;
    }

    return;
  }

  if (calibratePhase === "correct") {
    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - phaseStartTime >= correctDuration) {
      calibratePhase = "done";
      phaseStartTime = 0;
    }

    return;
  }

  if (calibratePhase === "done") {
    nextCalibrateStep = 5;

    calibPickPlayed = false;
    calibPickFinished = false;

    calibrateTrash = {
      pos: createVector(width / 2, height / 2),
      startPos: createVector(width / 2, height / 2),
      object: botol,
      name: "Botol plastik",
    };

    calibratePinched = false;
    calibrateDone = false;

    return;
  }

  // ================= CHECKING =================

  if (hands.length === 0) {
    textMessage("Tangan tidak terdeteksi");
  } else {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];

    let distance = dist(index.x, index.y, thumb.x, thumb.y);
    let isPinch = distance < 25;

    if (!isPinch) {
      textMessage("Pastikan jempol & telunjuk menyatu");

      pinchChecking = false;
    } else {
      textMessage("Memeriksa pose...");

      if (!pinchChecking) {
        pinchChecking = true;
        pinchStartTime = millis();
      }

      if (millis() - pinchStartTime >= pinchDuration) {
        calibratePhase = "correct";
        phaseStartTime = millis();
        pinchChecking = false;
      }
    }
  }
}
function showCalibratePick() {
  image(calib5, width / 2, height / 2, width, height);

  image(calibpick, width / 2, height / 2, width, height);

  skipIcon();
  detectSkipButton();

  if (!calibPickPlayed) {
    calibpick.reset();
    calibpick.play();
    calibPickPlayed = true;
    calibPickFinished = false;
  }

  if (calibpick.getCurrentFrame() === calibpick.numFrames() - 1) {
    calibpick.pause();
    calibPickFinished = true;
  }
  if (!calibPickFinished) return;

  if (showCorrectIcon) {
    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - correctStartTime >= correctDuration) {
      showCorrectIcon = false;
      correctStartTime = 0;
      nextCalibrateStep = 6;
      calibDragPlayed = false;

      calibrateTrash = {
        pos: createVector(width / 2 - 100, height / 2),
        startPos: createVector(width / 2 - 100, height / 2),
        object: botol,
        name: "Botol plastik",
      };

      calibBin.pos = createVector(width / 2 + 100, height / 2);

      calibratePinched = false;
      calibrateDone = false;
      dragChecking = false;
      dragStartTime = 0;
    }

    return;
  }

  // botol trash
  if (!calibratePinched) {
    image(
      calibrateTrash.object,
      calibrateTrash.pos.x,
      calibrateTrash.pos.y,
      80,
      80
    );
  }

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];

    let distance = dist(index.x, index.y, thumb.x, thumb.y);
    let fingersX = (index.x + thumb.x) * 0.5;
    let fingersY = (index.y + thumb.y) * 0.5;

    let fingersPos = createVector(fingersX, fingersY);

    let fingersTrashDist = dist(
      calibrateTrash.pos.x,
      calibrateTrash.pos.y,
      fingersPos.x,
      fingersPos.y
    );

    if (distance < 35 && fingersTrashDist < 40) {
      calibratePinched = true;

      calibrateTrash.pos.x = fingersPos.x;
      calibrateTrash.pos.y = fingersPos.y;

      let pinchSize = 90;
      image(
        calibrateTrash.object,
        calibrateTrash.pos.x,
        calibrateTrash.pos.y,
        pinchSize,
        pinchSize
      );

      textAlign(CENTER);
      textSize(16);
      fill(255);
      stroke(89, 26, 41);
      strokeWeight(4);
      strokeJoin(ROUND);
      text(
        calibrateTrash.name,
        calibrateTrash.pos.x,
        calibrateTrash.pos.y + pinchSize / 2 + 15
      );

      if (!pickChecking) {
        pickChecking = true;
        pickStartTime = millis();
      }

      if (millis() - pickStartTime >= pickDuration) {
        calibrateDone = true;
        showCorrectIcon = true;
        correctStartTime = millis();
        pickChecking = false;
      }
    } else {
      pickChecking = false;
    }
  }
}
function showCalibrateThrow() {
  image(calib6, width / 2, height / 2, width, height);
  image(calibdrag, width / 2, height / 2, width, height);

  skipIcon();
  detectSkipButton();

  if (!calibDragPlayed) {
    calibdrag.reset();
    calibdrag.play();
    calibDragPlayed = true;
    calibDragFinished = false;
  }

  if (calibdrag.getCurrentFrame() === calibdrag.numFrames() - 1) {
    calibdrag.pause();
    calibDragFinished = true;
  }


  if (!calibDragFinished) return;

  if (showCorrectIcon) {
    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - correctStartTime > 1000) {
      showCorrectIcon = false;
      nextCalibrateStep = 7;

      // reset gif untuk next time
      calibDragPlayed = false;
      calibDragFinished = false;
    }
    return;
  }

  if (showWrongIcon) {
    image(wrong, width / 2, height / 2, 100, 100);

    if (millis() - wrongStartTime > wrongDuration) {
      showWrongIcon = false;

      calibrateTrash.pos.x = calibrateTrash.startPos.x;
      calibrateTrash.pos.y = calibrateTrash.startPos.y;
    }
  }

  image(inorganicbin, calibBin.pos.x, calibBin.pos.y, 99, 112);

  if (!calibratePinched) {
    image(
      calibrateTrash.object,
      calibrateTrash.pos.x,
      calibrateTrash.pos.y,
      80,
      80
    );
  }

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];

    let distance = dist(index.x, index.y, thumb.x, thumb.y);

    let fingersX = (index.x + thumb.x) * 0.5;
    let fingersY = (index.y + thumb.y) * 0.5;

    let fingersPos = createVector(fingersX, fingersY);

    let fingersTrashDist = dist(
      calibrateTrash.pos.x,
      calibrateTrash.pos.y,
      fingersPos.x,
      fingersPos.y
    );

    let trashBinDist = dist(
      calibrateTrash.pos.x,
      calibrateTrash.pos.y,
      calibBin.pos.x,
      calibBin.pos.y
    );

    // START DRAG
    if (distance < 35 && fingersTrashDist < 40) {
      calibratePinched = true;
    }

    // DRAGGING
    if (distance < 35 && calibratePinched) {
      calibrateTrash.pos.x = fingersPos.x;
      calibrateTrash.pos.y = fingersPos.y;

      let pinchSize = 90;

      image(
        calibrateTrash.object,
        calibrateTrash.pos.x,
        calibrateTrash.pos.y,
        pinchSize,
        pinchSize
      );

      textSize(16);
      fill(255);
      stroke(89, 26, 41);
      strokeWeight(4);
      strokeJoin(ROUND);

      text(
        calibrateTrash.name,
        calibrateTrash.pos.x,
        calibrateTrash.pos.y + pinchSize / 2 + 15
      );
    }

    // RELEASE
    if (distance >= 35 && calibratePinched) {
      if (trashBinDist < 60) {
        showCorrectIcon = true;
        correctStartTime = millis();
      } else {
        // langsung reset posisi
        calibrateTrash.pos.x = calibrateTrash.startPos.x;
        calibrateTrash.pos.y = calibrateTrash.startPos.y;

        showWrongIcon = true;
        wrongStartTime = millis();
      }
      calibratePinched = false;
    }
  }
}

function showCalibrateTransition() {
  image(calibtrans, width / 2, height / 2, width, height);
  image(mulaiButton, width / 2, height / 2 + 161, 284, 60);

  // gif transition
  if (!calibTransPlayed) {
    calibtrans.reset();
    calibtrans.play();
    calibTransPlayed = true;
  }

  if (calibtrans.getCurrentFrame() === calibtrans.numFrames() - 1) {
    calibtrans.pause();
  }

  // button main

  if (!mulaiUnlocked && millis() - mulaiStartTime > mulaiDelay) {
    mulaiUnlocked = true;
  }

  if (!mulaiUnlocked) return;

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width / 2 - 284 / 2 &&
        fingersX < width / 2 + 284 / 2 &&
        fingersY > height / 2 + 161 - 60 / 2 &&
        fingersY < height / 2 + 161 + 60 / 2
      ) {
           loadLevel(currentLevel);

   hasCompletedTutorial = true;

gameState = "play";
  //  startFade("play");

   calibTransPlayed = false;
      }
    }
  }
}
function skipIcon() {
  push();

  image(skip, width - 52, 37, 38, 38);
  fill(255, 255, 255);
  stroke(89, 26, 41);
  strokeWeight(4);
  textSize(12);
  text("Lewati", width - 52, 71);

  pop();
}
function detectSkipButton() {
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width - 71 &&
        fingersX < width - 33 &&
        fingersY > 18 &&
        fingersY < 56
      ) {
        nextCalibrateStep = 7;
      }
    }
  }
}
function textMessage(msg) {
  textSize(18);
  fill(255);
  stroke(89, 26, 41);
  strokeWeight(4);
  text(msg, width / 2, height / 2);
}
function startFade(stateToGo) {
  console.log("Fade complete ->", nextState);

  isFading = true;
  fadeAlpha = 0;
  fadeDirection = 1;
  nextState = stateToGo;
}

// draw levelgame
function playGame() {
  if (gameState !== "play") return;
  
  if (currentLevel === 1) image(bg1, width / 2, height / 2, width, height);
  else if (currentLevel === 2) image(bg2, width / 2, height / 2, width, height);
  else if (currentLevel === 3) image(bg3, width / 2, height / 2, width, height);
  else if (currentLevel === 4) image(bg4, width / 2, height / 2, width, height);
  else if (currentLevel === 5) image(bg5, width / 2, height / 2, width, height);
  else if (currentLevel === 6) image(bg6, width / 2, height / 2, width, height);
  else if (currentLevel === 7) image(bg7, width / 2, height / 2, width, height);
  else if (currentLevel === 8) image(bg8, width / 2, height / 2, width, height);
  else if (currentLevel === 9) image(bg9, width / 2, height / 2, width, height);

  jedaIcon();
  scoreCount();

  for (let bin of bins) {
    image(bin.object, bin.pos.x, bin.pos.y, 99, 112);
  }

  for (let trash of trashs) {
    image(trash.object, trash.pos.x, trash.pos.y, 60, 60);
  }

  if (result) {
    image(result, width / 2, height / 2, 100, 100);
  }

  if (millis() - resultStay > 1000) {
    result = null;
  }

  if (hands.length > 0) {
    handVisual();
  }
  if (!playUnlocked && millis() - playStartTime > playDelay) {
    playUnlocked = true;
  }

  if (showHint && millis() - unlockTime > 1500) {
    promptHint();
  }

  if (!unlockHint && correctHint > 0) {
    needHint();
  } else {
    hintIcon();
  }
  // winning screen
  if (levelStarted && trashs.length === 0 && !levelCompleted) {
    reward.play();
    levelCompleted = true;
    levelStarted = false;
    gameState = "reward";
    enterRewardScreen();

    // currentLevel++;

    //     level menang
    // if (currentLevel <= 9) {
    //   loadLevel(currentLevel);
    // } else {
    //   winScreen();
    // }
  }
}
function rewardScreen() {
  push();
  fill(92, 106, 158, 150);
  rect(0, 0, width, height);
  image(shine, width / 2, height / 2, 288, 219);

  let badgeImg = getCurrentReward();

  image(badgeImg, width / 2, height / 2, width, height);

  if (badgeImg && badgeImg.numFrames) {
    if (badgeImg.getCurrentFrame() === badgeImg.numFrames() - 1) {
      badgeImg.pause();
    }
  }

  image(claimButton, width / 2, height / 2 + 161, 182, 60);

  if (!claimUnlocked && millis() - rewardShow > claimDelay) {
    claimUnlocked = true;
  }

  pop();
}
function detectHandClaimButton() {
  if (!claimUnlocked) return;
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width / 2 - 91 &&
        fingersX < width / 2 + 91 &&
        fingersY > height / 2 + 131 &&
        fingersY < height / 2 + 191
      ) {
        claimReward();
      }
    }
  }
}

function claimReward() {
  claim.play();

  hintVisible = false;
  jedaVisible = false;
  showHint = false;

//   levelCompleted = false;
//   levelStarted = false; 
  currentLevel++;

  // set level menang disini
  // if (currentLevel <= 1) {
  //   loadLevel(currentLevel);
  //   gameState = "play";
  // } else {
  //   gameState = "win";
  //   enterWinScreen();
  // }
  
if (selectedArea && areaLevels[selectedArea]) {

  if (currentLevel <= areaLevels[selectedArea].end) {
    loadLevel(currentLevel);
    gameState = "play";
  } else {
    gameState = "win";
    enterWinScreen();
  }

} else {

  // fallback ke campaign
  if (currentLevel <= 9) {
    loadLevel(currentLevel);
    gameState = "play";
  } else {
    gameState = "win";
    enterWinScreen();
  }

}
}

function gotHands(results) {
  hands = results;
}

function checkHover(trash, index) {
  if (!playUnlocked) return;
  if (!dragTrash) return;
  

  let fingersTrashDist = dist(
    trash.pos.x,
    trash.pos.y,
    fingersPos.x,
    fingersPos.y
  );
  let trashTargetDist = dist(
    trash.pos.x,
    trash.pos.y,
    trash.targetPos.x,
    trash.targetPos.y
  );

  if (distBetweenFingers < 35) {
    if (fingersTrashDist < 30) {
      if (pinchedTrash === null || pinchedTrash === index) {
        pinchedTrash = index;
        trash.pos.x = fingersPos.x;
        trash.pos.y = fingersPos.y;

        image(trash.object, trash.pos.x, trash.pos.y, 70, 70);

        textSize(12);
        fill(255, 255, 255);
        stroke(89, 26, 41);
        strokeWeight(4);
        strokeJoin(ROUND);
        text(trash.name, trash.pos.x, trash.pos.y + 50);
      }
    }
  } else {
    if (pinchedTrash === index) {
      if (trashTargetDist < 80) {
        trashs.splice(index, 1);

        result = correct;
        resultStay = millis();
        right.play();

        score += 4;
        correctHint -= 1;

        if (correctHint === 0 && !unlockHint) {
          unlockHint = true;
          showHint = true;
          unlockTime = millis();
          hintSound = false;
          correctHint = -1;
        }
      } else {
        trash.pos.x = trash.startPos.x;
        trash.pos.y = trash.startPos.y;

        result = wrong;
        resultStay = millis();

        score -= 2;
        if (score < 0) score = 0;

        error.play();
      }
      pinchedTrash = null;
    }
  }
}

function loadLevel(level) {
  currentLevel = level;

  levelCompleted = false;
  hintVisible = false;
  jedaVisible = false;
  unlockHint = false;
  showHint = false;
  
  pinchedTrash = null;

  bins = [];
  trashs = [];

  // if (level === 1) {
  //   correctHint = 2;
  // } else if (level === 2) {
  //   correctHint = 1;
  // } else if (level === 3) {
  //   correctHint = 3;
  // } else if (level === 4) {
  //   correctHint = 3;
  // } else if (level === 5) {
  //   correctHint = 2;
  // } else if (level === 6) {
  //   correctHint = 3;
  // } else if (level === 7) {
  //   correctHint = 4;
  // } else if (level === 8) {
  //   correctHint = 2;
  // } else if (level === 9) {
  //   correctHint = 5;
  // }
  //   trial hehe
  if (level === 1) {
    correctHint = 2;
  } else if (level === 2) {
    correctHint = 1;
  } else if (level === 3) {
    correctHint = 1;
  } else if (level === 4) {
    correctHint = 1;
  } else if (level === 5) {
    correctHint = 1;
  } else if (level === 6) {
    correctHint = 1;
  } else if (level === 7) {
    correctHint = 1;
  } else if (level === 8) {
    correctHint = 1;
  } else if (level === 9) {
    correctHint = 1;
  }
  // dapur
  if (level === 1) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 100, height - 45) },
      {
        object: inorganicbin,
        pos: createVector(width / 2 + 107, height - 45),
      },
    ];

    trashs = [
      {
        object: telur,
        name: "Cangkang telur",
        pos: createVector(155, 181),
        startPos: createVector(155, 181),
        targetPos: bins[0].pos,
      },
      {
        object: plastik,
        name: "Kantong plastik",
        pos: createVector(484, 254),
        startPos: createVector(484, 254),
        targetPos: bins[1].pos,
      },
      {
        object: leek,
        name: "Daun bawang",
        pos: createVector(155, 335),
        startPos: createVector(155, 335),
        targetPos: bins[0].pos,
      },
      {
        object: milk,
        name: "Karton susu",
        pos: createVector(335, 284),
        startPos: createVector(335, 284),
        targetPos: bins[1].pos,
      },
    ];
  }
  // backyard
  if (level === 2) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 100, height - 45) },
      {
        object: inorganicbin,
        pos: createVector(width / 2 + 107, height - 45),
      }, 
    ];

    trashs = [
      {
        object: daun,
        name: "Dedaunan",
        pos: createVector(425, 290),
        startPos: createVector(425, 290),
        targetPos: bins[0].pos,
      },
      {
        object: ikan,
        name: "Tulang ikan",
        pos: createVector(245, 350),
        startPos: createVector(245, 350),
        targetPos: bins[0].pos,
      },
      {
        object: plastik,
        name: "Kantong plastik",
        pos: createVector(117, 330),
        startPos: createVector(117, 330),
        targetPos: bins[1].pos,
      }, 
    ];
  }
  // taman
  if (level === 3) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 100, height - 45) },
      {
        object: inorganicbin,
        pos: createVector(width / 2 + 107, height - 45),
      },
    ];

    trashs = [
      {
        object: botol,
        name: "Botol plastik",
        pos: createVector(245, 364),
        startPos: createVector(245, 364),
        targetPos: bins[1].pos,
      },
      {
        object: snack,
        name: "Bungkusan snack",
        pos: createVector(365, 254),
        startPos: createVector(365, 254),
        targetPos: bins[1].pos,
      },
      {
        object: daun,
        name: "Dedaunan",
        pos: createVector(439, 323),
        startPos: createVector(439, 323),
        targetPos: bins[0].pos,
      },
      {
        object: koran,
        name: "Koran bekas",
        pos: createVector(280, 284),
        startPos: createVector(280, 284),
        targetPos: bins[1].pos,
      },
      {
        object: pisang,
        name: "Kulit pisang",
        pos: createVector(185, 270),
        startPos: createVector(185, 270),
        targetPos: bins[0].pos,
      },
      {
        object: ranting,
        name: "Ranting pohon",
        pos: createVector(116, 323),
        startPos: createVector(116, 323),
        targetPos: bins[0].pos,
      },
    ];
  }
  //   classroom
  if (level === 4) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 150, height - 45) },
      { object: inorganicbin, pos: createVector(width / 2, height - 45) },
      { object: hazardousbin, pos: createVector(width / 2 + 150, height - 45) },
    ];

    trashs = [
      {
        object: kaleng,
        name: "Kaleng soda",
        pos: createVector(100, 300),
        startPos: createVector(100, 300),
        targetPos: bins[1].pos,
      },
      {
        object: bohlam,
        name: "Bola lampu rusak",
        pos: createVector(435, 233),
        startPos: createVector(435, 233),
        targetPos: bins[2].pos,
      },
      {
        object: pisang,
        name: "Kulit pisang",
        pos: createVector(195, 233),
        startPos: createVector(195, 233),
        targetPos: bins[0].pos,
      },
      {
        object: ayam,
        name: "Tulang ayam",
        pos: createVector(300, 263),
        startPos: createVector(300, 263),
        targetPos: bins[0].pos,
      },
      {
        object: kertas,
        name: "Kertas bekas",
        pos: createVector(240, 329),
        startPos: createVector(240, 399),
        targetPos: bins[1].pos,
      },
    ];
  }
  //   kantin
  if (level === 5) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 150, height - 45) },
      { object: inorganicbin, pos: createVector(width / 2, height - 45) },
      { object: hazardousbin, pos: createVector(width / 2 + 150, height - 45) },
    ];

    trashs = [
      {
        object: ayam,
        name: "Tulang ayam",
        pos: createVector(155, 283),
        startPos: createVector(155, 283),
        targetPos: bins[0].pos,
      },
      {
        object: bohlam,
        name: "Bola lampu rusak",
        pos: createVector(215, 223),
        startPos: createVector(215, 223),
        targetPos: bins[2].pos,
      },
      {
        object: telur,
        name: "Cangkang telur",
        pos: createVector(355, 324),
        startPos: createVector(355, 324),
        targetPos: bins[0].pos,
      },
      {
        object: tisu,
        name: "Tisu bekas",
        pos: createVector(434, 283),
        startPos: createVector(434, 283),
        targetPos: bins[1].pos,
      },
      {
        object: milk,
        name: "Karton susu",
        pos: createVector(369, 240),
        startPos: createVector(369,240),
        targetPos: bins[1].pos,
      },
    ];
  }
  //   playground
  if (level === 6) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 150, height - 45) },
      { object: inorganicbin, pos: createVector(width / 2, height - 45) },
      { object: hazardousbin, pos: createVector(width / 2 + 150, height - 45) },
    ];

    trashs = [
      {
        object: apel,
        name: "Apel",
        pos: createVector(365, 318),
        startPos: createVector(365, 318),
        targetPos: bins[0].pos,
      },
      {
        object: bungkusKertas,
        name: "Bungkusan makanan",
        pos: createVector(444, 300),
        startPos: createVector(444, 300),
        targetPos: bins[1].pos,
      },
      {
        object: bunga,
        name: "Bunga layu",
        pos: createVector(373, 252),
        startPos: createVector(373, 252),
        targetPos: bins[0].pos,
      },
      {
        object: masker,
        name: "Masker bekas",
        pos: createVector(245, 252),
        startPos: createVector(245, 252),
        targetPos: bins[2].pos,
      },
      {
        object: ranting,
        name: "Ranting pohon",
        pos: createVector(215, 330),
        startPos: createVector(215, 330),
        targetPos: bins[0].pos,
      },
      {
        object: gelas,
        name: "Gelas plastik",
        pos: createVector(125, 210),
        startPos: createVector(125, 210),
        targetPos: bins[1].pos,
      },
    ];
  }
  //   ragunan zoo
  if (level === 7) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 150, height - 45) },
      { object: inorganicbin, pos: createVector(width / 2, height - 45) },
      { object: hazardousbin, pos: createVector(width / 2 + 150, height - 45) },
    ];

    trashs = [
      {
        object: terong,
        name: "Terong",
        pos: createVector(135, 249),
        startPos: createVector(135, 249),
        targetPos: bins[0].pos,
      },
      {
        object: daun,
        name: "Dedaunan",
        pos: createVector(109, 229),
        startPos: createVector(109, 229),
        targetPos: bins[0].pos,
      },
      {
        object: bungkusPlastik,
        name: "Bungkusan plastik",
        pos: createVector(473, 309),
        startPos: createVector(473, 309),
        targetPos: bins[1].pos,
      },
      {
        object: handSanitizer,
        name: "Hand sanitizer",
        pos: createVector(425, 249),
        startPos: createVector(425, 249),
        targetPos: bins[2].pos,
      },
      {
        object: wortel,
        name: "Wortel",
        pos: createVector(399, 359),
        startPos: createVector(399, 359),
        targetPos: bins[0].pos,
      },
      {
        object: botolKaca,
        name: "Botol kaca",
        pos: createVector(240, 348),
        startPos: createVector(240, 348),
        targetPos: bins[1].pos,
      },
    ];
  }
  // monas
  if (level === 8) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 150, height - 45) },
      { object: inorganicbin, pos: createVector(width / 2, height - 45) },
      { object: hazardousbin, pos: createVector(width / 2 + 150, height - 45) },
    ];

    trashs = [
      {
        object: botol,
        name: "Botol plastik",
        pos: createVector(117, 353),
        startPos: createVector(117, 353),
        targetPos: bins[1].pos,
      },
      {
        object: masker,
        name: "Masker bekas",
        pos: createVector(203, 276),
        startPos: createVector(203, 276),
        targetPos: bins[2].pos,
      },
      {
        object: bungkusPlastik,
        name: "Bungkusan plastik",
        pos: createVector(465, 336),
        startPos: createVector(465, 336),
        targetPos: bins[1].pos,
      },
      {
        object: roti,
        name: "Roti",
        pos: createVector(417, 270),
        startPos: createVector(417, 270),
        targetPos: bins[0].pos,
      },
    ];
  }
  // beach
  if (level === 9) {
    bins = [
      { object: organicbin, pos: createVector(width / 2 - 150, height - 45) },
      { object: inorganicbin, pos: createVector(width / 2, height - 45) },
      { object: hazardousbin, pos: createVector(width / 2 + 150, height - 45) },
    ];

    trashs = [
      {
        object: kelapa,
        name: "Batok kelapa",
        pos: createVector(136, 240),
        startPos: createVector(136, 240),
        targetPos: bins[0].pos,
      },
      {
        object: mcd,
        name: "Bungkusan makanan",
        pos: createVector(86, 340),
        startPos: createVector(86, 340),
        targetPos: bins[1].pos,
      },
      {
        object: ikan,
        name: "Tulang ikan",
        pos: createVector(385, 340),
        startPos: createVector(385, 340),
        targetPos: bins[0].pos,
      },
      {
        object: baygon,
        name: "Semprotan anti nyamuk",
        pos: createVector(300, 259),
        startPos: createVector(300, 259),
        targetPos: bins[2].pos,
      },
      {
        object: sandal,
        name: "Sandal bekas",
        pos: createVector(474, 340),
        startPos: createVector(474, 340),
        targetPos: bins[1].pos,
      },
      {
        object: batre,
        name: "Baterai bekas",
        pos: createVector(444, 229),
        startPos: createVector(444, 229),
        targetPos: bins[2].pos,
      },
      {
        object: ranting,
        name: "Ranting pohon",
        pos: createVector(270, 330),
        startPos: createVector(270, 330),
        targetPos: bins[0].pos,
      },
    ];
  }
  
  playUnlocked = true;
  dragTrash = true;
  levelStarted = true;
  console.log("TRASH COUNT:", trashs.length);
}

function jedaIcon() {
  push();

  image(jeda, width - 52, 37, 38, 38);
  fill(255, 255, 255);
  stroke(89, 26, 41);
  strokeWeight(4);
  textSize(12);
  text("Jeda", width - 52, 71);

  pop();

  if (gameState !== "play") return;
  if (jedaVisible || hintVisible) return;

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width - 71 &&
        fingersX < width - 33 &&
        fingersY > 18 &&
        fingersY < 56
      ) {
        image(jeda, width - 52, 37, 43, 43);
        let now = millis();

        if (now - lastJedaTime > jedaCooldown) {
          jedaVisible = true;
          click.play();
          lastJedaTime = now;
        }
      }
    }
  }
}

function scoreCount() {
  push();

  fill(255, 255, 255);
  stroke(89, 26, 41);
  strokeWeight(5);
  textSize(40);
  text(score, width / 2, 120);

  pop();
}

function promptHint() {
  image(unlockedhint, width / 2, height / 2, 220, 145);
}

function hintIcon() {
  push();

  image(bantuan, width - 120, 37, 39, 38);

  fill(255, 255, 255);
  stroke(89, 26, 41);
  strokeWeight(4);
  textSize(12);
  text("Bantuan", width - 120, 71);

  pop();
  if (gameState !== "play") return;
  if (jedaVisible || hintVisible) return;

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width - 139 &&
        fingersX < width - 100 &&
        fingersY > 18 &&
        fingersY < 56
      ) {
        image(bantuan, width - 120, 37, 44, 43);
        let now = millis();

        if (now - lastHintTime > hintCooldown) {
          hintVisible = true;
          click.play();
          lastHintTime = now;
        }
      }
    }
  }
}

function needHint() {
  if (!unlockHint && correctHint > 0) {
    push();

    image(collecthintlabel, width / 2, 155, 282, 37);
    fill(255, 255, 255);
    stroke(89, 26, 41);
    strokeWeight(5);
    textSize(15);
    text(correctHint, width / 2 - 81, 162);

    pop();
  }
}
function displayJeda() {
  dragTrash = false;
  push();
  fill(92, 106, 158, 150);
  rect(0, 0, width, height);
  pop();

  push();

  image(jedaPage, width / 2, height / 2, width, height);
  image(lanjutButton, width / 2, height - 130, 248, 60);
  pop();

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);

    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width / 2 - 124 &&
        fingersX < width / 2 + 124 &&
        fingersY > height - 160 &&
        fingersY < height - 100
      ) {
        jedaVisible = false;
        dragTrash = true;
        click.play();
      }
    }
  }
}
function displayHint() {
  dragTrash = false;
  push();
  fill(92, 106, 158, 150);
  rect(0, 0, width, height);
  pop();
  push();

  let hintImg = getCurrentHint();
  image(hintImg, width / 2, height / 2, width, height);

  image(closeHint, width / 2, height - 83, 182, 60);
  pop();

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);

    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width / 2 - 91 &&
        fingersX < width / 2 + 91 &&
        fingersY > height - 113 &&
        fingersY < height - 53
      ) {
        hintVisible = false;
        dragTrash = true;
        click.play();
      }
    }
  }
}

function getCurrentHint() {
  return hintContents[currentLevel];
}
function getCurrentReward() {
  return rewardLevels[currentLevel];
}

function enterRewardScreen() {
  rewardShow = millis();
  claimUnlocked = false;

  let badgeImg = getCurrentReward();

  if (badgeImg && badgeImg.reset) {
    badgeImg.reset(); 
    badgeImg.play();
  }
}

function enterWinScreen() {
  song.stop();
  winStartTime = millis();
  winReady = false;
  winPlayed = false;

  //   ini untuk level 1,2,3
  // if (score >= 40) {
  //   bgWin = win1;
  // } else if (score >= 20) {
  //   bgWin = win2;
  // } else {
  //   bgWin = win3;
  // }
  //   only for  level 2 and 3
  // if (score >= 95) {
  //   bgWin = win1;
  // } else if (score >= 50) {
  //   bgWin = win2;
  // } else {
  //   bgWin = win3;
  // }

  //   ini untuk overall level 9
  // if (score >= 120) {
  //    bgWin = win1;
  //  } else if (score >= 60) {
  //    bgWin = win2;
  //  }  else {
  //    bgWin = win3;
  //  }

  if (score >= 40) {
    bgWin = win1;
  } else if (score >= 20) {
    bgWin = win2;
  } else {
    bgWin = win3;
  }

  if (bgWin && bgWin.reset) {
    bgWin.reset();
    bgWin.play();
  }
}

function winScreen() {
  if (!winReady && millis() - winStartTime > 3000) {
    winReady = true;
  }

  image(bgWin, width / 2, height / 2, width, height);

  if (bgWin && bgWin.numFrames) {
    if (bgWin.getCurrentFrame() === bgWin.numFrames() - 1) {
      bgWin.pause(); // freeze on last frame
    }

    textFont(font1);
    fill(255, 255, 255);
    stroke(89, 26, 41);
    strokeWeight(6);
    textSize(24);
    text(score, width / 2, height / 2 + 107);

    if (!winPlayed) {
      win.play();
      winPlayed = true;
    }
    playagainButton();
    exitButton();
  }
}

function playagainButton() {
  image(playagain, width / 2 - 120, height / 2 + 175, 196, 60);
  if (!winReady) return;

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width / 2 - 120 - 98 &&
        fingersX < width / 2 - 120 + 98 &&
        fingersY > height / 2 + 175 - 30 &&
        fingersY < height / 2 + 175 + 30
      ) {
        winPlayed = true;
        // gameState = "play";
        // currentLevel = 1;
        // score = 0;

        // resetGame("choose");
        gameState = "choose"
        click.play();
        if (!song.isPlaying()) {
    song.loop();
  }
      }
    }
  }
}

function exitButton() {
  image(exit, width / 2 + 128, height / 2 + 175, 196, 60);

  if (!winReady) return;
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      let btnLeft = width / 2 + 128 - 98;
      let btnRight = width / 2 + 128 + 98;
      let btnTop = height / 2 + 175 - 30;
      let btnBottom = height / 2 + 175 + 30;

      if (
        fingersX > btnLeft &&
        fingersX < btnRight &&
        fingersY > btnTop &&
        fingersY < btnBottom
      ) {
        // win.stop();
        // winPlayed = true;
        // gameState = "landing";
        // delayStartButton = true;
        // landingStartTime = millis();
        // click.play();
        // score = 0;

         win.stop();
         resetGameVariables();

  // balik ke landing
  gameState = "landing";

  click.play();
      }
    }
  }
}

function chooseLevel() {
  image(chooseBg, width / 2, height / 2, width, height);

  levelRumah();
  levelSekolah();
  levelRekreasi();

  image(tutor, width - 52, 37, 38, 38);
  image(beranda, 52, 37, 37, 38);
}

function levelRumah() {
  image(perumahan, 135, height / 2 + 50, 141, 153);

  //   click area
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > 64 &&
        fingersX < 206 &&
        fingersY > height / 2 - 27 &&
        fingersY < height / 2 + 127
      ) {
        image(perumahan, 135, height / 2 + 50, 149, 161);

        selectedArea = "perumahan";
        isCampaignMode = false;
currentLevel = areaLevels.perumahan.start;
        resetAreaProgress();
        loadLevel(currentLevel);
        startFade("play");
      }
    }
  }
}
function levelSekolah() {
  image(sekolah, width / 2, height / 2 + 50, 141, 153);
  
   //   click area
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX >  width / 2 - 70.5 &&
        fingersX <  width / 2 + 70.5 &&
        fingersY > height / 2 + 50 - 76.5 &&
        fingersY < height / 2 + 50 + 76.5
      ) {
        image(sekolah, width / 2, height / 2 + 50, 149, 161);

        selectedArea = "sekolah";
currentLevel = areaLevels[selectedArea].start;
        resetAreaProgress();
        loadLevel(currentLevel);
        startFade("play");
      }
    }
  }
}
function levelRekreasi() {
  image(rekreasi, width - 135, height / 2 + 50, 141, 153);

  //   click area
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX >  width - 135 - 70.5 &&
        fingersX <  width - 135 + 70.5 &&
        fingersY > height / 2 + 50 - 76.5 &&
        fingersY < height / 2 + 50 + 76.5
      ) {
        image(rekreasi, width - 135, height / 2 + 50, 149, 161);

        selectedArea = "rekreasi";
currentLevel = areaLevels[selectedArea].start;
        resetAreaProgress();
        loadLevel(currentLevel);
        startFade("play");
      }
    }
  }
}

function resetAreaProgress() {
  score = 0;
  levelCompleted = false;
  // selectedArea = null;
}
function handVisual() {
  index = hands[0].keypoints[8];
  thumb = hands[0].keypoints[4];
  distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);

  let fingersX = (index.x + thumb.x) * 0.5;
  let fingersY = (index.y + thumb.y) * 0.5;
  fingersPos = createVector(fingersX, fingersY);

  fill(255, 0, 0, 120);
  noStroke();
  ellipse(index.x, index.y, 25, 25);
  ellipse(thumb.x, thumb.y, 25, 25);

  for (let i = 0; i < trashs.length; i++) {
    let trash = trashs[i];
    checkHover(trash, i);
  }
}
function resetGameVariables() {

  // Level
  currentLevel = 1;
  levelCompleted = false;
  levelStarted = false;

  // Score & Reward
  score = 0;
  winReady = false;
  winPlayed = false;

  // UI
  hintVisible = false;
  jedaVisible = false;
  showHint = false;

  // Asset terkait reward
  badgeImg = null;

  calibrated = false;
  calibrateStartTime = 0;



}