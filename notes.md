# Crazy HTML canvas shooter game

## Basic Game checklist
1. Create a player ✅
2. Shoot Projectiles ✅
3. Create Enemies
4. Detect collision on enemy/projectile hit.
5. Detect collision on enemt/player hit.
6. Remove off screen projectiles.
7. Colourize game
8. Shrink enemies on hit.
9. Create particle explosion on hit.
10. Add score.
11. Add game over UI.
12. Add restart button.
13. Add start game button.

# Creating a player
a. Simple circle 🟢
b. When enemy touches player -- GAMEOVER😞

# Creating Projectiles
-> same property as player
-> Additonal property "Velocity"
-> Get mouse coordinates 

-> Figure out physics of projectile.

# Creating enemies
-> Same as Projectiles
-> Move toward center 
-> Spawn outside canvas so to prevent Badluck😞
-> Use ternaty and random to Spawn outside canvas.
-> USe ifs to spawn random outside canvas.
-> Example if X is on left or right, then Y can be a random value.
-> Example if Y is on up or down, then X can be a random value.
-> Coded random size of enemy.
-> Enemy size ranges from 4 to 30 px

# Detect Collision
