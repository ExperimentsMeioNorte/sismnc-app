// Ao Entrar
Template.columnNewspaper.rendered = function(){

  document.querySelector('body').classList.add('newspaper-page');

};

// Ao sair
Template.columnNewspaper.destroyed = function(){

  document.querySelector('body').classList.remove('newspaper-page');

};