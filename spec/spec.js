describe("Base", function() {
  var base;
  
  beforeEach(function() {
	base = new Base();
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
		spyOn(base.situation, 'update');
		// real run
		base.run();
	});
	
	it ("should update situation every turn", function() {
		expect(base.situation.update).toHaveBeenCalled();
	});
});


describe("Build unit logic", function() {
	var base;
	var situation;
	
	beforeEach(function() {
		base = new Base();
		situation = new Situation();
		base.run(); 
	});
	
	it ("should not build peasant when enemy is near", function() {
		base.gold = 1000;
		situation.enemyIsNear = true;
		expect(base.buildUnit(situation)).not.toBe("peasant");
	});
	
	it ("should build peasant when enemy is not near", function() {
		base.gold = 1000;
		expect(base.buildUnit(situation)).toBe("peasant");
	});
});
