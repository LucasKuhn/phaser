// generate random number
function rndNum(num) {

    return Math.round(Math.random() * num);

}
var apt, sprite;

// When the Sprite on top is clicked
function actionOnClick () {
    apt = game.add.isoSprite(selectedTile.isoX-38,selectedTile.isoY+22, 90, 'apt',);
    selectedTile.busy = true;
    isoGroup.forEach(function (tile) {tile.tint = 0xffffff;})
}


function addLvl1 () {
    apt = game.add.isoSprite(selectedTile.isoX-10,selectedTile.isoY+55, 70, 'lvl1',);
    selectedTile.busy = true;
    isoGroup.forEach(function (tile) {tile.tint = 0xffffff;})
}

function addBurger () {

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/games-data",
        data: {
            info: {
            name: "Burger",
            renderOrderID: selectedTile.renderOrderID,
            z: selectedTile.z,
            isoX: selectedTile.isoX,
            isoY: selectedTile.isoY
            }
        },
      }).always(function(e) {
      console.log( "complete:", e );
      // debugger
      });

    // Original Burger Adder
    sprite = game.add.isoSprite(selectedTile.isoX,selectedTile.isoY+60, 65, 'burgerSW');
    selectedTile.busy = true;
    isoGroup.forEach(function (tile) {tile.tint = 0xffffff;})
    debugger
}

var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, cursorPos, cursor, selectedTile, changedGroup;

BasicGame.Boot.prototype =
{
    preload: function () {
        game.load.image('tile', 'base/PNG/landscapeTiles_067.png');

        game.load.image('lvl1', 'lvl1.png');

        game.load.image('tree1', 'images/tree_test.png');

        game.load.image('cube', 'images/cube.png');

        game.load.image('apt', 'city-builder/aptcomplex_SE.png');

        game.load.image('burgerSW', 'city-builder/burger_SW.png');
        game.load.image('background', "background.jpg")

        // WHY DO I NEED THIS?
        // game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);
    },
    create: function () {

        // Adding Background
        game.add.tileSprite(0, 0, 1920, 1080, 'background');

        // create the burger button clickable image
        clickableSprite = game.add.sprite(200, 100, 'burgerSW');
        clickableSprite.fixedToCamera = true;
        clickableSprite.inputEnabled = true;
        clickableSprite.alpha = 0.8
        clickableSprite.events.onInputDown.add(addBurger, this);

        // create the apartment button clickable image
        clickableSprite = game.add.sprite(20, 20, 'apt');
        clickableSprite.fixedToCamera = true;
        clickableSprite.inputEnabled = true;
        clickableSprite.alpha = 0.8
        clickableSprite.events.onInputDown.add(actionOnClick, this);

        // create the lvl1 button clickable image
        clickableSprite = game.add.sprite(400, 20, 'lvl1');
        clickableSprite.fixedToCamera = true;
        clickableSprite.inputEnabled = true;
        clickableSprite.alpha = 0.8
        clickableSprite.events.onInputDown.add(addLvl1, this);

        // Create a group for our tiles.
        isoGroup = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();

        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

    },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            // If it does, do a little animation and tint change.
            if (game.input.activePointer.isDown && inBounds && !tile.busy){
                console.log("CLICKED!")
                selectedTile = tile
                tile.ready = true
                tile.tint = 0x00FF00;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
            else if (!tile.selected && inBounds) {
                if (tile.busy){
                    console.log("PAINTING RED");
                    tile.selected = true;
                    tile.tint = 0xff0000;
                }
                else {
                    console.log("PAINTING BLUE");
                    tile.selected = true;
                    tile.tint = 0x86bfda;
                    game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
                }
            }

            // If not, revert back to how it was.
            else if (tile.selected && !inBounds && !tile.ready) {
                tile.selected = false;
                tile.tint = 0xffffff;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }


            changedGroup = isoGroup.filter(function(element){ return element.busy })
        });


    },
    render: function () {
        game.debug.text("Move your mouse around!", 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    },
    spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 512; xx += 76) {
            for (var yy = 0; yy < 512; yy += 76) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                tile.anchor.set(0.5, 0);
            }
        }
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
