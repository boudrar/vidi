

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

	_.delay(function(){ $('body').addClass('ready'); },1500);
	_.delay(function(){ $('.loader').remove(); },2000);

	this.addRegions({
		AppRegion: '#App'
	});

	$('.menu_home').addClass('on');
	this.loadRegion(this.Home);
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

