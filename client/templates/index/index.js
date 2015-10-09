// Rota
Router.map(function() {
  this.route('index', {
    path: '/'
   //  onBeforeAction: function(){
   //    if(!Meteor.remote.userId()){
   //      Router.go('authentication');
   //    }
   //    this.next();
   // }
  });
});

// Ao Entrar
Template.index.rendered = function(){

  document.querySelector('body').classList.add('home-page');

};

// Ao sair
Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};