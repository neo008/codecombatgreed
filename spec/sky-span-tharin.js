describe("Hero", function() {
  var base;
  
  beforeEach(function() {
	hero = new Hero();
	// init run
	hero.run();
  });
  
  it("should spwans 20 items", function() {
      hero.spawnItems(20);
      expect(base.items.length).toBe(20);
  });
});

