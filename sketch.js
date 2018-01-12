let bloques = [];
let blockSize = 0;
let blockSum= 0;

let balls = [];
let cantBalls = 1;
let ballSize = 15;
let ballPosA = 0;
let ballPosB = 0;

let level = 1;

let columnas = 7;
let filas = 9;

let k = cantBalls * 10;

let pointA = 0;
let pointB = 0;
let pointC = 0;

let forceA = 0;
let forceB = 0;

let state = "waiting";

let xPos = null


function setup(){
  cnv = createCanvas(420,580);
  cnv.mousePressed(createPointA);
  cnv.mouseReleased(createPointB);


  frameRate(60)
  //rectMode(CENTER)

  blockSize = (window.width / columnas) - 1;

  for (let i = 0; i < cantBalls; i++){
    balls.push(new ball(window.width / 2, 540, ballSize));
  }

  createBlocks(0.5)

}

function draw(){
  background(150);
  for (let i = 0; i < cantBalls; i++){
    balls[i].update();
    balls[i].draw();
    //console.log("Loop")
  }

  for (let i = 0; i < bloques.length; i++){
    if (bloques[i].health <= 0) {
      bloques.splice(i,1);
      break
    }
    if (bloques[i].i == 8){
      state = "GAME OVER"
      console.log(state)
    }
    bloques[i].draw();
  }

  //Le da acceleracion a las pelotas con varios frames de delay
  if (k % 10 == 0 && k < cantBalls * 10){
    balls[k / 10].applyForce(forceA,forceB);
    console.log("applied force")
    k++
  } else if (k < cantBalls * 10){
    k++
  } else if (k == cantBalls * 10){
    k = (cantBalls + 1 ) * 10
  }


  // Check when first ball touches ground
  for (let i = 0; i < cantBalls; i++){
      balls[i].check()
  }

  //Collision and bounce code


  let moving = 0
  //Determina el estado del juego
  for (let i = 0; i < balls.length; i++){
    if (balls[i].state == "moving"){
      moving += 1
    }
  }


  if (moving < balls.length && state == "waiting" && moving != 0){
    state = "shooting"
  } else if (moving == balls.length) {
    state = "moving"
  } else if (moving == 0 && state != "waiting" && state != "GAME OVER") {
    state = "finished"
    nuevoNivel()
  }


  //Dibuja la linea de disparo
  if (mouseIsPressed && state == "waiting"){
    pointB = createVector(mouseX,mouseY);
    pointC = p5.Vector.sub(pointA,pointB)
    ballPosA = balls[0].pos
    ballPosB = p5.Vector.add(balls[0].pos,pointC)
    line(ballPosA.x,ballPosA.y,ballPosB.x,ballPosB.y)
  }


}

//Se encarga de dispara las pelotas
function shoot(dir){
  k = 0;
  forceA = dir.x
  forceB = dir.y
}

//Crea el primer punto para disparar las bolas
function createPointA(){
  if (state == "waiting"){
    pointA = createVector(mouseX,mouseY);
    pointB = 0;
  }
}
//Determina el segundo punto para disparar y llama a shoot()
function createPointB(){
  if (state == "waiting"){
    shoot(pointC);
  }
}

function createBlocks(prob){
  for (let j = 0; j < columnas; j++){ //crear fila
    let r = Math.random(0,1)
    if (r < prob){
        bloques.push(new bloque(1,j,blockSize,level))
    }
  }
}

function nuevoNivel(){
  state = "waiting"
  level += 1

  for (let h = 0; h < bloques.length; h++){
    bloques[h].i += 1
  }
  createBlocks(0.6)
  balls.push(new ball(xPos,(height - ballSize), ballSize));
  cantBalls += 1
  xPos = null

  console.log("NEW LEVEL")


}
