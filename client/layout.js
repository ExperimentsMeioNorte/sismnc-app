var handle = LaunchScreen.hold();

Template.layout.rendered = function(){
  FastClick.attach(document.body);
  IonSideMenu.snapper.settings({disable: 'none'});
  handle.release();
};


Template.layout.events({
  'touchstart [data-activate="logout"]' : function(event){
    event.preventDefault();
    localStorage.clear();
    Meteor.logout();
    document.querySelector('.menu-content').style.transform = 'translate3d(0, 0, 0)';
    Router.go('authentication');
  }
});
