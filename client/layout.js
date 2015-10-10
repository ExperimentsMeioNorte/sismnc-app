Template.layout.rendered = function(){
  IonSideMenu.snapper.settings({disable: 'right'});



};




Template.layout.events({
  'click [data-activate="logout"]' : function(event){
    event.preventDefault();
    Meteor.logout();
    Meteor.setTimeout(function(){
      Router.go('authentication');
    }, 1000)
  }
});
