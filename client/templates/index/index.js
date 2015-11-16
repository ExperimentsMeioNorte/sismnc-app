Template.index.helpers({
  phone: function(){
    var userPhone = [User.findOne({_id:localStorage.getItem('Meteor.userServerId'), status:1})];
    if(userPhone[0] !== undefined){
      if((userPhone[0].confirmphone === undefined || userPhone[0].confirmphone !== true) && (userPhone[0].phone === undefined || userPhone[0].phone === null)){
        IonPopup.prompt({
          title: 'Qual seu telefone?',
          okText: 'Salvar',
          cancelText: 'Cancelar',
          inputType: 'text',
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
                        console.log('algo deu errado.');
                    }else{
                        console.log('atualizado com sucesso.');
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
                      console.log('algo deu errado.', error);
                  }else{
                      console.log('atualizado com sucesso.');
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