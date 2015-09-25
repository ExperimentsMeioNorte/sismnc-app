// Rota Principal
Router.route('/home', function () {

  this.layout('ApplicationLayout');

  this.render('home');
  this.render('header', {to: 'header'});
  this.render('navigation', {to: 'navigation'});

}, {
  name: 'home'
});


// Ao Entrar
Template.home.onRendered(function(){

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
Template.home.onDestroyed(function(){

  $('#modal-about, #modal-edit-profile, #modal-error-report').closeModal();

});
