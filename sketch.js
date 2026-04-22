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
let success;
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
let hintDuration = 1500;
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
let introSoundPlayed = false;
// calib hand
let checkingStartTime = 0;
let handValid = false;
let handHoldStart = 0;
let holdDuration = 3000; //
let calibrateFinished = false;
let calibratePhase = "intro";
let phaseStartTime = 0;
let calibHandSound = false;

let showCorrectIcon = false;
let correctStartTime = 0;
let correctDuration = 3000; //
let correctSoundPlayed = false;
// calib open
let OpenChecking = false;
let OpenStartTime = 0;
let OpenDuration = 2000;
let openIntro = true;
let openIntroStart = 0;
let openIntroDuration = 3000; //durasi gif open
let calibOpenSound = false;

let pickPhase = "preview";
let calibPinchSound = false;
// calib pinch
let pinchChecking = false;
let pinchStartTime = 0;
let pinchDuration = 1500;
let pinchIntro = true;
let pinchIntroStart = 0;
let pinchIntroDuration = 3000; //durasi gif pinch

// calib pick trash
let calibPickPlayed = false;
let pickStartSoundPlayed = false;
let pickEndSoundPlayed = false;

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

let calibThrowPlayed = false;
let dragEndSoundPlayed = false;

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
let transSoundPlayed = false;
// not first time user
let hasCompletedTutorial = false;

let mulaiUnlocked = false;
let mulaiDelay = 3000;
let mulaiStartTime = 0;
let mulaiClicked = false;

let skipClicked = false;

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
let areaScoreConfig = {
  perumahan: {      // max 52
    high: 42,       // 80% dari 52
    mid: 26         // 50% dari 52
  },

  sekolah: {        // max 64
    high: 51,       // 80% dari 64
    mid: 32         // 50% dari 64
  },

  rekreasi: {       // max 68
    high: 54,       // 80% dari 68
    mid: 34         // 50% dari 68
  },

  full: {           // max 184
    high: 148,      // 80% dari 184
    mid: 92         // 50% dari 184
  }
};

let levelStarted = false;
let levelLoaded = false;

let calibrateFromChoose = false;

let berandaCooldown = false;
let tutorCooldown = false;

let minHandHeight = 94; // hand too far if smaller
let maxHandHeight = 122; // hand too close if bigger

// safezone

// delay tangan
let inputLocked = false;
let inputUnlockTime = 0;

  // BGM
let currentMusic = null;
let lastGameState = "";
// LEVEL INTRO
let showLevelIntro = false;
let levelIntroStart = 0;
let levelIntroDuration = 2000;

let levelIntroImages = [];
let impactGood, impactMid, impactBad;
let lihatskor;
let impactStartTime = 0;

let rain;
let bird;
let river;
let impactSoundPlayed = false;
let currentImpactSound = null;

// calib bg
let bodySegmentation;
let segmentation;

let isSegmentationRunning = false;
 // BG METRICS
let contrastRatio = 0;
let brightnessAvg = 0;
let bgComplexity = 0;

// CONDITIONS
let lightStatus = "good";
let isBackgroundBusy = false;
let goodContrast = false;

// BG STATE
let canTrigger = true;  
let bgHoldStart = 0;
let bgValid = false;

let centerX;
let startY;
let spacing = 70;

// let contrastScore = 0;
// let brightnessAvg = 0;
// let bgComplexity = 0;

// let isReady = false;
// let isTooDark = false;
// let isTooBright = false;
// let isBackgroundBusy = false;
// let goodContrast = false;

// let segOptions = {
//   maskType: "background",
// };

// let readyFrames = 0;
// let REQUIRED_FRAMES = 30; // ~1 second at 30fps

// let calibTooDark, calibTooBright, calibBusy, calibContrast, calibGood;
// let isSegmentationRunning = false;

// let handDetectedInBg = false;
// let handHoldStartBg = 0;
// let contrastRatio = 0;



function preload() {
  calibTooDark = loadImage("calibrate/BG_GELAP.png");
  calibTooBright = loadImage("calibrate/BG_TERANG.png");
  calibBusy = loadImage("calibrate/BG_RAMAI.png");
  calibContrast = loadImage("calibrate/BG_CONTRAST.png");
  calibGood = loadImage("calibrate/BG_GOOD.png");
  // handPose = ml5.handPose({ flipped: true });
  loading = loadImage("background/LOADING.gif");
  font1 = loadFont("font/Qilka.otf");
 
  // background
  landingBg = loadImage("background/LANDING.png");
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
  calibpop = loadSound("sfx/pop.mp3");
  click = loadSound("sfx/click3.mp3");
  claim = loadSound("sfx/claim2.mp3");
  unlocked = loadSound("sfx/bantuan_unlock.mp3");
  reward = loadSound("sfx/reward.mp3");
  win = loadSound("sfx/win_sound.mp3");
  success = loadSound("sfx/correct.mp3");
  error = loadSound("sfx/incorrect.mp3");
  readytoplay = loadSound("sfx/readytoplay2.mp3");
  playvideo = loadSound("sfx/videoon.mp3");


  calibbg = loadImage("calibrate/CALIB_BG.png");
  calib1 = loadImage("calibrate/CALIB_1.png");
  calibbegron = loadImage("calibrate/CALIB_BEGRON.png");
  calib3 = loadImage("calibrate/CALIB_3.png");
  calib4 = loadImage("calibrate/CALIB_4.png");
  calib5 = loadImage("calibrate/CALIB_5.png");
  calib6 = loadImage("calibrate/CALIB_6.png");

  calibintro = loadImage("calibrate/CALIB_INTRO.gif");
  calibpick = loadImage("calibrate/PICK_TUTORIAL2.gif");
  calibdrag = loadImage("calibrate/REVISED_THROW.gif");
  calibtrans = loadImage("calibrate/CALIB_FINISHED.gif");

  hi5 = loadImage("calibrate/HI5.png");
  openhand = loadImage("calibrate/OPENHAND.png");
  pinchhand = loadImage("calibrate/PINCHHAND.png");

  mulaiButton = loadImage("calibrate/MULAIBERMAIN_BUTTON.png");

  // calib bg
    good = loadImage("calibrate/ALLGOOD.png");
  bad = loadImage("calibrate/BADCONDITION.png");
  angkatlagi = loadImage("calibrate/SUDAHPINDAH.png");
  caliblatar = loadImage("calibrate/CALIBBG_BG.png");
  angkat1 = loadImage("calibrate/angkat1.png");
  caliblatarins = loadImage("calibrate/INSTRUCTION1.png");

  // choose
  perumahan = loadImage("choose/PERUMAHAN.png");
  sekolah = loadImage("choose/SEKOLAH.png");
  rekreasi = loadImage("choose/REKREASI.png");
  chooseBg = loadImage("choose/CHOOSE_LEVEL.png");
  tutor = loadImage("choose/TUTOR_ICON.png");
  beranda = loadImage("choose/BERANDA_ICON.png");

// bgm
  landingBgm = loadSound("sfx/landingBgm.mp3");
  // levelBgm = loadSound("sfx/doodle.mp3");
  houseBgm = loadSound("sfx/houseBgm.mp3");
  schoolBgm = loadSound("sfx/schoolBgm.mp3");
  rekreasiBgm = loadSound("sfx/rekreasiBgm.mp3");
  rain = loadSound("sfx/RAIN.mp3");
  bird = loadSound("sfx/BIRD.mp3");
  river = loadSound("sfx/RIVER.mp3");
// level intro
  levelIntroImages[1] = loadImage("ui/lv1.png");
  levelIntroImages[4] = loadImage("ui/lv2.png");
  levelIntroImages[7] = loadImage("ui/lv3.png");
  // impact score
    // impact images (sesuai score)
  impactGood = loadImage("win/GOODIMPACT.gif"); 
  impactMid  = loadImage("win/MIDIMPACT.gif");   
  impactBad  = loadImage("win/BANJIR.gif");    
  // tombol ke win screen
  lihatskor = loadImage("ui/LIATSKOR_BUTTON.png");
}

