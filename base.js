function Buildable() {
	this.goldCost = 10;
	this.mapWidth = 85;
	this.mapHeight = 70;
}

function Base() {
	this.pos = new Position();
	this.gold = 0;
	// Items
	this.items = [];
	this.enemies = [];
	var units = ['peasant', 'soldier', 'knight', 'librarian', 'griffin-rider', 'captain'];
	this.buildables = {}; //this.buildables[type].goldCost
	for (var i = 0; i < units.length; i++) {
		this.buildables[units[i]] = new Buildable();
	}
}

Base.prototype.dump = function(){
	console.log('testing');
};

Base.prototype.getByType = function(type) {
	return [];
};

Base.prototype.getEnemies = function() {
	return this.enemies;
};

Base.prototype.getNearest = function() {
	return undefined;
};

Base.prototype.now = function() {
	return 1;
};

Base.prototype.build = function() {
	return false;
};

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
/*
Base.prototype.distributeItems(items) {
	for (var i = 0; i < items.length; i++) {
		
	}
}
*/
function Item() {
	this.value = 0;
	this.pos = new Position();
}

function Position() {
	this.x = 0;
	this.y = 0;
}

Position.prototype.distance = function(pos) {
	return 100;
};

