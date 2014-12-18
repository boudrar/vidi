var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Home = Marionette.LayoutView.extend({
  
  tagName: 'div',

  className: 'home',

  template: '#home-tpl',

  ui: {
  	home_video_thumb:'.home-video-thumb'
  },

  events: {

  },

  onRender: function() {
  	if(App.VideoCollections!=undefined){
  		this.collection=App.VideoCollections;
  	}
  	console.log('Home render',this.collection);

  	_.each(this.ui.home_video_thumb,function(video){
  		var $video = $(video);
  		var delta = $video.position().top + $video.position().left;
  		setTimeout(function(){
  			$video.addClass('on');
  		},delta*0.5);
  	});
  },

  update: function(){
  	this.collection=App.VideoCollections;
  	this.render();
  }


});
App.Home = new App.Views.Home();