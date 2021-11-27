class menu extends Phaser.Scene {
    constructor() { 
        super({key: 'menu'}); 
}
preload() {
    var backimage = this.add.graphics();
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    backimage.fillStyle(0xFFD966, 1);
    backimage.fillRect(0, 0, 800, 800);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: "Loading...",
    style: {
        font: "20px monospace",
        fill: "#000000"
    }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: "0%",
    style: {
        font: "18px monospace",
        fill: "#000000"
    }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: "",
    style: {
            font: "18px monospace",
            fill: "#000000"
    }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
    percentText.setText(parseInt(value * 100) + "%");
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
    assetText.setText("Loading asset: " + file.key);
    });
    this.load.on("complete", function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    backimage.destroy();
    assetText.destroy();
        });

        //Loads All The Images
    this.load.image('turn1', 'assets/images/Turn1.png');
    this.load.image('turn2', 'assets/images/Turn2.png');
    this.load.image('turn3', 'assets/images/Turn3.png');
    this.load.image('turn4', 'assets/images/Turn4.png');
    this.load.image('verticle', 'assets/images/Verticle.png');
    this.load.image('horizontal', 'assets/images/Horizontal.png');
    this.load.image('border_u-d', 'assets/images/small_u-d.png');
    this.load.image('border_l-r', 'assets/images/small_l-r.png');
    this.load.image('player','assets/images/Player.png');
    this.load.audio('cow', 'assets/sounds/Cow_Banger.wav');
    this.load.audio('corgi', 'assets/sounds/Corgi_Banger.wav');
    this.load.spritesheet('button', 'assets/images/testbuttons.png',{frameWidth: 193, frameHeight: 71});
    this.load.spritesheet('start', 'assets/images/button.png',{frameWidth: 153, frameHeight: 66});
    this.load.spritesheet('garageButton', 'assets/images/GarageButton.png',{frameWidth: 153, frameHeight: 66});
    this.load.spritesheet('optionButton', 'assets/images/OptionsButton.png',{frameWidth: 153, frameHeight: 66} );
    this.load.video('video1', 'assets/sounds/lol.mp4');
}
create() {

        var startButton = this.add.image(400,400, 'start');
        startButton.setInteractive();
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            startButton.setFrame(1)
        })
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            startButton.setFrame(0)
        })
        startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('map1')
        })

            var garageButton = this.add.image(400,500, 'garageButton');
            garageButton.setInteractive();
            garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                garageButton.setFrame(1)
            })
            garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                garageButton.setFrame(0)
            })
            garageButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.start('options')
            })

                var optionButton = this.add.image(400,600, 'garageButton');
                optionButton.setInteractive();
                optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    optionButton.setFrame(1)
                })
                optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    optionButton.setFrame(0)
                })
                optionButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.scene.start('garage')
                })
    //change this name to play a different video in the background of the menu screen and don't forget to preload it as well
    //not working but it isn't breaking any code
    //var video1 = document.createElement('video1');

   //video1.playsinline = true;
    //video1.src = 'assets/sounds/lol.mp4';
    //video1.width = 800;
    //video1.height = 450;
   // video1.autoplay = true;

        // const menuLayer = this.add.layer();
        // menuLayer.add([menuVideo, start]);
    }  
}