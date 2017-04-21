/***************** VARIABLE ****************/
let gameState = {
	load:0,
	running: 1,
	pause: 2,
	over: 3
};
let statusDeJeu=gameState.load ;
let combo = "";
let nbreCombo = 0;
let score;
let tabBricks = [];
let tabBalls = [];

let casse = new Howl({
  urls: ['res/audio/casse.wav'],
  onload: function() { 
	 start();
  }
});

let barre;
let alpha=1;
let dX=0;
let comboX,comboY;
  
function MoteurJeu(){
	
  let ctx, width, height;
  
  let level=1;
	
	let spawnInterval=500;
	let timeoutTable=[];
	let interval = setInterval(function () {
			alpha = alpha - 0.05;
			dX+=2;
		}, 50);
		
  let killer=0;
 
  let bossBallCount=0;
  let ballGroupeBeforeBoss=10;
  let ballGroupe=0;
  let bossCount=0;
  
  //ajout nouveau ball
  function ajouterBall(){
	  
		let x = canvas.width/2; 
		let diffX=canvas.width/2 - 20;
		let y = (canvas.height-310);
		let vx=1;
		if(Math.random()<0.5)vx=-1;
		if(Math.random()<0.5)x+=diffX;
		else x-=diffX;
		let b = new Ball(x, y, 8, couleurBalleDepart, vx,4);
		tabBalls.push(b);
		ballGroupe++;
		
		if(ballGroupe<ballGroupeBeforeBoss){
			timeoutTable.push(setTimeout(ajouterBall,spawnInterval));
		}
		else {
			//addBonus();
			timeoutTable.push(setTimeout(grouperDeGauche,500));
			ballGroupe=0;
		}
	}
	function ajouterBonus(){
		let x = canvas.width/2; 
		let y = (canvas.height-310);
		let vx=1;
		if(Math.random()<0.5)vx=-1;
		let b = new Ball(x, y, 8, "white", vx,4,true,true);
		tabBalls.push(b);
		
	}
	function grouperDeGauche(){
		let x = canvas.width/2; 
		let diffX=canvas.width/2 - 20;
		x-=diffX;
		let y = (canvas.height-310);
		let vx=1;
		vx+=bossBallCount*0.15;
		let b = new Ball(x, y, 8, "orange", vx,4,true);
		tabBalls.push(b);
		bossBallCount++;
		if(bossBallCount<10)timeoutTable.push(setTimeout(grouperDeGauche,50));
		if(bossBallCount==10) {
			bossCount++;
			bossBallCount=0;
			if(bossCount<level)timeoutTable.push(setTimeout(grouperDeDroite,500));
			else {
				spawnInterval-=50;
				timeoutTable.push(setTimeout(ajouterBall,spawnInterval));
				level++;
				bossCount=0;
			}
		}
	}
	function grouperDeDroite(){
		let x = canvas.width/2; 
		let diffX=canvas.width/2 - 20;
		x+=diffX;
		let y = (canvas.height-310);
		let vx=-1;
		vx-=bossBallCount*0.15;
		let b = new Ball(x, y, 8, "orange", vx,4,true);
		tabBalls.push(b);
		bossBallCount++;
		if(bossBallCount<10)timeoutTable.push(setTimeout(grouperDeDroite,50));
		if(bossBallCount==10) {
			bossCount++;
			bossBallCount=0;
			if(bossCount<level)timeoutTable.push(setTimeout(grouperDeGauche,500));
			else {
				spawnInterval-=50;
				timeoutTable.push(setTimeout(ajouterBall,spawnInterval));
				level++;
				bossCount=0;
				
			}
		}
	}
  function dessinerEtDeplacerLesBalles() {  
		tabBalls.forEach(function(b, index, tab) {
			b.move();
			b.draw(ctx);
			testCollisionBallMurs(b);
			testCollisionBallBrick(b);
			testBallSiEnDessousBarre(b);
	  });
	}

  //dessiner brique
  function dessinerBrique() {
		tabBricks.forEach(function(b, index, tab) {
			b.draw(ctx);
		});
	}
	
  //creer brique	
  function creerBrique(){
		let couleur = ["#F4C6C4", "#EB9692", "#E47069", "#DE4D45",  "#D52F26","#CF5B34", "#AF2620"];
		let nbligne = 7;
		let espace = 4;
		let ncol = 8;
		let y = 50;
		let largeur = 20;
		let longueur = canvas.width/ncol-espace;
		for(let i = 0; i < nbligne; i++) {
			let x = 0;
			for(let o=0 ; o < ncol;o++){
				let brique = new Brique(x+1, y, longueur,largeur ,couleur[i], 0, 0);
				tabBricks.push(brique);
				x = x+canvas.width/ncol;
			}
			y = y+largeur+espace;
		}
	}
  
  function deplacer(evt){
		let rect = canvas.getBoundingClientRect();
		let mx = evt.clientX - rect.left;
		barre.setX(mx);
	}
	
  function mainLoop(time) {
		ctx.clearRect(0, 0, width, height);
		measureFPS(time);
		if(tabBricks.length == 0) statusDeJeu = gameState.over;
		let fontSize = 20;
		
		switch (statusDeJeu) {
			case gameState.running:
				
				barre.draw(ctx, couleurBarre); 
				dessinerEtDeplacerLesBalles();
				
				fontSize = 20;
				//afficher score
				ctx.font = fontSize + 'px Courier bold';
				ctx.fillStyle = '#ffa71d';
				ctx.fillText("SCORE : "+score,10,30);
				fontSize = 20;
				
				//afficher niveau
				ctx.font = fontSize + 'px Courier bold';
				ctx.fillStyle = '#ffa71d';
				ctx.fillText("Level  "+level,300,30);
				
				dessinerBrique();
				if(Math.random()<0.005){
					ajouterBonus();
				}
				
				
				break;
				
			case gameState.pause:
				
				ctx.drawImage(cafe,150,125); 
				
				fontSize = 50;
				ctx.font = 'italic bold '+fontSize + 'px Papyrus';
				ctx.fillStyle = '#ffa71d';
				ctx.fillText("PAUSE",100,height/2);
				
				fontSize = 15;
				ctx.font = fontSize + 'px Courier BOLD';
				ctx.fillStyle = 'black';
				ctx.fillText("Appuyez sur la touche P pour reprendre",100,height/2+100);
					
				break;
				
			case gameState.over:
				
				ctx.drawImage(lose,150,25);
				
				fontSize = 40;
				ctx.font = 'italic bold '+fontSize + 'px Papyrus';
				ctx.fillStyle = '#ffa71d';
				ctx.fillText("GAME OVER",50,height/2-50);
				
				fontSize = 20;
				ctx.font = fontSize + 'px Courier BOLD';
				ctx.fillStyle = 'black';
				ctx.fillText("SCORE: "+score,125,height/2+50);

				fontSize = 15;
				ctx.font = fontSize + 'px Courier BOLD';
				ctx.fillStyle = 'black';
				ctx.fillText("Appuyez sur la touche R pour recommencer",width/6,height/2+100);

				gameOver();
				break;
			
		}

		requestAnimationFrame(mainLoop);
	}
	
  function start() {
	    if(statusDeJeu!=gameState.running&&statusDeJeu!=gameState.pause){
			
			canvas = document.querySelector("#myCanvas");
			width = canvas.width;
			height = canvas.height; 
			ctx = canvas.getContext('2d');
			barre = new Barre(canvas.width/2, canvas.height-70, 80, 10, 0, 0, couleurFond);
			barre.draw(ctx, couleurBarre);		
			initGame();
			setTimeout(ajouterBall,spawnInterval);
			statusDeJeu = gameState.running;
			addEcouteurs(this);
			requestAnimationFrame(mainLoop);
			
	    }
	}
	function restart(){
		if(statusDeJeu==gameState.over){
			
			canvas = document.querySelector("#myCanvas");
			width = canvas.width;
			height = canvas.height; 
			ctx = canvas.getContext('2d');
			barre = new Barre(canvas.width/2, canvas.height-70, 80, 10, 0, 0, couleurFond);
			barre.draw(ctx, couleurBarre);		
			initGame();
			setTimeout(ajouterBall,spawnInterval);
			statusDeJeu = gameState.running;
		}
	}
	function initGame(){
		score = 0;
		level=1;
		tabBricks = [];
		tabBalls = [];
		combo = "";
		nbreCombo = 0;
		spawnInterval=1500;
		bossBallCount=0;
		ballGroupeBeforeBoss=15;
		ballGroupe=0;
		bossCount=0;
		initFPS();
		creerBrique();
	}
  function pause(display){
		(statusDeJeu == gameState.running || display != null)?statusDeJeu = gameState.pause:statusDeJeu = gameState.running;
	}
  function gameOver(){
		tabBalls = [];
		tableauxBriques = []; 
		timeoutTable.forEach(function(b, index, tab) {
			clearTimeout(b);
			timeoutTable.splice(index,1);
		});
		
	}

  return {
		deplacer:deplacer,
		start:start,
		pause:pause,
		restart:restart
	}
}
