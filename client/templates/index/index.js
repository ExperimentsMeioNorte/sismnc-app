Template.index.helpers({
  phone: function(){
    if(Session.get('getupUserData')){
      if((Session.get('getupUserData')[0].confirmphone === undefined || Session.get('getupUserData')[0].confirmphone !== true) && (Session.get('getupUserData')[0].phone === undefined || Session.get('getupUserData')[0].phone === null)){
        IonPopup.prompt({
          title: 'Qual seu telefone?',
          okText: 'Salvar',
          cancelText: 'Cancelar',
          inputType: 'number',
          inputPlaceholder: 'Digite aqui',
          onOk: function() {
            var phone = document.querySelector('input[name=prompt]').value;
            if(phone){
              Meteor.remote.call('updatePerfilPhone',
                [
                    222,
                    phone,
                    true,
                    localStorage.getItem('Meteor.userId')
                ],
                function(error, result){
                    if(!result){
                        toastr.info(
                          error,
                          '',
                          {
                            "positionClass": "toast-top-center",
                            "tapToDismiss": true,
                            "timeOut": 3000
                          }
                        );
                    }else{
                        toastr.info(
                          result,
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
          },
          onCancel: function(){
            Meteor.remote.call('updatePerfilConfirmPhone',
              [
                  222,
                  true,
                  localStorage.getItem('Meteor.userId')
              ],
              function(error, result){
                  if(!result){
                      toastr.info(
                        error,
                        '',
                        {
                          "positionClass": "toast-top-center",
                          "tapToDismiss": true,
                          "timeOut": 3000
                        }
                      );
                  }else{
                      toastr.info(
                        result,
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
        });
      }
    }else{
      return '';
    }
  }
});


Template.index.rendered = function(){
  document.querySelector('body').classList.remove('popup-open');
};

Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};