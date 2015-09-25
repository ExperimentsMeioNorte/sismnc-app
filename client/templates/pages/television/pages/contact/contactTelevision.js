// Rota Rede Meio Norte
Router.route('/rede-meionorte/fale-conosco', function(){

  this.layout('ApplicationLayout');
  this.render('contactTelevision');

  fastRender: true

}, {
  name: 'contactTelevision'
});

// Ao Entrar
Template.contactTelevision.onRendered(function(){

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
Template.contactTelevision.onDestroyed(function(){

  // $('#modal-about, #modal-edit-profile, #modal-error-report').closeModal();

});