function setup() {
  canvas = createCanvas(640, 480);
  imageMode(CENTER);
  textAlign(CENTER);

  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  // video.position(canvas.width + 100, 0);
  // video.hide();

  handPose = ml5.handPose({ flipped: true }, () => {
    handPose.detectStart(video, gotHands);

    bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", {
  maskType: "background",
});

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
    // currentLevel = 9;
    // loadLevel(currentLevel);
    // gameState = "play";
    gameState = "calibrate";
  }

  centerX = 100;
  startY = height / 2 - 90;
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
    // bgm logic
  if (gameState !== lastGameState) {

    if (gameState === "landing" || gameState === "calibrate" || gameState === "choose") {
      playMusic(landingBgm);
    } 
    
    else if (gameState === "play") {
      playMusic(getLevelMusic(currentLevel));
    }
     else if (gameState === "impact") {
    if (currentMusic) {
      currentMusic.stop();
      currentMusic = null;
    }
    impactSoundPlayed = false;
  }

  else if (gameState === "win") {

    if (currentImpactSound && currentImpactSound.isPlaying()) {
      currentImpactSound.stop();
      currentImpactSound = null;
    }
  }

    lastGameState = gameState;
  }

  imageMode(CENTER);
  textFont(font1);
  image(video, width / 2, height / 2, width, height);
  console.log(gameState);
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

      if (!levelLoaded) {
    loadLevel(currentLevel);
    levelLoaded = true;
    levelStarted = false;

      if (currentLevel === 1 || currentLevel === 4 || currentLevel === 7) {
    showLevelIntro = true;
    levelIntroStart = millis();
    inputLocked = true;
  }
  }

    playGame();

    
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
  } else if (gameState === "impact") {
  impactScreen();

    if (!impactSoundPlayed) {
    playImpactSound();
    impactSoundPlayed = true;
  }

    if (!isFading && millis() - impactStartTime > 3000) {
    inputLocked = false;
    detectHandImpactButton();
  }

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

  if (isFading) {
    fadeAlpha += 10 * fadeDirection;

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
function getLevelMusic(level) {
  if (level >= 1 && level <= 3) {
    return houseBgm;
  } 
  else if (level >= 4 && level <= 6) {
    return schoolBgm;
  } 
  else if (level >= 7 && level <= 9) {
    return rekreasiBgm;
  }
}
function playMusic(track) {
  if (currentMusic !== track) {
    if (currentMusic) {
      currentMusic.stop();
    }
    currentMusic = track;
    currentMusic.loop();
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

  // song.loop();
  click.play();
  winPlayed = false;

//   if (!song.isPlaying()) {
//   song.loop();
// }

  if (hasCompletedTutorial) {

    gameState = "choose";

  } else {


calibrateStep = 1;
    resetCalibrateState();
calibrateFromChoose = false;
gameState = "calibrate";
  }

}
// draw calib
function resetCalibrateState() {

  nextCalibrateStep = null;

  introFinished = false;

  canTrigger = true;
bgValid = false;
bgHoldStart = 0;

  calibintro.setFrame(0);
  calibintro.play();

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
    // 🔥 HANDLE SEGMENTATION ON/OFF
  if (calibrateStep === 2 && !isSegmentationRunning) {
    bodySegmentation.detectStart(video, gotSegmentationResults);
    isSegmentationRunning = true;
  }

  if (calibrateStep !== 2 && isSegmentationRunning) {
    bodySegmentation.detectStop();
    isSegmentationRunning = false;
  }

  if (calibrateStep === 1) {
    showCalibrateIntro();
  } else if (calibrateStep === 2) {
    showCalibrateBg();
  } else if (calibrateStep === 3) {
    showCalibratehand();
  } else if (calibrateStep === 4) {
    showCalibrateOpen();
  } else if (calibrateStep === 5) {
    showCalibratePinch();
  } else if (calibrateStep === 6) {
    showCalibratePick();
  } else if (calibrateStep === 7) {
    showCalibrateThrow();
  } else if (calibrateStep === 8) {
    showCalibrateTransition();
  }
}
function showCalibrateIntro() {
    if (!introSoundPlayed) {
    calibpop.play();
    introSoundPlayed = true;
  }

  image(calibbg, width / 2, height / 2, width, height);

  image(calibintro, width / 2, height / 2, width, height);

if (!introFinished &&
    calibintro.getCurrentFrame() >= calibintro.numFrames() - 2) {

  calibintro.pause();
  introFinished = true;
  introSoundPlayed = false;
  nextCalibrateStep = 2;
}
}

function showCalibratehand() {
      image(calib1, width / 2, height / 2, width, height);
      if (!calibHandSound) {
    calibpop.play();
    calibHandSound = true;
  }

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

     if (!correctSoundPlayed) {
    success.play();
    correctSoundPlayed = true;
  }

    image(correct, width / 2, height / 2 - 20, 100, 100);

    textSize(18);
    fill(255);
    stroke(89, 26, 41);
    strokeWeight(4);
    text(
  "Tetap di posisi ini ya,\nbiar permainannya lancar!",
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
    nextCalibrateStep = 4;
    calibHandSound = false;
    return;
  }

  // ================= CHECKING =================

let safeBoxWidth = 540;
let safeBoxHeight = 380;

let left = (width - safeBoxWidth) / 2;
let right = left + safeBoxWidth;
let top = (height - safeBoxHeight) / 2;
let bottom = top + safeBoxHeight;

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
        boxColor = color(255, 255, 0);
        handValid = false;
        handHoldStart = 0;
      }

      else if (handHeight > maxHandHeight) {
        handMessage = "Mundur sedikit dari kamera";
        boxColor = color(255, 255, 0);
        handValid = false;
        handHoldStart = 0;
      }

      else {

        boxColor = color(0, 255, 0);

        if (!handValid) {
          handHoldStart = millis();
          handValid = true;
        }

        let holdTime = millis() - handHoldStart;

// hitung sisa waktu (3 detik)
let remainingTime = ceil((holdDuration - holdTime) / 1000);

// tampilkan countdown
if (remainingTime > 0) {
  handMessage = "Bagus, tahan...";
  
  textSize(40);
  fill(255);
  stroke(89, 26, 41);
  strokeWeight(6);
  textAlign(CENTER);
  text(remainingTime, width / 2, height / 2 + 40);
}

if (holdTime >= holdDuration) {
  calibratePhase = "correct";
  phaseStartTime = millis();
  handMessage = "";
  correctSoundPlayed = false;
}
      }
    }
  }

  // ================= SAFEZONE DRAW =================

stroke(boxColor);
strokeWeight(3);
drawingContext.setLineDash([10, 10]);
noFill();
rect(left, top, safeBoxWidth, safeBoxHeight);
drawingContext.setLineDash([]);

  image(calib1, width / 2, height / 2, width, height);

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
    if (!calibOpenSound) {
   calibpop.play();
    calibOpenSound = true;
  }


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

    if (!correctSoundPlayed) {
    success.play();
    correctSoundPlayed = true;
  }

    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - phaseStartTime >= correctDuration) {
      calibratePhase = "done";
      phaseStartTime = 0;
    }

    return;
  }

  // ================= DONE =================
  if (calibratePhase === "done") {
    nextCalibrateStep = 5;
    calibOpenSound = false;
    return;
  }

  // ================= CHECKING =================
