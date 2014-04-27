
BasicGame.store = function (game) {

	var background;
	var beer;
	var coffee;
	var money;
	var moneyText;
	var intox;
	var exit;
};

BasicGame.store.prototype = {
	init: function(){
		health = (health/192)*100;
		//health = health;
		intox = intox;
		money = money;
		next =next;
	},
	create: function(){
		console.log(next);
		background = this.add.sprite(0, 0, "store");
		background.scale.setTo(0.56, 0.56);
		this.camera.follow(background);
		
		music = this.add.audio('muzak');
		music.play();
	 
		moneyText = this.add.text(900, 10, "MONEY:\n $"+money+"\nBAC: "+intox + "\nHP:"+health, {font: "18pt Verdana", fill: "#fff"});
	 
		beer = this.add.button(15, 50, "beer", this.buyBeer, 0, 1, 0);
		this.add.text(250, 120, "$20- Restores health, gets bear drunk.", {font: "14pt Verdana", fill: "#ff0000", stroke: "#ffffff", strokeThickness: "5"});
	 
	 
		coffee = this.add.button(55, 300, "coffee", this.buyCoffee, 0, 1, 0);
		this.add.text(250, 390, "$100- Sobers bear up.", {font: "14pt Verdana", fill: "#ff0000", stroke: "#ffffff", strokeThickness: "5"});
		
		exit = this.add.button(850, 400, "receipt", this.checkOut, 0, 1, 0);
	},

	update: function() {
		moneyText.content =  "MONEY:\n $"+money+"\nBAC: "+intox+"\nHP: "+health;
	},
	
	buyBeer: function() {
		if (money >= 20){
			money -= 20;
			intox += 0.05;
			if (health <= 90){
				health+= 10;
			}else if (health < 100){
				health = 100;
			}
		}
	},
	checkOut: function(){
		if (next == "u2"){ this.game.state.start('levelTwo', health, intox, money);}
		else if(next == "u3"){ this.game.state.start('levelThree', health, intox, money);}
		else if (next == "can1"){this.game.state.start('levelOne', health, intox, money);}
	},

	buyCoffee: function() {
		if(money >= 100) {
			money -= 100;
			if (intox > 1){
				intox -= 1;
			}else if (intox > 0){
				intox = 0;
			}
		}
	}
};