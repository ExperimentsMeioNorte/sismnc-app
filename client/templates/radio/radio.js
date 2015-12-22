Template.radio.rendered = function () {
  Session.set('currentTab', 'tabs.timelineRadio');
  Session.set('limit', 5);

  IonModal.close();

  var bodyTemplate = document.querySelector('body');

  if ( Router.current().params.name === 'fmmn' ) {
    bodyTemplate.classList.add('fmmn-page');
    bodyTemplate.classList.remove('boafm-page');
  } else if ( Router.current().params.name === 'boafm' ) {
    bodyTemplate.classList.add('boafm-page');
    bodyTemplate.classList.remove('fmmn-page');
  }
};

// Ao sair
Template.radio.destroyed = function(){
  document.querySelector('body').classList.remove('boafm-page');
  document.querySelector('body').classList.remove('fmmn-page');
  document.querySelector('body').classList.remove('radio-page');
};

Template.radio.events({
  'tap .player-button': function(event){
      IonLoading.show({
        customTemplate: "<div class='uil-default-css' style='transform:scale(0.27);'><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:6px;position:absolute;'></div></div>"
      });
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
    }
});

Template.radio.helpers({
    programs: function(){
      IonLoading.show({
      customTemplate: "<div class='uil-default-css' style='transform:scale(0.27);'><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:6px;position:absolute;'></div></div>"
      });
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

