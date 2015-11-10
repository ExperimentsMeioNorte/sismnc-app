Template.index.helpers({
  phone: function(){
    var userPhone = [User.findOne({_id:localStorage.getItem('Meteor.userServerId'), status:1})];
    if(userPhone[0] === undefined || userPhone[0] === null){
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
        }
      });
    }
  }
});

Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};