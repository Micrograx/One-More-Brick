function ball(x,y,d) {

	this.pos = createVector(x,y);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);
	this.maxspeed = (d / 2) - 2;

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

	this.collision = function(){

		this.i = floor(this.pos.y / blockSize)
		this.j = floor(this.pos.x / blockSize)
		this.collisioning = []

		changeX = false
		changeY = false

		for (let i = 0; i < bloques.length; i++){
				hit = collideRectCircle(bloques[i].pos.x,bloques[i].pos.y,bloques[i].size,bloques[i].size,this.pos.x,this.pos.y,this.size)
				if (hit) {
					this.collisioning.push(bloques[i])
					// console.log("bloque: " + bloques[i].j + " " + bloques[i].i)
					// console.log("ball: " + this.j + " " + this.i)
				}
		}


		for (let i = 0; i < this.collisioning.length; i++){
			if (((this.i - 1 ) == this.collisioning[i].i) || ((this.i + 1) == this.collisioning[i].i)){
				changeY = true
				this.collisioning[i].hited()
			} else if ((((this.j + 1) == this.collisioning[i].j) || ((this.j - 1) == this.collisioning[i].j)) && (this.i == this.collisioning[i].i)) {
				changeX = true
				this.collisioning[i].hited()
			}
		}

		if (changeX) this.velocity.x = -this.velocity.x
		if (changeY) this.velocity.y = -this.velocity.y

	}

	this.draw = function(){
  	ellipse(this.pos.x,this.pos.y,this.size);
	}

	this.applyForce = function(x,y){
  	this.acceleration = createVector(x,y);
	}
}
