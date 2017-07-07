var apt, sprite;


// When the Sprite on top is clicked
var lastImage;

var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, cursorPos, cursor, selectedTile, changedGroup;

BasicGame.Boot.prototype =
{
    preload: function () {

        // --- LOAD IMAGE ASSETS
        // game.load.image('tile', 'base/PNG/landscapeTiles_067.png');
        game.load.image('tile', 'brick.png');
        game.load.image('lvl1', 'lvl1.png');
        game.load.image('tree1', 'images/tree_test.png');
        game.load.image('cube', 'images/cube.png');
        game.load.image('apt', 'city-builder/aptcomplex_SE.png');
        game.load.image('burgerSW', 'city-builder/burger_SW.png');
        game.load.image('red-button', "redbutton.png")
        game.load.image('right-button', "right.png")


        game.load.image('background', "background.jpg")



        // Used to show the FPS
        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);
    },
    create: function () {

        // Adding Background
        game.add.tileSprite(0, 0, width, height, 'background');


        // TESTING BUTTONS

        // RED BUTTON
        cE = game.add.sprite(400, 0, 'red-button');
        cE.fixedToCamera = true;
        cE.inputEnabled = true;
        cE.events.onInputDown.add(addBuilding, this);

        // RIGHT BUTTON
        cE = game.add.sprite(210, 60, 'right-button');
        cE.fixedToCamera = true;
        cE.inputEnabled = true;
        cE.events.onInputDown.add(onDown, this);
        // cE.events.onInputOver.add(onDown, this);
        // cE.events.onInputUp.add(onUp, this);
        // cE.events.onInputOut.add(onUp, this);

        // --------------- CLICKABLE BUILDING BUTTONS

        // APARTMENT
        buildingButton = game.add.sprite(20, 20, 'apt');
        buildingButton.fixedToCamera = true;
        buildingButton.alpha = 0.8


        // Create a group for our tiles.
        isoGroup = game.add.group();
        // Create a group for our buildings.
        buildingGroup = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();
    },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);



        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            //  If a building should be added, add the building
            if (tile.busy && !tile.buildingAdded){
                game.add.isoSprite(tile.isoX + tile.buildingX,tile.isoY + tile.buildingY, tile.buildingZ, tile.buildingName, 0, buildingGroup);
                tile.buildingAdded = true;
            }

            //Check if the cursor is over a tile
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);

            // WHEN CLICKING: Select the tile and mark it as ready to build
            if (game.input.activePointer.isDown && inBounds && !tile.busy){
                    // Un-mark any other tiles
                isoGroup.forEach(function (tile) {tile.ready = false})
                    // Mark it as ready and paint it green
                tile.ready = true
                tile.tint = 0x00FF00;
                    // Do the Ease Out animation so it doesn't stay up
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
                    // Reference this tile for the building methods
                selectedTile = tile
            }

            // WHEN HOVERING: do a little animation and tint change.
            else if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0x86bfda;
                game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }

            // If the mouse is not over the tile, revert back to how it was.
            else if (tile.selected && !inBounds && !tile.ready) {
                tile.selected = false;
                tile.tint = 0xffffff;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
        });


    },

    // DISPLAY TEXT AND FPS
    render: function () {
        game.debug.text("ADD A BUILDING!", 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");

    },
    // ADD THE MAP TILES
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
    },

};

// -------- ADD BUILDING FUNCTIONS --------
function addApt () {
    selectedTile.buildingName = 'apt'
    selectedTile.buildingX = -38
    selectedTile.buildingY = 30
    selectedTile.buildingZ = 90
    selectedTile.busy = true;

    renderProperly();
}


function addLvl1 () {
    selectedTile.buildingName = 'lvl1'
    selectedTile.buildingX = -10
    selectedTile.buildingY = 55
    selectedTile.buildingZ = 70
    selectedTile.busy = true;

    renderProperly();
}

function addBurger () {
    selectedTile.buildingName = 'burgerSW'
    selectedTile.buildingX = 0
    selectedTile.buildingY = 60
    selectedTile.buildingZ = 65
    selectedTile.busy = true;

    renderProperly();

    // TESTING AJAX CALL
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
}
// ---------------------------------


// -------- HELPER FUNCTIONS --------
function rndNum(num) {
    return Math.round(Math.random() * num);
}

function renderProperly (){
    isoGroup.forEach(function (tile) {tile.tint = 0xffffff;})

    // Removes all the sprites and things on the group
    buildingGroup.forEach(function (building) {buildingGroup.remove(building);});
    buildingGroup.forEach(function (building) {building.destroy();});

    // Set the building added as false so the building are re-rendered in the right order
    isoGroup.forEach(function (tile) {tile.buildingAdded = false});
};


var i = 0
function onDown(sprite, pointer) {
    switch (i) {
      case 1:
        buildingButton.loadTexture('tree1', 0);
        break;
        //Statements executed when the result of expression matches value2
      case 2:
        buildingButton.loadTexture('apt', 0);
        break;
      //Statements executed when the result of expression matches value2
      case 3:
        buildingButton.loadTexture('lvl1', 0);
        break;
        //Statements executed when the result of expression matches value2
      case 4:
        buildingButton.loadTexture('burgerSW', 0);
        break;
        //Statements executed when the result of expression matches value2
      default:
        i = 0;
        //Statements executed when none of the values match the value of the expression
    }
    i += 1
}
function addBuilding(sprite, pointer) {
    switch (buildingButton.key) {
      case 'apt':
        addApt();
        break;
      case 'lvl1':
        addLvl1();
        break;
      case 'burgerSW':
        addBurger();
        break;
    }
}


// ---------------------------------


// START THE GAME
game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
