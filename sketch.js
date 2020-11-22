var dog,happyDog,database,food,foodStock;
var database;
var button,button1;
var fedTime,lastFed;
var foodObj;
function preload()
{
  dogImage=loadImage("images/Dog.png");
  happyDogImage=loadImage("images/dogImg1.png");
}

function setup()
 {
  createCanvas(1200, 1200);
  database=firebase.database();
  dog=createSprite(400,450,50,50);
  dog.addImage(dogImage);
  text("HELLO!, MY NAME IS OREO",1100,1200);
  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new food(700,320,70,70);
   
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
  
}


function draw() 
{  
   background(rgb(46,139,87));
  drawSprites();

  foodObj.display();
  addFood.display();
  feedDog.display();
  writeStock.display();

textSize(25);
fill("white");
stroke(20);

foodObj.display();

  if(keyWentDown(UP_ARROW))
  {
    writeStock(food);
    dog.addImage(happyDogImage);
  }
  else
  {
    dog.addImage(dogImage);

  }
}

function addFood()
{
  this.button.mousePressed(()=>{
  foodS++;
  database.ref('/').update({
    Food:foodStock
  })  
})
}

function feedDog()
{
  dog.addImage(happyDog);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     feedTime:hour()
  
    })
}

 function writeStock(x)
 {
   if(x=0)
   {
     x=0;
   }

   else
   {
     x=x-1;
   }
  database.ref('/').update({
    food:x
  })
  }
