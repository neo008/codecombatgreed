Hero.prototype.run = function() {
// Tharin is a melee fighter with shield, warcry, power-up, terrify skills.
// this.shield() lets him take one-third damage while defending.
// this.warcry() gives allies within 15m 40% haste for 5s, every 10s.
// this.powerUp() makes his next strike do 5x damage.
// this.terrify() sends foes within 30m fleeing for 3.5s, once per match.
// hp: 300, dps: 20

var friends = this.getFriends();
var enemies = this.getEnemies();
if (enemies.length === 0) return;  // Chill if all enemies are dead.

var cmdrs = this.getByType('commander');
var cmdr = (cmdrs[0].type == 'human') ? cmdrs[0] : cmdrs[1];

if (this.health > 150) {
    var leftmost = enemies[0];
    for (var i = 0; i < enemies.length; i++) {
        leftmost = (leftmost.pos.x < enemies[i].pos.x) ?
            leftmost : enemies[i];
    }
    if (leftmost) {
        this.attack(leftmost);
    }
} else if (this.distance(enemy) < 25) {
    // keep distance from enemy
    this.move({x: this.pos.x - 1, y: this.pos.y, z: this.pos.z}); 
}

// Which one do you do at any given time? Only the last called action happens.
if(!this.getCooldown('warcry')) this.warcry();
//if(!this.getCooldown('terrify') && inRangeEnemies > 10) this.terrify();
// if(!defend && !this.getCooldown('power-up') && !this.hasEffect('power-up')) this.powerUp();
//this.shield();

// You can store state on this across frames:
//this.lastHealth = this.health;ini
}; // end Hero.prototype.run