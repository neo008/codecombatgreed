describe("Base", function() {
  var base;
  
  beforeEach(function() {
	base = new Base();
  });
  
  it("should spwans 20 random items", function() {
	base.spawnItems(20);
	expect(base.items.length).toBe(20);
  });
});
