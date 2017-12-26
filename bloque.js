function bloque(i,j,s) {
  this.size = s;
  this.health = level;

  this.i = i //fila
  this.j = j //columna


  this.draw = function(){
    this.pos = createVector((this.j * this.size) + this.size / 2 + 3, (this.i * this.size) + this.size / 2);
    rect(this.pos.x,this.pos.y,this.size,this.size);

  }
}
