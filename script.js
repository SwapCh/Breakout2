const grid=document.querySelector(".grid");
const scoredisplay=document.querySelector("#score");
const blockwidth=100;
const blockheight=20;
const boardwidth=560;
const boardheight=300;
let balldia=20;
//for ball movements
let xdir=-2;
let ydir=2;

let timerId;
let score=0;

const left= document.getElementsByClassName("left");
const right= document.getElementsByClassName("right");
const restart= document.getElementsByClassName("restart");


const userstart=[230,10]//place where moving bloack is at the start
let currentpos=userstart

const ballstart=[270, 40]
let ballcurrentpos=ballstart;

//making user(moving bloack) using js
const user=document.createElement("div");
user.classList.add("user");
grid.appendChild(user);

//making the ball
const ball=document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);

function drawUser(){
    //to move the user
    user.style.left=currentpos[0]+ "px";
    //now this currentpos[0]=250!
    //so we are adding 250 to its initial position in the x direction by using .left
    //similarly to bring it down we must add 10 from bottom--
    user.style.bottom=currentpos[1]+"px";
}
drawUser();

function drawBall(){
    ball.style.left=ballcurrentpos[0] + "px";
    ball.style.bottom=ballcurrentpos[1]+"px";
}
drawBall();

//Drawing one block--
class block{
    constructor(xaxis,yaxis){
        this.bottomleft=[xaxis,yaxis];
        this.bottomright=[xaxis+blockwidth, yaxis];
        this.topleft=[xaxis, yaxis+ blockheight];
        this.topright=[xaxis+blockwidth, yaxis+ blockheight];
    }
}

//All the other Blocks by calculation the postions--
const blocks=[
    new block(10,270),
    new block(120,270),
    new block(230,270),
    new block(340,270),
    new block(450,270),
    new block(10,240),
    new block(120,240),
    new block(230,240),
    new block(340,240),
    new block(450,240),
    new block(10, 210),
    new block(120,210),
    new block(230,210),
    new block(340,210),
    new block(450,210)
]

//Drawing all the blocks--
function addblocks(){
    for(let i=0; i<blocks.length; i++){
        const block=document.createElement("div");
        block.classList.add("block");
        grid.appendChild(block);
        block.style.left= blocks[i].bottomleft[0]+ "px";
        block.style.bottom= blocks[i].bottomleft[1]+ "px";
 
    }
}
addblocks();

//moving the user block
function moveuser(e){
    switch(e.key){
        case "ArrowLeft":
            if(currentpos[0]>0){
                currentpos[0]-=10;
                drawUser();
            }
            break;
        case "ArrowRight":
            if(currentpos[0]+blockwidth< boardwidth){
                currentpos[0]+=10;
                drawUser();
            }
            break;
    }
}

document.addEventListener("keydown", moveuser);

function moveball(){
    ballcurrentpos[0]+=xdir;
    ballcurrentpos[1]+=ydir;
    drawBall();
    checkcollision();
}

timerId=setInterval(moveball, 18);

function checkcollision(){
    //checking if ball enter the area of any of the block
    for(let i=0; i< blocks.length; i++){
        if (ballcurrentpos[0]>blocks[i].bottomleft[0] &&
            ballcurrentpos[0]<blocks[i].bottomright[0] &&
            (ballcurrentpos[1]+balldia)>blocks[i].bottomleft[1] &&
            ballcurrentpos[1]< blocks[i].topleft[1]+balldia){
                const allblocks= document.querySelectorAll(".block");
                allblocks[i].classList.remove("block");
                //So we make an array allblocks and then delete the ith block if collision happens
                blocks.splice(i,1)// removing from original array
                score++;
                changedirection();
                scoredisplay.innerHTML= score;
                if (blocks.length == 0){
                    scoredisplay.innerHTML= "You Win!";
                    clearInterval(timerId);
                    document.removeEventListener("keydown", moveuser);
                }
            }
        }
        //check for wall hits
        if(
            ballcurrentpos[0]>= (boardwidth- balldia) || 
            ballcurrentpos[0]<=0 ||
            ballcurrentpos[1]>= (boardheight- balldia)){
                changedirection();
            }

        //checking for user block collision
        if( ballcurrentpos[0] >= currentpos[0] && 
            ballcurrentpos[0] <= currentpos[0]+ blockwidth && 
            (ballcurrentpos[1] >= currentpos[1] && 
            ballcurrentpos[1]<= currentpos[1] + blockheight)){
                changedirection();
            }

        //If ball falls--Game over
        if (ballcurrentpos[1]<=0){
            clearInterval(timerId);
            scoredisplay.innerHTML="Game Over!";
        }
} 

function changedirection(){
    if (xdir === -2 && ydir==2){
        xdir=2;
        return;
    }
    if (xdir ==2 && ydir==2){
        ydir=-2;
        return;
    }
    if (xdir ==2 && ydir==-2){
        xdir=-2;
        return;
    }
    if (xdir ==-2 && ydir==-2){
        ydir=2;
        return;
    }
}

left[0].addEventListener("click", ()=>{
    moveuser({key: "ArrowLeft"});
})

right[0].addEventListener("click", ()=>{
    moveuser({key: "ArrowRight"});
})

restart[0].addEventListener("click", ()=>{
    location.reload();
})

let audio= new Audio("nfak.mp3");
audio.play();

