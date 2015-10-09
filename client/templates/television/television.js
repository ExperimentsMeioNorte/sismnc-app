// Rota
Router.map(function() {
  this.route('television', {
    path: '/rede-meionorte'
  });
  this.route('programation', {path: '/rede-meionorte/programacao'});
  this.route('tabs.timeline', {path: '/rede-meionorte/timeline', layoutTemplate: 'tabsInteraction'});
  this.route('tabs.polls', {path: '/rede-meionorte/enquete', layoutTemplate: 'tabsInteraction'});
});

// Ao Entrar
Template.television.rendered = function(){

  document.querySelector('body').classList.add('television-page');

};

// Ao sair
Template.television.destroyed = function(){

  document.querySelector('body').classList.remove('television-page');

};


Template.television.events({
  'click [data-action="goProgram"]' : function(){
    IonNavigation.skipTransitions = false;
    return true;
  }
});