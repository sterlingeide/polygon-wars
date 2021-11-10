let game = document.querySelector('#game');
let ctx = game.getContext('2d');
let newGame = document.querySelector('#top-middle');
let waveStart = document.querySelector('#top-middle-right');
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
let waveCount = 0;
let enemySpeed = 2;


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
    constructor(x, y, color, cooldown, towerClass){
        this.x = x;
        this.y = y;
        this.color = color;
        this.cooldown = cooldown;
        this.towerClass = towerClass;
    
        this.render = function() {

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
    constructor(x, y, dx, dy, shotClass){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.shotClass = shotClass;
        this.distance = 0;
        this.time = 0;

        this.render = function() {
            if(this.shotClass === 1){
                ctx.fillStyle = 'black';
                ctx.arc(this.x, this.y, 5, 2 *Math.PI, false);
                ctx.fill();
            }
            if(this.shotClass === 2){
                if(this.dy === 0){
                    ctx.fillStyle = 'black';
                    ctx.fillRect(this.x, this.y, 60, 15);
                }else{
                    ctx.fillStyle = 'black';
                    ctx.fillRect(this.x, this.y, 15, 60);
                }
            }
            if(this.shotClass === 3){
                ctx.fillStyle = 'black';
                ctx.arc(this.x, this.y, 20, 2 *Math.PI, false);
                ctx.fill();
            }
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
    fullReset();

});

waveStart.addEventListener('click', function(e){
    console.log('wave start');
    if (gameRunning === false){
        gameRunning = true;
        waveCount += 1;
        nEnemies = (waveCount + 1) * 5;
        enemySpeed += 1;
    }

});

game.addEventListener('click', function(e){
    console.log('clicked map');
    var x = event.clientX - 290;
    var y = event.clientY - 120;
    if(towerSelect === 1 && positionCheck(x,y) && goldAmount >= 4){
        goldAmount -= 4;
        towers.push(new tower(x, y, 'rgb(71, 48, 14)', 25, 1));
    }else if(towerSelect === 2 && positionCheck(x,y) && goldAmount >= 7){
        goldAmount -= 7;
        towers.push(new tower(x, y, '#00008B', 50, 2));
    }else if(towerSelect === 3 && positionCheck(x,y) && goldAmount >= 10){
        goldAmount -= 10;
        towers.push(new tower(x, y, '#404040', 50, 3));
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
    ctx.clearRect(0, 0, game.width, game.height);
    mapStartUp();
    towerBuild();
    if(gameRunning === true){
        wave(waveCount);
        for(let i = 0; i < towers.length; i++){
            createShot(i);
        }
        projectileMovement();
    }
    if(endWaveCheck() === true){
        gameRunning = false;
        createEnemies((nEnemies));
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
    roundDisplay.textContent = "Wave: " + waveCount;
    if(lives <= 0){
        fullReset();
    }   
}

function wave(waveN){

    for (let i = 0; i < (5 * waveN); i++){
        if( i === 0 ){
            let coords  = moveOnPath(enemies[i].x, enemies[i].y);
            enemies[i].x = coords[0];
            enemies[i].y = coords[1];
        }else if(enemies[i].y < 370){
            let coords  = moveOnPath(enemies[i].x, enemies[i].y);
            enemies[i].x = coords[0];
            enemies[i].y = coords[1];
        }else if((enemies[i].y - enemies[i-1].y) >= 50 || (enemies[i-1].y - enemies[i].y) >= 50 || (enemies[i].x - enemies[i-1].x) <= -2 || (enemies[i-1].x - enemies[i].x) <= -2){
            let coords  = moveOnPath(enemies[i].x, enemies[i].y);
            enemies[i].x = coords[0];
            enemies[i].y = coords[1];
        }

        for(let n = 0; n < projectiles.length; n++){
            if(projectiles[n].shotClass === 1){
                if( (projectiles[n].x < (enemies[i].x + 14)) && (projectiles[n].x > (enemies[i].x - 14)) && (projectiles[n].y < (enemies[i].y + 14)) && (projectiles[n].y > (enemies[i].y - 14)) ){
                    enemies[i].alive = false;
                    enemies[i].x = 830;
                    enemies[i].y = 165;
                    goldAmount += 1;
                }
            }else if(projectiles[n].shotClass === 2){
                if(projectiles[n].dy === 0){
                    if( (projectiles[n].x < (enemies[i].x + 9)) && (projectiles[n].x > (enemies[i].x - 69)) && (projectiles[n].y < (enemies[i].y + 9)) && (projectiles[n].y > (enemies[i].y - 24))) {
                        enemies[i].alive = false;
                        enemies[i].x = 830;
                        enemies[i].y = 165;
                        goldAmount += 1;
                    }
                }else{
                    if((projectiles[n].x < (enemies[i].x + 9)) && (projectiles[n].x > (enemies[i].x - 24)) && (projectiles[n].y < (enemies[i].y + 9)) && (projectiles[n].y > (enemies[i].y - 69))){
                        enemies[i].alive = false;
                        enemies[i].x = 830;
                        enemies[i].y = 165;
                        goldAmount += 1;
                    }
                }
            }else if(projectiles[n].shotClass === 3){
                if((projectiles[n].x < (enemies[i].x + 29)) && (projectiles[n].x > (enemies[i].x - 29)) && (projectiles[n].y < (enemies[i].y + 29)) && (projectiles[n].y > (enemies[i].y - 29))){
                    enemies[i].alive = false;
                    enemies[i].x = 830;
                    enemies[i].y = 165;
                    goldAmount += 1;
                }
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
    if(x >= 0 && x <= 800 && y >= 236 && y <= 500){
        y -= enemySpeed;
    }else if(x >= 0 && x <= 424 && y >= 220 && y <= 400){
        x += enemySpeed;
    }else if(x >= 0 && x <= 440 && y >= 96 && y <= 400){
        y -= enemySpeed;
    }else if(x >= 0 && x <= 674 && y >= 80 && y <= 400){
        x += enemySpeed;
    }else if(x >= 0 && x <= 690 && y >= 80 && y <= 164){
        y += enemySpeed;
    }else if(x >= 0 && x <= 830 && y >= 80 && y <= 170){
        x += enemySpeed;
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
        enemies[i].y = yStart;
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
        }else if(towerSelect === 3){
            if((x > 200 && x < 290 && y < 350 && y > 260) || (x > 450 && x < 540 && y < 210 && y > 120)){
                return true;
            }else{
                return false;
            }
        }else{
            if((x > 280 && x < 400 && y < 210 && y > 100) || (x > 540 && x < 650 && y < 210 && y > 120)){
                return true;
            }else{
                return false;
            }
        }
        return true;
    }
    return false;
}

function createShot(i){
    if(towers[i].cooldown === 0){
        let dx;
        let dy;
        if(towers[i].towerClass === 2){
            dx = Math.round(Math.random()) * (Math.round(Math.random()) * 2 - 1);
            if(dx === 0){
                dy = Math.round(Math.random()) * 2 - 1;
            }else{
                dy = Math.round(Math.random()) * (Math.round(Math.random()) * 2 - 1);
            }

            dx = dx * 3
            dy = dy * 3;
        }else{
            dx = (Math.random() * (3) + 1) * (Math.round(Math.random()) * 2 - 1);
            dy = (Math.random() * (3) + 1) * (Math.round(Math.random()) * 2 - 1);
        }
        projectiles.push(new shot(towers[i].x, towers[i].y, dx, dy, towers[i].towerClass)); 

        if(towers[i].towerClass === 1){
            towers[i].cooldown = 25;
        }else{
            towers[i].cooldown = 75;
        }
    }else{
        towers[i].cooldown -= 1;
    }
}

function projectileMovement(){
    for(let i = 0; i < projectiles.length ; i++){
        if(projectiles[i].shotClass === 2 && projectiles[i].dy === 0){
            if(projectiles[i].x > 741){
                projectiles.splice(i, 1);
            }
        }else if(projectiles[i].x > 800 || projectiles[i].x < 0 || projectiles[i].y > 400 || projectiles[i].y < 0){
            projectiles.splice(i, 1);
        }
        if(projectiles[i].shotClass === 1 || projectiles[i].shotClass === 2){
            projectiles[i].x += projectiles[i].dx;
            projectiles[i].y += projectiles[i].dy;
        }else if(projectiles[i].shotClass === 3){
            if(projectiles[i].distance < 100){
                projectiles[i].x += projectiles[i].dx;
                projectiles[i].y += projectiles[i].dy;
                projectiles[i].distance += (Math.sqrt((projectiles[i].dx * projectiles[i].dx) + (projectiles[i].dy * projectiles[i].dy)));
            }
            if(projectiles[i].time > 100){
                projectiles.splice(i, 1);
            }
            projectiles[i].time += 1;

        }
    }
}

function fullReset(){
    console.log('Game Started');
    enemyReset();
    gameRunning = false; 
    towers.length = 0;
    projectiles.length = 0;
    goldAmount = 5;
    lives = 20;
    waveCount = 0;
}