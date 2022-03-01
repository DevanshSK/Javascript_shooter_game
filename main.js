//Initalise project
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

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue");

//Array for management of multiple instances of projectile
const projectiles = [];
const enemies = [];

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

    const color = "green";

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
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  projectiles.forEach((projectile) => {
    projectile.update();
  });

  enemies.forEach((enemy, indexEnemy) => {
    enemy.update();

    //Collision Detection
    projectiles.forEach((projectile, indexProjectile) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      //Objects touch
      if (dist - enemy.radius - projectile.radius < 1) {
        //executes if both bodies are collided.
        //Removes Enemy and Projectile.

        setTimeout(() => {
          //Stops flashing of enemy.
          enemies.splice(indexEnemy, 1);
          projectiles.splice(indexProjectile, 1);
          console.log("Enemy is dead.");
        }, 0);
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
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();
spawnEnemies();
