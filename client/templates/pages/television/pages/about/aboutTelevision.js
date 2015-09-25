// Rota Rede Meio Norte
Router.route('/rede-meionorte/sobre', function(){

  this.layout('ApplicationLayout');
  this.render('aboutTelevision');

  fastRender: true

}, {
  name: 'aboutTelevision'
});

// Ao Entrar
Template.aboutTelevision.onRendered(function(){

   $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true
    }
  );

  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity:1,
    in_duration: 300,
    out_duration: 200,
    ready: function() {

    },
    complete: function() {

    }
  });
});

// Ao Sair
Template.aboutTelevision.onDestroyed(function(){

  // $('#modal-about, #modal-edit-profile, #modal-error-report').closeModal();

});