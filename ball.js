function ball(x,y,d) {

this.pos = createVector(x,y);
this.velocity = createVector(0,0);
this.acceleration = createVector(0,0);
this.maxspeed = 10;

this.size = d;

this.update = function(){

	this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxspeed);
  this.pos.add(this.velocity);
  this.acceleration.mult(0);

	// Bounce when touch the edge of the canvas
	if (this.pos.x < 0) {
		this.pos.x = 0;
		this.velocity.x = -this.velocity.x;
	}
 	if (this.pos.y < 0) {
 		this.pos.y = 0;
 		this.velocity.y = -this.velocity.y;
 	}
 	if (this.pos.x > width - this.size) {
 		this.pos.x = width - this.size;
 		this.velocity.x = -this.velocity.x;
 	}
 	if (this.pos.y > height - this.size) {
 		this.pos.y = height - this.size;
 		this.velocity.mult(0);
 	}
}

this.check = function(){
	if (this.pos.y >= height - this.size ){
		if (xPos == null){
			xPos = this.pos.x
		} else {
			this.pos.x = xPos
		}
	}
}

this.draw = function(){
  ellipse(this.pos.x,this.pos.y,this.size);
}

this.applyForce = function(x,y){
  this.acceleration = createVector(x,y);
}
}