let safeBoxWidth = 540;
let safeBoxHeight = 380;

let left = (width - safeBoxWidth) / 2;
let right = left + safeBoxWidth;
let top = (height - safeBoxHeight) / 2;
let bottom = top + safeBoxHeight;

let boxColor = color(255, 0, 0);
handMessage = "";

 if (hands.length === 0) {

  handValid = false;
  handHoldStart = 0;
  handMessage = "Tangan tidak terdeteksi";

} else {

  let kp = hands[0].keypoints;

  // ===== HITUNG BOUNDING BOX =====
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let p of kp) {
    minX = min(p.x, minX);
    maxX = max(p.x, maxX);
    minY = min(p.y, minY);
    maxY = max(p.y, maxY);
  }

  let inFrame =
    minX > left - 15 &&
    maxX < right + 15 &&
    minY > top - 15 &&
    maxY < bottom + 15;

  if (!inFrame) {

    handValid = false;
    handHoldStart = 0;
    handMessage = "Masukkan tangan ke dalam kotak";

  } else {

    // ===== CEK POSE OPEN =====
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

      boxColor = color(255, 255, 0);
      handValid = false;
      handHoldStart = 0;
      handMessage = "Buka jempol & telunjuk lebih lebar";

    } else {

      boxColor = color(0, 255, 0);

      if (!handValid) {
        handHoldStart = millis();
        handValid = true;
      }

      let holdTime = millis() - handHoldStart;
      let remainingTime = ceil((OpenDuration - holdTime) / 1000);

      if (remainingTime > 0) {

        handMessage = "Bagus, tahan...";

        textSize(40);
        fill(255);
        stroke(89, 26, 41);
        strokeWeight(6);
        text(remainingTime, width / 2, height / 2 + 40);
      }

      if (holdTime >= OpenDuration) {
        calibratePhase = "correct";
        phaseStartTime = millis();
        handMessage = "";
        correctSoundPlayed = false;
      }
    }
  }
}
// SAFEZONE
stroke(boxColor);
strokeWeight(3);
drawingContext.setLineDash([10, 10]);
noFill();
rect(left, top, safeBoxWidth, safeBoxHeight);
drawingContext.setLineDash([]);

image(calib3, width / 2, height / 2, width, height);

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
    if (!calibPinchSound) {
    calibpop.play();
    calibPinchSound = true;
  }

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

      if (!correctSoundPlayed) {
    success.play();
    correctSoundPlayed = true;
  }
    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - phaseStartTime >= correctDuration) {
      calibratePhase = "done";
      phaseStartTime = 0;
    }

    return;
  }

  if (calibratePhase === "done") {
    calibPinchSound = false;
    nextCalibrateStep = 6;

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
 let safeBoxWidth = 540;
let safeBoxHeight = 380;

let left = (width - safeBoxWidth) / 2;
let right = left + safeBoxWidth;
let top = (height - safeBoxHeight) / 2;
let bottom = top + safeBoxHeight;

let boxColor = color(255, 0, 0);
handMessage = "";

 if (hands.length === 0) {

  handValid = false;
  handHoldStart = 0;
  handMessage = "Tangan tidak terdeteksi";

} else {

  let kp = hands[0].keypoints;

  // ===== BOUNDING BOX =====
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let p of kp) {
    minX = min(p.x, minX);
    maxX = max(p.x, maxX);
    minY = min(p.y, minY);
    maxY = max(p.y, maxY);
  }

  let inFrame =
    minX > left - 15 &&
    maxX < right + 15 &&
    minY > top - 15 &&
    maxY < bottom + 15;

  if (!inFrame) {

    handValid = false;
    handHoldStart = 0;
    handMessage = "Masukkan tangan ke dalam kotak";

  } else {

    let index = kp[8];
    let thumb = kp[4];
    let distance = dist(index.x, index.y, thumb.x, thumb.y);
    let isPinch = distance < 25;

    if (!isPinch) {

      boxColor = color(255, 255, 0);
      handValid = false;
      handHoldStart = 0;
      handMessage = "Satukan jempol & telunjuk";

    } else {

      boxColor = color(0, 255, 0);

      if (!handValid) {
        handHoldStart = millis();
        handValid = true;
      }

      let holdTime = millis() - handHoldStart;
      let remainingTime = ceil((pinchDuration - holdTime) / 1000);

      if (remainingTime > 0) {

        handMessage = "Bagus, tahan...";

        textSize(40);
        fill(255);
        stroke(89, 26, 41);
        strokeWeight(6);
        text(remainingTime, width / 2, height / 2 + 40);
      }

      if (holdTime >= pinchDuration) {
        calibratePhase = "correct";
        phaseStartTime = millis();
        handMessage = "";
        correctSoundPlayed = false;
      }
    }
  }
}

