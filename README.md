<h1>Polygon Wars</h1>


<h2>The original wire frame<h2>
![img/wireFrame.png](img/wireFrame.png)

<h1> Key Elements</h1>
  <h2>The Map</h2>
  <ul>
    <li>The main work with creating the map was focused on creating the path that enemies would travel on and making the enemies travel on that path.</li>
    <li>I also wanted to create regions that only certain towers could be built on and thus created the mountains and lakes that dot the map.</li>
    <li>Finally I limited where the towers could be placed and added the border to the map so nothing could go passed it.  </li>
  </ul>
  <h2>The Towers </h2>
  <ul>
    <li>The programming for the towers was largely differentiating the different towers and creating the projectiles that they shot.</li>
    <li>When creating the towers I had to create buttons to select different towers as well as a way for the game to remember which tower type it was.</li>
    <li>The projectiles being released from the towers had to be tracked for their locations and speeds, as well as deleting them when they reached the border of the map.</li>
  </ul>
  <h2>The Enemies </h2>
  <ul>
    <li>The enemies had to be created each round with a scaling amount and speed so that difficulty would rise as the game went on.</li>
    <li>I also had to check for when the enemies were hit by a projectile and delete them if they were.</li>
    <li>Finally I had to track how many enemies got killed or made it through to either reward gold or take lives based on what happened.</li>
  </ul>
  <h2> List of Objects and Functions </h2>
  <table>
        <thead>
            <tr>
                <th>Objects</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
          <td>tower</td>
          <td>That's a tower</td>
        </tbody>
        <thead>
            <tr>
                <th>Functions</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
          <td>runGame</td>
          <td>Runs things</td>
        </tbody>
 </table>
