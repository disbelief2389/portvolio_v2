const enemyHealth = document.getElementById('enemy-health');
const playerHealth = document.getElementById('player-health');
const timer = document.getElementById('timer');
const canvas = document.querySelector('canvas');
const cCon = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

cCon.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
    constructor({ position, velocity, colour, offset }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
            
        }
        this.colour = colour
        this.isAttacking
        this.health = 100
    }

    draw() {
        cCon.fillStyle = this.colour
        cCon.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        // attackBox
        if (this.isAttacking) {
            cCon.fillStyle = 'yellow'
            cCon.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }

        
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
};

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    colour: 'green',
    offset: {
        x: 0,
        y: 0
    }
});
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    colour: 'red',
    offset: {
        x: -50,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate() {
    window.requestAnimationFrame(animate);
    cCon.fillStyle = 'black';
    cCon.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -10;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 10;
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -10;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 10;
    }

    // detect for collisions
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false;
        enemy.health -= 20;
        enemyHealth.style.width = enemy.health + '%';
        console.log('player hit enemy');
    }

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false;
        player.health -= 20;
        playerHealth.style.width = player.health + '%';
        console.log('enemy hit player');
    }
    
}

animate()

window.addEventListener('keydown', (event) => {
    // console.log(event.key)
    //player keydown
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            if (player.position.y + player.height + player.velocity.y >= canvas.height) {
                player.velocity.y = -20;
            }
            break;
        case ' ':
            player.attack();
            break;
    }
    //enemy keydown
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            if (enemy.position.y + enemy.height + enemy.velocity.y >= canvas.height) {
                enemy.velocity.y = -20;
            }
            break;
        // case 
    }
    switch (event.code) {
        case 'ControlRight':
            enemy.attack();
            break;
    }
})

window.addEventListener('keyup', (event) => {
    // player keyup
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            if (keys.a.pressed) player.lastKey = 'a';
            break;
        case 'a':
            keys.a.pressed = false;
            if (keys.d.pressed) player.lastKey = 'd';
            break;
    }
    //enemy keyup
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            if (keys.ArrowLeft.pressed) enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            if (keys.ArrowRight.pressed) enemy.lastKey = 'ArrowRight';
            break;
    }
})