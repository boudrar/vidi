var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Navigation = Marionette.ItemView.extend({
  
  el: '.navigation',


  ui: {
    navigation: '.navigation',
    navigation_profil: '.navigation-profil',
    navigation_profil_username:'.navigation-profil-username',

    menu_home: '.menu_home',
    menu_profil: '.menu_profil',
    menu_gallery: '.menu_gallery',
    menu_item: '.menu_item',

    menu_color_item: '.menu_color_item'
  },

  events: {
    'click @ui.menu_home':'openHomeLink',
    'click @ui.menu_profil':'openProfilLink',
    'click @ui.menu_gallery':'openGalleryLink',

    'click @ui.menu_color_item':'clickMenuColor'
  },

  initialize: function(){
    this.updateNavigation();
  },

  updateNavigation:function(){
    switch(App.Log){
      case true:        
        $(this.ui.navigation_profil_username).text(App.User.username);  
        this.openProfil();      
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
      delete App.Home;
      App.Home = new App.Views.Home();
      App.loadMenuRegion(App.Home);
    }
  },

  openProfilLink: function(e){
    if(!$(this.ui.menu_profil).hasClass('on')){
      this.toggleMenuItem(e);
      delete App.Profil;
      App.Profil = new App.Views.Profil();
      App.loadMenuRegion(App.Profil);
    }
  },

  openGalleryLink: function(e){
    if(!$(this.ui.menu_gallery).hasClass('on')){
      this.toggleMenuItem(e);
      delete App.Gallery;
      App.Gallery = new App.Views.Gallery();
      App.loadMenuRegion(App.Gallery);
    }
  },

  toggleMenuItem: function(e){

    $(this.ui.menu_item).removeClass('on');
    $(e.currentTarget).addClass('on');

  },

  toggleNavigation: function(){
    $(this.ui.navigation).toggleClass('on');
    $('#App').toggleClass('on');
  },

  

  clickMenuColor: function(e){
    localStorage.setItem('theme',$(e.currentTarget).data('theme'));
    $('body').removeClass();
    $('body').addClass('theme-'+localStorage.getItem('theme'));
  }


});

App.Navigation = new App.Views.Navigation();