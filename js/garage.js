//For Taggy
//localStorage.setItem("car","assets/images/Cars/LimeCar.png");
var garage = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "garage"
        });
    },
    preload: function() {},

    create: function() {
        //sets fade only when you load in from the menu
        if (localStorage.getItem("GFade") == 0) {
            this.cameras.main.fadeIn(1000, 0, 0, 0)
        }
        localStorage.setItem("GFade", 1);

        stars = parseInt(localStorage.getItem('stars'));
        P1 = localStorage.getItem('P1');
        P2 = localStorage.getItem('P2');
        P3 = localStorage.getItem('P3');
        P4 = localStorage.getItem('P4');
        MGC = localStorage.getItem('MGC');
        DBM = localStorage.getItem('DBM');


        //this is for displaying current cash
        currency = this.add.text(300, 65, "stars: " + stars, {
            fontFamily: 'Dogica',
            fontSize: 32,
            color: '#000000'
        });
        var price = 0;
        //Background UI
        var backimage = this.add.graphics();
        backimage.fillStyle(0x37313b, 1);
        backimage.fillRect(0, 0, 800, 800);

        //text if you don't have enough money
        var notEnoughMoney = this.add.text(43, 200, "You do not have enough stars", {
            fontFamily: 'Dogica',
            fontSize: 32,
            color: '#e34d4d'
        });
        notEnoughMoney.visible = false;

        //The buy popup loads but is not visible
        infoPopUp = this.add.image(400, 400, 'infoPopUp');
        cancelButton = this.add.image(250, 625, 'cancelButton');
        buyButton = this.add.image(550, 625, 'buyButton');
        popUpText = this.add.text(150, 150, "Are you sure you want to buy" + "\n" + "this car for " + price + " stars?", {
            fontFamily: 'Dogica',
            fontSize: 36,
            color: '#000000'
        });

        infoPopUp.visible = false;
        cancelButton.visible = false;
        buyButton.visible = false;
        popUpText.visible = false;

        cancelButton.setInteractive();
        cancelButton.on(pointerOver, () => {

            cancelButton.setFrame(1)
        })
        cancelButton.on(pointerOut, () => {
            cancelButton.setFrame(0)
        })
        cancelButton.on(pointerDown, () => {
            price = 0;
            infoPopUp.visible = false;
            cancelButton.visible = false;
            buyButton.visible = false;
            popUpText.visible = false;
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene
        })

        buyButton.setInteractive();
        buyButton.on(pointerOver, () => {

            buyButton.setFrame(1)
        })
        buyButton.on(pointerOut, () => {
            buyButton.setFrame(0)
        })
        buyButton.on(pointerDown, () => {
            var stars2 = localStorage.getItem('stars');
            if (stars2 - price >= 0) {
                localStorage.setItem("stars", stars2 - price);
                var finalPrice = localStorage.getItem("stars");
                currency.setText("stars: " + finalPrice)

                infoPopUp.visible = false;
                cancelButton.visible = false;
                buyButton.visible = false;
                popUpText.visible = false;
                this.registry.destroy(); // destroy registry
                this.events.off(); // disable all active events
                this.scene.restart(); // restart current scene
            } else {
                infoPopUp.visible = false;
                cancelButton.visible = false;
                buyButton.visible = false;
                popUpText.visible = false;
                notEnoughMoney.visible = true;
            }
        });



        //code for the back button to fade out and bring back the menu screen
        backButton = this.add.image(100, 50, 'backButton');
        backButton.setInteractive();
        backButton.on(pointerOver, () => {
            backButton.setFrame(1)
        })
        backButton.on(pointerOut, () => {
            backButton.setFrame(0)
        })
        backButton.on(pointerDown, () => {
            localStorage.setItem("GFade", 0);
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('menu')
            })
        })

        //Sets all image icons
        player1 = this.physics.add.sprite(200, 642, 'player1');
        GarageIcon1 = this.add.image(200, 650, 'garageIcon');
        GarageIconLocked1 = this.add.image(200, 650, 'lockedIcon')

        //Checks if the car is the currently selected car and if so it will show the selected icon
        if (localStorage.getItem("car") == 'assets/images/Cars/Player.png') {
            GarageIcon1.setFrame(3)
            player1.y = 650
        }

        //Checks to see if the car has been bought
        if (P1 == "true") {
            //clears the locked image
            GarageIconLocked1.visible = false;
            //creates an interactive for the button so you can select it
            GarageIcon1.setInteractive();
            //Changes frame for hovering
            GarageIcon1.on(pointerOver, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/Player.png') {
                    GarageIcon1.setFrame(3)
                    player1.y = 650
                } else {
                    GarageIcon1.setFrame(1)
                    player1.y = 642
                }
            })
            //makes sure icon stays selected if moved away other wise it will be displayed as default image
            GarageIcon1.on(pointerOut, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/Player.png') {
                    GarageIcon1.setFrame(3)
                    player1.y = 650
                } else {
                    GarageIcon1.setFrame(0)
                    player1.y = 642
                }
            })
            //This is so when it's selected it makes all the other cars unselected
            GarageIcon1.on(pointerDown, () => {
                GarageIcon1.setFrame(0);
                player1.y = 642
                GarageIcon2.setFrame(0);
                player2.y = 642
                GarageIcon3.setFrame(0);
                player3.y = 642
                GarageIcon4.setFrame(0);
                player4.y = 442
                GarageIcon5.setFrame(0);
                darkbirdmobile.y = 442
                GarageIcon6.setFrame(0);
                mgcar.y = 442
                GarageIcon1.setFrame(3)
                player1.y = 650
                //sets the sprite to current car
                localStorage.setItem("car", "assets/images/Cars/Player.png");
            })
            //check for if the car isn't unlocked
        } else if (P1 == "false") {
            //sets locked icon interactive
            GarageIconLocked1.setInteractive();
            //when icon clicked
            GarageIconLocked1.on(pointerDown, () => {
                //sets not enough money text to not visible
                notEnoughMoney.visible = false;
                //the if statement prevents the user from buying multiple cars for the price of one
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 0;
                    //popup appears varifying if you want to buy the car
                    //all other buttons are defined beforehand in the beggining
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    //when buy button is pressed it selects that car to be current car
                    buyButton.on(pointerDown, () => {
                        //i couldve prevented this a numerous amount of ways but i just did this cuz why not
                        if (notEnoughMoney.visible == false) {
                            GarageIcon1.setFrame(0);
                            player1.y = 642
                            GarageIcon2.setFrame(0);
                            player2.y = 642
                            GarageIcon3.setFrame(0);
                            player3.y = 642
                            GarageIcon4.setFrame(0);
                            player4.y = 442
                            GarageIcon5.setFrame(0);
                            darkbirdmobile.y = 442
                            GarageIcon6.setFrame(0);
                            mgcar.y = 442
                            //sets the locked icon to false
                            GarageIconLocked1.visible = false;
                            //sets the Unlocked/Locked variable to true
                            localStorage.setItem("P1", true);
                            //selects that car to be current car
                            GarageIcon1.setFrame(3);
                            player1.y = 650
                            localStorage.setItem("car", "assets/images/Cars/Player.png");
                        } else {
                            //sets the not enough money text
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }





        player2 = this.physics.add.sprite(400, 642, 'player2');
        GarageIcon2 = this.add.image(400, 650, 'garageIcon');
        GarageIconLocked2 = this.add.image(400, 650, 'lockedIcon')
        if (localStorage.getItem("car") == 'assets/images/Cars/LimeCar.png') {
            GarageIcon2.setFrame(3)
            player2.y = 650
        }
        if (P2 == "true") {
            GarageIconLocked2.visible = false;
            GarageIcon2.setInteractive();
            GarageIcon2.on(pointerOver, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/LimeCar.png') {
                    GarageIcon2.setFrame(3)
                    player2.y = 650
                } else {
                    GarageIcon2.setFrame(1)
                    player2.y = 642
                }
            })
            GarageIcon2.on(pointerOut, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/LimeCar.png') {
                    GarageIcon2.setFrame(3)
                    player2.y = 650
                } else {
                    GarageIcon2.setFrame(0)
                    player2.y = 642
                }
            })
            GarageIcon2.on(pointerDown, () => {
                GarageIcon1.setFrame(0);
                player1.y = 642
                GarageIcon2.setFrame(0);
                player2.y = 642
                GarageIcon3.setFrame(0);
                player3.y = 642
                GarageIcon4.setFrame(0);
                player4.y = 442
                GarageIcon5.setFrame(0);
                darkbirdmobile.y = 442
                GarageIcon6.setFrame(0);
                mgcar.y = 442
                GarageIcon2.setFrame(3)
                player2.y = 650
                localStorage.setItem("car", "assets/images/Cars/LimeCar.png");

            })
        } else if (P2 == "false") {
            GarageIconLocked2.setInteractive();
            GarageIconLocked2.on(pointerDown, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 2;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(pointerDown, () => {
                        if (notEnoughMoney.visible == false) {
                            //things that need to be changed for every car
                            GarageIcon1.setFrame(0);
                            player1.y = 642
                            GarageIcon2.setFrame(0);
                            player2.y = 642
                            GarageIcon3.setFrame(0);
                            player3.y = 642
                            GarageIcon4.setFrame(0);
                            player4.y = 442
                            GarageIcon5.setFrame(0);
                            darkbirdmobile.y = 442
                            GarageIcon6.setFrame(0);
                            mgcar.y = 442
                            GarageIconLocked2.visible = false;
                            localStorage.setItem("P2", true);
                            GarageIcon2.setFrame(3);
                            player2.y = 650
                            localStorage.setItem("car", "assets/images/Cars/LimeCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        player3 = this.physics.add.sprite(600, 642, 'player3');
        GarageIcon3 = this.add.image(600, 650, 'garageIcon');
        GarageIconLocked3 = this.add.image(600, 650, 'lockedIcon');
        //change what happens if == to the car
        if (localStorage.getItem("car") == 'assets/images/Cars/MagentaCar.png') {
            GarageIcon3.setFrame(3)
            player3.y = 650
        }
        if (P3 == "true") {
            GarageIconLocked3.visible = false;
            GarageIcon3.setInteractive();
            GarageIcon3.on(pointerOver, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MagentaCar.png') {
                    GarageIcon3.setFrame(3)
                    player3.y = 650
                } else {
                    GarageIcon3.setFrame(1)
                    player3.y = 642
                }
            })
            GarageIcon3.on(pointerOut, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MagentaCar.png') {
                    GarageIcon3.setFrame(3)
                    player3.y = 650
                } else {
                    GarageIcon3.setFrame(0)
                    player3.y = 642
                }
            })
            GarageIcon3.on(pointerDown, () => {
                GarageIcon1.setFrame(0);
                player1.y = 642
                GarageIcon2.setFrame(0);
                player2.y = 642
                GarageIcon3.setFrame(0);
                player3.y = 642
                GarageIcon4.setFrame(0);
                player4.y = 442
                GarageIcon5.setFrame(0);
                darkbirdmobile.y = 442
                GarageIcon6.setFrame(0);
                mgcar.y = 442
                GarageIcon3.setFrame(3)
                player3.y = 650
                localStorage.setItem("car", "assets/images/Cars/MagentaCar.png");
            })
        } else if (P3 == "false") {
            GarageIconLocked3.setInteractive();
            GarageIconLocked3.on(pointerDown, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 3;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(pointerDown, () => {
                        if (notEnoughMoney.visible == false) {
                            //things that need to be changed for every car
                            GarageIcon1.setFrame(0);
                            player1.y = 642
                            GarageIcon2.setFrame(0);
                            player2.y = 642
                            GarageIcon3.setFrame(0);
                            player3.y = 642
                            GarageIcon4.setFrame(0);
                            player4.y = 442
                            GarageIcon5.setFrame(0);
                            darkbirdmobile.y = 442
                            GarageIcon6.setFrame(0);
                            mgcar.y = 442
                            GarageIconLocked3.visible = false;
                            localStorage.setItem("P3", true);
                            GarageIcon3.setFrame(3);
                            player3.y = 650
                            localStorage.setItem("car", "assets/images/Cars/MagentaCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        player4 = this.physics.add.sprite(200, 442, 'player4');
        GarageIcon4 = this.add.image(200, 450, 'garageIcon');
        GarageIconLocked4 = this.add.image(200, 450, 'lockedIcon');
        if (localStorage.getItem("car") == 'assets/images/Cars/InitialDCar.png') {
            GarageIcon4.setFrame(3)
            player4.y = 450
        }
        if (P4 == "true") {
            GarageIconLocked4.visible = false;
            GarageIcon4.setInteractive();
            GarageIcon4.on(pointerOver, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/InitialDCar.png') {
                    GarageIcon4.setFrame(3)
                    player4.y = 450
                } else {
                    GarageIcon4.setFrame(1)
                    player4.y = 442
                }
            })
            GarageIcon4.on(pointerOut, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/InitialDCar.png') {
                    GarageIcon4.setFrame(3)
                    player4.y = 450
                } else {
                    GarageIcon4.setFrame(0)
                    player4.y = 442
                }
            })
            GarageIcon4.on(pointerDown, () => {
                GarageIcon1.setFrame(0);
                player1.y = 642
                GarageIcon2.setFrame(0);
                player2.y = 642
                GarageIcon3.setFrame(0);
                player3.y = 642
                GarageIcon4.setFrame(0);
                player4.y = 442
                GarageIcon5.setFrame(0);
                darkbirdmobile.y = 442
                GarageIcon6.setFrame(0);
                mgcar.y = 442
                GarageIcon4.setFrame(3)
                player4.y = 450
                localStorage.setItem("car", "assets/images/Cars/InitialDCar.png");
            })
        } else if (P4 == "false") {
            GarageIconLocked4.setInteractive();
            GarageIconLocked4.on(pointerDown, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 3;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(pointerDown, () => {
                        if (notEnoughMoney.visible == false) {
                            //things that need to be changed for every car
                            GarageIcon1.setFrame(0);
                            player1.y = 642
                            GarageIcon2.setFrame(0);
                            player2.y = 642
                            GarageIcon3.setFrame(0);
                            player3.y = 642
                            GarageIcon4.setFrame(0);
                            player4.y = 442
                            GarageIcon5.setFrame(0);
                            darkbirdmobile.y = 442
                            GarageIcon6.setFrame(0);
                            mgcar.y = 442
                            GarageIconLocked4.visible = false;
                            localStorage.setItem("P4", true);
                            GarageIcon4.setFrame(3);
                            player4.y = 450
                            localStorage.setItem("car", "assets/images/Cars/InitialDCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        darkbirdmobile = this.physics.add.sprite(400, 442, 'darkbirdmobile');
        GarageIcon5 = this.add.image(400, 450, 'garageIcon');
        GarageIconLocked5 = this.add.image(400, 450, 'lockedIcon');
        //change what happens if == to the car
        if (localStorage.getItem("car") == 'assets/images/Cars/DarkBirdMobile.png') {
            GarageIcon5.setFrame(3)
            darkbirdmobile.y = 450
        }
        if (DBM == "true") {
            GarageIconLocked5.visible = false;
            GarageIcon5.setInteractive();
            GarageIcon5.on(pointerOver, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/DarkBirdMobile.png') {
                    GarageIcon5.setFrame(3)
                    darkbirdmobile.y = 450
                } else {
                    GarageIcon5.setFrame(1)
                    darkbirdmobile.y = 442
                }
            })
            GarageIcon5.on(pointerOut, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/DarkBirdMobile.png') {
                    GarageIcon5.setFrame(3)
                    darkbirdmobile.y = 450
                } else {
                    GarageIcon5.setFrame(0)
                    darkbirdmobile.y = 442
                }
            })
            GarageIcon5.on(pointerDown, () => {
                GarageIcon1.setFrame(0);
                player1.y = 642
                GarageIcon2.setFrame(0);
                player2.y = 642
                GarageIcon3.setFrame(0);
                player3.y = 642
                GarageIcon4.setFrame(0);
                player4.y = 442
                GarageIcon5.setFrame(0);
                darkbirdmobile.y = 442
                GarageIcon6.setFrame(0);
                mgcar.y = 442
                GarageIcon5.setFrame(3)
                darkbirdmobile.y = 450
                localStorage.setItem("car", "assets/images/Cars/DarkBirdMobile.png");
            })
        } else if (DBM == "false") {
            GarageIconLocked5.setInteractive();
            GarageIconLocked5.on(pointerDown, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 6;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(pointerDown, () => {
                        if (notEnoughMoney.visible == false) {
                            //things that need to be changed for every car
                            GarageIcon1.setFrame(0);
                            player1.y = 642
                            GarageIcon2.setFrame(0);
                            player2.y = 642
                            GarageIcon3.setFrame(0);
                            player3.y = 642
                            GarageIcon4.setFrame(0);
                            player4.y = 442
                            GarageIcon5.setFrame(0);
                            darkbirdmobile.y = 442
                            GarageIcon6.setFrame(0);
                            mgcar.y = 442
                            GarageIconLocked5.visible = false;
                            localStorage.setItem("DBM", true);
                            GarageIcon5.setFrame(3);
                            darkbirdmobile.y = 450
                            localStorage.setItem("car", "assets/images/Cars/DarkBirdMobile.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }

        mgcar = this.physics.add.sprite(600, 442, 'mgcar');
        GarageIcon6 = this.add.image(600, 450, 'garageIcon');
        GarageIconLocked6 = this.add.image(600, 450, 'lockedIcon');

        if (localStorage.getItem("car") == 'assets/images/Cars/MGKCar.png') {
            GarageIcon6.setFrame(3)
            mgcar.y = 450
        }
        if (MGC == "true") {
            GarageIconLocked6.visible = false;
            GarageIcon6.setInteractive();
            GarageIcon6.on(pointerOver, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MGKCar.png') {
                    GarageIcon6.setFrame(3)
                    mgcar.y = 450
                } else {
                    GarageIcon6.setFrame(1)
                    mgcar.y = 442
                }
            })
            GarageIcon6.on(pointerOut, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MGKCar.png') {
                    GarageIcon6.setFrame(3)
                    mgcar.y = 450
                } else {
                    GarageIcon6.setFrame(0)
                    mgcar.y = 442
                }
            })
            GarageIcon6.on(pointerDown, () => {
                GarageIcon1.setFrame(0);
                player1.y = 642
                GarageIcon2.setFrame(0);
                player2.y = 642
                GarageIcon3.setFrame(0);
                player3.y = 642
                GarageIcon4.setFrame(0);
                player4.y = 442
                GarageIcon5.setFrame(0);
                darkbirdmobile.y = 442
                GarageIcon6.setFrame(0);
                mgcar.y = 442
                GarageIcon6.setFrame(3)
                mgcar.y = 450
                localStorage.setItem("car", "assets/images/Cars/MGKCar.png");
            })
        } else if (MGC == "false") {
            GarageIconLocked6.setInteractive();
            GarageIconLocked6.on(pointerDown, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 10;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " stars?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(pointerDown, () => {
                        if (notEnoughMoney.visible == false) {
                            //things that need to be changed for every car
                            GarageIcon1.setFrame(0);
                            player1.y = 642
                            GarageIcon2.setFrame(0);
                            player2.y = 642
                            GarageIcon3.setFrame(0);
                            player3.y = 642
                            GarageIcon4.setFrame(0);
                            player4.y = 442
                            GarageIcon5.setFrame(0);
                            darkbirdmobile.y = 442
                            GarageIcon6.setFrame(0);
                            mgcar.y = 442
                            GarageIconLocked6.visible = false;
                            localStorage.setItem("MGC", true);
                            GarageIcon6.setFrame(3);
                            mgcar.y = 450
                            localStorage.setItem("car", "assets/images/Cars/MGKCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        //Defines the layer order
        const layer = this.add.layer();
        layer.add([backimage, backButton, GarageIcon1, GarageIcon2, GarageIcon3, GarageIcon4, GarageIcon5, GarageIcon6, player1, player2, player3, player4, darkbirdmobile, mgcar, GarageIconLocked1, GarageIconLocked2, GarageIconLocked3, GarageIconLocked4, GarageIconLocked5, GarageIconLocked6, infoPopUp, currency, cancelButton, buyButton, popUpText, notEnoughMoney]);



    },
    update: function() {

    }
});
