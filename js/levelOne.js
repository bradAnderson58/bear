//setting up variables for levelOne
BasicGame.levelOne = function (game) {

	var health;
	var intox;
	var money;
    var bear;
	var dudes;
	var player;
	var cop1;
	var map;
	var tiles;
	var layer;
	var music;
	var restart;
	var nextLevel;
	var healthBar;
	var amount;
	var finish;
	var left;
	var right;
	
	var tileCheck;

};
 
BasicGame.levelOne.prototype = {
	//bringing health intox and money from the start state
	init: function(){
		health = health;
		intox = intox;
		money = money;
	},
	//creating the map from tilesets loading music and setting up the controls.
    create: function() {
		this.world.setBounds(0, 0, 3200, 1600);
		this.stage.backgroundColor = '#001f00';
		//map = this.add.sprite(0,0,'roadOne');
		//health = BasicGame.hp;
		
		tiles = this.add.tilemap('mapOne');
		
		tiles.addTilesetImage('treetiles');
		tiles.addTilesetImage('town');
		tiles.addTilesetImage('invisible');
		tiles.addTilesetImage('fence');
		tiles.addTilesetImage('road');
		
		tiles.setCollisionByExclusion([1]);
		layer = tiles.createLayer('Tile Layer 1');
		/* SOME GUYS TO RUN OVER*/
		dudes = this.add.group();
		this.addDudes();
		//this.dudeHandler();
		//dudeEvent = this.time.events.loop(this.rnd.integerInRange(1000,4000),this.dudeHandler,this);
		//tiles.setCollisionByExclusion([0]);
		//layer = tiles.createLayer('Tile Layer 1');
		music = this.add.audio('music');
		music.play();
		
		player = this.add.sprite(300,250,'car');
		this.camera.follow(player);
		this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
		player.anchor.setTo(0.5, 0.5);
		player.body.collideWorldBounds = true;
		player.body.bounce.setTo(1,1);

		cop1 = this.add.sprite(200, 250, 'police');
		cop1.anchor.setTo(.5,.5);
		cop1.body.collideWorldBounds = true;
		this.physics.velocityFromRotation(cop1.rotation, 300, cop1.body.velocity);
		
		bear = this.add.sprite(0, 25, 'bear');
		bear.animations.add('left', [1], 10, true);
		bear.animations.add('right', [2], 10, true);
		bear.animations.add('straight', [0], 10, true);
		bear.fixedToCamera = true;
		bear.scale.setTo(1.5,1.5);
		//bear.addChild(text);
		left = this.add.sprite(10, 450, 'leftButton');
		left.fixedToCamera = true;
		left.animations.add('unclicked', [0], 10, true);
		left.animations.add('clicked', [1], 10, true);
		left.inputEnabled = true;
		right = this.add.sprite(890,450, 'rightButton');
		right.animations.add('unclicked', [0], 10, true);
		right.animations.add('clicked', [1], 10, true);
		right.fixedToCamera = true;
		right.inputEnabled = true;
		
		//console.log(hp);
		healthBar = this.add.sprite(-192 + health, 0, 'bar');
		//console.log(typeof hp);
		//console.log(hp);
		healthBar.fixedToCamera = true;
		
		finish = this.add.sprite(3008,0,'finish');
		
		this.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP, Phaser.Keyboard.ONE,Phaser.Keyboard.TWO, Phaser.Keyboard.THREE,Phaser.Keyboard.FOUR,Phaser.Keyboard.FIVE,Phaser.Keyboard.SIX,Phaser.Keyboard.SEVEN,Phaser.Keyboard.EIGHT,Phaser.Keyboard.NINE,Phaser.Keyboard.U,Phaser.Keyboard.I,Phaser.Keyboard.O]);
    },
    //doing the collisions and key inputs also setting up the warps
    update: function() {
		 this.physics.collide(player, layer, this.collisionHandler, null, this);
		 this.physics.collide(cop1, layer);
		 this.physics.collide(player, cop1, this.collisionHandler, null, this);
		 this.physics.collide(player, finish, this.nextLevel, null, this);
		 this.physics.collide(dudes, layer);
		 this.physics.overlap(player, dudes, this.roadkill, null, this);
		 //if (health <= 0){ player.kill();}

		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) || left.input.pointerDown()){
			bear.animations.play('left');
			left.animations.play('clicked');
			right.animations.play('unclicked');
			player.angle -= (Math.random() * (((intox*5)+1)*10));
			this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
			
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || right.input.pointerDown()){
			bear.animations.play('right');
			right.animations.play('clicked');
			left.animations.play('unclicked');
			player.angle += (Math.random() * (((intox*5)+1)*10));
			this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);

		}else {
			bear.animations.play('straight');
			right.animations.play('unclicked');
			left.animations.play('unclicked');
			player.body.angularVelocity = 0;
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			console.log("x = " + player.body.x + " y = " + player.body.y);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.ONE)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('levelOne', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('levelTwo', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('levelThree', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.FOUR)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('canada1', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.FIVE)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('canada2', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.SIX)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('canada3', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.SEVEN)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('russia1', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.EIGHT)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('russia2', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.NINE)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('russia3', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.U)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('sneak', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.I)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('trucker', true, false, health, intox, money);
		}
		if (this.input.keyboard.justPressed(Phaser.Keyboard.O)){
			music.stop();
			dudes.removeAll();
			player.destroy();
			health = (health/192)*100;
			this.game.state.start('putinFight');
		}
		//Cops!!
		//rotate the cop
		cop1.rotation = this.physics.moveToObject(cop1, player, 300, 300, 300);
		
    },
	//decreasing health on collisions
	collisionHandler: function(){
		health -= 1.92;
		healthBar.cameraOffset.x -= 1.92;
		/*amount += .96;
		healthBar = this.add.sprite(1000, amount, 'bar');
		healthBar.fixedToCamera = true;
*/		//console.log(typeof BasicGame.hp);
		//console.log(BasicGame.hp);
		if (health <= 0) {
			player.kill();
			restart = this.add.button(500, 300, 'restart', this.restartFunc, this, 1, 0);
			restart.fixedToCamera = true;
		}
	},
	//killing people
	roadkill: function(player, dude){
		dudes.remove(dude);
		dude.destroy();
		money += 10;
	},
		//if you die you get sent back to levelOne
	restartFunc: function(){
		console.log("restartFunc");
		music.stop();
		//this.time.events.remove(dudeEvent);
		dudes.removeAll();
		health = 192;
		this.game.state.start('levelOne', true, false, health, intox, money);
	},
	//left turn function for random turning
	leftFunc: function(){
		bear.animations.play('left');
		player.angle -= (Math.random() * 10);
		this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
	},
	//right turn function for random turning
	rightFunc: function(){
		bear.animations.play('right');
		player.angle += (Math.random() * 10);
		this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
	},
	//after winning get button comes up for next level
	nextLevel: function(){
		nextLevel = this.add.button(500, 300, 'nextButton', this.goLevel, this, 1, 0);
		nextLevel.fixedToCamera = true;
		music.stop();
		player.destroy();
	},
	//going to the store sending in health intox money and the next level
	goLevel: function(){
		//this.time.events.remove(dudeEvent);
		dudes.removeAll();
		next = "u2";
		this.game.state.start('store', health, intox, money, next);
	},
	//making civilians on the road
	addDudes: function(){
		var newGuy = dudes.create(100, 100, 'dude');
		
		this.dudeHandler(newGuy, "vert");
		newGuy = dudes.create(700,250,'dude');
		this.dudeHandler(newGuy, "vert");
		newGuy = dudes.create(1000,250,'dude');
		this.dudeHandler(newGuy, "vert");
		newGuy =dudes.create(1100,500,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(1100,1200,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy =dudes.create(1100,1500,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(1100,1550,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(1900,1550,'dude');
		this.dudeHandler(newGuy, "vert");
		newGuy = dudes.create(2170,1432,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2137,1098,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2139,642,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2065,95,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2367, 280,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2955,185,'dude');
		this.dudeHandler(newGuy, "vert");
	},
	//animating the civilians across the roads
	dudeHandler: function(newGuy, str){
		newGuy.animations.add('walk', [0,1], 5, true);
		newGuy.animations.play('walk');
		if (str == "vert"){
			this.add.tween(newGuy).to({ y: newGuy.body.y-60, x: newGuy.body.x  }, 1000,  Phaser.Easing.Linear.None, true)
			.to({ y: newGuy.body.y+10, x: newGuy.body.x }, 1000, Phaser.Easing.Linear.None)
			.loop()
			.start();
		}else if (str == "hor"){
			this.add.tween(newGuy).to({ y: newGuy.body.y, x: newGuy.body.x-50  }, 1000,  Phaser.Easing.Linear.None, true)
			.to({ y: newGuy.body.y, x: newGuy.body.x+50 }, 1000, Phaser.Easing.Linear.None)
			.loop()
			.start();
		}
	}	
};
