class Brique extends ObjetGraphique {
  constructor(x, y, longueur, largeur, couleur, vx, vy) {
    // appel du constructeur hérité
    super(x, y, couleur, vx, vy);
    this.longueur = longueur;
	  this.largeur = largeur;
  }
  
  draw(ctx) {
    super.draw(ctx);
    ctx.save(); 
    
    ctx.fillStyle = this.couleur;
    ctx.fillRect(this.x, this.y, this.longueur, this.largeur);
    ctx.restore();
        
  }
}
