Router.configure({
  layoutTemplate: 'layout',
  onBeforeAction: function(){
    //validacoes de userId
    if((!Meteor.userId
      && !localStorage.getItem('Meteor.emailId')
      && !localStorage.getItem('Meteor.facebookId')
      && !localStorage.getItem('Meteor.googleId'))
      || (localStorage.getItem('Meteor.facebookId') && localStorage.getItem('Meteor.googleId'))){

      if(localStorage.getItem('Meteor.facebookId') && localStorage.getItem('Meteor.googleId')){
        console.log('Êêpa.. Tentado se logar em duas contas?');
      }

      localStorage.clear();
      Router.go('authentication');
    }else if(localStorage.getItem('Meteor.userServerId') !== Meteor.userId){
      Meteor.subscribe('users');
      var userId = User.findOne(
        {
          email: localStorage.getItem('Meteor.emailId'),

            $or: [
              {facebook_id: localStorage.getItem('Meteor.facebookId')},
              {google_id: localStorage.getItem('Meteor.googleId')}
            ]

        }
      );

      if(userId !== undefined){
        localStorage.setItem('Meteor.userId', userId._id);
      }
    }

    IonLoading.show({
      duration: 1000,
      customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>'
    });
    IonNavigation.skipTransitions = true;
    this.next();
  },
  onAfterAction: function () {
    IonLoading.hide();
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
  }
});

Router.map(function() {

  // Raiz ################################### Rota primária
  this.route('index', {
    path: '/',
    onBeforeAction: function () {
      document.querySelector('body').classList.add('home-page');
      this.next();
    }
  });

  // Autenticação
  this.route('authentication', {
    path: '/login',
    fastRender: true,
    waitOn: function() {
      Meteor.subscribe('users');
    },
    onBeforeAction: function () {
      document.querySelector('body').classList.add('authentication-page');
      this.next();
    }
  });

  // TV ################################ Lista de Programas
  this.route('television', {
    path: '/rede-meionorte',
    fastRender: true,
    onBeforeAction: function () {
      document.querySelector('body').classList.add('television-page');
      this.next();
    }
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
    fastRender: true,
    onBeforeAction: function () {
      document.querySelector('body').classList.add('radio-page');
      this.next();
    }
  });
  this.route('tabs.pollsRadio', {
    path: '/radio/:_id/:name/enquete',
    layoutTemplate: 'radio',
    fastRender: true,
    onBeforeAction: function () {
      document.querySelector('body').classList.add('radio-page');
      this.next();
    }
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

    FastClick.attach(document.body);

    // var WebFontConfig = {
    //   google: { families: [ 'Roboto:400,300,500,700:latin' ] }
    // };
    // (function() {
    //   var wf = document.createElement('script');
    //   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    //   '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    //   wf.type = 'text/javascript';
    //   wf.async = 'true';
    //   var s = document.getElementsByTagName('script')[0];
    //   s.parentNode.insertBefore(wf, s);
    // })();

  }

});
