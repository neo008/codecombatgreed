function Buildable() {
	this.goldCost = 10;
}

function Base() {
	this.pos = new Position();
	this.gold = 0;
	var units = ['peasant', 'soldier', 'knight', 'librarian', 'griffin-rider', 'captain'];
	this.buildables = {}; //this.buildables[type].goldCost
	for (var i = 0; i < units.length; i++) {
		this.buildables[units[i]] = new Buildable();
	}
}

Base.prototype.dump = function(){
	console.log('testing');
}

Base.prototype.getByType = function(type) {
	return [];
}

Base.prototype.getEnemies = function() {
	return [];
}

Base.prototype.getNearest = function() {
	return undefined;
}

Base.prototype.now = function() {
	return 1;
}

Base.prototype.build = function() {
	return false;
}

function Position() {
}

Position.prototype.distance = function(pos) {
	return 100;
}