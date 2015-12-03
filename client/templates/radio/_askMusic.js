Template._askMusic.events({
    'tap .btn-askmusic': function(event){
        event.preventDefault();
        if(document.querySelector('#music').value === ''){
            toastr.info(
              "Precisa pedir a música",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
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
                        toastr.info(
                          result,
                          '',
                          {
                            "positionClass": "toast-top-center",
                            "tapToDismiss": true,
                            "timeOut": 3000
                          }
                        );

                        //remove os dados dos campos do form para evitar a duplicidade do registro
                        document.querySelector('#music').value = document.querySelector('#artist').value = '';
                        IonModal.close();
                        IonNavigation.skipTransitions = false;
                    }else{
                        toastr.info(
                          error,
                          '',
                          {
                            "positionClass": "toast-top-center",
                            "tapToDismiss": true,
                            "timeOut": 3000
                          }
                        );
                    }
                }
            );
        }
    }
});