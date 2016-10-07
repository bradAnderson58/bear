// loading in the preloaderbar
(function() {
BasicGame = {};

BasicGame.boot = function (game){

};

BasicGame.boot.prototype = {
	preload: function() {
	
		this.load.image('bearBar', 'assets/images/bearDrive.png');

	},

	create: function(){

		this.game.input.maxPointers = 1;
		this.game.stage.disableVisibilityChange = true;
		console.log("got to boot");
		this.game.state.start('preloader');
		
	}
};
	
}());