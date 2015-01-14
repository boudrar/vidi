var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Home = Marionette.ItemView.extend({
  
  tagName: 'div',

  className: 'home app-view',

  template: '#home-tpl',

  ui: {
    home_video_container:'.home-video-container',
  	home_video_thumb:'.home-video-thumb'
  },

  events: {
    'click @ui.home_video_thumb':'openVideo'
  },

  initiliaze: function(){
    //this.listenTo(this.model,'click',this.openVideo);
  },

  onRender: function() {
  	this.collection=App.VideoCollections;
  	console.log('Home.onRender()',this.collection);
    var self = this;
    setTimeout(function(){
      self.refreshVideoCollections();
    });
  },

  updateVideos: function(){
  	this.collection=App.VideoCollections;
  	if(App.hash=='home')this.render();
  },
  
  addVideo: function(){
    var self = this,
        video = self.collection.last();
    console.log('Home.addVideo()',video);
    self.$el
      .prepend('<div class="home-video-thumb new" data-id="'+video.id+'"><h4 class="home-video-thumb-title">'+video.attributes.title+'</h4></div>');
      setTimeout(function(){
        self.$el.children().first().addClass('on').removeClass('new');
      },250);    
  },

  refreshVideoCollections: function(){
    _.each(this.ui.home_video_thumb,function(video){
      var $video = $(video),
          delta = $video.position().top + $video.position().left;

      setTimeout(function(){
        $video.addClass('on');
      },delta*0.5);
    });
  },

  openVideo: function(e){
    e.preventDefault();
    var $video = $(e.currentTarget),
        videoId = $video.data('id'),
        videoModel = this.collection.get(videoId);

    App.Video = new App.Views.Video({ model: videoModel });
    App.loadMenuRegion(App.Video);

    console.log(videoModel);
  }


});
App.Home = new App.Views.Home();