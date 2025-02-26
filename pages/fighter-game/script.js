const timer = document.getElementById('timer');
const resultsBanner = document.getElementById('results-banner')
const canvas = document.querySelector('canvas');
const cCon = canvas.getContext('2d');
let gameOver = false;

canvas.width = 1024;
canvas.height = 576;

cCon.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '/pages/fighter-game/assets/background.png'
})
const shop = new Sprite({
    position: {
        x: 640,
        y: 127
    },
    imageSrc: '/pages/fighter-game/assets/shop.png',
    scale: 2.75,
    framesMax: 6
})
const player = new Fighter({
    position: {
        x: 50,
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
    },
    imageSrc: '/pages/fighter-game/assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 156
    },
    sprites: {
        idle: {
            imageSrc: '/pages/fighter-game/assets/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: '/pages/fighter-game/assets/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: '/pages/fighter-game/assets/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: '/pages/fighter-game/assets/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: '/pages/fighter-game/assets/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: '/pages/fighter-game/assets/samuraiMack/Take hit.png',
            framesMax: 4
        },
        death: {
            imageSrc: '/pages/fighter-game/assets/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 40
        },
        width: 140,
        height: 50
    }
});
const enemy = new Fighter({
    position: {
        x: 900,
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
    },
    imageSrc: '/pages/fighter-game/assets/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: '/pages/fighter-game/assets/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: '/pages/fighter-game/assets/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: '/pages/fighter-game/assets/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: '/pages/fighter-game/assets/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: '/pages/fighter-game/assets/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: '/pages/fighter-game/assets/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: '/pages/fighter-game/assets/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -160,
            y: 50
        },
        width: 130,
        height: 50
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



decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    cCon.fillStyle = 'black';
    cCon.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    cCon.fillStyle = 'rgba(0, 0, 0, 0.7)';
    cCon.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();
        
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    
    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -10;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 10;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    };
    // player jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -10;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 10;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    };
    // enemy jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    // detect for collisions
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking &&
        player.framesCurrent === 4
    ) {
        player.isAttacking = false;
        enemy.takeHit();
        document.getElementById('enemy-health').style.width = enemy.health + '%';
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking &&
        enemy.framesCurrent === 2
    ) {
        enemy.isAttacking = false;
        player.takeHit()
        player.framesCurrent = 1;
        document.getElementById('player-health').style.width = player.health + '%';
    }
    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }
    
    if (enemy.health <= 0 || player.health <= 0) {
        endGame();
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
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
                // if (player.position.y = 332) {
                player.velocity.y = -20;
                // } else player.velocity.y = 0;
                break;
            case ' ':
                if (!gameOver) {player.attack()}; 
                break;
        }
    }

    if (!enemy.dead) {
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
                // if (enemy.position.y + enemy.height + enemy.velocity.y >= canvas.height) {
                    enemy.velocity.y = -20;
                // }
                break;
            // case 
        }
        switch (event.code) {
            case 'ControlRight':
                if (!gameOver) {enemy.attack()};
                break;
        }
    }
})

window.addEventListener('keyup', (event) => {
    if (!player.dead) {
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
    }
    if (!enemy.dead) {
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
    }
})