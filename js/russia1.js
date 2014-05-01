
BasicGame.russia1 = function (game) {

	var health;
	var intox;
	var money;
    var bear;
	var dudes;
	var player;
	var cop1;
	var map;
	var tiles;
	var street;
	var layer;
	var layer1;
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
 
BasicGame.russia1.prototype = {
	init: function(){
		health = (health/100)*192;
		//health = health;
		intox = intox;
		money = money;
	},
    create: function() {
		console.log(intox);
		console.log(health);
		console.log(money);
		this.world.setBounds(0, 0, 25600, 6400);
		this.stage.backgroundColor = '#001f00';
		//map = this.add.sprite(0,0,'roadOne');
		//health = BasicGame.hp;
		
		tiles = this.add.tilemap('russiaOne');
		
		//console.log("Street?");
		tiles.addTilesetImage('road1');
		//tiles.addTilesetImage('snowcrap');
		tiles.addTilesetImage('othersnow');
		
		//tiles.addTilesetImage('treetiles');
		//tiles.addTilesetImage('town');
		//tiles.addTilesetImage('invisible');
		//tiles.addTilesetImage('fence');
		//console.log("before this?");
		//tiles.addTilesetImage('houses');
		
		tiles.setCollisionByExclusion([1,2,3,4,5,6,7,8,9,10,11,12]);
		layer1 = tiles.createLayer('Tile Layer 1');
		//street = this.add.sprite(0,0,'mainroad');
		//layer = tiles.createLayer('Tile Layer 2');
		/* SOME GUYS TO RUN OVER*/
		dudes = this.add.group();
		this.addDudes();
		//this.dudeHandler();
		//dudeEvent = this.time.events.loop(this.rnd.integerInRange(1000,4000),this.dudeHandler,this);
		//tiles.setCollisionByExclusion([0]);
		//layer = tiles.createLayer('Tile Layer 1');
		map = this.add.sprite(0,0,'russia1pic');
		music = this.add.audio('music');
		music.play();
		
		player = this.add.sprite(25550,224,'car');
		//player = this.add.sprite(200,850,'car');
		this.camera.follow(player);
		player.anchor.setTo(0.5, 0.5);
		player.angle = (180);
		this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
		player.body.collideWorldBounds = true;
		player.body.bounce.setTo(1,1);

		//cop1 = this.add.sprite(1000, 25500, 'police');
		//cop1.anchor.setTo(.5,.5);
		//cop1.body.collideWorldBounds = true;
		//this.physics.velocityFromRotation(cop1.rotation, 300, cop1.body.velocity);
		
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
		
		finish = this.add.sprite(30,850,'finish');
		finish.anchor.setTo(.5,.5);
		finish.angle = 90;
		//finish.scale.x = 1.65;
		
		this.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP, Phaser.Keyboard.ONE,Phaser.Keyboard.TWO, Phaser.Keyboard.THREE,Phaser.Keyboard.FOUR,Phaser.Keyboard.FIVE,Phaser.Keyboard.SIX,Phaser.Keyboard.SEVEN,Phaser.Keyboard.EIGHT,Phaser.Keyboard.NINE,Phaser.Keyboard.U,Phaser.Keyboard.I,Phaser.Keyboard.O]);
    },
    
    update: function() {
		 this.physics.collide(player, layer1, this.collisionHandler, null, this);
		 //this.physics.collide(cop1, layer1);
		// this.physics.collide(player, cop1, this.collisionHandler, null, this);
		 this.physics.collide(player, finish, this.nextLevel, null, this);
		 this.physics.collide(dudes, layer1);
		 this.physics.overlap(player, dudes, this.roadkill, null, this);
		 //if (health <= 0){ player.kill();}

		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) || left.input.pointerDown()){
			bear.animations.play('left');
			left.animations.play('clicked');
			right.animations.play('unclicked');
			player.angle -= (Math.random() * ((intox+1)*10));
			this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
			
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || right.input.pointerDown()){
			bear.animations.play('right');
			right.animations.play('clicked');
			left.animations.play('unclicked');
			player.angle += (Math.random() * ((intox+1)*10));
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
		//cop1.rotation = this.physics.moveToObject(cop1, player, 300, 300, 300);
		
    },
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
	roadkill: function(player, dude){
		dudes.remove(dude);
		dude.destroy();
		money += 10;
	},
		
	restartFunc: function(){
		music.stop();
		//this.time.events.remove(dudeEvent);
		dudes.removeAll();
		health = 100;
		intox = 0;
		money = 0;
		this.game.state.start('levelOne', true, false, health, intox, money);
	},
	
	leftFunc: function(){
		bear.animations.play('left');
		player.angle -= (Math.random() * 10);
		this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
	},
	rightFunc: function(){
		bear.animations.play('right');
		player.angle += (Math.random() * 10);
		this.physics.velocityFromRotation(player.rotation, 400, player.body.velocity);
	},
	
	nextLevel: function(){
		nextLevel = this.add.button(500, 300, 'nextButton', this.goLevel, this, 1, 0);
		nextLevel.fixedToCamera = true;
		music.stop();
		player.destroy();
	},
	goLevel: function(){
		//this.time.events.remove(dudeEvent);
		dudes.removeAll();
		next = "rus2";	
		money += 150;
		this.game.state.start('store', health, intox, money, next);
	},
	addDudes: function(){
		var newGuy = dudes.create(1299, 6139, 'dude');
		this.dudeHandler(newGuy, "vert");
		newGuy = dudes.create(1920,5716,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2774,5392,'dude');
		this.dudeHandler(newGuy, "vert");
		newGuy =dudes.create(3053,5086,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2599,4703,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy =dudes.create(1941,3838,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(676,2824,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2321,2413,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(1236,2317,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(675,835,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(1224,615,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(1395,176,'dude');
		this.dudeHandler(newGuy, "vert");
		newGuy = dudes.create(2327, 280,'dude');
		this.dudeHandler(newGuy, "hor");
		newGuy = dudes.create(2433,30,'dude');
		this.dudeHandler(newGuy, "vert");
		newGuy = dudes.create(1934,4670,'dude');
		this.dudeHandler(newGuy,"vert");
		newGuy = dudes.create(1655,3393);
		this.dudeHandler(newGuy,"vert");
		newGuy = dudes.create(1993,754);
		this.dudeHandler(newGuy,"hor");
	},
	dudeHandler: function(newGuy, str){
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
