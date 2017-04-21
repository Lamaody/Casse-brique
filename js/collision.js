//COLLISIONS
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
let testX=cx;
let testY=cy;
if (testX < x0) testX=x0;
if (testX > (x0+w0)) testX=(x0+w0);
if (testY < y0) testY=y0;
if (testY > (y0+h0)) testY=(y0+h0);
return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}

function collisionCircle(x1,y1,r1,x2,y2,r2){
	var dx=x1-x2;
	var dy=y1-y2;
	return ((dx*dx+dy*dy)<(r1+r2)*(r1+r2));
}

function testCollisionBallMurs(b) {
	if(((b.x + b.rayon) > canvas.width) || (b.x  < 0)) {
		b.vx = -b.vx;
	}
	if (b.y < 0) {
		b.vy = -b.vy;
		statusDeJeu = gameState.over;
	}
	if((b.y + 2*b.rayon) > canvas.height){
		nbreCombo++;
		combo = "x"+nbreCombo;
		
		score = score+100 +nbreCombo*10;
		disparaitre(b);
	}
}
function testCollisionBallBrick(b) {
	for(let i = 0; i < tabBricks.length; i++) {
		let collision = circRectsOverlap(tabBricks[i].x, tabBricks[i].y, tabBricks[i].longueur, tabBricks[i].largeur, b.x, b.y, b.rayon)
		if (collision == true){
			casse.play();
			tabBricks.splice(i,1);
			if(tabBricks.length==0)statusDeJeu=gameState.over;
			if(b.hitBeforeBreak==0){disparaitre(b);}
			b.vy = -b.vy;
			break;
			
		}
	}
}
function testBallSiEnDessousBarre(b) {
	if(barre.y==(b.rayon+b.y)){
		if(!((barre.x<(b.rayon+b.x))&&((barre.x+barre.longueur)>(b.x+b.rayon)))){
			b.vy = -b.vy;
			nbreCombo=0;
			combo = "";
			b.hitBeforeBreak--;
			b.changeColor();
		}	
		else{
			alpha=1;
			dX=0;
			comboX=b.x;
			comboY=b.y;
			if(b.isBonus){
				nbreCombo++;
				
				while(tabBalls.length>0){
						for(let i = 0; i < tabBalls.length; i++) {
							score+=100;
							tabBalls.splice(i,1);  
						}
				}
			}
		}	
	}
}

function testCollisionEntreBalles(ball){
	tabBalls.forEach(function(b, index, tab) {
		if(collisionCircle(ball.x,ball.y,ball.rayon,b.x,b.y,b.rayon)){
			ball.vy = -ball.vy;
			b.vy = -b.vy;
		}
  });
}

function disparaitre(b){
  for(let i = 0; i < tabBalls.length; i++) {
		if(b.x == tabBalls[i].x){ 
		tabBalls.splice(i,1);  }
	}
}
