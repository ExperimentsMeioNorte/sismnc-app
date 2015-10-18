Template._editProfile.events({
  'touchstart .update-perfil' : function(form){
    form.preventDefault();
    console.log(form);
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#mail").value;
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