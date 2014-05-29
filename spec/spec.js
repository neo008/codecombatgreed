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
  
  it("should valid withinRegion", function() {
	// top-left
	expect(base.withinRegion(new Position(0, 0), base.MAP_REGIONS[0])).toBe(true);
	
	// bottom-right
	expect(base.withinRegion(new Position(base.MAP_WIDTH, base.MAP_HEIGHT), base.MAP_REGIONS[0])).toBe(false);
	
	// boundary cases
	expect(base.withinRegion(new Position(base.MAP_WIDTH13, 0), base.MAP_REGIONS[0])).toBe(false);
	expect(base.withinRegion(new Position(0, base.MAP_HEIGHT13), base.MAP_REGIONS[0])).toBe(false);
	expect(base.withinRegion(new Position(base.MAP_WIDTH13, 0), base.MAP_REGIONS[1])).toBe(true);
	expect(base.withinRegion(new Position(0, base.MAP_HEIGHT13), base.MAP_REGIONS[3])).toBe(true);
	expect(base.withinRegion(new Position(base.MAP_WIDTH23, 0), base.MAP_REGIONS[1])).toBe(false);
	expect(base.withinRegion(new Position(0, base.MAP_HEIGHT23), base.MAP_REGIONS[3])).toBe(false);
	expect(base.withinRegion(new Position(base.MAP_WIDTH23, 0), base.MAP_REGIONS[2])).toBe(true);
	expect(base.withinRegion(new Position(0, base.MAP_HEIGHT23), base.MAP_REGIONS[6])).toBe(true);
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

describe("Cluster items", function() {
	var base;
	
	beforeEach(function() {
		base = new Base();
		base.run(); 
		base.spawnItems(100);
	});	
	
	xit ("should throw on bad parameters", function() {
		// it doesn't work 
		expect(base.clusterItems([], 0)).toThrow();
	});
	
	it ("should only contains items in middle when only 1 region", function() {
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
