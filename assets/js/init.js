

App.on('start', function(){
	App.initialize();	
});

App.initialize = function(){
	console.log('app init');

	var nbTemplates = document.querySelectorAll('[type="text/x-template"]').length;
  	var templatesLoad = 0;

  _.each(document.querySelectorAll('[type="text/x-template"]'), function (el) {
    $.get(el.src, function (res) {
      el.innerHTML = res;
      templatesLoad++;
      if(nbTemplates === templatesLoad){

        App.ready();
      }
    });
  });
}

App.ready = function(){
	console.log('app ready');

	this.addRegions({
		AppRegion: '#App',
		HeaderRegion:'#Header',
		NavigationRegion:'#Navigation'
	});

	this.HeaderRegion.show(this.Header, { preventDestroy: true });
	this.NavigationRegion.show(this.Navigation, { preventDestroy: true });
}

App.socket.on('get-user-videos',function(videos){
	console.log('SOCKET get-user-videos receive');
	App.CreateVideosCollection(videos);
	App.updateHistory();
	_.delay(function(){ $('body').addClass('ready'); },1500);
	_.delay(function(){ $('.loader').remove(); },2000);
});
App.CreateVideosCollection = function(videos){
	App.VideoCollections = new App.Collections.Videos(videos);
	if(!App.Home.isDestroyed)App.Home.updateVideos();
}



App.loadRegion = function(view){
	App.AppRegion.empty();
	App.AppRegion.show(view, { preventDestroy: true });
}

App.loadMenuRegion = function(view){

	App.AppRegion.$el.addClass('off');
	_.delay(function(){
		App.AppRegion.empty();
		App.AppRegion.show(view, { preventDestroy: true });		
		App.AppRegion.$el.removeClass('off');
	},500);
}



App.start();

