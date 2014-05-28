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
	});	
	
	xit ("should throw on bad parameters", function() {
		var bar = function() { a + 1 };
		expect(bar).toThrow();
//		base.clusterItems([], 0);
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
