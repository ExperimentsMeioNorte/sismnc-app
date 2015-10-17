Template._editProfile.events({
  'touchstart [data-activate="update-perfil"]' : function(event){
    event.preventDefault();
    var name = document.querySelector(".name");
    var email = document.querySelector(".mail");
    if(!name || !email){
        console.log('necessario preencher os campos obrigatorios');
    }else{
        Meteor.remote.call('updatePerfil',
            [
                222,
                name,
                email,
                localStorage.getItem('Meteor.userId')
            ],
            function(error, result){
                if(!result){
                    console.log('algo deu errado.');
                }else{
                    console.log('atualizado com sucesso.')
                }
            }
        );
    }
  }
});

Template._editProfile.helpers({
    user: function(){
        return [User.findOne({_id:localStorage.getItem('Meteor.userId'), status:1})];
    }
});