// SAFEZONE
stroke(boxColor);
strokeWeight(3);
drawingContext.setLineDash([10, 10]);
noFill();
rect(left, top, safeBoxWidth, safeBoxHeight);
drawingContext.setLineDash([]);

image(calib4, width / 2, height / 2, width, height);
  // TEXT
  if (handMessage !== "") {
    textSize(18);
    fill(255);
    stroke(89, 26, 41);
    strokeWeight(4);
    text(handMessage, width / 2, height / 2);
  }
}
function gotSegmentationResults(result) {
  segmentation = result;

  console.log("Segmentation callback fired at", millis());
}

function getLuminance(r, g, b) {
  let srgb = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function isHandRaised() {
  if (hands.length === 0) return false;

  let wrist = hands[0].keypoints[0];
  let index = hands[0].keypoints[8];

  return index.y < wrist.y - 10;
}

// ===== MAIN ANALYSIS =====
function analyzeScene() {
  // ===== GUARD (ANTI CRASH) =====
  if (!segmentation || hands.length === 0) return;

  video.loadPixels();
  segmentation.mask.loadPixels();

  let fgR = 0, fgG = 0, fgB = 0, fgCount = 0;
  let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;

  let brightnessTotal = 0;
  let bgDiffSum = 0;
  let prevBgBrightness = null;

  let keypoints = hands[0].keypoints;

  for (let i = 0; i < video.pixels.length; i += 4) {
    let x = (i / 4) % video.width;
    let y = floor((i / 4) / video.width);

    let r = video.pixels[i];
    let g = video.pixels[i + 1];
    let b = video.pixels[i + 2];

    let brightness = (r + g + b) / 3;
    brightnessTotal += brightness;

    let maskValue = segmentation.mask.pixels[i];

    // ===== detect hand pixel =====
    let isHandPixel = false;
    for (let p of keypoints) {
      if (dist(x, y, p.x, p.y) < 30) {
        isHandPixel = true;
        break;
      }
    }

    if (isHandPixel) {
      fgR += r;
      fgG += g;
      fgB += b;
      fgCount++;
    } 
    else if (maskValue < 128) { // ✅ FIX (lebih stabil)
      bgR += r;
      bgG += g;
      bgB += b;
      bgCount++;

      if (prevBgBrightness !== null) {
        bgDiffSum += abs(brightness - prevBgBrightness);
      }
      prevBgBrightness = brightness;
    }
  }

  // ===== AVERAGES =====
  let fgAvgR = fgCount ? fgR / fgCount : 0;
  let fgAvgG = fgCount ? fgG / fgCount : 0;
  let fgAvgB = fgCount ? fgB / fgCount : 0;

  let bgAvgR = bgCount ? bgR / bgCount : 0;
  let bgAvgG = bgCount ? bgG / bgCount : 0;
  let bgAvgB = bgCount ? bgB / bgCount : 0;

  // ===== CONTRAST =====
  let L1 = getLuminance(fgAvgR, fgAvgG, fgAvgB);
  let L2 = getLuminance(bgAvgR, bgAvgG, bgAvgB);

  contrastRatio = (max(L1, L2) + 0.05) / (min(L1, L2) + 0.05);

  // ===== METRICS =====
  brightnessAvg = brightnessTotal / (video.pixels.length / 4);
  bgComplexity = bgCount ? bgDiffSum / bgCount : 0;

  // ===== CONDITIONS =====
  lightStatus = brightnessAvg < 97 ? "dark"
               : brightnessAvg > 200 ? "bright"
               : "good";

  isBackgroundBusy = bgComplexity > 3.8;
  goodContrast = contrastRatio >= 1;

  // optional debug (udah clean)
  console.log("Brightness:", brightnessAvg.toFixed(1));
  console.log("BG Complexity:", bgComplexity.toFixed(2));
  console.log("Contrast:", contrastRatio.toFixed(2));
}

// ===== FEEDBACK MAPPING =====
function getFeedback() {
  return {
    light: lightStatus,
    bg: !isBackgroundBusy,
    contrast: goodContrast
  };
}
function showResultUI() {
  let fb = getFeedback();
  let allGood = (fb.light === "good") && fb.bg && fb.contrast;

  textAlign(CENTER);

  if (allGood) {
    image(good, width / 2, height - 82, 588, 112);
    image(correct, width / 2, height / 2 - 20, 100, 100);
  } else {
    image(bad, width / 2, height - 82, 588, 112);
  }

  drawLightLabel(centerX, startY + spacing * 0, fb.light);
  drawLabel(centerX, startY + spacing * 1, fb.bg, "Latar Sepi", "Latar Ramai");
  drawLabel(centerX, startY + spacing * 2, fb.contrast, "Warna Latar Beda", "Warna Latar Mirip");
}

function drawTextStroke(str, x, y) {
  let offset = 0.3; // ketebalan stroke

  fill(0); // warna stroke (misal hitam)

  // gambar text di sekeliling (8 arah)
  text(str, x - offset, y);
  text(str, x + offset, y);
  text(str, x, y - offset);
  text(str, x, y + offset);

  text(str, x - offset, y - offset);
  text(str, x + offset, y - offset);
  text(str, x - offset, y + offset);
  text(str, x + offset, y + offset);

  // ===== MAIN TEXT (CENTER) =====
  fill(255); // warna utama
  text(str, x, y);
}
// ===== DRAW LABEL =====
function drawLabel(x, y, isGood, goodText, badText) {
  push();
  rectMode(CENTER);

  let label = isGood ? goodText : badText;


  if (!label) {
    label = isGood ? "OK" : "NOT OK";
  }

  let bgColor = isGood ? color (122, 220, 171) : color(255, 93, 86);

  stroke(89, 26, 41);
  strokeWeight(5);
  strokeJoin(ROUND);
  fill(bgColor);
  rect(x, y, 148, 50, 14);

  fill(255);
  strokeWeight(4);
  textSize(14);
  drawTextStroke(label, x, y + 5);

  pop();
}
function drawLightLabel(x, y, status) {
  let textLabel;
  let isGood = false;

  if (status === "good") {
    textLabel = "Cahaya Pas";
    isGood = true;

  } else if (status === "dark") {
    textLabel = "Terlalu Gelap";

  } else if (status === "bright") {
    textLabel = "Terlalu Silau";
  }

  drawLabel(x, y, isGood, textLabel, textLabel);
}

function showCalibrateBg() {
  image(caliblatar, width / 2, height / 2, width, height);
  let raised = hands.length > 0 && isHandRaised();

  // ================= INTRO =================
  if (calibratePhase === "intro") {
    image(angkat1, width / 2, height / 2, 227, 139);
    image(caliblatarins, width / 2, height - 82, 588, 112);
    calibratePhase = "checking";
    canTrigger = true;
    return;
  }

  // ================= CHECKING =================
  if (calibratePhase === "checking") {
    if (!raised) {
      image(angkat1, width / 2, height / 2, 227, 139);
      image(caliblatarins, width / 2, height - 82, 588, 112);
      return;
    }

    if (raised && canTrigger) {
      checkStartTime = millis();
      calibratePhase = "checkingDelay";
      canTrigger = false; // blok sampai tangan turun untuk recheck
      return;
    }
    return;
  }

  // ================= MEMERIKSA DELAY 3 DETIK =================
  if (calibratePhase === "checkingDelay") {
    textSize(20);
    fill(255);
    stroke(0);
    strokeWeight(3);
    text("Memeriksa...", width / 2, height / 2);

    if (millis() - checkStartTime > 1200) {
      analyzeScene();
      let fb = getFeedback();
      bgValid = fb.light === "good" && fb.bg && fb.contrast;

      resultStartTime = millis();
      calibratePhase = "result";
    }
    return;
  }

  // ================= RESULT =================
  if (calibratePhase === "result") {
    showResultUI();

    if (bgValid) {
      if (!correctSoundPlayed) {
    success.play();
    correctSoundPlayed = true;
  }
      // semua oke → tampil icon correct + good
      image(good, width / 2, height - 82, 588, 112);
      image(correct, width / 2, height / 2 - 20, 100, 100);

      // tunggu 3 detik baru done
      if (millis() - resultStartTime > 3000) {
        calibratePhase = "done";
        correctSoundPlayed = false;
      }
    } else {
      // kondisi gagal → tampil feedback merah + bad
      image(bad, width / 2, height - 82, 588, 112);

      // kalau tangan turun → prompt angkat lagi
      if (!raised) {
        calibratePhase = "waitHandUp";
      }
    }
    return;
  }

  // ================= WAIT HAND UP =================
  if (calibratePhase === "waitHandUp") {
    // tampil feedback tetap + panduan angkat tangan
    showResultUI();
    image(bad, width / 2, height - 82, 588, 112);
    image(angkat1, width / 2, height / 2, 227, 139);

    // kalau user angkat tangan lagi → masuk checking
    if (raised) {
      calibratePhase = "checking";
      canTrigger = true;
    }
    return;
  }

  // ================= DONE =================
  if (calibratePhase === "done") {
    resetCalibrateState();
    nextCalibrateStep = 3;
    checkStartTime = null;
    resultStartTime = null;
    canTrigger = false;
    return;
  }
}


function showCalibratePick() {

  image(calib5, width / 2, height / 2, width, height);

  image(calibpick, width / 2, height / 2, width, height);

  skipIcon();
  detectSkipButton();

  if (!calibPickPlayed) {
    correctSoundPlayed = false;

  calibpick.reset();
  calibpick.play();

  // 🔥 SOUND SAAT MULAI
  if (!pickStartSoundPlayed) {
    playvideo.play();
    pickStartSoundPlayed = true;
  }

  pickEndSoundPlayed = false; // reset untuk nanti
  calibPickFinished = false;
  calibPickPlayed = true;
  }

  if (calibpick.getCurrentFrame() === calibpick.numFrames() - 1) {
    calibpick.pause();
    calibPickFinished = true;

    if (!pickEndSoundPlayed) {
    playvideo.play();
    pickEndSoundPlayed = true;
  }
}
  if (!calibPickFinished) return;

  if (showCorrectIcon) {
    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - correctStartTime >= correctDuration) {
      showCorrectIcon = false;
      correctStartTime = 0;
      nextCalibrateStep = 7;

      pickStartSoundPlayed = false;
      pickEndSoundPlayed = false;

      calibPickPlayed = false;
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
          if (!correctSoundPlayed) {
            success.play();
            correctSoundPlayed = true;
          }
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
    correctSoundPlayed = false;
    calibdrag.reset();
    calibdrag.play();
     playvideo.play();
    calibThrowPlayed = true;
    calibDragPlayed = true;
    calibDragFinished = false;
  }

  if (calibdrag.getCurrentFrame() === calibdrag.numFrames() - 1) {
  calibdrag.pause();
  calibDragFinished = true;

  if (!dragEndSoundPlayed) {
    playvideo.play();
    dragEndSoundPlayed = true;
  }
}


  if (!calibDragFinished) return;

  if (showCorrectIcon) {
    image(correct, width / 2, height / 2, 100, 100);

    if (millis() - correctStartTime > 1000) {
      showCorrectIcon = false;
      calibThrowPlayed = false;
      nextCalibrateStep = 8;

      // reset gif untuk next time
      calibDragPlayed = false;
      calibDragFinished = false;

        calibTransPlayed = false;
        dragEndSoundPlayed = false;

        mulaiUnlocked = false;
        mulaiClicked = false;
        mulaiStartTime = millis();
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

         if (!correctSoundPlayed) {
      success.play();
      correctSoundPlayed = true;
    }
        
      } else {
        // langsung reset posisi
        calibrateTrash.pos.x = calibrateTrash.startPos.x;
        calibrateTrash.pos.y = calibrateTrash.startPos.y;

        showWrongIcon = true;
        wrongStartTime = millis();

         error.play();
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
    mulaiStartTime = millis(); 
    mulaiClicked = false;
    mulaiUnlocked = false;

    calibtrans.reset();
    calibtrans.play();

  if (!transSoundPlayed) {
    readytoplay.play(); 
    transSoundPlayed = true;
  }
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

  console.log("mulaiClicked:", mulaiClicked);

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
          if (!mulaiClicked) {
    click.play();
    mulaiClicked = true;
          if (calibrateFromChoose) {
            gameState = "choose";
          } else {
            // loadLevel(currentLevel);
            levelLoaded = false;
            hasCompletedTutorial = true;
            gameState = "play";
          }
          
          calibTransPlayed = false;
          transSoundPlayed = false;
          calibrateFromChoose = false; // reset
      }
    }
    }
  }
}

