

BasicGame.sneak = function(game) {

	var trees;
	var light1;
	var bear;
	var leftKey;
	var rightKey;
	var upKey;
	var downKey;
	var snow;
	var cop;
	var cops;
	var c1;
	var c2;
	var c3;
	var content = [
    " ",
    "Bear you need to get into Canada",
    "Avoid the lights and Mounties",
	"Use the trees to hide ",
	" ",
    
	];
	var t = 0;
	var thing;
	var s;
	var index;
	var line = '';
	var music;
	var musicf;
};

BasicGame.sneak.prototype = {

	init: function(){
		health = (hp/100)*192;
		//health = health;
		intox = bac;
		money = cash;
	},
	
	create: function(){
		index = 0;
		var content = [
		" ",
		"Bear you need to get into Canada",
		"Avoid the lights and Mounties",
		"Use the trees to hide ",
		" ",
    
		];
		thing = this.time.now;
		this.add.sprite(0,0,'snow');
		music = this.add.audio('musicS');
		music.play('',0,1,false);
		musicf= this.add.audio('musicf');
		musicf.play('',0,1,true);
		bear=this.add.sprite(500,1000,'bearS');
		bear.anchor.setTo(.45,.45);
		bear.scale.setTo(.9,.9);
		//bear.sprite.add.animations('bear');
		bear.animations.add('walk');
		this.world.setBounds(0, 0, 1024, 1000);
		this.camera.follow(bear);
		cops=this.add.group();
		
		c1=cops.create(this.rnd.integerInRange(0, 200), this.rnd.integerInRange(100, 200), 'cop');
		c1.anchor.setTo(.5,.5);
		c1.scale.setTo(.5,.5);
		//c1.scale.setTo(.5,.5);
		c1.animations.add('down', [0,1,2,3,4,5,6], 5, true);
		c1.animations.add('up', [7,8,9,10,11,12,13], 7, true);
		c1.animations.add('left', [14,15,16,17,18,19,20], 5, true);
		c1.animations.add('right', [21,22,23,24,25,26,27], 5, true);
		c1.animations.play('right');
		//c1.body.setCircle(20);
		c1.body.velocity.setTo(100,0);
		
		
		
		
		c2=cops.create(this.rnd.integerInRange(600, 800), this.rnd.integerInRange(200, 300), 'cop');
		c2.anchor.setTo(.5,.5);
		c2.scale.setTo(.5,.5);
		c2.animations.add('down', [0,1,2,3,4,5,6], 5, true);
		c2.animations.add('up', [7,8,9,10,11,12,13], 7, true);
		c2.animations.add('left', [14,15,16,17,18,19,20], 5, true);
		c2.animations.add('right', [21,22,23,24,25,26,27], 5, true);
		c2.animations.play('left');
	//c2.body.setCircle(20);
		c2.body.velocity.setTo(-100,0);
		
		c3=cops.create(this.rnd.integerInRange(400, 450), this.rnd.integerInRange(300, 400), 'cop');
		c3.anchor.setTo(.5,.5);
		c3.scale.setTo(.5,.5);
		c3.animations.add('down', [0,1,2,3,4,5,6], 5, true);
		c3.animations.add('up', [7,8,9,10,11,12,13], 7, true);
		c3.animations.add('left', [14,15,16,17,18,19,20], 5, true);
		c3.animations.add('right', [21,22,23,24,25,26,27], 5, true);
		c3.animations.play('right');
		//c3.body.setCircle(20);
		c3.body.velocity.setTo(100,0);
		
		
		trees = this.add.group();
		for (var i = 0; i < 10; i++){
			var tr = trees.create(this.rnd.integerInRange(0, 800), this.rnd.integerInRange(100, 400), 'tree',this.rnd.integerInRange(0, 10));
			tr.name = 'enemy' + i;
			tr.scale.setTo(.65,.65);
			tr.anchor.setTo(.5,.5);
			tr.body.setCircle(20);
			
		}
		
		this.add.sprite(0,0,'fenceS');
		
		
		light1=this.add.sprite(512,300,'light1');
		light1.anchor.setTo(.5,.5);
		light1.body.setCircle(20);
	

		this.add.tween(light1).to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000)  }, 2000,  Phaser.Easing.Linear.None, true)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.to({ y: this.rnd.integerInRange(0, 575), x: this.rnd.integerInRange(50, 1000) }, 2000, Phaser.Easing.Linear.None)
		.loop()
		.start();
	
		leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
		downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		
		var style = { font: "30pt Courier", fill: "#19cb65", stroke: "#111111", strokeThickness: 6 };
		s = this.add.text(32, 550, '', style);
		t = this.time.now + 80;
		console.log(content[1]);
		screentext = this.add.text(120, 600, content[1]);
	},
	collisionHandler: function(be, li) {
		if (!this.physics.overlap(bear, trees)){
			//var msg = "Got caught\n No money";
			//var sty = { font: "bold 25pt Arial", fill: "#000000", align: "center", stroke: "#ff0000", strokeThickness: 2 };
			//mm = this.add.text(this.world.centerX, this.world.centerY, msg, sty);
			//mm.anchor.setTo(0.5, 0.5);
			//this.add.tween(mm).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
			be.kill();
			//this.physics.gravity.y=200;
			this.proceed();
		}
	},
   update: function() {
		if (this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			console.log("x = " + bear.body.x + " y = " + bear.body.y);
		}
		if (this.time.now - thing > t && index < content.length){
			//  get the next character in the line
			console.log(content);
			if (line.length < content[index].length)
			{
				line = content[index].substr(0, line.length + 1);
				s.setText(line);
				t = this.time.now + 80;
			}
			else
			{
				t = this.time.now + 1000;

				if (index < content.length)
				{
					index++;
					line = '';
				}
			}
		}
		if (c1.body.x<50){
			c1.body.velocity.setTo(100,0);
			c1.animations.play('right');
		}
		if (c1.body.x>900){
			c1.body.velocity.setTo(0,0);
			c1.body.velocity.setTo(-100,0);
			c1.animations.play('left');
		}
		if (c2.body.x<50){
			c2.body.velocity.setTo(122,0);
			c2.animations.play('right');
		}
		if (c2.body.x>900){
			c2.body.velocity.setTo(0,0);
			c2.body.velocity.setTo(-100,0);
			c2.animations.play('left');
		}
		if (c3.body.x<50){
			c3.body.velocity.setTo(100,0);
			c3.animations.play('right');
		}
		if (c3.body.x>900){
			c3.body.velocity.setTo(0,0);
			c3.body.velocity.setTo(-100,0);
			c3.animations.play('left');
		}
		this.physics.overlap(bear, light1, this.collisionHandler, null, this);
		this.physics.overlap(bear, c1, this.collisionHandler, null, this);
		this.physics.overlap(bear, c2, this.collisionHandler, null, this);
		this.physics.overlap(bear, c3, this.collisionHandler, null, this);
		bear.body.velocity.setTo(0,0);
		
	   if (upKey.isDown&&(bear.body.y>40||(bear.body.x>482&&bear.body.x<500))){
			if (bear.body.y<10){
				//var msg = "Got that money";
				//console.log("TF");
				//var sty = { font: "bold 25pt Arial", fill: "#111111", align: "center", stroke: "#ff0000", strokeThickness: 2 };
				//mm = this.add.text(500, 100, msg, sty);
				//mm.anchor.setTo(0.5, 0.5);
				//this.add.tween(mm).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);
				//this.physics.gravity.y=200;
				money += 100;
				this.proceed();
			}
			bear.animations.play('walk', 10);
			bear.body.velocity.y=-100;
			//money += 50;
			//this.proceed();
		}
		if (downKey.isDown){
			bear.animations.play('walk', 10);
			bear.body.velocity.y=100;
		}
		if (rightKey.isDown&&bear.body.x<1000){
			bear.animations.play('walk', 10);
			//bear.animations.play('left');
			//truck.angle=-2;
			//truck.body.velocity.x = -255;
			bear.body.velocity.x=100;
		}
		if (leftKey.isDown&&bear.body.x>10){
			bear.animations.play('walk', 10);
			
			
			bear.body.velocity.x=-100;
		}
	},
	
	proceed: function(){
		next = 'can1'
		console.log("STOP");
		music.stop();
		musicf.stop();
		this.game.state.start('store', health, intox, money, next);
	},
render: function() {
	//this.game.debug.renderPhysicsBody(bear.body);
	//this.game.debug.renderPhysicsBody(c1.body);
	//this.game.debug.renderPhysicsBody(c2.body);
	//this.game.debug.renderPhysicsBody(c3.body);
	//this.game.debug.renderPhysicsBody(trees.body);
    //this.game.debug.renderCameraInfo(game.camera, 500, 32);
    //this.game.debug.renderSpriteCoords(card, 32, 32);
    // game.debug.renderPhysicsBody(card.body);

	}
};
