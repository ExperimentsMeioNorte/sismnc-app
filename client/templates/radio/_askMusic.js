Template._askMusic.events({
    'touchstart .btn-askmusic': function(event){
        event.preventDefault();
        if(document.querySelector('#music').value === ''){
            console.log('Precisa de uma musica');
        }else{
            Meteor.remote.call(
                'insertMusic',
                [
                    111,
                    Router.current().params._id,
                    localStorage.getItem('Meteor.userId'),
                    document.querySelector('#music').value,
                    document.querySelector('#artist').value,
                    localStorage.getItem('Meteor.userId')
                ],
                function(error, result){
                    if(!error){
                        IonLoading.show({
                            customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
                            duration: 1000
                        });

                        //remove os dados dos campos do form para evitar a duplicidade do registro
                        document.querySelector('#music').value = document.querySelector('#artist').value = '';
                        IonModal.close();
                        IonNavigation.skipTransitions = false;
                    }else{
                        console.log('Não deu Nova Mensagem');
                    }
                }
            );
        }
    }
});