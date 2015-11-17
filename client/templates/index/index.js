Template.index.helpers({
  phone: function(){
    var userPhone = [User.findOne({_id:localStorage.getItem('Meteor.userServerId'), status:1})];
    if(userPhone[0] !== undefined){
      if((userPhone[0].confirmphone === undefined || userPhone[0].confirmphone !== true) && (userPhone[0].phone === undefined || userPhone[0].phone === null)){
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
    }
  }
});

Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};