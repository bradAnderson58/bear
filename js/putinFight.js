

BasicGame.putinFight = function(game){



	var background;
	var bearPre;
	var bear;
	var putinPre;
	var putin;
	var vs;
	var bearHP = 100;
	var bearHPBar;
	var putinHP = -100;
	var putinHPBar;
	var bearName;
	var putinName;
	var bearIcon;
	var putinIcon;
	var time = 120;
	var timeText;
	var fightStarted = false;
	var canHit = true;
	var putinSide;
	var bgm
	var punchSnd;
};

BasicGame.putinFight.prototype = {
	create: function() {
		bearHP = 100;
		putinHP = -100;
		time = 120;
		fightStarted = false;
		canHit = true;
		bgm = this.add.audio("fightMusic");
		bgm.play();
	
		punchSnd = this.add.audio("punch");
	
		background = this.add.sprite(0,0, "kremlinP");
		background.scale.setTo(0.6, 0.5);
		this.camera.follow(background);
	 
		bearPre = this.add.sprite(-500, 70, "bearPrefight");
	 
		putinPre = this.add.sprite(1200, 70, "putinPrefight");
		putinPre.scale.setTo(0.5, 0.5);
	 
		vs = this.add.text(400, -100, "VS", {font: "56pt Impact", fill: "#fff", stroke: "#000", strokeThickness: "8"});
	
		roundNum = this.add.text(-500, 200, "Round 1", {font: "56pt Impact", fill: "#fff", stroke: "#000", strokeThickness: "8"});
	
		t1 = this.time.events.add(Phaser.Timer.SECOND * 0.5, this.showBear, this);
		t2 = this.time.events.add(Phaser.Timer.SECOND * 1, this.showPutin, this);
		t3 = this.time.events.add(Phaser.Timer.SECOND * 2, this.showVs, this);
	 
		t4 = this.time.events.add(Phaser.Timer.SECOND * 4, this.hideAll, this);
	 
		t5 = this.time.events.add(Phaser.Timer.SECOND * 4.5, this.createAll, this);
	
		cursors = this.input.keyboard.createCursorKeys();
	},

	update: function() {
		//console.log(putinHP);
		if (bearHP <= 0) {
			bearHP = -0.01;
			bearHPBar.crop.width = (bearHP / 100) * bearHPBar.width;
			this.add.tween(bear).to({y: 700}, 250, Phaser.Easing.Linear.In, true);
			fightStarted = false;
			console.log("Losing?");
			losingTheGame = this.time.events.add(Phaser.Timer.SECOND * 1,this.gameOver,this);
		}
	
		if (putinHP >= 0) {
			putin.anchor.setTo(0.5,1);
			putin.frame = 2;
			putinHP = -0.01;
			putinHPBar.crop.width = (putinHP / 100) * putinHPBar.width;
			fightStarted = false;
			this.add.tween(putin).to({angle: 90}, 250, Phaser.Easing.Linear.In, true);
			this.add.tween(putin).to({y: putin.y+70}, 250, Phaser.Easing.Linear.In, true);
			t7 = this.time.events.add(Phaser.Timer.SECOND * 1, this.win, this);
		}

		if (fightStarted) {
			bearHPBar.crop.width = (bearHP / 100) * bearHPBar.width;
			putinHPBar.crop.width = (putinHP / 100) * putinHPBar.width * -1;
		
			if(this.input.keyboard.justPressed(Phaser.Keyboard.A)) {
				if(canHit && Phaser.Math.fuzzyEqual(bear.x, putin.x, 50)) {//&& !putin.animations.getAnimation("leftHook").isPlaying) {
					putinHP += 2;
					punchSnd.play("",0,1,false,false);
					canHit = false;
					bear.frame = 0;
					t8 = this.time.events.add(Phaser.Timer.SECOND * 0.1, this.resetHit, this);
				}else{
					//punchSnd.play("", 0, 1, false, false);
					bear.frame = 0;
					t9 = this.time.events.add(Phaser.Timer.SECOND * 0.1, this.resetHit, this);
				}
			}
			else if(this.input.keyboard.justPressed(Phaser.Keyboard.S)) {
				if(canHit && Phaser.Math.fuzzyEqual(bear.x, putin.x, 50)) {//&& !putin.animations.getAnimation("rightHook").isPlaying) {
					putinHP += 3;
					punchSnd.play("",0,1,false,false);
					canHit = false;
					bear.frame = 2;
					t10 = this.time.events.add(Phaser.Timer.SECOND * 0.1, this.resetHit, this);
				}else{
					bear.frame = 2;
					t11 = this.time.events.add(Phaser.Timer.SECOND * 0.1, this.resetHit, this);
				}
			
			}
		
			if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				if(bear.x < 1050) bear.x += 10;
			}
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				if(bear.x > 200) bear.x -= 10;
			}
		}
	},


	showBear: function() {
		this.add.tween(bearPre).to({x: 0}, 300, Phaser.Easing.Linear.out, true);
	},

	showPutin: function() {
		this.add.tween(putinPre).to({x: 470}, 300, Phaser.Easing.Linear.out, true);
	},

	showVs: function() {
		this.add.tween(vs).to({y: 300}, 100, Phaser.Easing.Linear.out, true);
	},

	hideAll: function() {
		this.add.tween(bearPre).to({x: -500}, 250, Phaser.Easing.Linear.out, true);
		this.add.tween(putinPre).to({x: 1200}, 250, Phaser.Easing.Linear.out, true);
		this.add.tween(vs).to({y: -150}, 100, Phaser.Easing.Linear.out, true);
	},

	createAll: function() {
		putin = this.add.sprite(400, 420, "putin");
		putin.scale.setTo(0.45, 0.45);
		putin.frame = 2;
		putin.anchor.setTo(0.5,0.5);
		putin.animations.add("rightHook", [2,1,0,0,2], 15);
		putin.animations.add("rightHook2", [7,6,5,5,7], 15);
		putin.animations.add("leftHook", [2,3,4,4,2], 15);
		putin.animations.add("leftHook2", [7,8,9,9,7], 15);
	
		bear = this.add.sprite(200, 468, "bearP");
		bear.scale.setTo(1.5, 1.5);
		bear.frame = 1;
		bear.anchor.setTo(0.5,0.5);
	
		bearIcon = this.add.sprite(0, 0, "bearPrefight");
		bearIcon.scale.setTo(0.2, 0.2);
		putinIcon = this.add.sprite(934, 0, "putinPrefight");
		putinIcon.scale.setTo(0.15, 0.15);
	
		this.add.sprite(79, 19, "healthbarBack");
		bearHPBar = this.add.sprite(80, 20, "healthbarBear");
		bearHPBar.cropEnabled = true;
	
		
		this.add.sprite(678, 19, "healthbarBack");
		putinHPBar = this.add.sprite(678, 20, "healthbarPutin");
		putinHPBar.cropEnabled = true;
		putinHPBar.crop.width = (putinHP / 100) * putinHPBar.width;
		
	
		bearName = this.add.text(83, 65, "Bear", {font: "16pt Impact", fill: "#fff", stroke: "#000", strokeThickness: "1"});
		putinName = this.add.text(729, 65, "Vlad the Hammer", {font: "16pt Impact", fill: "#fff", stroke: "#000", strokeThickness: "1"});
		console.log("Doesnt");
		t12 = this.time.events.add(Phaser.Timer.SECOND * 0.5, this.showRound, this);
	},

	subtractTime: function() {
		if(bearHP > 0) {
			time -= 1;
			timeText.content = time;
		}
	},

	putinPunch: function() {
		if(fightStarted) {
			putinSide = Math.random();
			var hit = false;
			if (putinSide <= 0.25 && putinSide >= 0) {
				putin.animations.play("rightHook");
				t13 = this.time.events.add(Phaser.Timer.SECOND * 0.2, this.resetPutin, this, 2);
				if(Phaser.Math.fuzzyEqual(bear.x, putin.x, 50) && putin.animations.getAnimation("rightHook").isPlaying) {
					bearHP -= 40;
				}
			}
			else if (putinSide > 0.25 && putinSide < 0.5) {
				putin.animations.play("leftHook");
				t14 = this.time.events.add(Phaser.Timer.SECOND * 0.2, this.resetPutin, this, 2);
				if(Phaser.Math.fuzzyEqual(bear.x, putin.x, 50) && putin.animations.getAnimation("leftHook").isPlaying) {
					bearHP -= 30;
				}
			}
			else if (putinSide >= 0.5 && putinSide < 0.75) {
				putin.animations.play("rightHook2");
				t15 = this.time.events.add(Phaser.Timer.SECOND * 0.2, this.resetPutin, this, 7);
				if(Phaser.Math.fuzzyEqual(bear.x, putin.x, 50) && putin.animations.getAnimation("rightHook2").isPlaying) {
					bearHP -= 40;
				}
			}
			else if (putinSide >=0.75){
				putin.animations.play("leftHook2");
				t16 = this.time.events.add(Phaser.Timer.SECOND * 0.2, this.resetPutin, this, 7);
				if(Phaser.Math.fuzzyEqual(bear.x, putin.x, 50) && putin.animations.getAnimation("leftHook2").isPlaying) {
					bearHP -= 30;
				}
			}
		
			t17 = this.time.events.add(Phaser.Timer.SECOND * 1.25, this.putinPunch, this);
		}
	},

	resetHit: function() {
		bear.frame = 1;
		t18 = this.time.events.add(Phaser.Timer.SECOND * 2, this.punchCooldown, true);
	},
	punchCooldown: function() {
		canHit = true;
	},

	resetPutin: function(ind) {
		putin.frame = ind;
	},

	putinMove: function() {
		if (fightStarted) {
			this.add.tween(putin).to({x: bear.x}, 750, Phaser.Easing.None, true);
			t19 = this.time.events.add(Phaser.Timer.SECOND * 2, this.putinMove, this);
		}
	},

	showRound: function() {
		this.add.tween(roundNum).to({x: 315}, 250, Phaser.Easing.Linear.out, true);
		t20 = this.time.events.add(Phaser.Timer.SECOND * 1, this.startFight, this);
	},

	startFight: function() {
		roundNum.content = "FIGHT!";
		var t = this.add.tween(roundNum).to({x: 315}, 1000, Phaser.Easing.Linear.out, true)
		.to({x: 1200}, 250, Phaser.Easing.Linear.out, true)
		.start();
	
		timeText = this.add.text(494, 20, time, {font: "32pt Impact", fill: "#fff", stroke: "#000", strokeThickness: "2"});
	
		t21 = this.time.events.loop(Phaser.Timer.SECOND * 1, this.subtractTime, this);
	
		t22 = this.time.events.loop(Phaser.Timer.SECOND * 2, this.putinMove, this);
		t23 = this.time.events.add(Phaser.Timer.SECOND * 1.25, this.putinPunch, this);
	
		fightStarted = true;
	},

	gameOver: function() {
		this.add.tween(bear).to({direction: 0}, 500, Phaser.Easing.Linear.In, true);
		this.time.events.remove(losingTheGame);
		this.time.events.remove(t1);
		this.time.events.remove(t2);
		this.time.events.remove(t3);
		this.time.events.remove(t4);
		this.time.events.remove(t5);
		//this.time.events.remove(t6);
		//this.time.events.remove(t7);
		//this.time.events.remove(t8);
		//this.time.events.remove(t9);
		//this.time.events.remove(t10);
		//this.time.events.remove(t11);
		this.time.events.remove(t12);
		//this.time.events.remove(t13);
		//this.time.events.remove(t14);
		//this.time.events.remove(t15);
		//this.time.events.remove(t16);
		this.time.events.remove(t17);
		//this.time.events.remove(t18);
		this.time.events.remove(t19);
		this.time.events.remove(t20);
		this.time.events.remove(t21);
		this.time.events.remove(t22);
		this.time.events.remove(t23);
		//this.time.events.remove(t24);
		bgm.stop();
		health = 192;
		intox = 0;
		money = 0;
		this.game.state.start('levelOne', health, intox, money);

	},

	win: function() {
		var txt = this.add.text(125, -100, "All your Crimea are belong to us!", {font: "32pt Impact", fill: "#fff", stroke: "#000", strokeThickness: "2"});
		var tween = this.add.tween(txt).to({y: 300}, 1500, Phaser.Easing.None, true)
		.to({y: 300}, 2000, Phaser.Easing.None, true)
		.to({y: 700}, 2000, Phaser.Easing.None, true)
		.start();
		t24 = this.time.events.add(Phaser.Timer.SECOND * 5.75, this.showCredits, this);
	},

	showCredits: function() {
		this.add.tween(background).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(roundNum).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(vs).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(bearPre).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(putinPre).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(bear).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(putin).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(timeText).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(bearName).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(putinName).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(bearHPBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(putinHPBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(bearIcon).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		this.add.tween(putinIcon).to({alpha: 0}, 1000, Phaser.Easing.Linear.in, true);
		var credits = 
		"OH MY GOD BEAR IS DRIVING\n\n"+
		"      Bearly Games       \n\n"+
		"Project Director\nBrad Anderson\n\n"+
		"Executive Producer\nBrad Anderson\n\n"+
		"Lead Designer\nBrad Anderson\n\n"+
		"Designers\nKevin Dec\nBrad Segobiano\nDaniel Sauerbier\n\n"+
		"Lead Programmer\nBrad Anderson\n\n"+
		"Programming\nKevin Dec\nBrad Segobiano\n    Daniel Sauerbier\n\n"+
		"Art\nBrad Anderson\nKevin Dec\nBrad Segobiano\nDaniel Sauerbier\n\n"+
		"Sound Director\nBrad Anderson\n\n"+
		"Additional Sounds\nKevin Dec\nBrad Segobiano\nDaniel Sauerbier\n\n"+
		"Music Director\nBrad Anderson\n\n"+
		"Music\nYoutube\nInternet\n\n"+
		"Lead Tester\nBrad Anderson\n\n"+
		"Testers\nKevin Dec\nBrad Segobiano\nDaniel Sauerbier\nYotam Gingold\n\n"+
		"Quality Assurance\nBrad Anderson\nKevin Dec\nBrad Segobiano\nDaniel Sauerbier\n\n"+
		"Catering\nKevin Dec\n\n"+
		"No bears were harmed in the making of this game."
		var creditsTxt = this.add.text(150, 800, credits, {font: "16pt Arial", fill: "#fff", align: "center"});
		this.add.tween(creditsTxt).to({y: -9999}, Phaser.Timer.SECOND * 150, Phaser.Easing.None, true);
	}
};