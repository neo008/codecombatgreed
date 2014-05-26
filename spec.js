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
  });
  
  it("should returns array without peon", function() {
    var enemySolider = base.getEnemySoliders();
    expect(enemySolider.length).toBe(1);
  });
});