function gotSegmentationResults(result) {
  segmentation = result;
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

        if (!skipClicked) {
          click.play(); 
          skipClicked = true;
          nextCalibrateStep = 8;
        }
      }
    } else {
      // reset saat pinch dilepas
      skipClicked = false;
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
function startFadeIn() {
  isFading = true;
  fadeDirection = -1; // langsung fade IN
  fadeAlpha = 255;    // mulai dari hitam
}
// draw levelgame
function playGame() {
  if (gameState !== "play") return;

   if (showLevelIntro) {
    levelIntroScreen();

    if (millis() - levelIntroStart > levelIntroDuration) {
      showLevelIntro = false;
      inputLocked = false;
    }

    return;
  }
  
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
    image(trash.object, trash.pos.x, trash.pos.y, 70, 70);
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
if (playUnlocked && !levelStarted) {
  levelStarted = true;
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

function levelIntroScreen(){
  //  fill(92, 106, 158, 150);
  // rect(0, 0, width, height);

  let levelintroImg = levelIntroImages[currentLevel];
 if (levelintroImg) {
    image(levelintroImg, width / 2, height / 2, width, height);
  }
  
}
function rewardScreen() {
  push();
  fill(92, 106, 158, 150);
  rect(0, 0, width, height);

  if (shine) {
    image(shine, width / 2, height / 2, 288, 219);
  }

  let badgeImg = getCurrentReward();

  if (badgeImg) {
    image(badgeImg, width / 2, height / 2, width, height);

    if (badgeImg.numFrames && badgeImg.getCurrentFrame) {
      if (badgeImg.getCurrentFrame() === badgeImg.numFrames() - 1) {
        badgeImg.pause();
      }
    }
  }

  if (claimButton) {
    image(claimButton, width / 2, height / 2 + 161, 182, 60);
  }

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

  result = null;
  resultStay = 0;

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
    // loadLevel(currentLevel);
    levelLoaded = false;
    gameState = "play";
  } else {
    gameState = "impact";
    startFadeIn();

    impactStartTime = millis();
    inputLocked = true;

    playImpactSound();
    // gameState = "win";
    // enterWinScreen();
  }

} else {

  // fallback ke campaign
  if (currentLevel <= 9) {
    // loadLevel(currentLevel);
    levelLoaded = false;
    gameState = "play";
  } else {
    gameState = "impact";
    startFadeIn();

    impactStartTime = millis();
    inputLocked = true;
    // gameState = "win";
    // enterWinScreen();
  }

}
}

function getImpactImage() {
  let tier = getScoreTier();

  if (tier === "high") return impactGood;
  if (tier === "mid") return impactMid;
  return impactBad;
}

function getImpactText() {
  let tier = getScoreTier();

  if (tier === "high") {
    return "Hebat, Hero!\nBerkatmu lingkungan jadi sehat\ndan bersih dari sampah";
  } else if (tier === "mid") {
    return "Usaha bagus, Hero!\nTapi masih ada sampah bercampur,\nlingkungan jadi bau...";
  } else {
    return "Oh tidak...\nTerlalu banyak kesalahan,\njadi banjir!";
  }
}
function playImpactSound() {
  let tier = getScoreTier();

  if (currentImpactSound && currentImpactSound.isPlaying()) {
    currentImpactSound.stop();
  }

  if (tier === "high") {
    currentImpactSound = river;
  } 
  else if (tier === "mid") {
    currentImpactSound = bird;
  } 
  else {
    currentImpactSound = rain;
  }

  if (currentImpactSound) {
    currentImpactSound.loop();
  }
}

function impactScreen() {

  let impactImg = getImpactImage();
  image(impactImg, width / 2, height / 2, width, height);

  // text
  textSize(18);
  fill(255);
  stroke(89, 26, 41);
  strokeWeight(4);
  strokeJoin(ROUND);

  text(getImpactText(), width / 2, 45);
  image(lihatskor, width / 2, height / 2 + 175, 226, 60);
}

function detectHandImpactButton() {
  if (inputLocked) return;

if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];

    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);

    // pinch
    if (distBetweenFingers < 18) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;

      if (
        fingersX > width / 2 - 113 &&
        fingersX < width / 2 + 113 &&
        fingersY > height / 2 + 161 - 30 &&
        fingersY < height / 2 + 161 + 30
      ) {
        gameState = "win";
        enterWinScreen();
      }
    }
  }
}
function gotHands(results) {
  hands = results;
}

