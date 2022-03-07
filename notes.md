# Crazy HTML canvas shooter game

## Basic Game checklist
1. Create a player ✅
2. Shoot Projectiles ✅
3. Create Enemies ✅
4. Detect collision on enemy/projectile hit. ✅
5. Detect collision on enemt/player hit. ✅
6. Remove off screen projectiles. ✅
7. Colourize game ✅
8. Shrink enemies on hit.✅
9. Create particle explosion on hit.✅
10. Add score.✅
13. Add start game button.✅
11. Add game over UI.✅
12. Add restart button.

# Creating a player
a. Simple circle 🟢
b. When enemy touches player -- GAMEOVER😞

# Creating Projectiles
-> same property as player 🙂
-> Additonal property "Velocity"🚤
-> Get mouse coordinates 🎯
-> Figure out physics of projectile.

# Creating enemies😈
-> Same as Projectiles
-> Move toward center 

-> Spawn outside canvas so to prevent Badluck😞
-> Use ternaty and random to Spawn outside canvas.
-> USe ifs to spawn random outside canvas.
-> Example if X is on left or right, then Y can be a random value.
-> Example if Y is on up or down, then X can be a random value.

-> Code random size of enemy.
-> Enemy size ranges from 4 to 30 px

# Detect Collision between enemy and projectile.
-> For each Enemy, Calculate the distance between Each projectiles.
-> Use Math.hypot() function to calculate distance between enemy and projectile.

-> Here this does not factor the size of enemy, so hitting exact zero will be impossible.
-> Keep in account the enemy radius and projectile radius. ⚠️

-> Now if both bodies are collided, Remove Enemy and Projectile from their arrays.
-> Use splice() method to remove an array from an index.
-> find index using forEach auto indexing.

-> Use setTimeout() to remove flashing of enemies.
-> This waits till next frame to start removing the actual enemy from the Array. 

# Detect Collision between enemies and players.
-> Pause the game when enemy touches the player.[And display the end screen.]

-> Pausing the game.⏸️
-> Use cancelAnimationFrame to cancel the game at current frame.
-> Store current frame in a variable.

# Remove off screen projectiles.
-> Remove the projectiles as soon as they cross the canvas.
-> Use splice method to remove projectile.

# Colorise and decorate game.🎨
-> use fillRect and fillStyle to make fade effect on enemy and projectile.
-> Change color of player and projectile to white.
-> Increase velocity of projectile.
-> Randomise the color of enemies using HSL.

# Shrink enemies on hit
-> Shrink enemies by updating size.
-> Dont make enemies too much small.
-> Use GSAP for smooth shrinkage.
-> Use tween - interpolate - transition to shrink enemies.
-> use to method of gsap to make this happen.

# Create particle burst effect💥
-> Create a Particle class like enemy
-> use for loop to create particles at enemy-particle collison.
-> Store these particles instances in an array.
-> Fade prticles
-> use c.save() to put in state where we call global canvas function which affect the code below c.save().
-> c.restore()
-> Update alpha to decrease in update funcntion.
-> Amount of particles depend on enemy radius
-> Add power and friction to the velocity of the particle. 

# Adding score on HTML
-> Keep text on HTML.
-> Position fixed so it does not create any problems.
-> Different score on deleting and shrinking enemy.

# Add start game button ui
-> Change display using JS event listener. 

# Restart game button
-> Reset the game.