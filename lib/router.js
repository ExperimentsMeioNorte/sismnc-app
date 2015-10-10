Router.configure({
  layoutTemplate: 'layout',
   onBeforeAction: function(){
      if(!Meteor.remote.userId()){
        Router.go('authentication');
      }
      this.next();
   }
});

Router.map(function() {

  // Rota primária
  this.route('index', {
    path: '/'
  });

  // Autenticação
  this.route('authentication', {
    path: '/login',
    waitOn: function() {
      Meteor.remote.subscribe('user');
      Meteor.subscribe('users');
    },
    fastRender: true
  });

  // Lista de Programas
  this.route('television', {
    path: '/rede-meionorte',
    waitOn: function() {
      Meteor.remote.subscribe('program');
      Meteor.remote.subscribe('category');
      Meteor.remote.subscribe('content');
      Meteor.remote.subscribe('user');
      Meteor.remote.subscribe('answer');
      Meteor.remote.subscribe('poll');
      Meteor.remote.subscribe('polluser');
    },
    fastRender: true
  });

  // Programação da TV
  this.route('programation', {path: '/rede-meionorte/programacao'});

  // Timeline do programa
  this.route('tabs.timeline', {
    path: '/rede-meionorte/:_id/timeline',
    layoutTemplate: 'tabsInteraction',
    waitOn: function() {
      Meteor.remote.subscribe('program'),
      Meteor.remote.subscribe('category'),
      Meteor.remote.subscribe('content'),
      Meteor.remote.subscribe('user'),
      Meteor.remote.subscribe('answer'),
      Meteor.remote.subscribe('poll'),
      Meteor.remote.subscribe('polluser');
    },
    fastRender: true
  });
  this.route('tabs.polls', {
    path: '/rede-meionorte/:_id/enquete',
    layoutTemplate: 'tabsInteraction',
    waitOn: function() {
      Meteor.remote.subscribe('program'),
      Meteor.remote.subscribe('category'),
      Meteor.remote.subscribe('content'),
      Meteor.remote.subscribe('user'),
      Meteor.remote.subscribe('answer'),
      Meteor.remote.subscribe('poll'),
      Meteor.remote.subscribe('polluser');
    },
    fastRender: true
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
