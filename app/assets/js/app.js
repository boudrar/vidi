App.socket.on('console',function(msg){
	console.log(msg);
});





$(window).on('hashchange',function(){
	App.updateHistory();
});
App.updateHistory = function(){
	App.hash = location.hash.slice(1);
	App.Navigation.updateAppRegion(App.hash);
	console.log('hash change',App.hash);
}

