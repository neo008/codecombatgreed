// This code runs once per frame. Build units and command peasants!
// Destroy the ogre base within 180 seconds.
// Run over 4000 statements per call and chooseAction will run less often.
// Check out the green Guide button at the top for more info.

/**
 * Major considerations
 * - reduce number of statments executed
 *
 * Unit building with stratgies
 * - do not build unit until other attacks. but we cannot wait too long cost we only have 180 seconds
 * - are units chocking? build unit with area effect
 * - do we have enough muscles in the frontline?
 * - go for captain?
 *
 * Collect gold effectively/efficiently
 * - partitionate gold collecting
 * - race for gold that enenmy is collecting?
 * 
 * List of game strategies
 * - peasants - build peasants only. this strategy should not be used when we are low on health
 * - defensive
 * - counterAttack
 */
var strategy = 'peasants';

var base = this;

this.getClosestItem = function(items, unit) {
    var minDist = 9000;
    var minItem = null;
    
    for (var i = 0; i < items.length; i++) {
        var dist = items[i].pos.distance(unit.pos);
        if (minDist > dist ) {
            minDist = dist;
            minItem = items[i];
        }
    }
    
    return minItem;
};

/////// 1. Command peasants to grab coins and gems. ///////
// You can only command peasants, not fighting units.
// You win by gathering gold more efficiently to make a larger army.
// Click on a unit to see its API.
var peasants = base.getByType('peasant');
for (var peasantIndex = 0; peasantIndex < peasants.length; peasantIndex++) {
    var peasant = peasants[peasantIndex];
    
    var item = this.getClosestItem(this.getItems(), peasant);
    if (item)
        base.command(peasant, 'move', item.pos);
}


/////// 2. Decide which unit to build this frame. ///////
// Peasants can gather gold; other units auto-attack the enemy base.
// You can only build one unit per frame, if you have enough gold.
var type;
if (base.built.length< 3)
    type = 'peasant';
else
    type = 'knight';
if (base.gold >= base.buildables[type].goldCost)
    base.build(type);


// 'peasant': Peasants gather gold and do not fight.
// 'soldier': Light melee unit.
// 'knight': Heavy melee unit.
// 'librarian': Support spellcaster.
// 'griffin-rider': High-damage ranged attacker.
// 'captain': Mythically expensive super melee unit.
// See the buildables documentation below for costs and the guide for stats.