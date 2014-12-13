var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Home = Marionette.LayoutView.extend({
  
  tagName: 'div',

  className: 'home',

  template: '#home-tpl',

  ui: {
    menu_profil: '.menu_profil'
  },

  events: {
    'click @ui.menu_profil':'openProfil'
  }


});

App.Home = new App.Views.Home();