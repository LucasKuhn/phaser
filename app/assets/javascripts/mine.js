// var width = window.innerWidth;
// var height = window.innerHeight;

console.log($("#gameArea").height())
console.log()
game = new Phaser.Game($("#gameArea").width(), $("#gameArea").height(), Phaser.CANVAS, 'gameArea',{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.crossOrigin = true;
    game.load.image('tree', 'tree.png');
    game.load.image('popup', 'graybutton.png');
    game.load.image('backdrop', 'cave.png');
    game.load.image('forest', 'forest.png');
    game.load.image('temple', 'temple.jpg');


    game.load.spritesheet('stumpy', 'stumpy.png', 200, 220, 12);
    game.load.spritesheet('golem', 'golem.png', 145, 140, 12);
    // game.load.spritesheet('boss', 'boss-stomp.png', 190, 172, 5);
    game.load.spritesheet('boss', 'boss-stomp.png', 192, 172, 6);
    game.load.spritesheet('boss2', 'boss-shoot.png', 192, 172, 6);


}

function create() {

    // TEMPLE
    background = game.add.sprite(0, 0, 'temple');
    background.height = game.world.height;
    background.width = game.world.width;

    game.time.events.add(Phaser.Timer.SECOND * 2, findBoss, this);
    // game.time.events.add(Phaser.Timer.SECOND * 2.5, popup, this);


    // FOREST
    // background = game.add.sprite(0, 0, 'forest');
    // background.height = game.world.height;
    // background.width = game.world.width;

    // game.time.events.add(Phaser.Timer.SECOND * 2, findStumpy, this);
    // game.time.events.add(Phaser.Timer.SECOND * 2.5, popup, this);



    // // CAVE
    // background = game.add.sprite(0, 0, 'backdrop');
    // background.height = game.world.height;
    // background.width = game.world.width;

    // background.anchor.setTo(-0.5, -0.5);
    // game.world.pivot.x = width / 2;
    // game.world.pivot.y = height /2 ;

    // game.time.events.add(Phaser.Timer.SECOND * 2, findGolem, this);
    // game.time.events.add(Phaser.Timer.SECOND * 2.5, popup, this);
}

function findBoss() {
    var golem = game.add.sprite(game.world.centerX+50, game.world.centerY+100, 'boss');
    var walk = golem.animations.add('walk');
    golem.animations.play('walk', 3, true);
    golem.alpha = 0;
    game.add.tween(golem).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
}

function findStumpy() {
    var stumpy = game.add.sprite(game.world.centerX, game.world.centerY+50, 'stumpy');

    var walk = stumpy.animations.add('walk');
    stumpy.animations.play('walk', 10, true);
    stumpy.alpha = 0;
    game.add.tween(stumpy).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    stumpy.anchor.setTo(0.3, 0.4);
    stumpy.height = 200;
    stumpy.width = 220;
}


function findGolem() {
    var stumpy = game.add.sprite(game.world.centerX, game.world.centerY+50, 'golem');

    var walk = stumpy.animations.add('walk');
    stumpy.animations.play('walk', 10, true);
    stumpy.alpha = 0;
    game.add.tween(stumpy).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    stumpy.anchor.setTo(0.3, 0.4);
    stumpy.height = game.world.height/3;
    stumpy.width = game.world.width/5;
}

function findTree() {
    var tree = game.add.sprite(game.world.centerX, game.world.centerY+50, 'tree');
    tree.alpha = 0;
    game.add.tween(tree).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    tree.anchor.setTo(0.3, 0.4);
    tree.height = game.world.height/3;
    tree.width = game.world.width/5;
}

function popup() {
    popup = game.add.sprite(game.world.centerX+50, game.world.centerY-200, 'popup');
    popup.anchor.set(0.5);
    popup.alpha = 0.8
    popup.scale.set(0.1);
    game.add.tween(popup.scale).to( { x: 3, y: 1.8 }, 1500, Phaser.Easing.Elastic.Out, true);
    // debugger

    // TEXT
    var ipsum = "You Found Wood!\n What is 1+1";
    var style = { font: "30px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: 650 };
    text = game.add.text(0, 0, ipsum, style);
    text.setTextBounds(popup.x, popup.y);
    // Center align
    text.anchor.set(0.5);
    text.align = 'center';
    //  Stroke color and thickness
    text.stroke = '#000000';
    text.strokeThickness = 4;
}


var worldScale = 1;

function update() {

    // if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {}

    // MAKE THE IMAGE ZOOM IN
    // if (worldScale < 1.25){
    //     worldScale += 0.002;
    //     game.world.pivot.x += 1.3
    //     game.world.pivot.y += 1
    //     game.world.scale.set(worldScale);
    // };

    // ZOOM FOR TEMPLE
    if (worldScale < 1.25){
        worldScale += 0.002;
        game.world.pivot.x += 2
        game.world.pivot.y += 1
        game.world.scale.set(worldScale);
    };
}


function render() {
   // game.debug.cameraInfo(game.camera, 500, 32);
   //  game.debug.spriteCoords(card, 32, 32);
   //  game.debug.physicsBody(card.body);
    game.debug.text("Time until event: " + game.time.events.duration, 32, 32);
}
