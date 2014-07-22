describe("Base", function() {
  var player;
  
  beforeEach(function() {
	player = new Player();
	player.base = new Base();
	player.run();
  });
  
  it("should have map center", function() {
	  expect(player.base.MAP_CENTER.x).toBe(42);
	  expect(player.base.MAP_CENTER.y).toBe(35);
  });
  
  it("should spwan items", function() {
    player.base.spawnItems(20);
    expect(player.getItems().length).toBe(20);    
  });
  
});

