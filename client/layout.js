var handle = LaunchScreen.hold();

Template.layout.rendered = function(){
  FastClick.attach(document.body);
  IonSideMenu.snapper.settings({disable: 'none'});
  handle.release();
};


Template.layout.events({
  'click [data-activate="logout"], touchstart [data-activate="logout"]' : function(event){
    event.preventDefault();
    localStorage.clear();
    Meteor.logout();
    Router.go('authentication');
  }
});
