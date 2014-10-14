// This code runs once per frame. Build units and command peasants!
Base.prototype.run = function() {

// build first hero
// var hero = 'hushbaum';
var hero = 'tharin';
if(hero && !this.builtHero) {
    this.builtHero = this.build(hero);
    return;
}

// Soldiers are hard-to-kill, low damage melee units with 2s build cooldown.
// Archers are fragile but deadly ranged units with 2.5s build cooldown.
var buildOrder = (this.now() < 30) ? ['archer', 'soldier', 'archer'] :
['archer', 'soldier'];
var type = buildOrder[this.built.length % buildOrder.length];
this.build(type);

}; // end Base.prototype.run