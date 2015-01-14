var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Gallery = Marionette.LayoutView.extend({
  
  tagName: 'div',

  className: 'gallery app-view',

  template: '#gallery-tpl',

  ui: {
    gallery_item: '.gallery_item'
  },

  events: {
    'click @ui.menu_profil':'openProfil'
  },

  onRender: function(){
	var self = this;
	_.delay(function(){
		self.galleryHeight();
	});
  },

  galleryHeight: function(){
  	_.each(this.ui.gallery_item,function(item){
  		$(item).height(item.clientWidth);
      console.log(item.clientWidth)
  	});
  }

});