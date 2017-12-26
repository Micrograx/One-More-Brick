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

let state = "start";

let xPos = null


function setup(){
  cnv = createCanvas(420,580);
  cnv.mousePressed(createPointA);
  cnv.mouseReleased(createPointB);
  rectMode(CENTER)

  blockSize = (window.width / columnas) - 1;

  for (let i = 0; i < cantBalls; i++){
    balls.push(new ball(window.width / 2, 540, ballSize));
  }

  createBlocks(1)

}

function draw(){
  background(150);
  for (let i = 0; i < cantBalls; i++){
    balls[i].update();
    balls[i].draw();
  }

  for (let i = 0; i < bloques.length; i++){
    bloques[i].draw();
  }

  //Le da acceleracion a las pelotas con varios frames de delay
  if (k % 10 == 0 && k < cantBalls * 10){
    balls[k / 10].applyForce(forceA,forceB);
    k++
  } else if (k < cantBalls * 10){
    k++
  } else if (k == cantBalls * 10){
    k = (cantBalls + 1 ) * 10
  }


  // Check when first ball touches ground
  for (let i = 0; i < cantBalls; i++){
    if (state == "moving" ) {
      balls[i].check()
    }
  }

  //Determina el estado del juego
  if (!balls[0].velocity.equals(createVector(0,0)) && balls[cantBalls - 1].velocity.equals(createVector(0,0))){
    state = "shooting"
  } else if (!balls[cantBalls - 1].velocity.equals(createVector(0,0))) {
    state = "moving"
  } else if ((balls[cantBalls - 1].velocity.equals(createVector(0,0))) && state == "moving") {
    state = "finished"
    nuevoNivel()
  }


  //Dibuja la linea de disparo
  if (mouseIsPressed && state != "shooting"){
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
  if (state != "shooting"){
    pointA = createVector(mouseX,mouseY);
    pointB = 0;
  }
}
//Determina el segundo punto para disparar y llama a shoot()
function createPointB(){
  if (state != "shooting"){
    shoot(pointC);
  }
}

function createBlocks(prob){
  for (let j = 0; j < columnas; j++){ //crear fila
    let r = Math.random(0,1)
    if (r < prob){
        bloques.push(new bloque(1,j,blockSize))
    }
  }
}

function nuevoNivel(){
  state = "waiting"
  for (let h = 0; h < bloques.length; h++){
    bloques[h].i += 1
  }
  createBlocks(0.8)
  level += 1
  balls.push(new ball(xPos,(height - ballSize), ballSize));
  cantBalls += 1
  xPos = null


}
