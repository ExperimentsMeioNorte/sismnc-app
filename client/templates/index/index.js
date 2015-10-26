// Ao sair
Template.index.rendered = function(){
  Session.set('splashLoaded', true);
}

Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};