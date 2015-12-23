Template.tabsPollsTelevision.rendered = function(){
  document.querySelector('body').classList.add('television-page');
  document.querySelector('body').classList.add('hide-message');
  document.querySelector('.scroll-content').classList.add('has-tab-program');
}

Template.tabsPollsTelevision.destroyed = function(){
  document.querySelector('body').classList.remove('hide-message');
  document.querySelector('.scroll-content').classList.remove('has-tab-program');
}

Template.tabsPollsTelevision.helpers({

    // mostra a enquete
    pollActive: function(){
        var poll = Poll.find(
          {
            status: 1,
            program_id: Router.current().params._id
          }
        ).map(
          function(p){
            return {
              _id: p._id,
              description: p.description,
              img: p.img
            }
          }
        );

        // validate poll
        if(poll && poll[0] !== undefined){
          var pollUser = PollUser.find(
          {
              status: 1,
              poll_id: poll[0]._id,
              user_id: localStorage.getItem('Meteor.userServerId')
          }).map(
            function(pu){
              return {
                _id: pu._id
              }
            }
          );

          // verifica se a enquete atual que está ativa ja foi respondida
          if((pollUser && pollUser[0] !== undefined)){
            document.querySelector('.message-feedback').classList.add('hide');
            document.querySelector('.poll-answers-footer').style.display = 'none';
            var radioButtonArray = document.getElementsByClassName('radio');
            for(var i = 0; i < radioButtonArray.length; i++){
              radioButtonArray[i].disabled = true;
            }
          }
        }else{
          document.querySelector('.message-feedback').classList.remove('hide');
          //document.querySelector('.poll-answers-footer').style.display = 'none';
        }

        return poll;
    },
  // mostra as respostas
  answersActive: function(){
    var anwersPorcent = Meteor.anwersResult();

    var poll = Poll.find(
      {
        status: 1,
        program_id: Router.current().params._id
      }
    ).map(
      function(p){
        return {
          _id: p._id,
          description: p.description,
          img: p.img
        }
      }
    );

    if(poll && poll[0] !== undefined){
      return Answer.find(
        {
          status: 1,
          poll_id: poll[0]._id
        }
      ).map(
        function(a){
          var porcentValidate = 0;
          var voto = '';
          if(anwersPorcent){
            for(var x in anwersPorcent){
              if(anwersPorcent[x]['_id'] === a._id){
                porcentValidate = anwersPorcent[x]['porcent'];
                voto = anwersPorcent[x]['voto'];
              }
            }
          }

          return {
            _id: a._id,
            description: a.description,
            porcent: porcentValidate,
            voto: voto
          }
        }
      );
    }else{
      return '';
    }
  }
});

Template.tabsPollsTelevision.events({
    'tap .btn-answer': function(event){
        event.preventDefault();

        if(!document.querySelector('input[name="answer"]:checked').value){
            toastr.info(
              "Escolha uma resposta",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
        }else{

            Meteor.remote.call(
                'insertPollUser',
                [
                    111,
                    document.querySelector('#poll_id').value,
                    document.querySelector('input[name="answer"]:checked').value,
                    localStorage.getItem('Meteor.userServerId')
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
                          'Oba, enquete respondida.',
                          '',
                          {
                            "positionClass": "toast-top-center",
                            "tapToDismiss": true,
                            "timeOut": 3000
                          }
                        );

                        IonLoading.hide();
                        document.querySelector('.radio').disabled = true;
                        document.querySelector('#poll-answers-footer').style.display = 'none';
                    }
                }
            );
        }
    }
});