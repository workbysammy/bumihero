// =========================
// SELECT ELEMENTS
// =========================
const milk = document.querySelector('.milk-img');
const section = document.querySelector('.feature-active');
const activeImg = document.querySelector('.active-img');

const apel = document.querySelector('.apel-img');
const sectionAman = document.querySelector('.feature-aman');
const sign = document.querySelector('.sign-img');

const sectionMotivasi = document.querySelector('.feature-motivasi');
const rumah = document.querySelector('.rumah-img');
const monas = document.querySelector('.monas-img');
const murid = document.querySelector('.murid-img');
const fly = document.querySelector('.fly-img');

const sectionInstruction = document.querySelector('.instructions');
const instructionCards = document.querySelectorAll('.instruction-grid .card');

const awan = document.querySelector('.awan-img');
const awan2 = document.querySelector('.awan2-img');
const tree = document.querySelector('.tree-img');
const tree2 = document.querySelector('.tree2-img');


const ctaElements = document.querySelectorAll(
  '.cta .title-img, .cta .btn-tagline'
);
const sectionCta = document.querySelector('.cta');

let milkChanged = false;
let imageChanged = false;
let apelPhase = 0;

apel.style.transform = "translate(0px, 0px) scale(1)";
apel.style.opacity = 1;

sign.style.opacity = 0;
sign.src = "";

// motivasi images
[rumah, monas, murid].forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(0px)";
});

fly.style.transform = "scale(0.5)";
fly.style.opacity = 1;

sectionInstruction.style.transform = "translateY(120px)";

instructionCards.forEach(card => {
  card.style.transform = "translateY(60px)";
});

ctaElements.forEach(el => {
  el.style.transform = "translateY(100px)";
});

// CTA assets initial
awan.style.transform = "translateX(-200px)";
awan2.style.transform = "translateX(200px)";
tree.style.transform = "translateY(100px)";
tree2.style.transform = "translateY(100px)";
// scroll event
window.addEventListener('scroll', () => {

//  milk
  const rect = section.getBoundingClientRect();
  const milkTrigger = window.innerHeight * 0.9;
  const milkProgress = (1 - (rect.top / milkTrigger)) * 1.5;
  const milkClamped = Math.max(0, Math.min(milkProgress, 1));
  const moveY = milkClamped * 120;
  milk.style.transform = `translateY(${moveY}px)`;

  const triggerPoint = window.innerHeight * 0.3;

  if (rect.top < triggerPoint && !milkChanged) {
    activeImg.src = "asset/active1.png";
    milk.src = "asset/flash.png";
    milkChanged = true;
  }

  if (rect.top > triggerPoint && milkChanged) {
    activeImg.src = "asset/active3.png";
    milk.src = "asset/milk.png";
    milkChanged = false;
  }

  const imageTrigger = window.innerHeight * 0.3;

  if (rect.top < imageTrigger && !imageChanged) {
    activeImg.src = "asset/active3.png";
    imageChanged = true;
  }

  if (rect.top > imageTrigger && imageChanged) {
    activeImg.src = "asset/active1.png";
    imageChanged = false;
  }

// apel
  const rectAman = sectionAman.getBoundingClientRect();
  const triggerAman = window.innerHeight * 0.8;
  const progressAman = 1 - (rectAman.top / triggerAman);
  const t = Math.max(0, Math.min(progressAman, 1));

  if (apelPhase === 0) {
    const apelX = t * 245;
    const apelY = t * 270;
    const scale = 1 - t * 0.6;
    apel.style.transform = `translate(${apelX}px, ${apelY}px) scale(${scale})`;

    if (t > 0.6) {
      apel.style.opacity = 0;
      sign.src = "asset/wrong.png";
      sign.style.opacity = 1;
      apelPhase = 1;

      setTimeout(() => {
        apel.style.opacity = 1;
        apel.style.transform = "translate(0px, 0px) scale(1)";
        sign.src = "asset/retry.png";
        sign.style.opacity = 1;
        apelPhase = 2;
      }, 300);
    }
  }

  if (t < 0.3 && apelPhase === 2) {
    apel.style.opacity = 1;
    apel.style.transform = "translate(0px, 0px) scale(1)";
    sign.style.opacity = 0;
    apelPhase = 0;
  }

// motivasi
  const rectMot = sectionMotivasi.getBoundingClientRect();
  const triggerMot = window.innerHeight * 2.5;
  const progressMot = 1 - (rectMot.top / triggerMot);
  const tMot = Math.max(0, Math.min(progressMot, 1));

  const moveYMot = tMot * 50;
  const opacityMot = tMot;

  rumah.style.opacity = opacityMot;
  rumah.style.transform = `translate(-20%, 0%) translateY(${moveYMot}px)`;

  monas.style.opacity = opacityMot;
  monas.style.transform = `translate(-50%, -50%) translateY(${moveYMot}px)`;

  murid.style.opacity = opacityMot;
  murid.style.transform = `translate(20%, 0%) translateY(${moveYMot}px)`;

  const scaleFly = 0.5 + tMot * 0.7;
  fly.style.transform = `translate(-50%, -50%) scale(${scaleFly})`;

// instruction
const rectIns = sectionInstruction.getBoundingClientRect();
const triggerIns = window.innerHeight * 1.5;
const progressIns = 1 - (rectIns.top / triggerIns);
const tIns = Math.max(0, Math.min(progressIns, 1));

// whole SECTION
const moveYSection = (1 - tIns) * 200;
sectionInstruction.style.transform = `translateY(${moveYSection}px)`;

// CARD 
instructionCards.forEach((card) => {
  const moveYCard = (1 - tIns) * 100; // lebih kecil = lebih pelan
  card.style.transform = `translateY(${moveYCard}px)`;
});
// CTA
const rectCta = sectionCta.getBoundingClientRect();
const triggerCta = window.innerHeight * 1.3;
const progressCta = 1 - (rectCta.top / triggerCta);
const tCta = Math.max(0, Math.min(progressCta, 1));

ctaElements.forEach((el, index) => {
  const delay = index * 0.15; // biar berasa satu-satu
  const tEl = Math.max(0, Math.min(tCta - delay, 1));

  const moveY = (1 - tEl) * 150;
  el.style.transform = `translateY(${moveY}px)`;
});

// CTA PARALLAX (awan & tree)
const moveXAwan = tCta * 200;

awan.style.transform = `translate(-50%, -50%) translateX(${moveXAwan}px)`;

// awan kanan
awan2.style.transform = `translate(-50%, -50%) translateX(-${moveXAwan}px)`;

const moveYTree = tCta * 270;

tree.style.transform = `translate(-50%, -50%) translateY(-${moveYTree}px)`;
tree2.style.transform = `translate(-50%, -50%) translateY(-${moveYTree}px)`;

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

});