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
	this.MAP_CENTER = new Position(Math.floor(this.MAP_WIDTH/2), Math.floor(this.MAP_HEIGHT/2));

	// functions
	this.functionDeclared = true;
	this.clusterItems = function(items, regions) {};
	this.getEnemySoliders = function() {};
	this.movePeasants = function() {};
	this.situationSetup = function() {};
	this.situationUpdate = function() {};
	this.unitToBuild = function(situation) {};
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
 * try to 'cluster' items into provided regions
 * 
 * @param regions min 1, max 6
 *
 * @return an array of array of items
 */
this.clusterItems = function(items, regions) {
	if (regions < 1) throw "regions should not smaller than 1";
	if (regions > 6) throw "regions should not more than 6";
	
	for (var i = 0; i < items.length; i++) {
		
	}
	return items;
};

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

this.movePeasants = function() {
	// locations of predicted peasont
	var peasontBestLocations;
	switch (this.getByType("peasant").length) {
		case 1: peasontBestLocations = [[45, 35]]; break;
		case 2: peasontBestLocations = [[10,60], [80,10]]; break;
		case 3: peasontBestLocations = [[10,60], [80,10], [45, 35]]; break;
		case 4: peasontBestLocations = [[10,60], [80,10], [55, 45], [35, 30]]; break;
		case 5: peasontBestLocations = [[10,60], [80,10], [60, 50], [45, 35], [30,25]]; break;     
		case 6: peasontBestLocations = [[10,60], [80,10], [55, 60], [75, 40], [45,15], [15,35]]; break;
	} // switch
	
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

} // end if functionDefined

}; // end Base.prototype.run