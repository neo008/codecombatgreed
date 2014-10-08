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
    if (this.commandableTypes.indexOf(minion.type) == -1)
        continue;  // You can't command heroes.
    // this.command(minion, 'move', {x: 70, y: 30})
    this.command(minion, 'attack', minion.getNearestEnemy());
    }
}

}; // end Base.prototype.run

// hero
// hp: 300, dps: 20
Hero.prototype.run = function() {
// Tharin is a melee fighter with shield, warcry, power-up, terrify skills.
// this.shield() lets him take one-third damage while defending.
// this.warcry() gives allies within 15m 40% haste for 5s, every 10s.
// this.powerUp() makes his next strike do 5x damage.
// this.terrify() sends foes within 30m fleeing for 3.5s, once per match.

var friends = this.getFriends();
var enemies = this.getEnemies();
if (enemies.length === 0) return;  // Chill if all enemies are dead.
var enemy = this.getNearest(enemies);
var friend = this.getNearest(friends);

// evade from fight. support the trops with haste
if (this.distance(enemy) < 25) {
    this.move({x: this.pos.x - 1, y: this.pos.y, z: this.pos.z}); 
} else {
    this.attack(enemy);
}
// Which one do you do at any given time? Only the last called action happens.
if(!this.getCooldown('warcry')) this.warcry();
//if(!this.getCooldown('terrify')) this.terrify();
//if(!this.getCooldown('power-up') && !this.hasEffect('power-up')) this.powerUp();
//this.shield();
        
// You can store state on this across frames:
//this.lastHealth = this.health;
}; end Hero.prototype.run