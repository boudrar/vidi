var App = window.App || new Backbone.Marionette.Application();

App.socket = io();

if(sessionStorage.getItem('user')!=null){
  App.User = JSON.parse(sessionStorage.getItem('user'));
  App.Log = true;
}else App.Log = false;