App.UserConnected = function(user){
	App.User = user;
	App.Log = true;
	sessionStorage.setItem('user',JSON.stringify(App.User));
	App.UpdateInterface();
}

App.UserDisconnect = function(){
	App.Log = false;
	delete App.User;
	App.UpdateInterface();
}

App.UpdateInterface = function(){	
	App.Header.updateHeader();
	App.Navigation.updateNavigation(App.User);
}