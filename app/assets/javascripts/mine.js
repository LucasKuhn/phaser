var width = window.innerWidth;
var height = window.innerHeight;


game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameArea',{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.crossOrigin = true;
    game.load.image('backdrop', 'cave.png');
    game.load.image('tree', 'tree.png');
    game.load.image('popup', 'graybutton.png');
}

function create() {
    background = game.add.sprite(0, 0, 'backdrop');
    background.height = game.world.height;
    background.width = game.world.width;



    // background.anchor.setTo(-0.5, -0.5);
    // game.world.pivot.x = width / 2;
    // game.world.pivot.y = height /2 ;

    game.time.events.add(Phaser.Timer.SECOND * 2, findTree, this);
    game.time.events.add(Phaser.Timer.SECOND * 2.5, popup, this);


}

function findTree() {
    var tree = game.add.sprite(game.world.centerX, game.world.centerY, 'tree');
    tree.alpha = 0;
    game.add.tween(tree).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    tree.anchor.setTo(0.3, 0.4);
    tree.height = game.world.height/3;
    tree.width = game.world.width/5;
}

function popup() {
    popup = game.add.sprite(game.world.centerX+80, 200, 'popup');
    popup.anchor.set(0.5);
    popup.scale.set(0.1);
    game.add.tween(popup.scale).to( { x: 2, y: 1 }, 1500, Phaser.Easing.Elastic.Out, true);
}


var worldScale = 1;

function update() {
    // for testing
    if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
    }
    if (worldScale < 1.25){
        worldScale += 0.002;
        game.world.pivot.x += 1.3
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
