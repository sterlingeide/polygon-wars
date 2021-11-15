let game = document.querySelector('#game');
let ctx = game.getContext('2d');
let newGame = document.querySelector('#top-middle');
let waveStart = document.querySelector('#top-middle-right');
let roundDisplay = document.querySelector('#rounds');
let towerOne = document.querySelector('#btm-left');
let bunkerText = document.querySelector('#bunker');
let towerTwo = document.querySelector('#btm-middle-left');
let battleShipText = document.querySelector('#battle-ship');
let towerThree = document.querySelector('#btm-middle');
let mountainPerchText = document.querySelector('#mountain-perch');
let goldCount = document.querySelector('#gold');
let lifeCount = document.querySelector('#lives');
let instructions = document.querySelector('.start');
let gameRunning = false;
let xStart = 175;
let yStart = 420;
let lives = 20;
let nEnemies = 5;
let towerSelect = 0;
let goldAmount = 5;
let waveCount = 0;
let enemySpeed = 2;
let towerOneCost = 4;
let towerTwoCost = 7;
let towerThreeCost = 10;


game.setAttribute('height', getComputedStyle(game)["height"]);
game.setAttribute('width', getComputedStyle(game)["width"]);

//the class I use to model each enemy circle
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

//the class used to model each tower
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

//the class used to model each projectile fired by the towers
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

//arrays that will hold all the current enemies, towers and projectiles
let enemies = [];
let towers = [];
let projectiles = [];

//starts the game as soon as its loaded
window.addEventListener("DOMContentLoaded", function(e) {
    const runGame = setInterval(gameLoop, 40);

});

newGame.addEventListener('click', function(e){
    fullReset();
    instructions.classList.add('hidden');
});

//increasaes the wavecount so the program knows how many enemies to create
//increases speed to raise difficulty
waveStart.addEventListener('click', function(e){
    if (gameRunning === false){
        gameRunning = true;
        waveCount += 1;
        nEnemies = (waveCount + 1) * 5;
        if (enemySpeed < 15){
            enemySpeed += 1;
        }else{
            enemySpeed = 15;
        }
    }

});

