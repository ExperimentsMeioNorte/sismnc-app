var handle = LaunchScreen.hold();

Tracker.autorun(function() {
    Meteor.remote.subscribe('program');
    Meteor.remote.subscribe('category');
    Meteor.remote.subscribe('content');
    Meteor.remote.subscribe('answer');
    Meteor.remote.subscribe('poll');
    Meteor.remote.subscribe('polluser');
    Meteor.remote.subscribe('vehicle');
    Meteor.remote.subscribe('user');
    Meteor.subscribe('users');
});


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
    document.querySelector('body').classList.remove('snapjs-left');
    document.querySelector('.menu-content').style.transform = 'translate3d(0, 0, 0)';
    Router.go('authentication');
  }
});

Template.layout.helpers({
    user: function(){
        return [User.findOne({_id:localStorage.getItem('Meteor.userId'), status:1})];
    }
});
