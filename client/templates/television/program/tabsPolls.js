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
              user_id: localStorage.getItem('Meteor.userId')
          }).map(
            function(pu){
              return {
                _id: pu._id
              }
            }
          );

          if((pollUser && pollUser[0] !== undefined)
            && (document.querySelector('.polls-answers') !== null
            && document.querySelector('.results-question') !== null)){
            document.querySelector('.polls-answers').classList.add('hide');
            document.querySelector('.results-question').classList.remove('hide');
          }
        }else if(document.querySelector('.polls-answers') !== null
            && document.querySelector('.message-feedback') !== null){
            document.querySelector('.polls-answers').classList.add('hide');
            document.querySelector('.message-feedback').classList.remove('hide');
        }

        return poll;
    },
  // mostra as respostas
  answersActive: function(){
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
          return {
            _id: a._id,
            description: a.description
          }
        }
      );
    }else{
      return '';
    }
  }
});

Template.tabsPollsTelevision.events({
    'touchstart .btn-answer': function(event){
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
                    localStorage.getItem('Meteor.userId')
                ],
                function(error, result){
                    if(!result){
                        toastr.info(
                          "Veish, algo deu errado.. tente novamente",
                          '',
                          {
                            "positionClass": "toast-top-center",
                            "tapToDismiss": true,
                            "timeOut": 3000
                          }
                        );
                    }else{
                        IonLoading.show({
                          customTemplate: 'Aguarde...'
                        });
                        document.querySelector('.polls-answers').classList.add('hide');
                        document.querySelector('.results-question').classList.remove('hide');
                    }
                }
            );
        }
    }
});