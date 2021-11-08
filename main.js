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

game.setAttribute('height', getComputedStyle(game)["height"]);
game.setAttribute('width', getComputedStyle(game)["width"]);


class enemy {
    constructor(x ,y){
        this.x = x;
        this.y = y;
        this.color = 'blue';
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
    const runGame = setInterval(gameLoop, 1000);

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
    ctx.moveTo(330,150);
    ctx.arc(330, 150, 50, 0, 2 *Math.PI, false);
    ctx.fill();
    ctx.fillStyle ='blue';
    ctx.moveTo(600,170);
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
    //console.log(ctx);
    //console.log(game.height);
    //console.log(game.width);
}

function gameLoop(){
    console.log('loop');
    ctx.clearRect(0, 0, game.width, game.height);
    mapStartUp();
    if(gameRunning === true){
        waveOne();
    }
}

function waveOne(){
    ctx.moveTo(175,enemy1y);
    enemy1 = new enemy(175, enemy1y);
    
    if(enemy1.x >= 0 && enemy1.x <= 800 && enemy1.y >= 0 && enemy1.y <= 400){
        enemy1y -= 1;
    }
    enemy1.render();

}
