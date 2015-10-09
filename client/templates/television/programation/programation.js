// Ao Entrar
Template.programation.rendered = function(){

  document.querySelector('body').classList.add('television-page');

};

// Ao sair
Template.programation.destroyed = function(){

  document.querySelector('body').classList.remove('television-page');

};