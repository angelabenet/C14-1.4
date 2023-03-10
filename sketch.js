// var de estados do jogov
var PLAY = 1;
var END = 0 ;
var gameState = PLAY;



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

//criar variaveis de grupos

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
// CRIAR GRUPOS DE OBSTACULOS  E NUVENS --- para que todos se comportem iguais 
obstaclesGroup = new Group ();
cloudsGroup = new Group (); 


console.log(gameState)


  // score = 0;
}

function draw() {
  background(180);

  // text("Pontuação: " +  score, 500,50);
  // score = score + Math.round(frameCount/60);
  
  

// condição estado do jogo 

if(gameState  === PLAY ){

ground.velocityX = -4;

}

else if  (gameState === END){

ground.velocityX = 0;
  
}

console.log(gameState);

  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  //gere as nuvens
  spawnClouds();
  
  //gere obstáculos no solo
  spawnObstacles();
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    // //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;

        // COMPLETE COM OS OUTROS OBSTACULOS 
        
        
      default: break;
    }
   
    //atribuir escala e vida útil ao obstáculo             
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

// ADD OBSTACULOS DO GRUPO----
obstaclesGroup.add(obstacle);

 }
}




function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribuir vida útil à variável
    cloud.lifetime = 200;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    
    // grupo de nuvens 
    cloudsGroup.add(cloud);
  }
  
}
