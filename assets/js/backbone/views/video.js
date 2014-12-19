var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Video = Marionette.ItemView.extend({
  
  tagName: 'div',

  className: 'video app-view',

  template: '#video-tpl',

  ui: {
    video_player:'#video-player'
  },

  events: {
  },

  templateHelpers: function () {
    return {
      video: this.model
    };
  },

  initialize: function() {
    console.log('video init',this.model);
    this.render();
  },

  onRender: function(){
    var self = this;
    setTimeout(function(){
      var video = $(self.ui.video_player)[0];
      video.play();
    },500);
    location.hash='v'+this.model.id;
  }


});