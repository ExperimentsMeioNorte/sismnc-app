Template.resultsPollsRadio.helpers({
  pollsResults: function(){
    return Poll.find(
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
  },

  // Obs.: para calcular a porcentagem eh realizado uma regra de 3, para saber a porcentagem faltante
  answersResult: function(){
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
      var answered = PollUser.findOne(
        {
          status: 1,
          poll_id: poll[0]._id,
          user_id: localStorage.getItem('Meteor.userId')
        }
      );

      if(answered === undefined){
        return null;
      }else{
        var answersResult = total = [];
        var i = porcent = calculoTotal = voto = answerUser = 0;
        beforePorcent = 100;

        // gera o grupo de respostas da enquete
        var group = PollUser.find(
          {
            status: 1,
            poll_id: poll[0]._id
          }
        ).fetch();

        // pega a resposta que o usuario logado respondeu
        for(var x in group){
          if(group[x]['user_id'] === localStorage.getItem('Meteor.userId')){
            answerUser = group[x]['answer_id'];
            break;
          }
        }

        // gera o array das quantidades das respostas
        var groupedAnswerId = _.groupBy(_.pluck(group, 'answer_id'));
        _.each(_.values(groupedAnswerId), function(data) {
          total[i] = data.length;
          i++;

        });

        // pega o total da quantidade das respostas
        for(var x in total){
          calculoTotal += total[x];
        }

        // gera o array da porcentagem de cada resposta e mostra qual o usuario respondeu
        i = 0;
        _.each(_.values(groupedAnswerId), function(data) {
          voto = '';
          if(answerUser === data[i]){
            voto = 'vote';
          }

          porcent = ((data.length * 100) / calculoTotal);
          answersResult[i] = {
            porcent: porcent.toFixed(2),
            description: Answer.findOne(
                {
                  status: 1,
                  _id: data[0]
              },
                {
                  fields: {
                    description: 1
                  }
                }
            ).description,
            voto:voto
          };
          i++;

        });

        return  answersResult
      }
    }else{
      return '';
    }
  }
});