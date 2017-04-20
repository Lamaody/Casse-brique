class ObjetGraphique {
  constructor(x, y, couleur, vx, vy) {
    this.x = x;
    this.y = y;
    this.couleur = couleur;
    this.vx = vx;
    this.vy = vy;
  }
  
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);  
    ctx.restore();
  }
}