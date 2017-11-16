// Get random number within a range
const getRandom = function(min, max) {
	return Math.random() * (max - min) + min;
}



// Enemies our player must avoid
const Enemy = function() {
	// x and y variables for location
	this.x = getRandom(100, 515);
	this.y = getRandom(40, 250);
	// Speed variable
	this.speed = getRandom(20, 200);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	
	// Enemies loop back around after exiting the screen
	if (this.x > 515) {
		this.x = -100;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
const Player = function() {
	this.x = 200;
	this.y = 375;
	this.sprite = 'images/char-boy.png';
}

// Draw the player o the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
	
};

// Player moves based on user input
Player.prototype.handleInput = function(key) {
	switch (key) {
		case 'left':
			if (this.x > 50) {
				this.x -= 100;
			}
			break;
		case 'up':
			if (this.y > 25) {
				this.y -= 85;
			}
			break;
		case 'right':
			if (this.x < 400) {
				this.x += 100;
			}
			break;
		case 'down':
			if (this.y < 300) {
				this.y += 85;
			}
			break;
	}
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

const generateEnemies = function(num) {
	for (let i = 0; i < num; i++) {
		let enemy = new Enemy();
		allEnemies.push(enemy);
	}
}

generateEnemies(5);

// Global variable for the player
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
