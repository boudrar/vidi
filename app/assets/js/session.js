var App = window.App || new Backbone.Marionette.Application();

App.socket = io();

if(localStorage.getItem('user')!=null){
  App.User = JSON.parse(localStorage.getItem('user'));
  App.Log = true;
  App.socket.emit('userknown',App.User._id);
}else{
	App.Log = false;
	App.socket.emit('userunknown');
}