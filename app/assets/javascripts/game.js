// generate random number
function rndNum(num) {

    return Math.round(Math.random() * num);

}

var width = window.innerWidth;
var height = window.innerHeight / 2;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, cursorPos, cursor, selectedTile, changedGroup;

function addPhaserDude (tile) {
    game.add.sprite(game.world.randomX, game.world.randomY, 'cube');
    game.add.isoSprite(tile.isoX-38,tile.isoY+22, 90, 'tree1');
};

BasicGame.Boot.prototype =
{
    preload: function () {
        game.load.image('tile', 'normaltile.png');

        game.load.image('tree1', 'images/tree_test.png');

        game.load.image('cube', 'images/cube.png');

        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);
    },
    create: function () {

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
                tree1 = game.add.isoSprite(tile.isoX-38,tile.isoY+22, 90, 'tree1');
                tile.busy = true;
                tile.tint = 0x86bfda;
            }
            else if (tile.selected && inBounds && tile.busy) {
                console.log("PAINTING RED");
                tile.tint = 0xff0000;
            }
            if (!tile.selected && inBounds) {
                selectedTile = tile
                tile.selected = true;
                console.log("PAINTING BLUE");
                tile.tint = 0x86bfda;
                game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }

            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                // debugger
                key1.onDown.add(addPhaserDude, tile);

                // debugger;
                console.log(tile.isoX);
                console.log(tile.isoY);
                console.log(tile.isoZ);
                console.log("TILE SELECTED added");
                tile.selected = false;
                tile.tint = 0xffffff;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }


            changedGroup = isoGroup.filter(function(element){ return element.busy })
        });

            // EXTRA TESTINGGGGGGGG -------------------------------
            function actionOnClick () {
                game.add.isoSprite(selectedTile.isoX-38,selectedTile.isoY+22, 90, 'tree1');
                console.log("ESPECIALLLL");
            }


            // create CUBE button sprites on the screen
            cube = game.add.sprite(20, 20, 'cube');
            cube.fixedToCamera = true;
            cube.inputEnabled = true;
            cube.alpha = 0.8
            cube.events.onInputDown.add(actionOnClick, this);

            // -------------------------------

    },
    render: function () {
        game.debug.text("Move your mouse around!", 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    },
    spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 384; xx += 38) {
            for (var yy = 0; yy < 384; yy += 38) {
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


// // -----------------------------------------------



// var width = window.innerWidth * 0.7 ;
// var height = window.innerHeight * 0.7 ;

// var obstacleGroup, player;
// var marker, marker2, marker3, marker4, marker5, itemGroup;
// var floorGroup;
// var exitMarker;

// var grassGroup;

// var itemsTxt, endTxt;
// var txt = "";
// var finalTxt = "";

// var currentItemCount = 0; // starting number of collected items
// var totalItemCount = 4; // total number of items to be collected

// var check;

// var controls;
// var cN, cS, cE, cW, cSE, cNE, cSW, cNW;

// var Ndown = false, Sdown = false, Edown = false, Wdown = false, SEdown = false, NEdown = false, SWdown = false, NWdown = false;

// var isEven = function(someNumber){
//     return (someNumber % 2 == 0) ? true : false;
// };

// //Initialize function
// var init = function () {
//     // TODO:: Do your initialization job
//     console.log("init() called");

//     var game = new Phaser.Game(width, height, Phaser.AUTO, 'test', null, false, true);

//     var BasicGame = function (game) { };

//     BasicGame.Boot = function (game) { };

//     BasicGame.Boot.prototype =
//     {
//         preload: function () {
//             game.load.image('cactus1', 'images/tiles/obstacle1.png');
//             game.load.image('cactus2', 'images/tiles/obstacle2.png');
//             game.load.image('rock', 'images/tiles/obstacle3.png');

//             game.load.image('tree1', 'images/tree_test.png');
//             game.load.image('cube', 'images/cube.png');



//             game.load.image('gold', 'images/tiles/find1_gold.png');
//             game.load.image('revolver', 'images/tiles/find2_revolver.png');
//             game.load.image('badge', 'images/tiles/find3_badge.png');
//             game.load.image('skull', 'images/tiles/find4_skull.png');

//             game.load.image('exit', 'images/tiles/exit.png');
//             game.load.image('tile', 'images/tiles/flare_grass.png');

//             game.load.image('grass1', 'images/tiles/ground_tile_grass1.png');
//             game.load.image('grass2', 'images/tiles/ground_tile_grass2.png');
//             game.load.image('grass3', 'images/tiles/ground_tile_grass3.png');

//             game.load.image('mine', 'images/tiles/mine.png');

//             game.load.image('E', 'images/controls/E.png');
//             game.load.image('N', 'images/controls/N.png');
//             game.load.image('NE', 'images/controls/NE.png');
//             game.load.image('NW', 'images/controls/NW.png');
//             game.load.image('S', 'images/controls/S.png');
//             game.load.image('SE', 'images/controls/SE.png');
//             game.load.image('SW', 'images/controls/SW.png');
//             game.load.image('W', 'images/controls/W.png');

//             game.load.spritesheet('characterAnim','images/tiles/characterAnim.png', 70, 74);

//             game.time.advancedTiming = true;

//             // Add the Isometric plug-in to Phaser
//             game.plugins.add(new Phaser.Plugin.Isometric(game));

//             // Set the world size
//             game.world.setBounds(0, 0, 2048, 512);

//             // Start the physical system
//             game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

//             // set the middle of the world in the middle of the screen
//             game.iso.anchor.setTo(0.5, 0);
//         },
//         create: function () {

//             // set the Background color of our game
//             game.stage.backgroundColor = "#0000ff";

//             // create groups for different tiles
//             floorGroup = game.add.group();
//             itemGroup = game.add.group();
//             grassGroup = game.add.group();
//             obstacleGroup = game.add.group();

//             // set the gravity in our game
//             game.physics.isoArcade.gravity.setTo(0, 0, -500);

//             // create the floor tiles
//             var floorTile;
//             for (var xt = 512; xt > 0; xt -= 35) {
//                 for (var yt = 512; yt > 0; yt -= 35) {
//                     floorTile = game.add.isoSprite(xt, yt, 0, 'tile', 0, floorGroup);
//                     floorTile.anchor.set(0.5);

//                 }
//             }

//             // create the grass tiles randomly
//             var grassTile;
//             for (var xt = 512; xt > 0; xt -= 35) {
//                 for (var yt = 512; yt > 0; yt -= 35) {

//                     var rnd = rndNum(20);

//                     if (rnd == 0) {
//                         grassTile = game.add.isoSprite(xt, yt, 0, 'grass1', 0, grassGroup);
//                         grassTile.anchor.set(0.5);
//                     }
//                     else if (rnd == 1)
//                     {
//                         grassTile = game.add.isoSprite(xt, yt, 0, 'grass2', 0, grassGroup);
//                         grassTile.anchor.set(0.5);
//                     }
//                     else if (rnd == 2)
//                     {
//                         grassTile = game.add.isoSprite(xt, yt, 0, 'grass3', 0, grassGroup);
//                         grassTile.anchor.set(0.5);
//                     }



//                 }
//             }

//             // create an immovable cactus tile and randomly choose one of two graphical cactus representations
//             var cactus1;
//             for (var xt = 512; xt > 0; xt -= 230) {
//                 for (var yt = 512; yt > 0; yt -= 230) {

//                     var rnd = rndNum(1);

//                     if (rnd == 0) {
//                         cactus1 = game.add.isoSprite(xt, yt, 0, 'cactus1', 0, obstacleGroup);
//                     }
//                     else
//                     {
//                         cactus1 = game.add.isoSprite(xt, yt, 0, 'cactus2', 0, obstacleGroup);
//                     }

//                     cactus1.anchor.set(0.5);

//                     // Let the physics engine do its job on this tile type
//                     game.physics.isoArcade.enable(cactus1);

//                     // This will prevent our physic bodies from going out of the screen
//                     cactus1.body.collideWorldBounds = true;

//                     // Make the cactus body immovable
//                     cactus1.body.immovable = true;

//                 }
//             }


//             var rock;
//             for (var xt = 512; xt > 0; xt -= 230) {
//                 for (var yt = 512; yt > 0; yt -= 200) {

//                     rock = game.add.isoSprite(xt + 80, yt + 80, 0, 'rock', 0, obstacleGroup);
//                     rock.anchor.set(0.5);

//                     // Let the physics engine do its job on this tile type
//                     game.physics.isoArcade.enable(rock);

//                     // This will prevent our physic bodies from going out of the screen
//                     rock.body.collideWorldBounds = true;

//                     // set the physics bounce amount on each axis  (X, Y, Z)
//                     rock.body.bounce.set(0.2, 0.2, 0);

//                     // set the slow down rate on each axis (X, Y, Z)
//                     rock.body.drag.set(100, 100, 0);
//                 }
//             }

//             // create a mine object which will be our ending point in the game
//             var mine = game.add.isoSprite(400, 100, 0, 'mine', 0, obstacleGroup);
//                 mine.anchor.set(0.5);

//                 game.physics.isoArcade.enable(mine);
//                 mine.body.collideWorldBounds = true;
//                 mine.body.immovable = true;

//             // create collectible items
//             marker = game.add.isoSprite(rndNum(400), rndNum(400), 0, 'gold', 0, itemGroup);
//             game.physics.isoArcade.enable(marker);
//             marker.body.collideWorldBounds = true;
//             marker.anchor.set(0.5);

//             marker2 = game.add.isoSprite(rndNum(400), rndNum(400), 0, 'revolver', 0, itemGroup);
//             game.physics.isoArcade.enable(marker2);
//             marker2.body.collideWorldBounds = true;
//             marker2.anchor.set(0.5);

//             marker3 = game.add.isoSprite(rndNum(400), rndNum(400), 0, 'badge', 0, itemGroup);
//             game.physics.isoArcade.enable(marker3);
//             marker3.body.collideWorldBounds = true;
//             marker3.anchor.set(0.5);

//             marker4 = game.add.isoSprite(rndNum(400), rndNum(400), 0, 'skull', 0, itemGroup);
//             game.physics.isoArcade.enable(marker4);
//             marker4.body.collideWorldBounds = true;
//             marker4.anchor.set(0.5);

//             // create the exit marker next to the mine object
//             exitMarker = game.add.isoSprite(430, 194, 0, 'exit', 0, itemGroup);
//             game.physics.isoArcade.enable(exitMarker);
//             exitMarker.body.collideWorldBounds = true;
//             exitMarker.anchor.set(0.5);
//             exitMarker.alpha = 0.5;


//             // create the collected item text
//                itemsTxt = game.add.text(100, 8, txt, {
//                     font: "16px Arial",
//                     fill: "#FFFFFF",
//                     align: "center"
//                 });

//                itemsTxt.fixedToCamera = true;

//             // create the information text field about the status of the game
//                endTxt = game.add.text(0, 8, finalTxt, {
//                     font: "18px Arial",
//                     fill: "#FFFF00",
//                     align: "center"
//                 });

//                endTxt.fixedToCamera = true;
//                endTxt.anchor.x = Math.round(endTxt.width * 0.5) / endTxt.width;
//                endTxt.cameraOffset.x = (width/3) * 2;

//             // update both text fields
//                updateText();
//                updateEndText();

//             // create control button sprites on the screen
//             cNW = game.add.sprite(0, 100, 'NW');
//             cNW.fixedToCamera = true;
//             cNW.inputEnabled = true;
//             cNW.events.onInputDown.add(onDown, this);
//             cNW.events.onInputOver.add(onDown, this);
//             cNW.events.onInputUp.add(onUp, this);
//             cNW.events.onInputOut.add(onUp, this);

//             cW = game.add.sprite(0, 176, 'W');
//             cW.fixedToCamera = true;
//             cW.inputEnabled = true;
//             cW.events.onInputDown.add(onDown, this);
//             cW.events.onInputOver.add(onDown, this);
//             cW.events.onInputUp.add(onUp, this);
//             cW.events.onInputOut.add(onUp, this);

//             cSW = game.add.sprite(0, 252, 'SW');
//             cSW.fixedToCamera = true;
//             cSW.inputEnabled = true;
//             cSW.events.onInputDown.add(onDown, this);
//             cSW.events.onInputOver.add(onDown, this);
//             cSW.events.onInputUp.add(onUp, this);
//             cSW.events.onInputOut.add(onUp, this);

//             cN = game.add.sprite(76, 100, 'N');
//             cN.fixedToCamera = true;
//             cN.inputEnabled = true;
//             cN.events.onInputDown.add(onDown, this);
//             cN.events.onInputOver.add(onDown, this);
//             cN.events.onInputUp.add(onUp, this);
//             cN.events.onInputOut.add(onUp, this);

//             cS = game.add.sprite(76, 252, 'S');
//             cS.fixedToCamera = true;
//             cS.inputEnabled = true;
//             cS.events.onInputDown.add(onDown, this);
//             cS.events.onInputOver.add(onDown, this);
//             cS.events.onInputUp.add(onUp, this);
//             cS.events.onInputOut.add(onUp, this);

//             cNE = game.add.sprite(152, 100, 'NE');
//             cNE.fixedToCamera = true;
//             cNE.inputEnabled = true;
//             cNE.events.onInputDown.add(onDown, this);
//             cNE.events.onInputOver.add(onDown, this);
//             cNE.events.onInputUp.add(onUp, this);
//             cNE.events.onInputOut.add(onUp, this);

//             cE = game.add.sprite(152, 176, 'E');
//             cE.fixedToCamera = true;
//             cE.inputEnabled = true;
//             cE.events.onInputDown.add(onDown, this);
//             cE.events.onInputOver.add(onDown, this);
//             cE.events.onInputUp.add(onUp, this);
//             cE.events.onInputOut.add(onUp, this);

//             cSE = game.add.sprite(152, 252, 'SE');
//             cSE.fixedToCamera = true;
//             cSE.inputEnabled = true;
//             cSE.events.onInputDown.add(onDown, this);
//             cSE.events.onInputOver.add(onDown, this);
//             cSE.events.onInputUp.add(onUp, this);
//             cSE.events.onInputOut.add(onUp, this);

//             // create control functions for the control buttons
//             function onDown(sprite, pointer) {

//                 if (sprite.key == "N") {

//                     Ndown = true;

//                 }

//                 if (sprite.key == "S") {

//                     Sdown = true;

//                 }

//                 if (sprite.key == "SE") {

//                     SEdown = true;

//                 }

//                 if (sprite.key == "SW") {

//                     SWdown = true;

//                 }

//                 if (sprite.key == "NW") {

//                     NWdown = true;

//                 }

//                 if (sprite.key == "NE") {

//                     NEdown = true;

//                 }

//                 if (sprite.key == "E") {

//                     Edown = true;

//                 }

//                 if (sprite.key == "W") {

//                     Wdown = true;

//                 }


//             }


//             function onUp(sprite, pointer) {

//                 Ndown = false;
//                 Sdown = false;
//                 SEdown = false;
//                 SWdown = false;
//                 NEdown = false;
//                 NWdown = false;
//                 Edown = false;
//                 Wdown = false;

//             }

//             controls = game.add.group();
//             controls.add(cN);
//             controls.add(cS);
//             controls.add(cW);
//             controls.add(cE);
//             controls.add(cNE);
//             controls.add(cNW);
//             controls.add(cSE);
//             controls.add(cSW);

//             controls.alpha = 0.6;

//             // Creste the player
//             player = game.add.isoSprite(350, 280, 0, 'characterAnim', 0, obstacleGroup);

//             player.alpha = 0.6;

//             // add the animations from the spritesheet
//             player.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
//             player.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
//             player.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
//             player.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
//             player.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
//             player.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
//             player.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
//             player.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);

//             player.anchor.set(0.5);

//             // enable physics on the player
//             game.physics.isoArcade.enable(player);
//             player.body.collideWorldBounds = true;

//             // DISABLED FOR TESTING - CENTER THE CAMERA
//             // game.camera.follow(player);
//             game.camera.x = width * 0.8 ;
//             game.camera.y = height;

//         },
//         update: function () {

//             // Move the player
//             var speed = 100;

//             if (Ndown == true) {
//                 player.body.velocity.y = -speed;
//                 player.body.velocity.x = -speed;
//             }
//             else if (Sdown == true)
//             {
//                 player.body.velocity.y = speed;
//                 player.body.velocity.x = speed;
//             }
//             else if (Edown == true) {
//                 player.body.velocity.x = speed;
//                 player.body.velocity.y = -speed;
//             }
//             else if (Wdown == true)
//             {
//                 player.body.velocity.x = -speed;
//                 player.body.velocity.y = speed;
//             }
//             else if (SEdown == true)
//             {
//                 player.body.velocity.x = speed;
//                 player.body.velocity.y = 0;
//             }
//             else if (SWdown == true)
//             {
//                 player.body.velocity.y = speed;
//                 player.body.velocity.x = 0;
//             }
//             else if (NWdown == true)
//             {
//                 player.body.velocity.x = -speed;
//                 player.body.velocity.y = 0;

//             }
//             else if (NEdown == true)
//             {
//                 player.body.velocity.y = -speed;
//                 player.body.velocity.x = 0;

//             }
//             else
//             {
//                 player.body.velocity.x = 0;
//                 player.body.velocity.y = 0;
//             }


//             if (Ndown == true) {
//                 player.animations.play('N');
//             }
//             else if (Sdown == true)
//             {
//                 player.animations.play('S');
//             }
//             else if (Edown == true) {
//                 player.animations.play('E');
//             }
//             else if (Wdown == true)
//             {
//                 player.animations.play('W');
//             }
//             else if (SEdown == true)
//             {
//                 player.animations.play('SE');
//             }
//             else if (SWdown == true)
//             {
//                 player.animations.play('SW');
//             }
//             else if (NWdown == true)
//             {
//                 player.animations.play('NW');

//             }
//             else if (NEdown == true)
//             {
//                 player.animations.play('NE');

//             }
//             else
//             {
//                 player.animations.stop();
//             }


//             game.physics.isoArcade.collide(obstacleGroup);

//             game.physics.isoArcade.overlap(marker, player ,function(e){
//                 e.destroy();

//                 addItem();

//             });

//             game.physics.isoArcade.overlap(marker2, player ,function(e){
//                 e.destroy();

//                 addItem();

//             });

//             game.physics.isoArcade.overlap(marker3, player ,function(e){
//                 e.destroy();

//                 addItem();

//             });

//             game.physics.isoArcade.overlap(marker4, player ,function(e){
//                 e.destroy();

//                 addItem();

//             });

//             // EXTRA TESTINGGGGGGGG -------------------------------
//             function actionOnClick () {
//                 var px = player.isoX - player.offsetX;
//                 var py = player.isoY - player.offsetY;
//                 // debugger;
//                 game.add.isoSprite(px,py, 60, 'tree1', 0 , obstacleGroup);
//                 console.log("TREE added");
//             }

//             // button = game.add.button(game.world.centerX - 50, game.world.centerY, 'cube', actionOnClick, this, 2, 1, 0);

//             // create control button sprites on the screen
//             cube = game.add.sprite(20, 20, 'cube');
//             cube.fixedToCamera = true;
//             cube.inputEnabled = true;
//             cube.alpha = 0.4
//             cube.events.onInputDown.add(actionOnClick, this);

//             // -------------------------------

//            check = game.physics.isoArcade.overlap(exitMarker, player ,function(e){



//                 if (currentItemCount >= totalItemCount){
//                     console.log("END GAME GOOD! :)");


//                     updateEndText(2);

//                 }
//                 else
//                 {
//                     updateEndText(1);
//                 }

//             });

//            endTxt.visible = check;

//            game.iso.topologicalSort(obstacleGroup);

//         },
//         render: function () {

//         }
//     };

//     game.state.add('Boot', BasicGame.Boot);
//     game.state.start('Boot');

//     // add the collected item
//     function addItem() {

//         currentItemCount++;
//         updateText();

//     }

//     // update the item text field
//     function updateText() {

//          txt = "ITEMS: " + currentItemCount + "/" + totalItemCount;
//          itemsTxt.setText(txt);

//     }

//     // update the end text field
//     function updateEndText(_t) {

//         switch(_t) {

//             case 0:
//                 finalTxt = "";
//             break;

//             case 1:
//                 finalTxt = "YOU MUST FIND ALL THE ITEMS!!!";
//             break;

//             case 2:
//                 finalTxt = "YOU FOUND ALL THE ITEMS!!! :)";
//             break;

//         }

//         endTxt.setText(finalTxt);

//     }

//     // generate random number
//     function rndNum(num) {

//         return Math.round(Math.random() * num);

//     }

//     // add eventListener for tizenhwkey
//     document.addEventListener('tizenhwkey', function(e) {
//         if(e.keyName == "back") {
//             try {
//                 tizen.application.getCurrentApplication().exit();
//             } catch (error) {
//                 console.error("getCurrentApplication(): " + error.message);
//             }
//         }
//     });
// };

// // window.onload can work without <body onload="">
// window.onload = init;
