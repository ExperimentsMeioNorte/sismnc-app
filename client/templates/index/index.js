// Rota
Router.map(function() {

});

// Ao Entrar
Template.index.rendered = function(){

  document.querySelector('body').classList.add('home-page');

};

// Ao sair
Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};