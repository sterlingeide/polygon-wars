<h1>Polygon Wars</h1>


<h3>The original wire frame<h3>
![img/wireFrame.png](img/wireFrame.png)

<h2> Key Elements</h2>
  <h3>The Map:</h3>
  <ul>
    <li>The main work with creating the map was focused on creating the path that enemies would travel on and making the enemies travel on that path.</li>
    <li>I also wanted to create regions that only certain towers could be built on and thus created the mountains and lakes that dot the map.</li>
    <li>Finally I limited where the towers could be placed and added the border to the map so nothing could go passed it.  </li>
  </ul>

~~~jsctx.fillRect(400, 70, 50, 190);
    ctx.fillRect(400, 70, 300, 50);
    ctx.fillRect(650, 70, 50, 120);
    ctx.fillRect(650, 140, 165, 50);
    ctx.fillStyle ='blue';
    ctx.beginPath();
    ctx.arc(330, 150, 50, 0, 2 *Math.PI, false);
    ctx.fill();
~~~
~~~js if ( (x < 150 || x > 200 || y < 210) && (x < 150 || x > 450 || y < 210 || y > 260) && (x < 400 || x > 450 || y < 70 || y > 260) && (x < 400 || x > 700 || y < 70 || y > 120) && (x < 650 || x > 700 || y < 70 || y > 190) && (x < 650 || y < 140 || y > 190)){
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
  ~~~
  <h3>The Towers:</h3>
  <ul>
    <li>The programming for the towers was largely differentiating the different towers and creating the projectiles that they shot.</li>
    <li>When creating the towers I had to create buttons to select different towers as well as a way for the game to remember which tower type it was.</li>
    <li>The projectiles being released from the towers had to be tracked for their locations and speeds, as well as deleting them when they reached the border of the map.</li>
  </ul>
  ~~~js
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
~~~
js~~~for(let i = 0; i < projectiles.length ; i++){
        if(projectiles[i].shotClass === 2 && projectiles[i].dy === 0){
            if(projectiles[i].x > 741){
                projectiles.splice(i, 1);
            }
        }else if(projectiles[i].x > 815 || projectiles[i].x < 0 || projectiles[i].y > 407 || projectiles[i].y < 0){
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
            if(projectiles[i].time > 80){
                projectiles.splice(i, 1);
            }
            projectiles[i].time += 1;

        }
    }
~~~
  <h3>The Enemies:</h3>
  <ul>
    <li>The enemies had to be created each round with a scaling amount and speed so that difficulty would rise as the game went on.</li>
    <li>I also had to check for when the enemies were hit by a projectile and delete them if they were.</li>
    <li>Finally I had to track how many enemies got killed or made it through to either reward gold or take lives based on what happened.</li>
  </ul>
<h2> List of Classes, Event Listeners, and Functions </h2>
  <table>
        <thead>
            <tr>
                <th>Classes</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>tower</td>
            <td>This contains the coordinates, color, cooldown, and type for each tower</td>
          </tr>
          <tr>
            <td>enemy</td>
            <td>This contains the coordinates, color, radius, and status for each enemy</td>
          </tr>
          <tr>
            <td>shot</td>
            <td>This contains the coordinates, movement, class, distance, and time for each projectile</td>
          </tr>
        </tbody>
 </table>
 <table>
   <thead>
     <tr>
       <th>Element</th>
       <th>Event Listener</th>
       <th>Description</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>window</td>
       <td>DOM content loaded</td>
       <td>starts the runGame function on an interval</td>
     </tr>
     <tr>
       <td>newGame</td>
       <td>click</td>
       <td>calls fullReset and hides the instructions</td>
     </tr>
     <tr>
       <td>waveStart</td>
       <td>click</td>
       <td>starts the round and increments the wave count and enemy speed</td>
     </tr>
     <tr>
       <td>game</td>
       <td>click</td>
       <td>maps where you click to the canvas and places a tower there if possible</td>
     </tr>
     <tr>
       <td>towerOne</td>
       <td>click</td>
       <td>sets the user selection to the first tower</td>
     </tr>
     <tr>
       <td>towerTwo</td>
       <td>click</td>
       <td>sets the user selection to the second tower</td>
     </tr>
     <tr>
       <td>towerThree</td>
       <td>click</td>
       <td>sets the user selection to the third tower</td>
     </tr>
  </table>
 <table>
        <thead>
            <tr>
                <th>Functions</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>mapStartUp</td>
            <td>renders all of the static and constant aspects of the map</td>
          </tr>
          <tr>
            <td>towerBuild</td>
            <td>renders all of the currently placed towers</td>
          </tr>
          <tr>
            <td>gameLoop</td>
            <td>Clears the canvas and calls all of the appropiate functions based on the game state and then renders the appropiate items</td>
          </tr>
          <tr>
            <td>wave</td>
            <td>"moves" the enemies and checks if the enemies have been hit by a projectile or made it through the map</td>
          </tr>
          <tr>
            <td>moveOnPath</td>
            <td>returns the coordinates of the enmies based on where they are on the map</td>
          </tr>
          <tr>
            <td>endWaveCheck</td>
            <td>returns false if enemies are still on the map, and true if there aren't</td>
          </tr>
          <tr>
            <td>enemyReset</td>
            <td>sets all of the enmies coordinates to the starting location and sets them to alive</td>
          </tr>
          <tr>
            <td>createEnemies</td>
            <td>clears the array of enemies and then creates as many enemies as needed for the next wave</td>
          </tr>
          <tr>
            <td>positionCheck</td>
            <td>returns true if the chosen tower can be placed on the clicked spot or false otherwise</td>
          </tr>
          <tr>
            <td>createShot</td>
            <td>creates a projectile if the tower is off cooldown </td>
          </tr>
          <tr>
            <td>projectileMovement</td>
            <td>"moves" the projectiles and deletes the projectile if it reaches the end of the map</td>
          </tr>
          <tr>
            <td>fullReset</td>
            <td>resets many variables for the beginning of a new game</td>
          </tr>
        </tbody>
  </table>
