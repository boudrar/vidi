App.Collections = {};
App.Collections.Videos = Backbone.Collection.extend({
 
	model: App.Models.Video,

	initialize:function(){
		console.log('Collections.Videos init');
	}

});