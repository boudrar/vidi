var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Header = Marionette.ItemView.extend({
  
  tagName: 'div',

  className: 'header',

  template: '#header-tpl',


  ui: {
    //FORMS
    header_form_containers: '.header-form-container',

    header_navigation_button: '.header-navigation-button',

    //LOGIN FORM
    header_form_login_toggle: '.header-form-login-toggle',

    header_form_login_container: '.header-form-login-container',
    header_form_login: '.header-form-login',
    header_form_name: '.header-form-name-input',
    header_form_password: '.header-form-password-input',
    header_form_create_user:'.header-form-create-user',    

    header_form_alert:'.header-form-alert',

    //LOGOUT FORM
    header_form_logout_toggle:'.header-form-logout-toggle',

    header_form_logout_container:'.header-form-logout-container',
    header_form_logout_confirm : '.header-form-logout-confirm',
    header_form_logout_hide :'.header-form-logout-hide',

    //UPLOAD FORM
    header_form_upload_toggle:'.header-form-upload-toggle',
    header_form_upload_container:'.header-form-upload-container',
    header_form_upload:'.header-form-upload',
    header_form_upload_input:'.header-form-upload-input',
    header_form_upload_progress:'.header-form-upload-progress'
  },

  events: {
    
    'click @ui.header_navigation_button':'toggleNavigation',
    
    //LOGIN FORM
    'click @ui.header_form_login_toggle':'toggleLogForm',

    'submit @ui.header_form_login':'loginForm',
    'click @ui.header_form_create_user':'signForm',

    
    //LOGOUT FORM
    'click @ui.header_form_logout_toggle':'toggleLogOut',
    'click @ui.header_form_logout_confirm':'logOut',
    'click @ui.header_form_logout_hide':'closeForms',

    //VIDEO FORM
    'click @ui.header_form_upload_toggle':'toggleUpload',
    'submit @ui.header_form_upload':'upload'

  },

  onRender: function(){    
    var self = this; 
    _.delay(function(){ 
      self.showHeader(); 
      _.delay(function(){ self.updateHeader(); },500);
    },500);
  },

  showHeader: function(){    
    this.$el.addClass('on');  
  },

  updateHeader: function(){
    switch(App.Log){
      case true:
        $(this.ui.header_form_login_toggle).removeClass('on');
        $(this.ui.header_form_logout_toggle).addClass('on');
        $(this.ui.header_form_upload_toggle).addClass('on');
        break;
      case false:
        $(this.ui.header_form_login_toggle).addClass('on');
        $(this.ui.header_form_logout_toggle).removeClass('on');
        $(this.ui.header_form_upload_toggle).removeClass('on');
        break;
    }
    
  },


  toggleNavigation: function(){
    $(this.ui.header_navigation_button).toggleClass('on');
    App.Navigation.toggleNavigation();
  },
  
  toggleLogForm:function(){
    this.closeUpload();
    $(this.ui.header_form_login_container).toggleClass('on');
  },

  loginForm: function(e){
    e.preventDefault();

    var user = {
      username:$(this.ui.header_form_name).val(),
      password:$(this.ui.header_form_password).val()
    }

    App.socket.emit('login',user);
    console.log('socket emit login');

  },
  
  signForm:function(){

    var user = {
      username:$(this.ui.header_form_name).val(),
      password:$(this.ui.header_form_password).val()
    }
    console.log(user);
    App.socket.emit('signup',user);
    console.log('socket emit signup');
  },

  formAlert: function(alert,type,user){
    var alertBox = $(this.ui.header_form_alert);

    alertBox.addClass('on '+type).text(alert);
    _.delay(function(){ alertBox.removeClass('on '+type); },5000);

    if(type=='success'){
      App.UserConnected(user);
      _.delay(function(){ App.Header.toggleLogForm(); },1000);
      
    }
  },

  toggleLogOut: function(e){
    e.preventDefault();
    this.closeUpload();
    $(this.ui.header_form_logout_container).toggleClass('on');
  },
  closeLogOut :function(){
    $(this.ui.header_form_logout_container).removeClass('on');
  },

  logOut: function(e){
    e.preventDefault();

    this.toggleLogOut(e);
    App.UserDisconnect();
    this.updateHeader();
  },

  toggleUpload: function(){
    this.closeLogOut();
    $(this.ui.header_form_upload_container).toggleClass('on');
  },
  closeUpload:function(){
    $(this.ui.header_form_upload_container).removeClass('on');
  },

  upload:function(e){
    e.preventDefault();

    var formData = new FormData();
    var video = $(this.ui.header_form_upload_input).prop('files')[0];
    video.socket = App.socket;
    formData.append('video',video,video.name);

    console.log(formData);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/post', true);
    xhr.send(formData);



    /*$.ajax({
      type: "POST",
      url: '/post',
      data: video,
      cache: false,
      processData: false,
      contentType: false,
      success: function(){
        console.log('success')
      },
      error: function(){
        console.log('fail')
      }
    });*/


  }



});

App.Header = new App.Views.Header();

App.socket.on('form-alert',function(alert,type,user){
  console.log('socket emit form-alert : ' + alert);
  App.Header.formAlert(alert,type,user);
});

App.socket.on('upload-progress',function(ratio){
  console.log('socket emit upload-progress : ' + ratio);
  $(App.Header.ui.header_form_upload_progress).width(ratio + '%')
});

App.UserConnected = function(user){
  App.User = user;
  App.Log = true;
  sessionStorage.setItem('user',JSON.stringify(App.User));
  App.UpdateInterface();
  App.Navigation.openNavigation();
}

App.UserDisconnect = function(){
  App.Log = false;
  delete App.User;
  sessionStorage.clear();
  App.UpdateInterface();
  App.Navigation.closeNavigation();
}

App.UpdateInterface = function(){ 
  App.Header.updateHeader();
  App.Navigation.updateNavigation(App.User);
}