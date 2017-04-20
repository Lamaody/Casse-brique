
window.addEventListener('load', init);

let canvas, theGame;

function init() {
  canvas = document.querySelector("#myCanvas");
  theGame = new MoteurJeu();
  theGame.start();
}

