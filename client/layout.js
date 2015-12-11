Tracker.autorun(function() {
    Meteor.remote.subscribe('program');
    Meteor.remote.subscribe('category');
    Meteor.remote.subscribe('content');
    Meteor.remote.subscribe('answer');
    Meteor.remote.subscribe('poll');
    Meteor.remote.subscribe('polluser');
    Meteor.remote.subscribe('vehicle');
    Meteor.remote.subscribe('user');
    Meteor.remote.subscribe('city');
    Meteor.subscribe('users');
});

Template.layout.events({
  'tap [data-activate="logout"]' : function(){
    IonPopup.show({
      title: 'Deseja sair',
      subTitle: 'Tem certeza que deseja desconectar da sua conta?',
      buttons: [

        {
          text: 'Cancelar',
          type: 'button-cancel',
          onTap: function() {
            IonPopup.close();
          }
        },
        {
          text: 'Sair',
          type: 'button-desconnect',
          onTap: function() {
            Meteor.logout();
            localStorage.clear();
            Router.go('authentication');
            IonPopup.close();
          }
        }
      ]
    });
  }
});

Template.layout.helpers({
    user: function(){
      if(Session.get('getupUserData')){
        return Session.get('getupUserData');
      }else{
        return '';
      }
    }
});

