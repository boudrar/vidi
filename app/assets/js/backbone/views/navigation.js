

var App = App || new Marionette.Application();
App.Views = App.Views || {};

App.Views.Navigation = Marionette.ItemView.extend({
  
  tagName: 'nav',

  className: 'navigation',

  template: '#navigation-tpl',


  ui: {
    navigation_profil: '.navigation-profil',
    navigation_profil_toggle:'.navigation-profil-toggle',
    navigation_profil_username:'.navigation-profil-username',
    navigation_profil_video_liked:'.navigation-profil-video-liked',
    navigation_profil_video_shared:'.navigation-profil-video-shared',
    navigation_profil_video_comments:'.navigation-profil-video-comments',
    navigation_profil_chart:'.navigation-profil-chart',

    menu_home: '.menu_home',
    menu_profil: '.menu_profil',
    menu_gallery: '.menu_gallery',
    menu_item: '.menu_item'
  },

  events: {
    'click @ui.menu_home':'openHomeLink',
    'click @ui.menu_profil':'openProfilLink',
    'click @ui.menu_gallery':'openGalleryLink',
    'click @ui.navigation_profil_toggle':'toggleProfil'
  },


  onRender: function(){
    this.updateNavigation();


    this.createChart();
  },

  updateNavigation:function(){
    switch(App.Log){
      case true:        
        this.openProfil(); 
        this.openChart();  
        break;
      case false:
        this.closeProfil();
        this.closeChart();
        break;
    }
  }, 

  closeProfil: function(){
    $(this.ui.navigation_profil).removeClass('on');
  },
  closeWideProfil: function(){
    this.$el.removeClass('wide');
    App.AppRegion.$el.removeClass('wide');
  },

  openProfil: function(){
    var ui = this.ui;
    $(ui.navigation_profil_username).text(App.User.username);  
    $(ui.navigation_profil_video_liked).text(App.User.video.liked);  
    $(ui.navigation_profil_video_shared).text(App.User.video.shared);  
    $(ui.navigation_profil_video_comments).text(App.User.video.comments); 

    $(ui.navigation_profil).addClass('on');
  },

  toggleProfil: function(){
    $(this.$el).toggleClass('wide');
    App.AppRegion.$el.toggleClass('wide');
  },

  createChart: function(){
    _.delay(function(){
      new Chartist.Line('.navigation-profil-chart', {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
          [2, 3, 2, 4, 5],
          [0, 2.5, 3, 2, 3],
          [1, 2, 2.5, 3.5, 4]
        ]
      });
    });
  },
  
  
  openChart: function(){
    $(this.ui.navigation_profil_chart).addClass('on');
  },

  closeChart: function(){
    $(this.ui.navigation_profil_chart).removeClass('on');
  },

  updateChart: function(){     

    var animateLine = function($line){
      _.delay(function(){
        var delay = 0,
            easing = "ease-in-out";//"cubic-bezier(0.680, -0.550, 0.265, 1.550)";

        $line.each(function(){          
          $(this).css({'strokeDashoffset':0,
                       'opacity':1,                     
                       'transition':'stroke-dashoffset 1.5s '+ delay +'ms ' + easing });          
          delay+=250;
        });
      });
    }

    var $line = $('.navigation-profil-chart .ct-series .ct-line'),
        $points = $('.navigation-profil-chart .ct-series');

    $line.each(function(i,j){
      var a = $(this)[0].getTotalLength();
      $(this).css({'strokeDasharray':a+" "+a,
                   'strokeDashoffset':a,
                   'opacity':0,
                   'transition':'none' }); 
      if( i==($line.length)-1 ) animateLine($line);
    });

    $points.each(function(){
      $(this).children('.ct-point').each(function(i){
        var $point = $(this),
            index= i;
        $point.css({ 'opacity':0, 'transition':'none' });
        _.delay(function(){ $point.css({ 'opacity':1, 'transition': 'opacity 1s '+(index*500)+'ms' }); })
      }); 
    });

  },

  openHomeLink: function(e){
    if(!$(this.ui.menu_home).hasClass('on')){
      this.toggleMenuItem(e);
      location.hash='home';
      this.updateAppRegion(location.hash);
    }
  },

  openProfilLink: function(e){
    if(!$(this.ui.menu_profil).hasClass('on')){
      this.toggleMenuItem(e);
      location.hash='profil';
      this.updateAppRegion(location.hash);
    }
  },

  openGalleryLink: function(e){
    if(!$(this.ui.menu_gallery).hasClass('on')){
      this.toggleMenuItem(e);
      location.hash='gallery';
      //this.updateAppRegion(location.hash);
    }
  },

  toggleMenuItem: function(e){
    $(this.ui.menu_item).removeClass('on');
    $(e.currentTarget).addClass('on');
  },
  
  updateAppRegion: function(region){
    if(region=='')region='home';
    switch(region){
      case 'home':
        delete App.Home;
        App.Home = new App.Views.Home({ collection:App.VideoCollections });
        App.loadMenuRegion(App.Home);
        break;
      case 'profil':
        delete App.Profil;
        App.Profil = new App.Views.Profil();
        App.loadMenuRegion(App.Profil);
        break;
      case 'gallery':
        delete App.Gallery;
        App.Gallery = new App.Views.Gallery();
        App.loadMenuRegion(App.Gallery);
        break;
    }
    $(this.ui.menu_item).removeClass('on');
    $('.menu_'+region).addClass('on');

  },

  toggleNavigation: function(){
    this.$el.toggleClass('on');
    App.AppRegion.$el.toggleClass('on');

    if(this.$el.hasClass('on')){
      this.updateChart();
    }else{
      this.closeWideProfil();
    }
  },

  closeNavigation: function(){
    this.$el.removeClass('on');
    App.AppRegion.$el.removeClass('on');
  },

  openNavigation: function(){
    this.$el.addClass('on');
    App.AppRegion.$el.addClass('on');
  }


});

App.Navigation = new App.Views.Navigation();