function checkHover(trash, index) {
  if (!playUnlocked) return;
  if (inputLocked) return;
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

        image(trash.object, trash.pos.x, trash.pos.y, 83, 83);

        textSize(14);
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
        success.play();

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

  if (level === 1) {
    correctHint = 2;
  } else if (level === 2) {
    correctHint = 1;
  } else if (level === 3) {
    correctHint = 3;
  } else if (level === 4) {
    correctHint = 3;
  } else if (level === 5) {
    correctHint = 2;
  } else if (level === 6) {
    correctHint = 3;
  } else if (level === 7) {
    correctHint = 4;
  } else if (level === 8) {
    correctHint = 2;
  } else if (level === 9) {
    correctHint = 4;
  }
  //   trial hehe
  // if (level === 1) {
  //   correctHint = 2;
  // } else if (level === 2) {
  //   correctHint = 1;
  // } else if (level === 3) {
  //   correctHint = 1;
  // } else if (level === 4) {
  //   correctHint = 1;
  // } else if (level === 5) {
  //   correctHint = 1;
  // } else if (level === 6) {
  //   correctHint = 1;
  // } else if (level === 7) {
  //   correctHint = 1;
  // } else if (level === 8) {
  //   correctHint = 1;
  // } else if (level === 9) {
  //   correctHint = 1;
  // }
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
        pos: createVector(140, 229),
        startPos: createVector(140, 229),
        targetPos: bins[0].pos,
      },
      {
        object: plastik,
        name: "Kantong plastik",
        pos: createVector(382, 309),
        startPos: createVector(382, 309),
        targetPos: bins[1].pos,
      },
      {
        object: leek,
        name: "Daun bawang",
        pos: createVector(189, 318),
        startPos: createVector(189, 318),
        targetPos: bins[0].pos,
      },
      {
        object: milk,
        name: "Karton susu",
        pos: createVector(298, 266),
        startPos: createVector(298, 266),
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
        pos: createVector(430, 278),
        startPos: createVector(430, 278),
        targetPos: bins[0].pos,
      },
      {
        object: ikan,
        name: "Tulang ikan",
        pos: createVector(209, 338),
        startPos: createVector(209, 338),
        targetPos: bins[0].pos,
      },
      {
        object: plastik,
        name: "Kantong plastik",
        pos: createVector(365, 338),
        startPos: createVector(365, 338),
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
        pos: createVector(454, 337),
        startPos: createVector(454, 337),
        targetPos: bins[1].pos,
      },
      {
        object: snack,
        name: "Bungkusan snack",
        pos: createVector(126, 360),
        startPos: createVector(126, 360),
        targetPos: bins[1].pos,
      },
      {
        object: daun,
        name: "Dedaunan",
        pos: createVector(324, 339),
        startPos: createVector(324, 339),
        targetPos: bins[0].pos,
      },
      {
        object: koran,
        name: "Koran bekas",
        pos: createVector(225, 325),
        startPos: createVector(225, 325),
        targetPos: bins[1].pos,
      },
      {
        object: pisang,
        name: "Kulit pisang",
        pos: createVector(355, 261),
        startPos: createVector(355, 261),
        targetPos: bins[0].pos,
      },
      {
        object: ranting,
        name: "Ranting pohon",
        pos: createVector(185, 267),
        startPos: createVector(185, 267),
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
        pos: createVector(399, 317),
        startPos: createVector(399, 317),
        targetPos: bins[1].pos,
      },
      {
        object: bohlam,
        name: "Bola lampu rusak",
        pos: createVector(441, 259),
        startPos: createVector(441, 259),
        targetPos: bins[2].pos,
      },
      {
        object: pisang,
        name: "Kulit pisang",
        pos: createVector(109, 329),
        startPos: createVector(109, 329),
        targetPos: bins[0].pos,
      },
      {
        object: ayam,
        name: "Tulang ayam",
        pos: createVector(210, 266),
        startPos: createVector(210, 266),
        targetPos: bins[0].pos,
      },
      {
        object: kertas,
        name: "Kertas bekas",
        pos: createVector(261, 329),
        startPos: createVector(261, 329),
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
        pos: createVector(129, 290),
        startPos: createVector(129, 290),
        targetPos: bins[0].pos,
      },
      {
        object: bohlam,
        name: "Bola lampu rusak",
        pos: createVector(307, 266),
        startPos: createVector(307, 266),
        targetPos: bins[2].pos,
      },
      {
        object: telur,
        name: "Cangkang telur",
        pos: createVector(471, 310),
        startPos: createVector(471, 310),
        targetPos: bins[0].pos,
      },
      {
        object: tisu,
        name: "Tisu bekas",
        pos: createVector(239, 329),
        startPos: createVector(239, 329),
        targetPos: bins[1].pos,
      },
      {
        object: milk,
        name: "Karton susu",
        pos: createVector(408, 270),
        startPos: createVector(408, 270),
        targetPos: bins[1].pos,
      },
    ];
  }
  // //   playground
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
        pos: createVector(404, 327),
        startPos: createVector(404, 327),
        targetPos: bins[0].pos,
      },
      {
        object: bungkusKertas,
        name: "Bungkusan makanan",
        pos: createVector(474, 282),
        startPos: createVector(474, 282),
        targetPos: bins[1].pos,
      },
      {
        object: bunga,
        name: "Bunga layu",
        pos: createVector(109, 328),
        startPos: createVector(109, 328),
        targetPos: bins[0].pos,
      },
      {
        object: masker,
        name: "Masker bekas",
        pos: createVector(316, 282),
        startPos: createVector(316, 282),
        targetPos: bins[2].pos,
      },
      {
        object: ranting,
        name: "Ranting pohon",
        pos: createVector(260, 342),
        startPos: createVector(260, 342),
        targetPos: bins[0].pos,
      },
      {
        object: gelas,
        name: "Gelas plastik",
        pos: createVector(155, 222),
        startPos: createVector(155, 222),
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
        pos: createVector(373, 323),
        startPos: createVector(373, 323),
        targetPos: bins[0].pos,
      },
      {
        object: daun,
        name: "Dedaunan",
        pos: createVector(146, 339),
        startPos: createVector(146, 339),
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
        pos: createVector(176, 261),
        startPos: createVector(176, 261),
        targetPos: bins[0].pos,
      },
      {
        object: botolKaca,
        name: "Botol kaca",
        pos: createVector(225, 323),
        startPos: createVector(225, 323),
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
        object: botolKaca,
        name: "Botol kaca",
        pos: createVector(152, 325),
        startPos: createVector(152, 325),
        targetPos: bins[1].pos,
      },
      {
        object: masker,
        name: "Masker bekas",
        pos: createVector(253, 276),
        startPos: createVector(253, 276),
        targetPos: bins[2].pos,
      },
      {
        object: bungkusPlastik,
        name: "Bungkusan plastik",
        pos: createVector(474, 339),
        startPos: createVector(474, 339),
        targetPos: bins[1].pos,
      },
      {
        object: roti,
        name: "Roti",
        pos: createVector(425, 276),
        startPos: createVector(425, 276),
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
        pos: createVector(117, 274),
        startPos: createVector(117, 274),
        targetPos: bins[0].pos,
      },
      {
        object: mcd,
        name: "Bungkusan makanan",
        pos: createVector(471, 275),
        startPos: createVector(471, 275),
        targetPos: bins[1].pos,
      },
      {
        object: ikan,
        name: "Tulang ikan",
        pos: createVector(196, 252),
        startPos: createVector(196, 252),
        targetPos: bins[0].pos,
      },
      {
        object: baygon,
        name: "Semprotan anti nyamuk",
        pos: createVector(265, 322),
        startPos: createVector(265, 322),
        targetPos: bins[2].pos,
      },
      {
        object: sandal,
        name: "Sandal bekas",
        pos: createVector(386, 345),
        startPos: createVector(386, 345),
        targetPos: bins[1].pos,
      },
      {
        object: batre,
        name: "Baterai bekas",
        pos: createVector(315, 235),
        startPos: createVector(315, 235),
        targetPos: bins[2].pos,
      },
      {
        object: ranting,
        name: "Ranting pohon",
        pos: createVector(133, 337),
        startPos: createVector(133, 337),
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
  text(score, width / 2, 110);

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

    image(collecthintlabel, width / 2, 140, 237, 37);
    fill(255, 255, 255);
    stroke(89, 26, 41);
    strokeWeight(5);
    textSize(15);
    text(correctHint, width / 2 - 68, 147);

    pop();
  }
}
// function displayJeda() {
//   dragTrash = false;
//   push();
//   fill(92, 106, 158, 150);
//   rect(0, 0, width, height);
//   pop();

