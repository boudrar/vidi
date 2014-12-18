App.Models = {};
App.Models.Video = Backbone.Model.extend({

	defaults: {
		type: 'HTML',
		name:'video'
	},

	initialize:function(){
		console.log('Models.Videos init');
	}
})