game.addEventListener('click', function(e){
    var rect = game.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    //constants applied to correct page coordinates to canvas coordinates
    x = x * .93;
    y = y * .92;
    
    //determines which type of tower to create and if it can be created
    if(towerSelect === 1 && positionCheck(x,y) && goldAmount >= towerOneCost){
        goldAmount -= towerOneCost;
        towerOneCost = towerOneCost*2;
        towers.push(new tower(x, y, 'rgb(71, 48, 14)', 20, 1));
    }else if(towerSelect === 2 && positionCheck(x,y) && goldAmount >= towerTwoCost){
        goldAmount -= towerTwoCost;
        towerTwoCost = towerTwoCost*2;
        towers.push(new tower(x, y, '#00008B', 60, 2));
    }else if(towerSelect === 3 && positionCheck(x,y) && goldAmount >= towerThreeCost){
        goldAmount -= towerThreeCost;
        towerThreeCost = towerThreeCost*2;
        towers.push(new tower(x, y, '#404040', 75, 3));
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
    //the road
    ctx.fillStyle = 'tan';
    ctx.fillRect(150, 210, 50, 197);
    ctx.fillRect(150, 210, 300, 50);
    ctx.fillRect(400, 70, 50, 190);
    ctx.fillRect(400, 70, 300, 50);
    ctx.fillRect(650, 70, 50, 120);
    ctx.fillRect(650, 140, 165, 50);
    //the lakes
    ctx.fillStyle ='blue';
    ctx.beginPath();
    ctx.arc(330, 150, 50, 0, 2 *Math.PI, false);
    ctx.fill();
    ctx.fillStyle ='blue';
    ctx.beginPath();
    ctx.arc(600, 170, 40, 0, 2* Math.PI, false);
    ctx.fill();
    //the mountains
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
    //runs game functions if the player is in the middle of a wave
    if(gameRunning === true){
        wave(waveCount);
        for(let i = 0; i < towers.length; i++){
            createShot(i);
        }
        projectileMovement();
    }
    //checks if the wave is over yet and runs necessary functions if it is
    if(endWaveCheck() === true){
        gameRunning = false;
        createEnemies((nEnemies));
        enemyReset();
        projectiles.length = 0;
    }
    //rendering enemies and projectiles
    for(let i =0; i < projectiles.length; i++){
        ctx.beginPath();
        projectiles[i].render();
    }
    for(let i =0; i < enemies.length; i++){
        ctx.beginPath();
        enemies[i].render();
    }
    //adjusting text
    lifeCount.textContent = "Lives: " + lives;
    goldCount.textContent = "Gold: " + goldAmount;
    roundDisplay.textContent = "Wave: " + waveCount;
    bunkerText.textContent = "Bunker: " + towerOneCost + " gold"; 

    battleShipText.textContent = "Battle Ship: " + towerTwoCost + " gold";
    mountainPerchText.textContent = "Mountain Perch: " + towerThreeCost + " gold";
    if(lives <= 0){
        fullReset();
    }   
}

function wave(waveN){
    //iterating through each enemy
    for (let i = 0; i < (5 * waveN); i++){
        //moving the enemy if the previous enemy is far enough away
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
        //iterating through projectiles
        for(let n = 0; n < projectiles.length; n++){
            //checking if projectile has collided with an enemy
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
        //checking if enemies made it through the map
        if(enemies[i].x >= 815 && enemies[i].y >= 140 && enemies[i].y <= 190){
            if(enemies[i].alive === true){
                lives -= 1;
                enemies[i].alive = false;
            }
            
                
        }
    }


}
//moving enemies based on where they are
function moveOnPath(x,y){
    if(x >= 0 && x <= 815 && y >= 236 && y <= 500){
        y -= enemySpeed;
    }else if(x >= 0 && x <= 424 && y >= 220 && y <= 407){
        x += enemySpeed;
    }else if(x >= 0 && x <= 440 && y >= 96 && y <= 407){
        y -= enemySpeed;
    }else if(x >= 0 && x <= 674 && y >= 80 && y <= 407){
        x += enemySpeed;
    }else if(x >= 0 && x <= 690 && y >= 80 && y <= 164){
        y += enemySpeed;
    }else if(x >= 0 && x <= 830 && y >= 80 && y <= 180){
        x += enemySpeed;
    }
    return [x,y];
}

function endWaveCheck(){  
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].x < 815){
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
    //see if the selected tower can be placed where clicked
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
    //checking if a shot is ready to be fired
    if(towers[i].cooldown === 0){
        let dx;
        let dy;
        //creating location and movement based on what tower it is
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
            towers[i].cooldown = 20;
        }else if(towers[i].towerClass === 2){
            towers[i].cooldown = 60;
        }else{
            towers[i].cooldown = 75;
        }
    }else{
        towers[i].cooldown -= 1;
    }
}

function projectileMovement(){
    for(let i = 0; i < projectiles.length ; i++){
        //removing shots if necessary
        if(projectiles[i].shotClass === 2 && projectiles[i].dy === 0){
            if(projectiles[i].x > 741){
                projectiles.splice(i, 1);
            }
        }else if(projectiles[i].x > 815 || projectiles[i].x < 0 || projectiles[i].y > 407 || projectiles[i].y < 0){
            projectiles.splice(i, 1);
        }
        //moving projectiles
        if(projectiles[i].shotClass === 1 || projectiles[i].shotClass === 2){
            projectiles[i].x += projectiles[i].dx;
            projectiles[i].y += projectiles[i].dy;
        }else if(projectiles[i].shotClass === 3){
            if(projectiles[i].distance < 100){
                projectiles[i].x += projectiles[i].dx;
                projectiles[i].y += projectiles[i].dy;
                projectiles[i].distance += (Math.sqrt((projectiles[i].dx * projectiles[i].dx) + (projectiles[i].dy * projectiles[i].dy)));
            }
            if(projectiles[i].time > 80){
                projectiles.splice(i, 1);
            }
            projectiles[i].time += 1;

        }
    }
}

function fullReset(){
    enemyReset();
    gameRunning = false; 
    towers.length = 0;
    projectiles.length = 0;
    enemies.length = 0;
    goldAmount = 5;
    lives = 20;
    waveCount = 0;
    towerOneCost = 4;
    towerTwoCost = 7;
    towerThreeCost = 10;
    enemySpeed = 2;
    nEnemies = 5;
}
