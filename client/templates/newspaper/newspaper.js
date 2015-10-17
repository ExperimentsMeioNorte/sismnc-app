// Ao Entrar
Template.newspaper.rendered = function(){

  Session.set('currentTab', 'tabs.indexNewspaper');

  document.querySelector('body').classList.add('newspaper-page');

};

// Ao sair
Template.newspaper.destroyed = function(){

  document.querySelector('body').classList.remove('newspaper-page');

};


