function Buildable() {
	this.goldCost = 10;

}

function Base() {
	this.pos = new Position();
	this.gold = 0;
	// Items
	this.items = [];
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
	return [];
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
	// Resources spawn every turn seconds with probabilities of 5% gem (5), 10% gold (3), 20% copper (1), and 65% silver (2)
	for (var i = 0; i < num; i++) {
		var item = new Item();
		this.items.push(item);
	}
};

function Item() {
	this.value = 1;
	this.pos = new Position();
}

function Position() {
	this.x = 0;
	this.y = 0;
}

Position.prototype.distance = function(pos) {
	return 100;
};

