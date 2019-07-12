
var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");

//lets load the images

var bird=new Image();
var bg=new Image();
var fg=new Image();
var pipeNorth=new Image();
var pipeSouth=new Image();


bird.src="images/bird.png";
bg.src="images/bg.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";

//to display images

var gap=85;
var constant=pipeNorth.height+gap;

var bX=10;
var bY=150;
var gravity=2;
var gameScore=0;

//event handling

document.addEventListener("keydown",moveUp);
function moveUp()
{
    bY-=20;
}

var pipe = [];
pipe[0]={
    x : cvs.width,
    y : 0
};
 


function draw()
{
    ctx.drawImage(bg,0,0);
    for(var i=0;i<pipe.length;i++)
    {
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        
        pipe[i].x--;
        if(pipe[i].x==120)
        {
            pipe.push(
                {
                   x:cvs.width,
                   y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                }
            );
        }

            //here comes the collision part

            if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
                location.reload(); // reload the page
            }

            if(pipe[i].x==6) gameScore++;
            ctx.beginPath();
            ctx.fillStyle="black";
            ctx.font="20 px Arial";
            ctx.fillText("Score : " +gameScore, 20,30);
            ctx.closePath();
            console.log(gameScore);



        
    }
   // ctx.drawImage(pipeNorth,100,0);
   // ctx.drawImage(pipeSouth,100,0+constant);
    ctx.drawImage(fg,0,cvs.height-fg.height);
    ctx.drawImage(bird,bX,bY);
    bY+=gravity;
    requestAnimationFrame(draw);

}
draw();


