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
  
});

