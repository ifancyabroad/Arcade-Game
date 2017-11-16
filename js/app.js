'use strict';
// Global variable for score and document element
let scoreDisplay = document.getElementById('score');
let score = 0;

// Reset the score and update the page
const resetScore = function() {
	score = 0;
	scoreDisplay.innerHTML = 'Score: ' + score;
};

// Increase the score and update the page
const addScore = function(num) {
	score += num;
	scoreDisplay.innerHTML = 'Score: ' + score;
};

// Get random number within a range
const getRandom = function(min, max) {
	return Math.random() * (max - min) + min;
};

// Get a random column
const getColumn = function() {
	let columns = Math.floor(Math.random() * (6 - 1)) + 1;
	switch (columns) {
		case 1:
			return 0;
		case 2:
			return 100;
		case 3:
			return 200;
		case 4:
			return 300;
		case 5:
			return 400;
	}
};

// Get a random lane
const getLane = function() {
	let lanes = Math.floor(Math.random() * (4 - 1)) + 1;
	switch (lanes) {
		case 1:
			return 60;
		case 2:
			return 140;
		case 3:
			return 220;
	}
};

// Enemies our player must avoid
const Enemy = function() {
	// Starting x and y variables for location
	this.x = getRandom(100, 515);
	this.y = getLane();
	// Speed variable
	this.speed = getRandom(20, 400);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	
	// Enemies loop back around with a new lane after exiting the screen
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
	// Array of character sprites and counter to track currently selected character
	this.character = 0;
	this.characters = 
	['images/char-boy.png',
	'images/char-cat-girl.png',
	'images/char-horn-girl.png',
	'images/char-pink-girl.png',
	'images/char-princess-girl.png'];
	// The image/sprite for the player
	this.sprite = this.characters[this.character];
	// Starting x and y variables for location
	this.x = 200;
	this.y = 380;
};

// Draw the player to the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checking for collisions
Player.prototype.update = function() {
	// Player is hit by an enemy
	for (let enemy of allEnemies) {
		let xLoc = this.x - enemy.x;
		let yLoc = this.y - enemy.y;
		if ((xLoc < 50 && xLoc > -50) && (yLoc < 30 && yLoc > -30)) {
			this.hit();
		}
	}
	
	// Player makes contact with a gem
	for (let gem of allGems) {
		if (this.x === gem.x && this.y === gem.y) {
			gem.collect();
		}
	}
	// Player made it to the end
	if (this.y < 0) {
		this.win();
	}
};

// Reset player location
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 380;
}

// Player is hit by an enemy
Player.prototype.hit = function() {
	// Reset score
	resetScore();
	// Reset location
	this.reset();
	// Reset gems
	refillGems();
}

// Player wins
Player.prototype.win = function() {
	// Increment score
	addScore(100);
	// Reset location
	this.reset();
	// Refill gems
	refillGems();
}

// Change player sprite by moving through characters array
Player.prototype.changeChar = function() {
	if (this.character < this.characters.length - 1) {
		this.character++
		this.sprite = this.characters[this.character];
	} else {
		this.character = 0;
		this.sprite = this.characters[this.character];
	}
}

// Player moves based on user input
Player.prototype.handleInput = function(key) {
	switch (key) {
		// Spacebar to change character
		case 'space':
			this.changeChar();
			break;
		// Movement controls, restricted to the canvas
		case 'left':
			if (this.x > 50) {
				this.x -= 100;
			}
			break;
		case 'up':
			if (this.y > 25) {
				this.y -= 80;
			}
			break;
		case 'right':
			if (this.x < 400) {
				this.x += 100;
			}
			break;
		case 'down':
			if (this.y < 350) {
				this.y += 80;
			}
			break;
	}
};

// Gems for the player to collect
const Gem = function() {
	// Default gem is blue
	this.sprite = 'images/Gem Blue.png';
	// Score for collecting a blue gem
	this.score = 50;
	// Starting x and y variables for location
	this.x = getColumn();
	// Generated in the first (easiest) lane
	this.y = 220;
}

// Render the gems to the screen
Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Increment score and remove gem once collected
Gem.prototype.collect = function() {
	let index = allGems.indexOf(this);
	allGems.splice(index, 1);
	addScore(this.score);
}

// Green gems
const GemGreen = function() {
	Gem.call(this);
	// Sprite for green gem
	this.sprite = 'images/Gem Green.png';
	// Score for green gem slightly higher
	this.score = 100;
	// Generated in the second lane
	this.y = 140;
}

// Set the prototype object and re-assign the constructor
GemGreen.prototype = Object.create(Gem.prototype);
GemGreen.prototype.constructor = GemGreen;

// Orange gems
const GemOrange = function() {
	Gem.call(this);
	// Sprite for orange gem
	this.sprite = 'images/Gem Orange.png';
	// Score for orange gem is the highest
	this.score = 150;
	// Generated in the third lane
	this.y = 60;
}

// Set the prototype object and re-assign the constructor
GemOrange.prototype = Object.create(Gem.prototype);
GemOrange.prototype.constructor = GemOrange;

// Object arrays
let allEnemies = [];
let allGems = [];

// Add specified amount of objects to specified array
const generateObjects = function(num, array, Class) {
	for (let i = 0; i < num; i++) {
		let object = new Class();
		array.push(object);
	}
}

// Refill gems
const refillGems = function() {
	allGems.splice(0);
	generateObjects(1, allGems, Gem);
	generateObjects(1, allGems, GemGreen);
	generateObjects(1, allGems, GemOrange);
}

// Generate a specified amount of objects
generateObjects(5, allEnemies, Enemy);

// Populate gems
refillGems();

// Global variable for the player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
		32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
