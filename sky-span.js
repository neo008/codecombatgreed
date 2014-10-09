// This code runs once per frame. Build units and command peasants!
Base.prototype.run = function() {

// This is your commander's code. Decide which unit to build each frame.
// Destroy the enemy base within 90 seconds!
// Check out the Guide at the top for more info.

/////// 1. Choose your hero. /////////////////////////////////////////
// Heroes cost 100 gold. You start with 100 and earn 10 per second.

var hero = 'tharin';
//hero = 'tharin';  // A fierce knight with battlecry abilities, type 'knight'.
//hero = 'hushbaum';  // A fiery spellcaster hero, type 'librarian'.
//hero = 'anya';  // A stealthy ranged attacker, type 'captain'.
if (hero && !this.builtHero) {
    this.builtHero = this.build(hero);
    return;
}

this.getLeftMost = function(units) {
    if (units.length === 0) {
        return undefined;
    }
    var leftmost = units[0];
    for (var i = 0; i < units.length; i++) {
        leftmost = (leftmost.pos.x < units[i].pos.x) ?
            leftmost : units[i];
    }
    return leftmost;
};

/////// 2. Choose which unit to build each turn. /////////////////////
// Soldiers are hard-to-kill, low damage melee units who cost 20 gold.
// Archers are fragile but deadly ranged units who cost 25 gold.
// Units you build will go into the this.built array.

var buildOrder = ['soldier', 'soldier', 'soldier', 'archer'];
var type = buildOrder[this.built.length % buildOrder.length];
if (this.buildables[type].goldCost <= this.gold) {
    this.build(type);
}

/////// 3. Command minions to implement your tactics. ////////////////
// Minions obey 'move' and 'attack' commands.
// Click on a minion to see its API.

var minions = this.getFriends();
for (var i = 0; i < minions.length; i++) {
    var minion = minions[i];
    if (this.commandableTypes.indexOf(minion.type) == -1) {
        continue;  // You can't command heroes.
    }
    // this.command(minion, 'move', {x: 70, y: 30})
    enemies = this.getEnemies();
    if (enemies.length === 0) {
        continue;
    }
    this.command(minion, 'attack', this.getLeftMost(enemies));
}

}; // end Base.prototype.run
