// Get random number within a range
const getRandom = function(min, max) {
	return Math.random() * (max - min) + min;
}

// Get a random lane
const getLane = function() {
	lanes = Math.floor(Math.random() * (4 - 1)) + 1;
	switch (lanes) {
		case 1:
			return 60;
			break;
		case 2:
			return 140;
			break;
		case 3:
			return 220;
			break;
	}
}

// Enemies our player must avoid
const Enemy = function() {
	// Starting x and y variables for location
	this.x = getRandom(100, 515);
	this.y = getLane();
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
		this.y = getLane();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
const Player = function() {
	// Starting x and y variables for location
	this.x = 200;
	this.y = 375;
	// The image/sprite for the player
	this.sprite = 'images/char-boy.png';
}

// Draw the player to the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checking for collisions
Player.prototype.update = function() {
	for (let enemy of allEnemies) {
		let xLoc = this.x - enemy.x;
		let yLoc = this.y - enemy.y;
		if ((xLoc < 50 && xLoc > -50) && (yLoc < 30 && yLoc > -30)) {
			this.hit();
		}
	}
};

// Player is hit by an enemy
Player.prototype.hit = function() {
	this.x = 200;
	this.y = 375;
}

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
