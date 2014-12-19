var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Profil = Marionette.LayoutView.extend({
  
  tagName: 'div',

  className: 'profil app-view',

  template: '#profil-tpl',

  ui: {
    menu_home: '.menu_home'
  },

  events: {
    'click @ui.menu_home':'openHome'
  }

});