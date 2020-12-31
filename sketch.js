var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup
var SurvivalTime = 0;
var ground;
var iground;
var bg, bgImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  bgImage = loadImage("jungle.png");
}



function setup() {
  
  bg=createSprite(200,200);
  bg.addImage(bgImage);
  bg.velocityX=-2;
  
  monkey=createSprite(80,300,20,20);
  monkey.addAnimation("mk",monkey_running);
  monkey.scale=0.1;
  
  iground=createSprite(200,332,500,5);
  iground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  if(gameState===PLAY){
  
    if(bg.x<0){
      bg.x=300;
    }
  
   food();
      Ob();
  
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
  
    monkey.velocityY = monkey.velocityY + 0.8;

  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    
  }
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
  }
    
    SurvivalTime=Math.ceil(frameCount/frameRate());
    
  }else if(gameState===END){
    bg.velocityX=0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    
  }
  
    monkey.collide(iground); 
  drawSprites();
  
  
   stroke("white");
    textSize(20);
    fill("white");

    text("Survival Time : "+ SurvivalTime, 100,50);
  
}

function food(){
  if(frameCount%60===0){ 
 var banana=createSprite(200,Math.round(random(50,100)),20,20);
    console.log("here")
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.setLifetime=120;
    
    foodGroup.add(banana);
  }
}

function Ob(){
  if(frameCount%100===0){
    var ob=createSprite(600,300,10,40);
    ob.addImage(obstacleImage);
    ob.scale=0.2; 
    ob.velocityX=-5;
    ob.setLifetime=120;
    
   obstacleGroup.add(ob);
 }
}