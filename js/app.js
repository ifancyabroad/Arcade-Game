const getRandom = function(min, max) {
	return Math.random() * (max - min) + min;
}

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = getRandom(100, 515);
	this.y = getRandom(40, 250);
	this.speed = getRandom(50, 100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.	
	this.x += this.speed * dt;
	
	if (this.x > 515) {
		this.x = -100;
	}
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
	this.x = 200;
	this.y = 200;
	this.sprite = 'images/char-boy.png';
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
	
};

Player.prototype.handleInput = function() {
	
};


// Now instantiate your objects.
let enemy1 = new Enemy();
let enemy2 = new Enemy();
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2];
// Place the player object in a variable called player
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
