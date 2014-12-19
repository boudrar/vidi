App.Models = {};
App.Models.Video = Backbone.Model.extend({

	idAttribute:"_id",
	
	defaults: {
		type: 'HTML',
		name:'video'
	},

	initialize:function(){
		console.log('Models.Videos init');
	},

})