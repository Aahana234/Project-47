var parentBird,parentBirdImg;
var obstaclesImg;
var hunter,hunterImg1,hunterImg2;
var bg,bg1,bg2,backgroundImg1,backgroundImg2,backgroundImg3;
var playButton,playImg;
var nest,nestImg1;
var stoneImg1;
var cryingBirdImage;
var kiteImg1,kiteImg2,kiteImg3,kiteImg4;
var obstacleGroup;
var gameState="initial";
var life = 3;


function preload(){
  parentBirdImg =loadAnimation("Images/Bird.png");
  cryingBirdImage = loadAnimation("Images/CryingImage.png");
  obstaclesImg = loadImage("Images/Obstacles.png");
  backgroundImg1 = loadImage("Images/bg1.jpg");
  backgroundImg2 = loadImage("Images/bg2.png");
  backgroundImg3 = loadImage("Images/bg3.jpg");
  playImg = loadImage("Images/play1.png");
  nestImg1= loadImage("Images/Nest1.png");
  stoneImg1 = loadImage("Images/stone.png");
  hunterImg2 = loadImage("Images/hunter2.png")
  hunterImg1 = loadImage("Images/hunter3.png")
  kiteImg1 = loadImage("Images/kiteobstacle_image2.png");
  kiteImg2 = loadImage("Images/kiteobstaclesimage.png");
  kiteImg3 = loadImage("Images/kiteobstaclesimage3.png");
  kiteImg4 = loadImage("Images/kiteobstaclesimage4.png");
 
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  edges = createEdgeSprites();
  
  obstacleGroup = new Group();
}

function draw() {
  background(255,255,255); 
  //console.log(frameCount); 
  if(gameState === "initial"){
    setStart();
    gameState = "start"

  }
  drawSprites();
  if(gameState === "start" && mousePressedOver(playButton)){    
      clear();
      bg.visible = false;
      parentBird.visible =false; 
      hunter.visible = false;
      levelOne();

      gameState = "level1";    
 
  } 
  else if(gameState === "level1"){
      spawnObstacles();
      textSize(35);
      strokeWeight(2);
      stroke("blue");
      fill("Black");
      text("Life :" + life,displayWidth-1330,displayHeight-1000);
      

      if(keyDown(RIGHT_ARROW)){
        parentBird1.x = parentBird1.x+5;
      }
      if(keyDown(LEFT_ARROW)){
        parentBird1.x = parentBird1.x-5;
      }
    
      if(keyDown(UP_ARROW)){
        parentBird1.y = parentBird1.y-5;
      }
    
      if(keyDown(DOWN_ARROW)){
        parentBird1.y = parentBird1.y+5;
      }
     
      if(obstacleGroup.isTouching(parentBird1)){
        life = life-1;
        parentBird1.x = 100;
        parentBird1.y = 100;
        
      }
      if (life === 0 ) {
        text("Oops!Restart again by pressing the SPACE key",displayWidth -1400,displayHeight/2);
        obstacleGroup.setVelocityXEach(0);
        parentBird1.visible = false;
       // parentBird1.changeAnimation("crying",cryingBirdImage);
        if (keyDown("space")) {
          life = 3;
          gameState = "initial";
        }
      }
    }

}
function setStart(){
  bg=createSprite(width/2,height/2,width,height);
  bg.addImage(backgroundImg1);
  bg.scale = 6.4;
  //bg.visible = false;

  parentBird = createSprite(400,300);
  parentBird.addAnimation("parent",parentBirdImg);
  parentBird.scale = 0.8;

  hunter = createSprite(1500,700);
  hunter.addImage(hunterImg1);
  hunter.scale = 0.8;

  playButton = createSprite(width/2,height/2);
  playButton.addImage(playImg);
  playButton.scale = 0.1;
 
}

function levelOne(){
  
  bg1=createSprite(width/2,height/2,width,height);
  bg1.addImage(backgroundImg2);
  bg1.scale = 1.9;

  nest = createSprite(width-270,height-760)
  nest.addImage(nestImg1);
  nest.scale = 0.7;

  parentBird1 = createSprite(100,100);
  parentBird1.addAnimation("parent",parentBirdImg);
  parentBird1.scale = 0.3;

  

  }
  function spawnObstacles(){
    if(frameCount % 100 === 0){
    console.log("frame");
    obstacle = createSprite(width,Math.round(random(400,height-350)),50,50);
    obstacle.velocityX = -6;
    console.log("framecount");
    var rand = Math.round(random(1,4))
    switch(rand){
      case 1: obstacle.addImage(obstaclesImg);
              obstacle.scale = 0.3;
              break;
      case 2: obstacle.addImage(stoneImg1);
              obstacle.scale = 0.5;
              break;
      case 3: obstacle.addImage(kiteImg1)
              break;
      case 4: obstacle.addImage(kiteImg2);
              obstacle.scale = 0.8;
              break
    }
    obstacleGroup.add(obstacle)
    obstacle.lifetime = 1000;
  }

}