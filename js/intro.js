
BasicGame.intro = function (game) {
	var title;
};

BasicGame.intro.prototype = {
	
	create: function() {
	
		title = this.add.sprite(0,0,'title');
		title.inputEnabled = true;  //.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		title.events.onInputDown.add(this.startGame, this);
		
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.M]);
	},
	
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.M)){
			console.log("pressed?");
			this.superSecret();
		}
	},
	
	startGame: function() {
		console.log("WTF?");
		health = 192;
		intox = 0;
		money = 0;
		//console.log(hp);
		this.game.state.start('putinFight', true, false, health, intox, money);


		//console.log("LEVEL ONE!");
		//this.game.state.start('levelOne', true, false, hp, bac, cash);
	},
	superSecret: function(){
		this.game.state.start('end');
	}
};