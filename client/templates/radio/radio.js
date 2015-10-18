Template.radio.rendered = function () {
  Session.set('currentTab', 'tabs.timelineRadio');
  Session.set('limit', 5);

  var bodyTemplate = document.querySelector('body');

  if ( Router.current().params.name === 'fmmn' ) {
    bodyTemplate.classList.add('fmmn-page');
    bodyTemplate.classList.remove('boa-page');
  }
  bodyTemplate.classList.add('boafm-page');

  IonModal.close();

  if(Router.current().params.name !== Meteor.audRadio){
    document.querySelector('.icon-pause').classList.add('hide');
    document.querySelector('.icon-play').classList.remove('hide');
  }

};

// Ao sair
Template.radio.destroyed = function(){

  document.querySelector('body').classList.remove('boafm-page');
  document.querySelector('body').classList.remove('fmmn-page');
  document.querySelector('body').classList.remove('radio-page');

};

Template.radio.events({
  'click .player-button, touchstart .player-button': function(event){
      IonLoading.show();
      event.preventDefault();

      // verifica qual link é da radio atual
      var radioLink = (Router.current().params.name === 'fmmn')? 'live' : 'boa';
      document.querySelector('.aud').src = 'http://painel.amsolution.net.br:8080/' + radioLink + '?type=.mp3';

      Meteor.aud = document.querySelector('.aud');
      var playClass = document.querySelector('.icon-play').className;

      // dar play ou pause no player
      if(playClass === 'icon-play hide'){
          Meteor.aud.pause();
          Meteor.audControl = 'play';
          document.querySelector('.icon-pause').classList.add('hide');
          document.querySelector('.icon-play').classList.remove('hide');
          IonLoading.hide();
      }else{
          Meteor.aud.play();
          Meteor.audControl = 'pause';
          document.querySelector('.icon-pause').classList.remove('hide');
          document.querySelector('.icon-play').classList.add('hide');
          Meteor.aud.oncanplay = function(){
            IonLoading.hide();
          }
      }
      Meteor.audRadio = Router.current().params.name;
    }
});

Template.radio.helpers({
    programs: function(){
      IonLoading.show();
      var program = Program.find(
        {
          _id: Router.current().params._id,
          status: 1
        }
      ).map(
        function(p) {
          return {
              _id: p._id,
            name: p.name,
            day: p.day,
            hour_begin: p.hour_begin,
            hour_end: p.hour_end,
            image_avatar: p.image_avatar,
            description: p.description
          };
        }
      );
      IonLoading.hide();
      return program;
    }
});

