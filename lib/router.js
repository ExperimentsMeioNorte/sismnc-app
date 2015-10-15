Router.configure({
  layoutTemplate: 'layout',
  onBeforeAction: function(){
    if(!Meteor.remote.userId()){
      Router.go('authentication');
    }
    this.next();
  },
  waitOn: function() {
    Meteor.remote.subscribe('program');
    Meteor.remote.subscribe('category');
    Meteor.remote.subscribe('content');
    Meteor.remote.subscribe('answer');
    Meteor.remote.subscribe('poll');
    Meteor.remote.subscribe('polluser');
    Meteor.remote.subscribe('vehicle');
    Meteor.remote.subscribe('user');
    Meteor.subscribe('users');
  }
});

Router.map(function() {

  // Raiz ################################### Rota primária
  this.route('index', {
    path: '/',

  });

  // Autenticação
  this.route('authentication', {
    path: '/login',
    fastRender: true
  });

  // TV ################################ Lista de Programas
  this.route('television', {
    path: '/rede-meionorte',
    fastRender: true
  });

    // Programação da TV
    this.route('programation', {path: '/rede-meionorte/programacao'});

    // Timeline Tv
    this.route('tabs.timelineTelevision', {
      path: '/rede-meionorte/:_id/timeline',
      layoutTemplate: 'program',
      fastRender: true
    });
    this.route('tabs.pollsTelevision', {
      path: '/rede-meionorte/:_id/enquete',
      layoutTemplate: 'program',
      fastRender: true
    });

  // Rádios ################################# Timeline Radio
  this.route('tabs.timelineRadio', {
    path: '/radio/:_id/:name/timeline',
    layoutTemplate: 'radio',
    fastRender: true
  });
  this.route('tabs.pollsRadio', {
    path: '/radio/:_id/:name/enquete',
    layoutTemplate: 'radio',
    fastRender: true
  });

  // PORTAL ################################ Home do Portal
  this.route('tabs.indexPortal', {
    path: '/portal-meionorte/home',
    layoutTemplate: 'portal'
  });

  this.route('tabs.blogsPortal', {
    path: '/portal-meionorte/blogs',
    layoutTemplate: 'portal'
  });

  this.route('tabs.cityPortal', {
    path: '/portal-meionorte/cidades',
    layoutTemplate: 'portal'
  });

  this.route('tabs.latestPortal', {
    path: '/portal-meionorte/ultimas',
    layoutTemplate: 'portal'
  });

  this.route('tabs.sectionPortal', {
    path: '/portal-meionorte/editoria',
    layoutTemplate: 'portal'
  });

  this.route('tabs.videosPortal', {
    path: '/portal-meionorte/videos',
    layoutTemplate: 'portal'
  });

  this.route('tabs.photosPortal', {
    path: '/portal-meionorte/fotos',
    layoutTemplate: 'portal'
  });

  this.route('tabs.searchPortal', {
    path: '/portal-meionorte/busca',
    layoutTemplate: 'portal'
  });


  // Jornal #################################### Capa Jornal
  this.route('tabs.indexNewspaper', {
    path: '/jornal-meionorte/capa',
    layoutTemplate: 'newspaper'
  });

  this.route('tabs.sectionNewspaper', {
    path: '/jornal-meionorte/secao',
    layoutTemplate: 'newspaper'
  });

  this.route('tabs.columnsNewspaper', {
    path: '/jornal-meionorte/colunas',
    layoutTemplate: 'newspaper'
  });

  // Programação da TV
  this.route('columnNewspaper', {path: '/jornal-meionorte/colunas/coluna'});

  this.route('tabs.latestNewspaper', {
    path: '/jornal-meionorte/ultimas',
    layoutTemplate: 'newspaper'
  });

  this.route('tabs.searchNewspaper', {
    path: '/jornal-meionorte/busca',
    layoutTemplate: 'newspaper'
  });

  this.route('tabs.specialsNewspaper', {
    path: '/jornal-meionorte/especiais',
    layoutTemplate: 'newspaper'
  });

  this.route('tabs.photosNewspaper', {
    path: '/jornal-meionorte/fotos',
    layoutTemplate: 'newspaper'
  });

  this.route('tabs.videosNewspaper', {
    path: '/jornal-meionorte/videos',
    layoutTemplate: 'newspaper'
  });

});

Meteor.startup(function () {

  if (Meteor.isClient) {

    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
    var WebFontConfig = {
      google: { families: [ 'Roboto:400,300,500,700:latin' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();

  }

});
