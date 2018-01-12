function bloque(i,j,s,level) {
  this.size = s;
  this.health = level;

  this.i = i //fila
  this.j = j //columna
  this.pos = createVector((this.j * this.size) + 3 , (this.i * this.size));


  this.draw = function(){
    this.pos = createVector((this.j * this.size) + 3 , (this.i * this.size));
    rect(this.pos.x,this.pos.y,this.size,this.size);
    push()
    translate(this.pos.x + this.size / 2 ,this.pos.y + this.size / 2)
    text(this.health,0,0)
    pop()
  }

  this.hited = function(){
    this.health -= 1
  }

  
}
