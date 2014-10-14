describe("Base", function() {
  var base;
  
  beforeEach(function() {
    base = new Base();
  });
  
  it("should build tharin", function() {
    spyOn(base, 'build');
    base.run();
    expect(base.build).toHaveBeenCalledWith('tharin');
  });
  
  it("should build solider after hero", function() {
    spyOn(base, 'build');
    base.builtHero = true;
    base.built = ['tharin'];
    base.run();
    expect(base.build).toHaveBeenCalledWith('soldier');
  });

  it("should build in mix of 1 soldier and 2 archer in the fisrt 30s", function() {
    spyOn(base, 'build').and.callFake(function(type) {
      if (type == 'archer') {
        archer++;
      }
      if (type == 'soldier') {
        soldier++;
      }
    });
    base.builtHero = true;
    base.built = ['tharin'];
    var archer = 0, soldier = 0;
    base.run();
    for (var i = 0; i < 9; i++) {
      base.run();
    }
    expect(archer).toBe(6);
    expect(soldier).toBe(3);
  });
});
