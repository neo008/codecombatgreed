describe("Base", function() {
  var base;
  
  beforeEach(function() {
	base = new Base();
	// init run
	base.run();
  });
  
  it("should have map center", function() {
	  expect(base.MAP_CENTER.x).toBe(42);
	  expect(base.MAP_CENTER.y).toBe(35);
  });
  
  it("should spwans 20 items", function() {
      base.spawnItems(20);
      expect(base.items.length).toBe(20);
  });
});

describe("Support functions", function() {
  var base;
  var eneimes;
  
  beforeEach(function() {
    base = new Base();
    base.enemies = [{'type':'peon'},{'type':'solider'}];
	// run at least once to init function defined in function run()
	base.run(); 
  });
  
  it("should returns array without peon", function() {
    var enemySolider = base.getEnemySoliders(eneimes);
    expect(enemySolider).not.toContain({'type':'peon'});
  });
  
  it("should valid withinRegionBy9", function() {
	// top-left
	expect(base.withinRegionBy9(new Position(0, 0), base.MAP_REGIONS[0])).toBe(true);
	
	// bottom-right
	expect(base.withinRegionBy9(new Position(base.MAP_WIDTH, base.MAP_HEIGHT), base.MAP_REGIONS[0])).toBe(false);
	
	// boundary cases
	expect(base.withinRegionBy9(new Position(base.MAP_WIDTH13, 0), base.MAP_REGIONS[0])).toBe(false);
	expect(base.withinRegionBy9(new Position(0, base.MAP_HEIGHT13), base.MAP_REGIONS[0])).toBe(false);
	expect(base.withinRegionBy9(new Position(base.MAP_WIDTH13, 0), base.MAP_REGIONS[1])).toBe(true);
	expect(base.withinRegionBy9(new Position(0, base.MAP_HEIGHT13), base.MAP_REGIONS[3])).toBe(true);
	expect(base.withinRegionBy9(new Position(base.MAP_WIDTH23, 0), base.MAP_REGIONS[1])).toBe(false);
	expect(base.withinRegionBy9(new Position(0, base.MAP_HEIGHT23), base.MAP_REGIONS[3])).toBe(false);
	expect(base.withinRegionBy9(new Position(base.MAP_WIDTH23, 0), base.MAP_REGIONS[2])).toBe(true);
	expect(base.withinRegionBy9(new Position(0, base.MAP_HEIGHT23), base.MAP_REGIONS[6])).toBe(true);
  });
  
  it("should valid itemToRegionBy9", function() {
	// top-left
	expect(base.positionToRegionBy9(new Position(0, 0))).toBe(0);
	
	// boundary cases
	expect(base.positionToRegionBy9(new Position(base.MAP_WIDTH13, 0))).toBe(1);
	expect(base.positionToRegionBy9(new Position(0, base.MAP_HEIGHT13))).toBe(3);
	expect(base.positionToRegionBy9(new Position(base.MAP_WIDTH23, 0))).toBe(2);
	expect(base.positionToRegionBy9(new Position(0, base.MAP_HEIGHT23))).toBe(6);
  });
  
  it("should able to identify item for region", function() {
	// top-left
	expect(base.itemBelongsToRegionBy9(new Item().setPosition(0,0), 0)).toBe(true);
  });
});

describe("Runner flow", function() {
	var base;
	beforeEach(function() {
		base = new Base();
		// init
		base.run();
	});
	
	it ("should able to set time for testing", function() {
		base._now = 123;
		expect(base.now()).toBe(123);
	});
	
	it ("should update situation once every turn", function() {
		spyOn(base, 'situationUpdate');
		// real run
		base.run();
		expect(base.situationUpdate.calls.count()).toEqual(1);
	});
	
	it ("should be in midGame situation after 60s", function() {
		base._now = 60.1;
		var situation = base.situationSetup();
		base.situationUpdate(situation);
		expect(situation.midGame).toBe(true);
	});
	
	it ("should be in lateGame situation after 120s", function() {
		base._now = 120.1;
		var situation = base.situationSetup();
		base.situationUpdate(situation);
		expect(situation.lateGame).toBe(true);
	});
});


describe("Divide items", function() {
	var base;
	var regions;
	
	beforeEach(function() {
		base = new Base();
		base.run(); 
		base.items = [
			new Item().setPosition(0, 0),
			new Item().setPosition(base.MAP_WIDTH13, 0),
			new Item().setPosition(base.MAP_WIDTH23, 0),
			new Item().setPosition(0, this.MAP_HEIGHT13),
			new Item().setPosition(base.MAP_WIDTH13, this.MAP_HEIGHT13),
			new Item().setPosition(base.MAP_WIDTH23, this.MAP_HEIGHT13),
			new Item().setPosition(0, this.MAP_HEIGHT23),
			new Item().setPosition(base.MAP_WIDTH13, this.MAP_HEIGHT23),
			new Item().setPosition(base.MAP_WIDTH23, this.MAP_HEIGHT23),
			];
	});
	
	it ("should move peasant to center when there is only 1 peasant", function() {
	});
});

describe("Divide items", function() {
	var base;
	var regions;
	
	beforeEach(function() {
		base = new Base();
		base.run(); 
		base.spawnItems(100);
		// TODO setup boundary items into every regions
		// TODO base.items.push()
		regions = base.divideItemsBy9(base.items);
	});	
	
	it ("should divide items into 9 regions", function() {
		expect(regions.length).toBe(9);
	});

	it ("should valid items in regions ", function() {
		for (var r = 0; r < regions.length; r++) {
			for (var i = 0; i < regions[r].length; i++) {
				expect(base.withinRegionBy9(regions[r][i].pos, base.MAP_REGIONS[r])).toBe(true);
			}
		}
	});
});

describe("Build unit logic", function() {
	var base;
	var situation;
	
	beforeEach(function() {
		base = new Base();
		base.run(); 
		situation = base.situationSetup();
	});
	
	it ("should not build peasant when enemy is near", function() {
		base.gold = 1000;
		situation.enemyIsNear = true;
		expect(base.unitToBuild(situation)).not.toBe("peasant");
	});
	
	it ("should build peasants when enemy is not near", function() {
		base.gold = 1000;
		expect(base.unitToBuild(situation)).toBe("peasant");
	});
	
	it ("should stop building unit during mid-game and enemy is not near", function() {
		situation.enemyIsNear = false;
		situation.midGame = true;
		expect(base.unitToBuild(situation)).toBeUndefined();
	
	});
});