//   push();

//   image(jedaPage, width / 2, height / 2, width, height);
//   image(lanjutButton, width / 2, height - 130, 248, 60);
//   pop();

//   if (hands.length > 0) {
//     let index = hands[0].keypoints[8];
//     let thumb = hands[0].keypoints[4];
//     let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);

//     if (distBetweenFingers < 25) {
//       let fingersX = (index.x + thumb.x) * 0.5;
//       let fingersY = (index.y + thumb.y) * 0.5;
//       if (
//         fingersX > width / 2 - 124 &&
//         fingersX < width / 2 + 124 &&
//         fingersY > height - 160 &&
//         fingersY < height - 100
//       ) {
//         jedaVisible = false;
//         dragTrash = true;
//         click.play();
//       }
//     }
//   }
// }
function displayJeda() {
  dragTrash = false;

  // overlay gelap
  push();
  fill(92, 106, 158, 150);
  rect(0, 0, width, height);
  pop();

  // UI background
  push();
  image(jedaPage, width / 2, height / 2, width, height);

  // =========================
  // TOMBOL
  // =========================

  if (selectedArea !== null) {
    // mode choose (2 tombol)
    image(exit, width / 2 - 120, height / 2 + 160, 196, 60);
    image(lanjutButton, width / 2 + 120, height / 2 + 160, 226, 60);
  } else {
    // mode campaign (1 tombol)
    image(lanjutButton, width / 2, height / 2 + 160, 226, 60);
  }

  pop();


  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);

    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;

