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
                        IonLoading.show();

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