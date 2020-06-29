let r,g,b;
let brain;
let which="black";
let width=innerWidth;
let height=innerHeight;
function pickColor(){
   r=random(255);
   g=random(255);
   b=random(255);

   redraw();
} 
function setup(){
  createCanvas(width,height);
  noLoop();
  
  brain=new neuralNetwork(3,6,2); 
 
  pickColor();
}
function mousePressed(){
   pickColor();
}
function colorPredictor(r,g,b){
   console.log(r+g+b);
   let inputs=[r/255,g/255,b/255]; 
   let outputs=brain.feedforward(inputs)
   //console.log(outputs);
   if(outputs[0]>outputs[1])
   {
     return "black"; 
   }
   else{
      return "white";
   }
  
}
function trainColor(r,g,b)
{
    if(r+g+b>300)
   {
      return [1,0];
   }
   else{
      return [0,1];
   }
}
function draw(){
   for(let i=0;i<10000;i++)
   {
      let r=random(255);
      let g=random(255);
      let b=random(255);
      let targets=trainColor(r,g,b)
      let inputs=[r/255,g/255,b/255]; 
      brain.train(inputs,targets);
   }
  background(r,g,b);
  strokeWeight(4);
  stroke(0);
  line(width/2,0,width/2,height)
  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER,CENTER);
  text("black",width/4,height/3)
  fill(255)
  text("white",3*width/4,height/3)
  let which=colorPredictor(r,g,b);
   if(which==="black")
   {
      fill(0);
      ellipse(width/4,height/2,60);
   }
   else
   {
      fill(255);
      ellipse(3*width/4,height/2,60);
   }
}