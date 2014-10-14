// Tharin is a melee fighter with shield, warcry, and terrify skills.
// this.shield() lets him take one-third damage while defending.
// this.warcry() gives allies within 10m 30% haste for 5s, every 10s.
// this.terrify() sends foes within 30m fleeing for 5s, once per match.

var friends = this.getFriends();
var enemies = this.getEnemies();
if (enemies.length === 0) return;  // Chill if all enemies are dead.
var enemy = this.getNearest(enemies);
var friend = this.getNearest(friends);

if(this.getCooldown('warcry') === 0) {
    this.warcry();
    return;
}

var armyAssault = false;
if (this.armyAssaultStarted === undefined) {
    this.armyAssaultStarted = false;
}

if (this.health < 100) {
    var fleeTo = enemy.pos.x - 30;
    if (!this.hasEffect('shrink')) {
        for (var i = 0; i < friends.length; i++) {
            if (friends[i] !== 'archer') {
                continue;
            }
            fleeTo = Math.max(fleeTo, friends[i].pos.x);
        }
    }
    this.move({x: fleeTo, y: 30});
    return;
}

if (this.now() < 30) {
    if (this.pos.x != 26) {
        this.move({x:16, y:30});
        return;
    } else {
        this.shield();
        return;
    }
}


if (this.now() < 20) {
    var hasAttack = false;
    for (var i = 0; i < friends.length; i++) {
        if (friends[i].action == 'attack') {
            this.say("Defend!", {targetPos: {x: 15, y: 30}});
        }
    }
} else if (this.now() > 20 && !this.armyAssaultStarted) {
    this.say("Attack");
    this.armyAssaultStarted = true;
}
//this.say("Move!", {targetPos: {x: 40, y: 40}});
