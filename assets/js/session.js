var App = window.App || new Backbone.Marionette.Application();

App.socket = io();

if(sessionStorage.getItem('user')!=null){
  App.User = JSON.parse(sessionStorage.getItem('user'));
  App.Log = true;
  App.socket.emit('userknown',App.User._id);
}else App.Log = false;