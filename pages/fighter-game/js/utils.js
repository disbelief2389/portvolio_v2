function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

let time = 60;

function endGame() {
    time = 0;
    resultsBanner.style.opacity = 1;
    if (player.health === enemy.health) {
        resultsBanner.innerHTML = `<h1>Tie</h1>`;
    } else if (player.health > enemy.health) {
        resultsBanner.innerHTML = `<h1>Player 1 Wins!</h1>`
    } else if (enemy.health > player.health) {
        resultsBanner.innerHTML = `<h1>Player 2 Wins!</h1>`
    }
    gameOver = true;
}

function decreaseTimer() {
    if (time > 0) {
        setTimeout(decreaseTimer, 1000);
        time--;
        timer.textContent = time;
    } else if (time <= 0) {
        endGame();
    }
    
}