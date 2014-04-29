
BasicGame.preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
	
};

BasicGame.preloader.prototype = {
	preload: function() {
		this.background = '#001f00';
		this.preloadBar = this.add.sprite(0,0, 'bearBar');
		
		this.load.setPreloadSprite(this.preloadBar);
		
		//Maps maps maps
		this.load.image('title', 'ART/title.png');
		this.load.tilemap('mapOne', 'Tiles/roadOne.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('mapTwo', 'Tiles/roadTwo.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('mapThree1', 'ART/mapTiled.json', null, Phaser.Tilemap.TILED_JSON);
		//this.load.tilemap('mapThree2', 'Tiles/mapTiledlayer2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('mapThree', 'Tiles/retry2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('canadaOne', 'Tiles/canada1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('canadaTwo', 'Tiles/canada2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('canadaThree', 'Tiles/canada3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('russiaOne', 'Tiles/russia1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('russiaTwo', 'Tiles/russia2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('russiaThree', 'Tiles/russia3.json', null, Phaser.Tilemap.TILED_JSON);
		
		this.load.image('mainroad', 'ART/mapTiled.png');
		this.load.image('houses', 'ART/houses.png');
		this.load.image('town', 'ART/town.png');
		this.load.image('invisible', 'ART/invisible.png');
		this.load.image('fence', 'fence.png');
		this.load.image('treetiles', 'ART/treetiles.png');
		this.load.image('road', 'ART/road.png');
		this.load.image('road1', 'ART/road1.png');
		this.load.image('snowcrap', 'ART/snowcrap.png');
		//this.load.image('othersnow', 'ART/Untitled-1 copy.png');
		this.load.image('kremlin', 'ART/Grand_Kremlin_Palace.png');
		this.load.image('basil', 'ART/St-Basils-1.png');
		
		//Sprites
		this.load.spritesheet('bear', 'ART/bearDrive1.png', 128, 96);
		this.load.image('car','ART/car.png');
		this.load.image('police','ART/police.png');
		
		//music
		this.load.audio('music', ['bear.mp4','bear.ogg']);
		this.load.audio('muzak', ['store/Elevator Music.mp3', 'store/Elevator_Music.ogg']);
		
		this.load.spritesheet('restart', 'ART/buttonSprite.png', 306, 120);
		this.load.spritesheet('nextButton', 'ART/nextSprite.png', 306, 120);
		this.load.spritesheet('leftButton', 'ART/leftButton.png', 128, 128);
		this.load.spritesheet('rightButton', 'ART/rightButton.png', 128,128);
		this.load.image('bar', 'bar.png');
		this.load.image('finish', 'ART/finish.png');
		
		//Music
		this.load.image('end', 'ART/win.png');
		this.load.audio('song', ['anthem.mp4', 'anthem.ogg']);
		//this.load.audio('sing', ['singing.mp4', 'singing.ogg']);
		
		this.load.spritesheet('dude', 'ART/nakedgirl.png', 25, 46);
		
		//StoreStuff
		this.load.image("store", "store/store.jpg");
		this.load.spritesheet("coffee", "store/coffee_button.png", 118, 186);
		this.load.spritesheet("beer", "store/beer_button.png", 210, 218);
		this.load.spritesheet("receipt", "store/receipt_195x199.png", 165, 199);
		
		//Sneak Game Stuff
		this.load.image('light1', 'assets/light1.png');
		this.load.spritesheet('tree', 'assets/tre.png',254,254);
		this.load.spritesheet('bearS', 'assets/bearanim.png',43,81);
		this.load.spritesheet('cop', 'assets/cop.png',182,182);
		this.load.image('snow','assets/snowbg.png');
		this.load.image('fenceS','assets/fence.png');
		this.load.audio('musicS', 'music/mgs.mp3');
		this.load.audio('musicf', 'music/mgsfull.mp3');
	},

	create: function() {
	
		this.preloadBar.cropEnabled = false;
	},
	
	update: function(){
	
		if (this.ready == false){
			this.ready = true;
			this.game.state.start('intro');
		}
	}
	
};