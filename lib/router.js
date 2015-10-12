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

  // Rota primária
  this.route('index', {
    path: '/',

  });

  // Autenticação
  this.route('authentication', {
    path: '/login',
    /*waitOn: function() {
      Meteor.remote.subscribe('user');
      Meteor.subscribe('users');
    },*/
    fastRender: true
  });

  // Lista de Programas
  this.route('television', {
    path: '/rede-meionorte',
    fastRender: true
  });

  // Programação da TV
  this.route('programation', {path: '/rede-meionorte/programacao'});

  // Timeline
  this.route('tabs.timelineRadio', {
    path: '/:_id/timeline',
    layoutTemplate: 'radio',
    fastRender: true
  });
  this.route('tabs.pollsRadio', {
    path: '/:_id/enquete',
    layoutTemplate: 'radio',
    fastRender: true
  });

  // Timeline
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

  // Portal
  this.route('tabs.indexPortal', {
    path: '/portal-meionorte/home',
    layoutTemplate: 'portal'
  });

  this.route('tabs.blogsPortal', {
    path: '/portal-meionorte/blogs',
    layoutTemplate: 'portal'
  });


  // Jornal
  this.route('tabs.indexNewspaper', {
    path: '/jornal-meionorte/capa',
    layoutTemplate: 'newspaper'
  });

  this.route('tabs.sectionNewspaper', {
    path: '/jornal-meionorte/secao',
    layoutTemplate: 'newspaper'
  });

});

Meteor.startup(function () {

  if (Meteor.isClient) {

    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
      }, false);
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
