Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  onBeforeAction: function(){
    Meteor.verifyLogin();
    IonNavigation.skipTransitions = true;
    this.next();
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

  // // Autenticação
  // this.route('index.editProfile', {
  //   path: '/editar-perfil',
  //   template: '_editProfile'
  // });

  // Autenticação
  this.route('authentication', {
    path: '/login',
    onBeforeAction: function () {
      document.querySelector('body').classList.add('authentication-page');
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
    path: '/rede-meionorte/:_idTv',
    fastRender: true,
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
