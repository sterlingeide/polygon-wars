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
  <h3>The Towers:</h3>
  <ul>
    <li>The programming for the towers was largely differentiating the different towers and creating the projectiles that they shot.</li>
    <li>When creating the towers I had to create buttons to select different towers as well as a way for the game to remember which tower type it was.</li>
    <li>The projectiles being released from the towers had to be tracked for their locations and speeds, as well as deleting them when they reached the border of the map.</li>
  </ul>
  <h3>The Enemies:</h3>
  <ul>
    <li>The enemies had to be created each round with a scaling amount and speed so that difficulty would rise as the game went on.</li>
    <li>I also had to check for when the enemies were hit by a projectile and delete them if they were.</li>
    <li>Finally I had to track how many enemies got killed or made it through to either reward gold or take lives based on what happened.</li>
  </ul>
<h2> List of Objects and Functions </h2>
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
        </tbody>
  </table>
