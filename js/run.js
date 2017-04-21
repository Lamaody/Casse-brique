
window.addEventListener('load', init);

let canvas, theGame;
let couleurBalleDepart, couleurFond, couleurBarre, cafe, lose;

function init() {
  canvas = document.querySelector("#myCanvas");
  cafe = document.getElementById("cafe");
  lose = document.getElementById("lose");
}

function validerReglage(){
	
   couleurBalleDepart = document.getElementById("couleurBalleDepart").value;
   couleurFond = document.getElementById("couleurFond").value;
   couleurBarre = document.getElementById("couleurBarre").value;
   document.getElementById("myCanvas").style.background = couleurFond;
   
   theGame = new MoteurJeu();
}

function commencerLeJeu(){
	
	document.getElementById("couleurFond").disabled=true;
	document.getElementById("couleurBalleDepart").disabled=true;
	document.getElementById("couleurBarre").disabled=true;
	
	document.getElementById("valider").style.display="none";
	document.getElementById("commencer").style.display="none";
	theGame.start();
}

