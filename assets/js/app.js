App.socket.on('console',function(msg){
	console.log(msg);
});

App.socket.on('get-user-videos',function(videos){
	App.VideoCollections = new App.Collections.Videos(videos);
	if(!App.Home.isDestroyed)App.Home.update();
})