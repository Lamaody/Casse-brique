class Ball extends ObjetGraphique {
  constructor(x, y, rayon, couleur, vx, vy,isBoss=false,isBonus=false) {
    super(x, y, couleur, vx, vy);
    this.rayon = rayon;
	this.isBonus=isBonus;
	if(isBonus){
		this.currentColor=0;
		this.up=true;
	}
	if(!isBoss)	this.hitBeforeBreak=2;
	else this.hitBeforeBreak=1;
  }

  
    draw(ctx) {
		super.draw(ctx);
		ctx.save(); 
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.rayon, 0, 2*Math.PI);
		
		if(this.isBonus){
			let couleurs=["#FBB735","#E98931","#EB403B","#B32E37","#6C2A6A","#5C4399","#274389","#1F5EA8","#227FB0","#2AB0C5","#39C0B3"];
			ctx.fillStyle=couleurs[this.currentColor];
			this.updateBonusColor();
		}
		else ctx.fillStyle = this.couleur;
		ctx.fill();
		ctx.restore();
			
  }
  changeColor(){
		if(this.hitBeforeBreak==1)this.couleur="#ff1744";
		if(this.hitBeforeBreak==0)this.couleur="#d50000";
	}
	updateBonusColor(){
		if(this.currentColor==10&&this.up==true){
			this.up=false;
		}
		if(this.currentColor==0&&this.up==false){
			this.up=true;
		}
		if(this.up){
			this.currentColor++;
		}
		else this.currentColor--;
	}
}
