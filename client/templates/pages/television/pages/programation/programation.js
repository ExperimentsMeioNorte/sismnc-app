// Rota Rede Meio Norte
Router.route('/rede-meionorte/programacao', function(){

  this.layout('ApplicationLayout');
  this.render('programation');

  fastRender: true

}, {
  name: 'programation'
});

// Ao Entrar
Template.programation.onRendered(function(){

   $('ul.tabs').tabs();

   $('.tabs-items').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false
  });


});

// Ao Sair
Template.programation.onDestroyed(function(){

  // $('#modal-about, #modal-edit-profile, #modal-error-report').closeModal();

});