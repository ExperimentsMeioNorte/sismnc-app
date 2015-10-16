Template.tabsPollsTelevision.rendered = function(){
  IonLoading.show({
    customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
    duration: 500,
    backdrop: true
  });
  document.querySelector('body').classList.add('television-page');
  document.querySelector('body').classList.add('hide-message');
  document.querySelector('.scroll-content').classList.add('has-tab-program');

}

Template.tabsPollsTelevision.destroyed = function(){

  document.querySelector('body').classList.remove('television-page');
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
              user_id: Meteor.userId()
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
                "Ops, necessario escolher uma resposta.",
                '',
                {
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "showDuration": "100"
                }
            );
        }else{
            Meteor.remote.call(
                'insertPollUser',
                [
                    111,
                    document.querySelector('#poll_id').value,
                    document.querySelector('input[name="answer"]:checked').value,
                    Meteor.userId()
                ],
                function(error, result){
                    if(!result){
                        toastr.info(
                            "Ops, algo deu errado.",
                            '',
                            {
                                "progressBar": true,
                                "positionClass": "toast-top-center",
                                "showDuration": "100"
                            }
                        );
                    }else{
                        IonLoading.show({
                          customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
                          duration: 500,
                          backdrop: true
                        });
                        document.querySelector('.polls-answers').classList.add('hide');
                        document.querySelector('.results-question').classList.remove('hide');
                    }
                }
            );
        }
    }
});