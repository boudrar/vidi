

var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Navigation = Marionette.ItemView.extend({
  
  tagName: 'nav',

  className: 'navigation',

  template: '#navigation-tpl',


  ui: {
    navigation_profil: '.navigation-profil',
    navigation_profil_username:'.navigation-profil-username',
    navigation_profil_video_liked:'.navigation-profil-video-liked',
    navigation_profil_video_shared:'.navigation-profil-video-shared',
    navigation_profil_video_comments:'.navigation-profil-video-comments',

    menu_home: '.menu_home',
    menu_profil: '.menu_profil',
    menu_gallery: '.menu_gallery',
    menu_item: '.menu_item'
  },

  events: {
    'click @ui.menu_home':'openHomeLink',
    'click @ui.menu_profil':'openProfilLink',
    'click @ui.menu_gallery':'openGalleryLink'
  },


  onRender: function(){
    this.updateNavigation();
  },

  updateNavigation:function(){
    switch(App.Log){
      case true:        
        $(this.ui.navigation_profil_username).text(App.User.username);  
        $(this.ui.navigation_profil_video_liked).text(App.User.video.liked);  
        $(this.ui.navigation_profil_video_shared).text(App.User.video.shared);  
        $(this.ui.navigation_profil_video_comments).text(App.User.video.comments);  
        this.openProfil();  
        var self = this;
        //_.delay(function(){ self.openNavigation(); },500);  
        break;
      case false:
        this.closeProfil();
        break;
    }
  }, 

  closeProfil: function(){
    $(this.ui.navigation_profil).removeClass('on');
  },

  openProfil: function(){
    $(this.ui.navigation_profil).addClass('on');
  },

  openHomeLink: function(e){
    if(!$(this.ui.menu_home).hasClass('on')){
      this.toggleMenuItem(e);
      location.hash='home';
      this.updateAppRegion(location.hash);
    }
  },

  openProfilLink: function(e){
    if(!$(this.ui.menu_profil).hasClass('on')){
      this.toggleMenuItem(e);
      location.hash='profil';
      this.updateAppRegion(location.hash);
    }
  },

  openGalleryLink: function(e){
    if(!$(this.ui.menu_gallery).hasClass('on')){
      this.toggleMenuItem(e);
      location.hash='gallery';
      //this.updateAppRegion(location.hash);
    }
  },

  toggleMenuItem: function(e){
    $(this.ui.menu_item).removeClass('on');
    $(e.currentTarget).addClass('on');
  },
  
  updateAppRegion: function(region){
    if(region=='')region='home';
    switch(region){
      case 'home':
        delete App.Home;
        App.Home = new App.Views.Home({ collection:App.VideoCollections });
        App.loadMenuRegion(App.Home);
        break;
      case 'profil':
        delete App.Profil;
        App.Profil = new App.Views.Profil();
        App.loadMenuRegion(App.Profil);
        break;
      case 'gallery':
        delete App.Gallery;
        App.Gallery = new App.Views.Gallery();
        App.loadMenuRegion(App.Gallery);
        break;
    }
    $(this.ui.menu_item).removeClass('on');
    $('.menu_'+region).addClass('on');

  },

  toggleNavigation: function(){
    this.$el.toggleClass('on');
    App.AppRegion.$el.toggleClass('on');
  },

  closeNavigation: function(){
    this.$el.removeClass('on');
    App.AppRegion.$el.removeClass('on');
  },

  openNavigation: function(){
    this.$el.addClass('on');
    App.AppRegion.$el.addClass('on');
  }


});

App.Navigation = new App.Views.Navigation();

