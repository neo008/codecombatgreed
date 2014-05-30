function Buildable() {
	this.goldCost = 10;
	this.mapWidth = 85;
	this.mapHeight = 70;
};

function Base() {
	this.pos = new Position();
	this.gold = 0;
	this._now = 1;
	// Items
	this.items = [];
	this.enemies = [];
	var units = ['peasant', 'soldier', 'knight', 'librarian', 'griffin-rider', 'captain'];
	this.buildables = {}; //this.buildables[type].goldCost
	for (var i = 0; i < units.length; i++) {
		this.buildables[units[i]] = new Buildable();
	}
};

Base.prototype.build = function() {
	return false;
};

Base.prototype.commmand = function(target, cmdString, args) {
	return false;
};

Base.prototype.dump = function(){
	console.log('testing');
};

Base.prototype.getByType = function(type) {
	return [];
};

Base.prototype.getEnemies = function() {
	return this.enemies;
};

Base.prototype.getItems = function() {
	return this.items;
};

Base.prototype.getNearest = function() {
	return undefined;
};

Base.prototype.now = function() {
	return this._now;
};

Base.prototype.say = function(msg) {
	console.log('say: ' + msg);
}

Base.prototype.spawnItems = function(num) {
	for (var i = 0; i < num; i++) {
		var item = new Item();
		var value = Math.random() * 20;
		if (value < 1) {
			// 5% gem
			value = 5;
		} else if (value < 3) {
			// 10% gold
			value = 3;
		} else if (value < 7)  {
			// 20% copper
			value = 1;
		} else {
			// 65% silver
			value = 2;
		}
		item.value = value;
		item.pos.x = Math.floor(Math.random() * 85);
		item.pos.y = Math.floor(Math.random() * 70);
		this.items.push(item);
	}
};

function Item() {
	this.value = 0;
	this.pos = new Position();
}

Item.prototype.setPosition = function(x, y) {
	this.pos.set(x, y);
	return this;
}

function Position() {
	this.x = 0;
	this.y = 0;
	return this;
}

function Position(x, y) {
	this.x = x;
	this.y = y;
	return this;
}

Position.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;
	return this;
}

Position.prototype.distance = function(pos) {
	return 100;
};

