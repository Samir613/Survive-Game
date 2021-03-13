var canvas;
var ground;
var bg;
var explorer , idle , idlejump , idlerun , idledead;
var rocks;
var explorerrunning;
var gamestate="play";
var obstaclegroup;




function preload(){
  bg=loadImage("Jungle.png")
  idle=loadAnimation("Death.png")
  idlejump=loadImage("Jump.png")
   rocks=loadImage("rock.png")
   explorerrunning=loadAnimation("run1.png","run2.png","run3.png");
       

}

function setup() {
  canvas = createCanvas(displayWidth-20,displayHeight-30);
explorer = createSprite(200,780);
explorer.addAnimation("running",explorerrunning);
explorer.scale=0.5;
ground = createSprite(700,900,displayWidth,20);
ground.x=ground.width/2;
ground.visible=false;
obstaclegroup=createGroup();
}

function draw() {
  background(bg);  

if (gamestate==="play"){
  ground.velocityX=-5;
 if (keyWentDown(UP_ARROW)&& explorer.y>100 ){
   explorer.addImage(idlejump);
   explorer.velocityY=-14;
 }
 explorer.velocityY=explorer.velocityY+0.5;
 if (keyWentUp(UP_ARROW)){
   explorer.addImage(idle);
 }
 if (ground.x<0){
   ground.x=ground.width/2;
  }
  

 spawnRock();
 if (obstaclegroup.isTouching(explorer)){
gamestate="end";
 }
}
else if (gamestate==="end"){
obstaclegroup.setVelocityXEach(0);
explorer.changeAnimation("dying",idle);

}
 explorer.collide(ground);

  drawSprites();

  }


  function spawnRock() {
    if(frameCount %   100 === 0) {
      var rock = createSprite(1750,820,100,100);
     
      rock.velocityX = -7;
    
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: rock.addImage(rocks);
                
                break;
        case 2: rock.addImage(rocks);
               
                break;
        default: break;
      }
      
      obstaclegroup.add(rock);
      
      rock.scale = 5;
      rock.lifetime = 300;
    }
  }


