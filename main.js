//Initalise project

//All GSAP functions
// console.log(gsap);

const canvas = document.querySelector("canvas");
// Creates a 2D canvas
const c = canvas.getContext("2d");

//Sets Width and height of canvas.
canvas.width = innerWidth;
canvas.height = innerHeight;

//Creates player
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

// Creates projectiles
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Enemies {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

}
//Particles for explosion
const friction = 0.99;
class Particles {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 10, "white");

//Array for management of multiple instances of projectile
const projectiles = [];
const enemies = [];
const particles = [];

function spawnEnemies() {
  setInterval(() => {
    // console.log('go');
    // Random size of enemy
    const radius = Math.random() * (30 - 4) + 4;
    let x, y;

    // USe ifs to decide random location outside canvas.
    // Ternary operator to spawn outside canvas.
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      x = Math.random() * canvas.width;
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

    // Destination Pehle
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemies(x, y, radius, color, velocity));
    // console.log(enemies);
  }, 1000);
}

//Animation loop for projectiles
//Renders Every frame continously
let animateId;
function animate() {
  //Store frame number inside animateID
  animateId = requestAnimationFrame(animate);

  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0){
      particles.splice(index,1)
    }else{

      particle.update();
    }
  })

  projectiles.forEach((projectile, index) => {
    projectile.update();

    //Remove projectile when the go out of canvas.
    //remove from edges of the screen.
    if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height){

      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);

    }
  });

  enemies.forEach((enemy, indexEnemy) => {
    enemy.update();

    //Check for player collision.
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist - player.radius - enemy.radius < 1){
      cancelAnimationFrame(animateId);
      console.log('Player is dead.');
    }

    //Collision Detection
    projectiles.forEach((projectile, indexProjectile) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      //Projectiles touch enemies
      if (dist - enemy.radius - projectile.radius < 1) {
        //executes if both bodies are collided.
        //Removes Enemy and Projectile.

        //Particle Explosion
        for (let i = 0; i< enemy.radius * 2; i++){
          particles.push(new Particles(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: (Math.random() - 0.5) * (Math.random() * 6)
            }
          ))
        }

        //Shrinks the enemy
        if (enemy.radius - 10 > 5) {
          //Using gsap to shrink radius smoothly.
          gsap.to(enemy, {
            radius: enemy.radius - 10
          })

          setTimeout(() => {
            projectiles.splice(indexProjectile, 1);
          }, 0);

        }else{
          setTimeout(() => {
            //Stops flashing of enemy.
            enemies.splice(indexEnemy, 1);
            projectiles.splice(indexProjectile, 1);
            // console.log("Enemy is dead.");
          }, 0);
        }
      }
    });
  });
}

//Automatically registers this event listener to window.
addEventListener("click", (event) => {
  //Projectile math
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "white", velocity)
  );
});

animate();
spawnEnemies();
