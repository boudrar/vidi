var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Header = Marionette.ItemView.extend({
  
  el: '.header',


  ui: {

    header_navigation_button: '.header-navigation-button',

    header_form_container: '.header-form-container',
    header_form: '.header-form',
    header_form_name: '.header-form-name-input',
    header_form_password: '.header-form-password-input',

    header_form_create_user:'.header-form-create-user',

    header_form_toggle: '.header-form-toggle',

    header_form_alert:'.header-form-alert',

    header_disconnect:'.header-disconnect'

  },

  events: {
    
    'click @ui.header_navigation_button':'toggleNavigation',
    
    'submit @ui.header_form':'loginForm',
    'click @ui.header_form_create_user':'signForm',

    'click @ui.header_form_toggle':'toggleForm',

    'click @ui.header_disconnect':'logOut'

  },

  initialize: function(){    
    var self = this; 
    _.delay(function(){ 
      self.showHeader(); 
      _.delay(function(){ self.updateHeader(); },500);
    },500);
  },

  showHeader: function(){
    $(this.el).addClass('on');  
  },

  updateHeader: function(){
    switch(App.Log){
      case true:
        $(this.ui.header_form_toggle).removeClass('on');
        $(this.ui.header_disconnect).addClass('on');

        break;
      case false:
        $(this.ui.header_form_toggle).addClass('on');
        $(this.ui.header_disconnect).removeClass('on');
        break;
    }
    
  },

  toggleNavigation: function(){
    $(this.ui.header_navigation_button).toggleClass('on');
    App.Navigation.toggleNavigation();
  },
  
  toggleForm:function(){
    $(this.ui.header_form_container).toggleClass('on');
  },

  loginForm: function(e){
    e.preventDefault();

    var user = {
      username:$(this.ui.header_form_name).val(),
      password:$(this.ui.header_form_password).val()
    }

    App.socket.emit('login',user);

  },
  
  signForm:function(){

    var user = {
      username:$(this.ui.header_form_name).val(),
      password:$(this.ui.header_form_password).val()
    }
    console.log(user);
    App.socket.emit('signup',user);
  },

  formAlert: function(alert,type,user){
    var alertBox = $(this.ui.header_form_alert);

    alertBox.addClass('on '+type).text(alert);
    _.delay(function(){ alertBox.removeClass('on '+type); },5000);

    if(type=='success'){
      App.UserConnected(user);
      _.delay(function(){ App.Header.toggleForm(); },2000);
      
    }
  },
  logOut: function(){
    App.UserDisconnect();
    this.updateHeader();
  }



});

App.Header = new App.Views.Header();

App.socket.on('form-alert',function(alert,type,user){
  App.Header.formAlert(alert,type,user);
});
