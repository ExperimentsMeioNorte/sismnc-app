Template._tabsHeaderRadio.events({
    'click .player-button': function(event){
        event.preventDefault();

        // verifica qual link é da radio atual
        var radioLink = (Router.current().params.name === 'fmmn')? 'live' : 'boa';
        document.querySelector('.aud').src = 'http://painel.amsolution.net.br:8080/' + radioLink + '?type=.mp3';

        var aud = document.querySelector('.aud');
        var playClass = document.querySelector('.icon-play').className;

        // dar play ou pause no player
        if(playClass === 'icon-play hide'){
            aud.pause();

            document.querySelector('.icon-pause').classList.add('hide');
            document.querySelector('.icon-play').classList.remove('hide');

            IonLoading.show({
                customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
                duration: 500,
                backdrop: true
            });
        }else{
            aud.play();

            document.querySelector('.icon-pause').classList.remove('hide');
            document.querySelector('.icon-play').classList.add('hide');

            IonLoading.show({
                customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
                duration: 500,
                backdrop: true
            });
        }
    }
});