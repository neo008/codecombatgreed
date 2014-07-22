// This code runs once per frame. Choose where to move to grab gold!
// First player to 150 gold wins.

// This is an example of grabbing the 0th coin from the items array.
var items = this.getItems();
if (items[0]) {
  this.move(items[0].pos);
} else {
  this.moveXY(18, 36);
}
        
        
// You can surely pick a better coin using the methods below.
// Click on a coin to see its API.
