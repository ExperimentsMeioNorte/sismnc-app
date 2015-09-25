Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'loading',
    onBeforeAction: function(){
        //if(!Meteor.remote.userId()){ // habilitar em producao
        if(!Meteor.userId()){ // habilitar em desenvolvimento
          Router.go('authentication');
        }
        this.next();
   }
});
