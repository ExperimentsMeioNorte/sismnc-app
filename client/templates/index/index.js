// Ao sair
Template.index.rendered = function(){
  handle.release();
}

Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};