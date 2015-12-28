Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  trackPageView: true,
  onBeforeAction: function(){
    IonLoading.show({
      customTemplate: '<i class="spinner spinner-spiral loading"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></i>'
    });

    Meteor.verifyLogin();
    IonNavigation.skipTransitions = true;

    // verifica se a plataforma do login do facebook esta setado para o android ou IOS
    alert(cordova.platformId);
    if(cordova.platformId !== 'browser'){
      IonLoading.hide();
    }else{
      Router.go('index');
    }

    this.next();
  },
  waitOn: function (){
    Meteor.remote.subscribe('program');
    Meteor.remote.subscribe('category');
    Meteor.remote.subscribe('content');
    Meteor.remote.subscribe('answer');
    Meteor.remote.subscribe('poll');
    Meteor.remote.subscribe('polluser');
    Meteor.remote.subscribe('vehicle');
    Meteor.remote.subscribe('user');
    Meteor.remote.subscribe('city');
    Meteor.subscribe('users');
  }
});

Router.map(function() {

  // Autenticação
  this.route('authentication', {
    path: '/',
    onBeforeAction: function () {
      IonModal.close();
      document.querySelector('body').classList.add('authentication-page');
      this.next();
    }
  });

  // Raiz ################################### Rota primária
  this.route('index', {
    path: '/home',
    onBeforeAction: function () {
      document.querySelector('body').classList.add('home-page');
      document.querySelector('body').classList.remove('modal-open');
      document.querySelector('body').classList.remove('new-password');
      this.next();
    }
  });


  // Programação da TV
  this.route('notify', {
    path: '/notificacoes',
    onBeforeAction: function () {
    document.querySelector('body').classList.add('notify-page');
      this.next();
    }
  });

  // TV ################################ Lista de Programas
  this.route('television', {
    path: '/rede-meionorte',
    //fastRender: true,
    onBeforeAction: function () {
      document.querySelector('body').classList.add('television-page');
      this.next();
    }
  });

    // Programação da TV
    this.route('programation', {
      path: '/rede-meionorte/programacao',
      onBeforeAction: function () {
      document.querySelector('body').classList.add('television-page');
        this.next();
      }
    });

    // Timeline Tv
    this.route('tabs.timelineTelevision', {
      path: '/rede-meionorte/:_id/timeline',
      layoutTemplate: 'program',
      //fastRender: true
    });
    this.route('tabs.pollsTelevision', {
      path: '/rede-meionorte/:_id/enquete',
      layoutTemplate: 'program',
      //fastRender: true
    });

  // Rádios ################################# Timeline Radio
  this.route('tabs.timelineRadio', {
    path: '/radio/:_id/:name/timeline',
    layoutTemplate: 'radio',
    //fastRender: true,
    onBeforeAction: function () {
      document.querySelector('body').classList.add('radio-page');
      this.next();
    }
  });
  this.route('tabs.pollsRadio', {
    path: '/radio/:_id/:name/enquete',
    layoutTemplate: 'radio',
    //fastRender: true,
    onBeforeAction: function () {
      document.querySelector('body').classList.add('radio-page');
      this.next();
    }
  });

  // PORTAL ################################ Home do Portal
  this.route('indexPortal', {
    path: '/portal-meionorte'
  });

  this.route('indexNewspaper', {
    path: '/jornal-meionorte'
  });

  // this.route('tabs.blogsPortal', {
  //   path: '/portal-meionorte/blogs',
  //   layoutTemplate: 'portal'
  // });

  // this.route('tabs.cityPortal', {
  //   path: '/portal-meionorte/cidades',
  //   layoutTemplate: 'portal'
  // });

  // this.route('tabs.latestPortal', {
  //   path: '/portal-meionorte/ultimas',
  //   layoutTemplate: 'portal'
  // });

  // this.route('tabs.sectionPortal', {
  //   path: '/portal-meionorte/editoria',
  //   layoutTemplate: 'portal'
  // });

  // this.route('tabs.videosPortal', {
  //   path: '/portal-meionorte/videos',
  //   layoutTemplate: 'portal'
  // });

  // this.route('tabs.photosPortal', {
  //   path: '/portal-meionorte/fotos',
  //   layoutTemplate: 'portal'
  // });

  // this.route('tabs.searchPortal', {
  //   path: '/portal-meionorte/busca',
  //   layoutTemplate: 'portal'
  // });


  // Jornal #################################### Capa Jornal
  // this.route('tabs.indexNewspaper', {
  //   path: '/jornal-meionorte/capa',
  //   layoutTemplate: 'newspaper'
  // });

  // this.route('tabs.sectionNewspaper', {
  //   path: '/jornal-meionorte/secao',
  //   layoutTemplate: 'newspaper'
  // });

  // this.route('tabs.columnsNewspaper', {
  //   path: '/jornal-meionorte/colunas',
  //   layoutTemplate: 'newspaper'
  // });

  // // Programação da TV
  // this.route('columnNewspaper', {path: '/jornal-meionorte/colunas/coluna'});

  // this.route('tabs.latestNewspaper', {
  //   path: '/jornal-meionorte/ultimas',
  //   layoutTemplate: 'newspaper'
  // });

  // this.route('tabs.searchNewspaper', {
  //   path: '/jornal-meionorte/busca',
  //   layoutTemplate: 'newspaper'
  // });

  // this.route('tabs.specialsNewspaper', {
  //   path: '/jornal-meionorte/especiais',
  //   layoutTemplate: 'newspaper'
  // });

  // this.route('tabs.photosNewspaper', {
  //   path: '/jornal-meionorte/fotos',
  //   layoutTemplate: 'newspaper'
  // });

  // this.route('tabs.videosNewspaper', {
  //   path: '/jornal-meionorte/videos',
  //   layoutTemplate: 'newspaper'
  // });

});

Meteor.startup(function () {

  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }

});
