

BasicGame.trucker = function(game) {
	//define all variables
	var mountains;
	var player;
	var scaler=.1;
	var back;
	var truck;
	var leftKey;
	var rightKey;
	var spaceKey;
	var bear;
	var style;
	var moneytext;
	var money;
	var cars;
	var carevent;
	var treeevent;
	var lines;
	var l1;
	var l3;
	var l4;
	var l5;
	var trees;
	var grav;
	var music;
	var s;
	var gameover=true;
	var gameend;
	var gamemore;
};

BasicGame.trucker.prototype = {
	//bringing in the heath intox and money from the previous level
	init: function(){
		health = (health/100)*192;
		//health = health;
		intox = intox;
		money = money;
	},
	
	//this creates the level and needed gravity
    create: function() {
		scaler = .1;
		gameover = true;
		music = this.add.audio('musicT');
		music.play();
		grav=100;
		this.physics.gravity.y = grav;
		back=this.add.sprite(0,140,'back');
		back.body.allowGravity = false;
		
		lines=this.add.group();
		l1=this.add.sprite(534,165,'line');
		l1.scale.setTo(.4,.4);
		l1.events.onOutOfBounds.add(this.destroyOther, this);
		l3=this.add.sprite(534,250,'line');
		l3.scale.setTo(.5,.5);
		l3.events.onOutOfBounds.add(this.destroyOther, this);
		l4=this.add.sprite(534,350,'line');
		l4.scale.setTo(.6,.6);
		l4.events.onOutOfBounds.add(this.destroyOther, this);
		l5=this.add.sprite(534,450,'line');
		l5.scale.setTo(.7,.7);
		l5.events.onOutOfBounds.add(this.destroyOther, this);
		cars = this.add.group();
		trees=this.add.group();
		
			
		mountains = this.add.sprite(0,0,'top');
		mountains.body.allowGravity = false;
		//top.body.allowGravity = false;
		mountains.scale.setTo(1.2,.5);


		grade=this.add.sprite(0,75,'grade');
		grade.body.allowGravity = false;
	
	
		bear = this.add.sprite(0, 440, 'bearT');
		bear.animations.add('left', [1], 10, true);
		bear.animations.add('right', [2], 10, true);
		bear.animations.add('straight', [0], 10, true);
		bear.body.allowGravity = false;
		bear.scale.setTo(1.5,1.5);
		
		
		style = { font: "24px Arial", fill: "#F7F2E0", align: "center" };
		moneytext= this.add.text(500, 0, "Money: $", style);
				
		
		truck=this.add.sprite(526,520, 'truck');
		truck.anchor.setTo(.5,.5);
		truck.scale.setTo(1.2,1.2);
		truck.body.allowGravity=false;
		//mountains.fixToCamera = true;
		//this.camera.setPosition(0,0);
		this.camera.follow(back);
		//this.camera.x = 0;
		//this.camera.x -= 2000;
		//this.camera.y = 0;
		
		var text = "BEAR hit cops \n earn money";
		var style = { font: "bold 40pt Arial", fill: "#ffffff", align: "center", stroke: "#258acc", strokeThickness: 8 };
		s = this.add.text(512, 300, text, style);
		s.anchor.setTo(0.5, 0.5);
		this.add.tween(s).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
		//game.time.events.add(1000, fadePicture, this);
	
		
		leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		carevent=this.time.events.loop(this.rnd.integerInRange(900,900), this.createEnemy, this);
		treeevent=this.time.events.loop(this.rnd.integerInRange(800,1200), this.createTree, this);
		lineevent=this.time.events.loop(400, this.createLine, this);
		gameend=this.time.events.add(90000, this.over,this);
    },
	//playing the finishing animations and tweens
	over: function() {
		var style = { font: "bold 40pt Arial", fill: "#ffffff", align: "center", stroke: "#258acc", strokeThickness: 8 };
		this.add.text(512, 300, "Round Over", style);


		this.time.events.remove(carevent);
		this.time.events.remove(treeevent);
		this.time.events.remove(lineevent);
		gameend=this.time.events.add(2200, this.over2,this);
	//back.body.allowGravity = true;
		mountains.body.allowGravity = true;
		grade.body.allowGravity = true;
		bear.body.allowGravity = true;
		truck.body.allowGravity = true;
		back.body.allowGravity = true;
	},
	//stops events then sends the level to the next level
	over2: function(){
		gameover=false;
		this.time.events.remove(gameend);
		music.stop();
		next = "rus1";
		this.physics.gravity.y = 0;
		this.game.state.start('store', health, intox, money, next);
	},
//creating all the trees getting sent down
	createTree: function(){
		var side=this.rnd.integerInRange(0,2);
		if (side==0){
			var t = lines.create(this.rnd.integerInRange(550, 1024), 130, 'tree',this.rnd.integerInRange(0, 10));
			t.body.velocity.x=80;
			t.anchor.setTo(0,0);
			t.scale.setTo(.03,.03);
			t.events.onOutOfBounds.add(this.destroyTree, this);
		}
		else{
			var t = lines.create(this.rnd.integerInRange(0, 525), 130, 'tree',this.rnd.integerInRange(0, 10));
			t.body.velocity.x=-100;
			t.anchor.setTo(.5,.5);
			t.scale.setTo(.03,.03);
			t.events.onOutOfBounds.add(this.destroyTree, this);
		}
			//t.outOfBoundsDestroy=true;
			//t.events.onOutOfBounds.add(resetThing, this);
	
	},
	//same as trees for lines
	createLine: function(){
			var l = lines.create(535, 130, 'line');
			l.anchor.setTo(.5,.5);
			l.scale.setTo(.03,.03);
			l.events.onOutOfBounds.add(this.destroyLine, this);
			//l.events.onOutOfBounds.add(resetThing, this);
	},
	//creating the cars
	createEnemy: function(){
			var copcheck=this.rnd.integerInRange(0, 4);
			var c = cars.create(535, 130, 'carss', copcheck);
			if (copcheck==3){
				c.name='moneycar';
			}
			c.health=this.rnd.integerInRange(0, 3);
			c.anchor.setTo(.5,.5);
			c.scale.setTo(.03,.03);
			c.body.allowGravity=true;
			c.events.onOutOfBounds.add(this.destroyCar, this);
			//c.events.onOutOfBounds.add(resetThing, this);
	},
   //updating all the sprites in the scene
   update: function() {
	   // game.physics.gravity.y = grav;
		//scaler=scaler+.002;
		this.physics.overlap(truck, cars, this.collisionHandler, null, this);
		if (gameover){
			truck.body.velocity.setTo(0, 0);
			lines.forEach(function(line){
				line.scale.x=line.scale.x+.004;
				line.scale.y=line.scale.y+.004;
			})
			trees.forEach(function(tree){
				tree.body.x=tree.body.x+200;
				tree.scale.x=tree.scale.x+.004;
				tree.scale.y=tree.scale.y+.004;
			})
			cars.forEach(function(car){
				//this.physics.overlap(truck, car, this.collisionHandler, null, this);
				if (car.y>140){
					car.scale.x=car.scale.x+.004;
					car.scale.y=car.scale.y+.004;
					
				}
				if ((car.y>160)){
					if (car.health==0){
						car.body.x=car.body.x+Math.random();
						//car.angle=3;
					}
					if(car.health==1){
						car.body.x=car.body.x-Math.random();
						//car.angle=3;
					}
				}
				
			})
			
			moneytext.content = "Money: $"+ money;
			
			//player.scale.setTo(scaler,scaler);
			//line.scale.setTo(scaler+.01,scaler+.01);
		
				//game.physics.gravity.y = 100;
				
			
			if (leftKey.isDown&&truck.body.x>340){
				bear.animations.play('left');
				truck.angle=-2;
				truck.body.velocity.x = -255;
			}
			else if (rightKey.isDown&&truck.body.x<610){
				bear.animations.play('right');
				truck.angle=2;
				truck.body.velocity.x = +255;
			}
			else {
				truck.angle=0;
				
				bear.animations.play('straight');
				//console.log("else branch");
			}
		}
		
	},
	destroyOther: function(sprite){
		sprite.kill();
	},
	//destroying cars when they get off screen
	destroyCar: function(sprite){
		//console.log(sprite);
		cars.remove(sprite);
		sprite.kill();
	},
	//destroying trees
	destroyTree: function(sprite){
		//console.log(sprite);
		trees.remove(sprite);
		sprite.kill();
	},
	//destroying lines
	destroyLine: function(sprite){
		//console.log(sprite);
		lines.remove(sprite);
		sprite.kill();
	},
	//doing the collisions and tweening for the cars
	collisionHandler: function(t,c) {
		 if (c.name==='moneycar'){
			money=money+.5;
			if (c.health==0){
				c.body.velocity.x=this.rnd.integerInRange(400, 600);
				c.body.allowRotation=true;
				c.body.angularVelocity=400;
				
			}
			else if (c.health==1){
				c.body.velocity.x=this.rnd.integerInRange(-400, -600);
				c.body.allowRotation=true;
				c.body.angularVelocity=-400;
				
			}
			else{
				c.body.velocity.x=this.rnd.integerInRange(100, 200);
				c.body.allowRotation=true;
				c.body.angularVelocity=900;
			
			}
		
		 }
		 else{
			money=money-.5;
			var msg = "BEAR only hit cops\n-$";
			var sty = { font: "bold 25pt Arial", fill: "#000000", align: "center", stroke: "#ff0000", strokeThickness: 2 };
			mm = this.add.text(512, 300, msg, sty);
			mm.anchor.setTo(0.5, 0.5);
			this.add.tween(mm).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
			if (c.health==0){
				c.body.velocity.x=this.rnd.integerInRange(400, 600);
				c.body.allowRotation=true;
				c.body.angularVelocity=400;
				
			}
			else if (c.health==1){
				c.body.velocity.x=this.rnd.integerInRange(-400, -600);
				c.body.allowRotation=true;
				c.body.angularVelocity=-400;
				
			}
			else{
				c.body.velocity.x=this.rnd.integerInRange(100, 200);
				c.body.allowRotation=true;
				c.body.angularVelocity=900;
			
			}
		}
	
		//console.log(lines.remove(c));
		//console.log(lines);
		//var tweenfly=game.add.tween(c).to({ y: 400, x:-20  }, 1000, Phaser.Easing.Cubic.In, true);
	}
};
