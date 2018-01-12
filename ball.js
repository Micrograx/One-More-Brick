function ball(x,y,d) {

	this.pos = createVector(x,y);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);
	this.maxspeed = (d / 2) - 2;

	this.state = "waiting"

	this.size = d;

	this.update = function(){

		this.velocity.add(this.acceleration);
		this.velocity.setMag(100)

		while(!this.velocity.equals(createVector(0,0))){

			this.temp = this.velocity.copy()
			this.temp.limit(1)

			// if (this.velocity.equals(createVector(0,0))){
			// 	console.log("0")
			// 	console.log(this.acceleration)
			// 	console.log(this.velocity)
			// }

			this.pos.add(this.temp);
			this.velocity.sub(this.temp)

			this.collision()

			// Bounce when touch the edge of the canvas
			if (this.pos.x < 0) {
				this.pos.x = 0;
				this.velocity.x *= -1;
				this.acceleration.x *= -1;
				//this.velocity.x = -this.velocity.x;
			}
		 	if (this.pos.y < 0) {
		 		this.pos.y = 0;
		 		this.velocity.y *= -1;
				this.acceleration.y *= -1;
				//this.velocity.y = -this.velocity.y;
		 	}
		 	if (this.pos.x >= width - this.size) {
		 		this.pos.x = width - this.size;
		 		this.velocity.x *= -1
				this.acceleration.x *= -1
				//this.velocity.x = -this.velocity.x;
		 	}
		 	if (this.pos.y >= height - this.size) {
		 		this.pos.y = height - this.size;
		 		this.acceleration.mult(0);
				this.state = "finished"
		 	}



		}
	}

	this.check = function(){
		if (this.state == "finished"){
			if (xPos == null){
				xPos = this.pos.x
			} else {
				this.pos.x = xPos
			}
			this.state = "waiting"
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

		if (changeX) {
			this.velocity.x *= -1;
			this.acceleration.x *= -1
		}
		if (changeY) {
			this.velocity.y *= -1;
			this.acceleration.y *= -1
		}

	}

	this.draw = function(){
  	ellipse(this.pos.x,this.pos.y,this.size);
	}

	this.applyForce = function(x,y){
		this.state = "moving"
  	this.acceleration = createVector(x,y);
	}
}
