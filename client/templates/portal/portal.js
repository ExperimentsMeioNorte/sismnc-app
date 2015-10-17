// Ao Entrar
Template.portal.rendered = function(){
  Session.set('currentTab', 'tabs.indexPortal');
};

// Ao sair
Template.portal.destroyed = function(){

  document.querySelector('body').classList.remove('portal-page');

};

