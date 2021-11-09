let game = document.querySelector('#game');
let ctx = game.getContext('2d');
let newGame = document.querySelector('#top-middle');
let pause = document.querySelector('#top-middle-right');
let roundDisplay = document.querySelector('#rounds');
let towerOne = document.querySelector('#btm-left');
let towerTwo = document.querySelector('#btm-middle-left');
let towerThree = document.querySelector('#btm-middle');
let towerFour = document.querySelector('#btm-middle-right');
let towerFive = document.querySelector('#btm-right');
let gameRunning = false;
let enemy1y = 380;
let enemy1x = 175;

game.setAttribute('height', getComputedStyle(game)["height"]);
game.setAttribute('width', getComputedStyle(game)["width"]);


class enemy {
    constructor(x ,y){
        this.x = x;
        this.y = y;
        this.color = 'red';
        this.radius = 10;
        this.alive = false;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 2 *Math.PI, false);
            ctx.fill();
        }
    }
}

window.addEventListener("DOMContentLoaded", function(e) {
    const runGame = setInterval(gameLoop, 40);

});

newGame.addEventListener('click', function startGame(){
    console.log('Game Started');
    gameRunning = true;
    
});


function mapStartUp(){
    ctx.fillStyle = 'tan';
    ctx.fillRect(150, 210, 50, 190);
    ctx.fillRect(150, 210, 300, 50);
    ctx.fillRect(400, 70, 50, 190);
    ctx.fillRect(400, 70, 300, 50);
    ctx.fillRect(650, 70, 50, 120);
    ctx.fillRect(650, 140, 150, 50);
    ctx.fillStyle ='blue';
    ctx.beginPath();
    ctx.arc(330, 150, 50, 0, 2 *Math.PI, false);
    ctx.fill();
    ctx.fillStyle ='blue';
    ctx.beginPath();
    ctx.arc(600, 170, 40, 0, 2* Math.PI, false);
    ctx.fill();
    var triangle1=new Path2D();
    triangle1.moveTo(210, 350);
    triangle1.lineTo(290, 350);
    triangle1.lineTo(250, 270);
    ctx.fillStyle = 'gray';
    ctx.fill(triangle1);
    var triangle2=new Path2D();
    triangle2.moveTo(460, 210);
    triangle2.lineTo(540, 210);
    triangle2.lineTo(500, 130);
    ctx.fill(triangle2);
}

function gameLoop(){
    //console.log('loop');
    ctx.clearRect(0, 0, game.width, game.height);
    mapStartUp();
    if(gameRunning === true){
        waveOne();
    }
}

function waveOne(){
    enemy1 = new enemy(enemy1x, enemy1y);

    if(enemy1.x >= 0 && enemy1.x <= 800 && enemy1.y >= 236 && enemy1.y <= 400){
        enemy1y -= 2;
    }else if(enemy1.x >= 0 && enemy1.x <= 424 && enemy1.y >= 230 && enemy1.y <= 400){
        enemy1x += 2;
    }else if(enemy1.x >= 0 && enemy1.x <= 430 && enemy1.y >= 96 && enemy1.y <= 400){
        enemy1y -= 2;
    }else if(enemy1.x >= 0 && enemy1.x <= 674 && enemy1.y >= 92 && enemy1.y <= 400){
        enemy1x += 2;
    }else if(enemy1.x >= 0 && enemy1.x <= 680 && enemy1.y >= 92 && enemy1.y <= 164){
        enemy1y += 2;
    }else if(enemy1.x >= 0 && enemy1.x <= 799 && enemy1.y >= 92 && enemy1.y <= 170){
        enemy1x += 2;
    }
    ctx.beginPath();
    enemy1.render();

}
