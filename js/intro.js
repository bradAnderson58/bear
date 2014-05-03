//starting the intro state
BasicGame.intro = function (game) {
	var title;
};

BasicGame.intro.prototype = {
	//creating the title stuff
	create: function() {
	
		title = this.add.sprite(0,0,'title');
		title.inputEnabled = true;  //.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		title.events.onInputDown.add(this.startGame, this);
		
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.M]);
	},
	//waiting for a key is pressed or for the warp...but not used
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.M)){
			console.log("pressed?");
			this.superSecret();
		}
	},
	//starting level1
	startGame: function() {
		console.log("WTF?");
		health = 192;
		intox = 0;
		money = 0;
		//console.log(hp);
		this.game.state.start('levelOne', true, false, health, intox, money);


		//console.log("LEVEL ONE!");
		//this.game.state.start('levelOne', true, false, hp, bac, cash);
	},
	//warp which isn't used anymore
	superSecret: function(){
		this.game.state.start('end');
	}
};