let game = document.querySelector('#game');
let ctx = game.getContext('2d');
let newGame = document.querySelector('#top-middle');
let pause = document.querySelector('#top-middle-right');
let roundDisplay = document.querySelector('#rounds');
let towerOne = document.querySelector('#btm-left');
let towerTwo = document.querySelector('#btm-middle-left');
let towerThree = document.querySelector('#btm-middle');
let goldCount = document.querySelector('#gold');
let lifeCount = document.querySelector('#lives');
let gameRunning = false;
let xStart = 175;
let yStart = 420;
let lives = 20;
let nEnemies = 5;
let towerSelect = 0;
let goldAmount = 5;


game.setAttribute('height', getComputedStyle(game)["height"]);
game.setAttribute('width', getComputedStyle(game)["width"]);


class enemy {
    constructor(x ,y){
        this.x = x;
        this.y = y;
        this.color = 'red';
        this.radius = 10;
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 2 *Math.PI, false);
            ctx.fill();
        }
    }
}

class tower {
    constructor(x, y, width, height){
        this.x =x;
        this.y =y;
        this.width = width;
        this.height = height;
        this.color = 'black';
    
        this.render = function() {
            ctx.fillstyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

let enemies = [];
let towers = [];

window.addEventListener("DOMContentLoaded", function(e) {
    const runGame = setInterval(gameLoop, 40);

});

newGame.addEventListener('click', function(e){
    console.log('Game Started');
    enemyReset();
    gameRunning = true; 
    towers.length = 0;
});

pause.addEventListener('click', function(e){
    console.log('Game Pause');
    if (gameRunning === false){
        gameRunning = true;
    }else{
        gameRunning = false;
    }  
});

game.addEventListener('click', function(e){
    console.log('clicked map');
    var x = event.clientX - 290;
    var y = event.clientY - 120;     
    towers.push(new tower(x, y, 50, 50));
});

towerOne.addEventListener('click', function(e) {
    if(towerSelect === 1){
        towerOne.style.border = "";
        towerSelect = 0;
    }else{
        towerOne.style.border = "5px solid rgb(179, 190, 21)";
        towerSelect = 1;
    }
    towerTwo.style.border = "";
    towerThree.style.border ="";
});

towerTwo.addEventListener('click', function(e) {
    if(towerSelect === 2){
        towerTwo.style.border = "";
        towerSelect = 0;
    }else{
        towerTwo.style.border = "5px solid rgb(179, 190, 21)";
        towerSelect = 2;
    }
    towerOne.style.border = "";
    towerThree.style.border ="";
});

towerThree.addEventListener('click', function(e) {
    if(towerSelect === 3){
        towerThree.style.border ="";
        towerSelect = 0;
    }else{
        towerThree.style.border = "5px solid rgb(179, 190, 21)";
        towerSelect = 3;
    }
    towerOne.style.border = "";
    towerTwo.style.border = "";
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

function towerBuild(){
    for(let i =0; i < towers.length ; i++){
        towers[i].render();
    }
}

function gameLoop(){
    //console.log('loop');
    ctx.clearRect(0, 0, game.width, game.height);
    mapStartUp();
    towerBuild();
    if(gameRunning === true){
        waveOne();
    }
    if(endWaveCheck() === true){
        gameRunning = false;
        createEnemies(nEnemies);
        enemyReset();
    }
    for(let i =0; i < enemies.length; i++){
        ctx.beginPath();
        enemies[i].render();
    }
    lifeCount.textContent = "Lives: " + lives;
    goldCount.textContent = "Gold: " + goldAmount;
    
}

function waveOne(){
    roundDisplay.textContent = "Wave: 1";

    for (let i = 0; i < 5; i++){
         let coords  = moveOnPath(enemies[i].x, enemies[i].y);
        enemies[i].x = coords[0];
        enemies[i].y = coords[1];
        if(enemies[i].x >= 800 && enemies[i].y >= 140 && enemies[i].y <= 190){
            if(enemies[i].alive === true){
                lives -= 1;
                enemies[i].alive = false;
            }
            
                
        }
    }


}

function moveOnPath(x,y){
    if(x >= 0 && x <= 800 && y >= 236 && y <= 1000){
        y -= 2;
    }else if(x >= 0 && x <= 424 && y >= 230 && y <= 400){
        x += 2;
    }else if(x >= 0 && x <= 430 && y >= 96 && y <= 400){
        y -= 2;
    }else if(x >= 0 && x <= 674 && y >= 92 && y <= 400){
        x += 2;
    }else if(x >= 0 && x <= 680 && y >= 92 && y <= 164){
        y += 2;
    }else if(x >= 0 && x <= 830 && y >= 92 && y <= 170){
        x += 2;
    }
    return [x,y];
}

function endWaveCheck(){
    
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].x < 800){
            return false;
        }
    }
    return true;
}

function enemyReset(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].x = xStart;
        enemies[i].y = yStart + (i * 50);
        enemies[i].alive = true;
    }
}

function createEnemies(n){
    enemies.length = 0;
    for (let i = 0; i < n; i++){
        enemies.push(new enemy());
    }
}