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
    constructor(x, y, color, cooldown){
        this.x = x;
        this.y = y;
        this.color = color;
        this.cooldown = cooldown;
    
        this.render = function() {
            //ctx.fillstyle = this.color;
            //ctx.fillRect(this.x, this.y, this.width, this.height);

            var hexagon=new Path2D();
            hexagon.moveTo(this.x-25, this.y);
            hexagon.lineTo(this.x-12.5, this.y+25);
            hexagon.lineTo(this.x+12.5, this.y+25);
            hexagon.lineTo(this.x+25, this.y);
            hexagon.lineTo(this.x+12.5, this.y-25);
            hexagon.lineTo(this.x-12.5, this.y-25);
            ctx.fillStyle = this.color;
            ctx.fill(hexagon);
        }
    }
}

class shot {
    constructor(x, y, dx, dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;

        this.render = function() {
            ctx.fillStyle = 'black';
            ctx.arc(this.x, this.y, 5, 2 *Math.PI, false);
            ctx.fill();
        }

    }
}

let enemies = [];
let towers = [];
let projectiles = [];

window.addEventListener("DOMContentLoaded", function(e) {
    const runGame = setInterval(gameLoop, 40);

});

newGame.addEventListener('click', function(e){
    console.log('Game Started');
    enemyReset();
    gameRunning = true; 
    towers.length = 0;
    goldAmount = 5;
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
    if(towerSelect === 1 && positionCheck(x,y) && goldAmount >= 3){
        goldAmount -= 3;
        towers.push(new tower(x, y, 'rgb(71, 48, 14)', 25));
    }else if(towerSelect === 2 && positionCheck(x,y) && goldAmount >= 5){
        goldAmount -= 5;
        towers.push(new tower(x, y, '#00008B', 50));
    }else if(towerSelect === 3 && positionCheck(x,y) && goldAmount >= 5){
        goldAmount -= 5;
        towers.push(new tower(x, y, '#404040', 50));
    }
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
        for(let i = 0; i < towers.length; i++){
            createShot(i);
        }
        projectileMovement();
    }
    if(endWaveCheck() === true){
        gameRunning = false;
        createEnemies(nEnemies);
        enemyReset();
        projectiles.length = 0;
    }
    for(let i =0; i < projectiles.length; i++){
        ctx.beginPath();
        projectiles[i].render();
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
        for(let n = 0; n < projectiles.length; n++){
            if( (projectiles[n].x < (enemies[i].x + 14)) && (projectiles[n].x > (enemies[i].x - 14)) && (projectiles[n].y < (enemies[i].y + 14)) && (projectiles[n].y > (enemies[i].y - 14)) ){
                enemies[i].alive = false;
                enemies[i].x = 830;
                enemies[i].y = 165;
                goldAmount += 1;
            }
        }
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

function positionCheck(x, y){
    if ( (x < 150 || x > 200 || y < 210) && (x < 150 || x > 450 || y < 210 || y > 260) && (x < 400 || x > 450 || y < 70 || y > 260) && (x < 400 || x > 700 || y < 70 || y > 120) && (x < 650 || x > 700 || y < 70 || y > 190) && (x < 650 || y < 140 || y > 190)){
        for(let i = 0; i < towers.length; i++){
            if(x > (towers[i].x - 60) && x < (towers[i].x + 60) && y < (towers[i].y + 60) && y > (towers[i].y - 60)){
                return false;
            }
        }
        if(towerSelect === 1){
            if((x > 200 && x < 290 && y < 350 && y > 260) || (x > 450 && x < 540 && y < 210 && y > 120)){
                return false;
            }
            if((x > 280 && x < 400 && y < 210 && y > 100) || (x > 540 && x < 650 && y < 210 && y > 120)){
                return false;
            }
        }else if(towerSelect === 2){
            if((x > 200 && x < 290 && y < 350 && y > 260) || (x > 450 && x < 540 && y < 210 && y > 120)){
                return false;
            }
        }else{
            if((x > 280 && x < 400 && y < 210 && y > 100) || (x > 540 && x < 650 && y < 210 && y > 120)){
                return false;
            }
        }
        return true;
    }
    return false;
}

function createShot(i){
    if(towers[i].cooldown === 0){
        let dx = (Math.random() * (3) + 1) * (Math.round(Math.random()) * 2 - 1);
        let dy = (Math.random() * (3) + 1) * (Math.round(Math.random()) * 2 - 1);
        projectiles.push(new shot(towers[i].x, towers[i].y, dx, dy)) 

        if(towers[i].color === 'rgb(71, 48, 14)'){
            towers[i].cooldown = 25;
        }else{
            towers[i].cooldown = 50;
        }
    }else{
        towers[i].cooldown -= 1;
    }
}

function projectileMovement(){
    for(let i = 0; i < projectiles.length ; i++){
        if(projectiles[i].x > 800 || projectiles[i].x < 0 || projectiles[i].y > 400 || projectiles[i].y < 0){
            projectiles.splice(i, 1);
        }
        projectiles[i].x += projectiles[i].dx;
        projectiles[i].y += projectiles[i].dy;
    }
}