// area mode
// lanjut button
      if (selectedArea !== null) {

        if (
          fingersX > width / 2 + 120 - 113 &&
          fingersX < width / 2 + 120 + 113 &&
          fingersY > height / 2 + 160 - 30 &&
          fingersY < height / 2 + 160 + 30
        ) {
          jedaVisible = false;
          dragTrash = true;
          click.play();
        }
        // exit button
        if (
          fingersX > width / 2 - 120 - 98 &&
          fingersX < width / 2 - 120 + 98 &&
          fingersY > height / 2 + 160 - 30 &&
          fingersY < height / 2 + 160 + 30
        ) {
          click.play();
          jedaVisible = false;

          levelLoaded = false;

          gameState = "choose";
        }
      }

// first time mode
      else {
        if (
          fingersX > width / 2 - 113 &&
          fingersX < width / 2 + 113 &&
          fingersY > height / 2 + 160 - 30 &&
          fingersY < height / 2 + 160 + 30
        ) {
          jedaVisible = false;
          dragTrash = true;
          click.play();
        }
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
  // song.stop();
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
// untuk level sekolah and rekre
  // if (score >= 40) {
  //   bgWin = win1;
  // } else if (score >= 20) {
  //   bgWin = win2;
  // } else {
  //   bgWin = win3;
  // }
  let modeKey;

  if (selectedArea) {
    modeKey = selectedArea;   // perumahan / sekolah / rekreasi
  } else {
    modeKey = "full";         // main 1–9
  }

  let config = areaScoreConfig[modeKey];

  if (score >= config.high) {
    bgWin = win1;
  } else if (score >= config.mid) {
    bgWin = win2;
  } else {
    bgWin = win3;
  }

  if (bgWin && bgWin.reset) {
    bgWin.reset();
    bgWin.play();
  }
}

function getScoreTier() {
  let modeKey;

  if (selectedArea) {
    modeKey = selectedArea;
  } else {
    modeKey = "full";
  }

  let config = areaScoreConfig[modeKey];

  if (score >= config.high) {
    return "high";
  } else if (score >= config.mid) {
    return "mid";
  } else {
    return "low";
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
  image(playagain, width / 2 + 120, height / 2 + 175, 196, 60);
  if (!winReady) return;

  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
      fingersX > width / 2 + 120 - 98 &&
      fingersX < width / 2 + 120 + 98 &&
      fingersY > height / 2 + 175 - 30 &&
      fingersY < height / 2 + 175 + 30
      ) {
        winPlayed = true;
        gameState = "choose"
        resetGameVariables();
        click.play();
  //       if (!song.isPlaying()) {
  //   song.loop();
  // }
      }
    }
  }
}

function exitButton() {
  image(exit, width / 2 - 120, height / 2 + 175, 196, 60);

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
         win.stop();
         resetGameVariables();
        gameState = "landing";
        delayStartButton = true;
        landingStartTime = millis();
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

  tutorIcon();
  berandaIcon();

}

function levelRumah() {
  image(perumahan, 135, height / 2 + 19, 136, 164);

  //   click area
 if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 20) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > 135 - 68 &&
        fingersX < 135 + 68 &&
        fingersY > height / 2 + 19 - 82 &&
        fingersY < height / 2 + 19 + 82
      ) {
        image(perumahan, 135, height / 2 + 19,  143, 171);

        selectedArea = "perumahan";
        isCampaignMode = false;
currentLevel = areaLevels.perumahan.start;
        resetAreaProgress();
        levelLoaded = false;
        startFade("play");
      }
    }
  }
}
function levelSekolah() {
  image(sekolah, width / 2, height / 2 + 19, 149, 164);
  
   //   click area
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 20) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width / 2 - 74.5 &&
        fingersX < width / 2 + 74.5 &&
        fingersY > height / 2 + 19 - 82 &&
        fingersY < height / 2 + 19 + 82
      ) {
        image(sekolah, width / 2, height / 2 + 19, 156, 171);

        selectedArea = "sekolah";
currentLevel = areaLevels[selectedArea].start;
        resetAreaProgress();
        // loadLevel(currentLevel);
        levelLoaded = false;
        startFade("play");
      }
    }
  }
}
function levelRekreasi() {
  image(rekreasi, width - 135, height / 2 + 19, 145, 164);

  //   click area
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 20) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > width - 135 - 72.5 &&
        fingersX < width - 135 + 72.5 &&
        fingersY > height / 2 + 19 - 82 &&
        fingersY < height / 2 + 19 + 82
      ) {
        image(rekreasi, width - 135, height / 2 + 19,  152, 171);

        selectedArea = "rekreasi";
currentLevel = areaLevels[selectedArea].start;
        resetAreaProgress();
        // loadLevel(currentLevel);
        levelLoaded = false;
        startFade("play");
      }
    }
  }
}

function tutorIcon(){

  push();

  image(tutor, width - 52, 37, 38, 38);
  fill(255, 255, 255);
  stroke(89, 26, 41);
  strokeWeight(4);
  textSize(12);
  text("Tutorial", width - 52, 71);

  pop();


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
        image(tutor, width - 52, 37, 43, 43);

        tutorCooldown = true;

        calibrateStep = 1;
        resetCalibrateState();
        calibrateFromChoose = true;
        gameState = "calibrate";
        // startFade("calibrate");
        click.play();

        setTimeout(() => {
    tutorCooldown = false;
  }, 800);

}
    }
  }
}
function berandaIcon(){

  push();

  image(beranda, 52, 37, 37, 38);
  fill(255, 255, 255);
  stroke(89, 26, 41);
  strokeWeight(4);
  textSize(12);
  text("Beranda", 52, 71);

  pop();

    if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    let distBetweenFingers = dist(index.x, index.y, thumb.x, thumb.y);
    if (distBetweenFingers < 25) {
      let fingersX = (index.x + thumb.x) * 0.5;
      let fingersY = (index.y + thumb.y) * 0.5;
      if (
        fingersX > 34 &&
        fingersX < 71 &&
        fingersY > 18 &&
        fingersY < 56
      ) {
       berandaCooldown = true;

      //  song.stop();

  image(beranda, 52, 37, 43, 43);

  resetGameVariables();
  gameState = "landing";
  click.play();

  setTimeout(() => {
    berandaCooldown = false;
  }, 800);
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
  levelLoaded = false;


  score = 0;
  winReady = false;
  winPlayed = false;


  hintVisible = false;
  jedaVisible = false;
  showHint = false;

  badgeImg = null;

  calibrated = false;
  calibrateStartTime = 0;



}
