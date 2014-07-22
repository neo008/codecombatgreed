/**
	Design for gold rush
 */
function Player() {
	this.pos = { x:0, y:0 };
	this.gold = 0;
	this.base = 0;
};

Player.prototype.getItems = function() {
	return this.base.items;
}

