// This code runs once per frame. Build units and command peasants!
Base.prototype.run = function() {

// forward declaration to constant and function 
if (this.functionDeclared === undefined) {
	// constants
	this.ENEMY_CLOSE_DISTANCE = 30;
	this.TIME_MID_GAME = 60;
	this.TIME_LATE_GAME = 120;
	this.MAP_WIDTH = 85;
	this.MAP_HEIGHT = 70;
	this.MAP_WIDTH13 = Math.floor(this.MAP_WIDTH / 3);
	this.MAP_WIDTH23 = Math.floor(this.MAP_WIDTH * 2 / 3);
	this.MAP_HEIGHT13 = Math.floor(this.MAP_HEIGHT / 3);
	this.MAP_HEIGHT23 = Math.floor(this.MAP_HEIGHT * 2 / 3);
	this.MAP_CENTER = new Position(Math.floor(this.MAP_WIDTH/2), Math.floor(this.MAP_HEIGHT/2));
	// [x1, y1, x2, y2]
	this.MAP_REGIONS = [
		[0, 0, this.MAP_WIDTH13, this.MAP_HEIGHT13],
		[this.MAP_WIDTH13, 0, this.MAP_WIDTH23, this.MAP_HEIGHT13],
		[this.MAP_WIDTH23, 0, this.MAP_WIDTH, this.MAP_HEIGHT13],
		[0, this.MAP_HEIGHT13, this.MAP_WIDTH13, this.MAP_HEIGHT23],
		[this.MAP_WIDTH13, this.MAP_HEIGHT13, this.MAP_WIDTH23, this.MAP_HEIGHT23],
		[this.MAP_WIDTH23, this.MAP_HEIGHT13, this.MAP_WIDTH, this.MAP_HEIGHT23],
		[0, this.MAP_HEIGHT23, this.MAP_WIDTH13, this.MAP_HEIGHT],
		[this.MAP_WIDTH13, this.MAP_HEIGHT23, this.MAP_WIDTH23, this.MAP_HEIGHT],
		[this.MAP_WIDTH23, this.MAP_HEIGHT23, this.MAP_WIDTH, this.MAP_HEIGHT],
	];

	// functions
	this.functionDeclared = true;
	this.divideItemsBy9 = function(items, regions) {};
	this.getEnemySoliders = function() {};
	this.itemBelongsToRegionBy9 = function(item, region) {};
	this.movePeasants = function() {};
	this.positionToRegionBy9 = function(pos) {};
	this.situationSetup = function() {};
	this.situationUpdate = function() {};
	this.unitToBuild = function(situation) {};
	this.withinRegionBy9 = function(pos, inRegion, regions) {};
}

var units = ['soldier', 'knight', 'librarian', 'griffin-rider', 'captain'];

// an injectable object for tests
if (this.situation === undefined) {
	this.situation = this.situationSetup();
}

// situation changes every turn so we need to update
this.situationUpdate(this.situation);

// peasants move independ to situation and military units
this.movePeasants();

this.unitToBuild(this.situation);

if (this.functionDefined === undefined) {
	this.functionDefined = true;

/**
 * try to divide items into 9 regions
 * 
 *
 * @return an array of array of items
 */
this.divideItemsBy9 = function(items) {
	var regions = [];
	for (var i = 0; i < items.length; i++) {
		
	}
	return regions;
}; // end divideItemsBy9

this.getEnemySoliders = function() {
    // this includes peon, not what we really want
    var enemies = this.getEnemies();
    var soliders = [];
    if (enemies !== undefined) {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].type !== "peon") {
                soliders.push(enemies[i]);
            }
        }
    }
    return soliders;
}; // end getEnemySoliders()

/**
 * A helper function to check whether item is belongs to region
 *
 * @param item Item object
 *
 * @return boolean
 */
this.itemBelongsToRegionBy9 = function(item, region) {
	return this.withinRegionBy9(item.pos, this.MAP_REGIONS[region]);
} // end itemBelongsToRegionBy9(item, region)

this.movePeasants = function() {
	// fair distrubion - segementize items into 9 square. peasants get nearest item base on its square

	var peasants = this.getByType('peasant');
	for (var peasantIndex = 0; peasantIndex < peasants.length; peasantIndex++) {
		var peasant = peasants[peasantIndex];
		var items = this.getItems();
		// filter out items that are close to other peasants
		// or
		// increase vector of item by other peasant's vector
		
		
		// decide whether he should go for higher value item
		if (peasant !== undefined) {
			var item = peasant.getNearest(items);
			if (item) {
				this.command(peasant, 'move', item.pos);
			}
		}
	} // for
}; // end movePeasants()

/**
 * A helper function to return position's region # with best speed
 *
 * @return int region # it belongs to, unknown result if it is outside of the map
 */
this.positionToRegionBy9 = function(pos) {
	var region = 0;
	if (pos.x >= this.MAP_WIDTH23) region++;
	if (pos.x >= this.MAP_WIDTH13) region++;
	if (pos.y >= this.MAP_HEIGHT13) region+=3;
	if (pos.y >= this.MAP_HEIGHT23) region+=3;
	return region;
} // end itemToRegionBy9(pos)

/**
 * @return object with situation
 */
this.situationSetup = function() {
	var situation = new Object();
	situation.warStarted = false;
	situation.enemyIsNear = false;
	
	// middle of the game, a point where building more peasants is pointless.
	// we should save money or start to build unit
	situation.midGame = false;
	
	// the game is going to end. The game would lose/draw if we do not start to destroy the enemy base
	situation.lateGame = false;
	
	return situation;
};// end situationSetup()

this.situationUpdate = function(situation) {
	situation.midGame = this.now() > this.TIME_MID_GAME;
	situation.lateGame = this.now() > this.TIME_LATE_GAME;
	
	var enemySoliders = this.getEnemySoliders();
	var nearestEnemy = this.getNearest(enemySoliders);

	if (nearestEnemy !== undefined) {
		var closestDist = this.pos.distance(nearestEnemy.pos);
		situation.enemyIsNear = closestDist < this.ENEMY_CLOSE_DISTANCE;
	}
	
	if (situation.lastGame || situation.enemyIsNear) {
		if (!situation.warStarted) {
			this.say('war started!');
			situation.warStarted = true;
		}
	}
}; // end situationUpdate()

/**
 * Decide what unit to build base on the situation
 *
 * @return unit type that we want to build
 */
this.unitToBuild = function(situation) {
	// save money for later
	if (!situation.enemyIsNear && situation.midGame) {
		return undefined;
	}
	
	var type = 'peasant';
	if (situation.enemyIsNear || situation.warStarted) {
		type = units[Math.floor(Math.random() * units.length)];
	}

	// build if we have enough gold
	if (type !== undefined) {
		if (this.gold >= this.buildables[type].goldCost)
			this.build(type);
	}
	
	return type;
}; // end unitToBuild()

/**
 * @param pos Position object
 * @param region coordinates [x1, y1, x2, y2] for checking
 *
 * @return boolean
 */
this.withinRegionBy9 = function(pos, region) {
	if (pos.x < region[0]) return false;
	if (pos.x >= region[2]) return false;
	if (pos.y < region[1]) return false;
	if (pos.y >= region[3]) return false;
	return true;
}; // end withinRegionBy9()


} // end if functionDefined

}; // end Base.prototype.run