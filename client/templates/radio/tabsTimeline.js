var dateObj = new Date();
Meteor.dateBegin = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' 0:0:0';
Meteor.dateNow = (dateObj.getDate() + 1) + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' 0:0:1';

Template.tabsTimelineRadio.destroyed = function(){
  //document.querySelector('body').classList.remove('radio-page');
}

Template.tabsTimelineRadio.helpers({
  contents: function(){
    IonLoading.show();
    // valida se é para listar as mensagens
    var content = Content.findOne(
      {
        program_id:Router.current().params._id,
        status: 1,
        date_record: {
          $gte: Meteor.dateBegin,
          $lte: Meteor.dateNow
        }
      }
    );

    if(content !== undefined){
      content = Content.find(
      {
        program_id:Router.current().params._id,
        status: 1,
        date_record: {
          $gte: Meteor.dateBegin,
          $lte: Meteor.dateNow
        }
      },
      {
        sort: {date_record:"desc"},
        limit: Session.get('limit')
      }).map(
        function(c) {
          // pega o nome e o avatar do usuario da mensagem atual
          var user = User.find(
          {
            _id:c.user_id
          }).map(
            function(u){
              return {
                name: u.name,
                avatar: u.avatar
              }
            }
          );

          if(c.user_id && user[0] !== undefined){

            // pega o tempo em que o registro atual está
            Meteor.remote.call(
              'timeCompare',
              c.date_record,
              function(error, result){
                Session.set('getupTimeLineTimeCompare' + c._id, result);
              }
            );

            return {
              _id: c._id,
              text: c.text,
              img: c.img,
              video: c.video,
              date_record: c.date_record,
              user_name: user[0].name,
              user_avatar: user[0].avatar,
              msg_time: Session.get('getupTimeLineTimeCompare' + c._id),
              notFound: true
            };
          }else{
            return '';
          }
        }
      );
      IonLoading.hide();
      return content;
    }else{
      IonLoading.hide();
      return [{notFound: false}];
    }
  },

  // verifica se esta no final do registro e some com o botao mais
  mais: function(){
    IonLoading.show();
    var contentCount = Content.find(
    {
      program_id:Router.current().params._id,
      status: 1,
      date_record: {
        $gte: Meteor.dateBegin,
        $lte: Meteor.dateNow
      }
    }).count();
    IonLoading.hide();
    return (Session.get('limit') >= contentCount)? false : true;
  }
});

Template.tabsTimelineRadio.events({
    'touchstart #mais': function(){
        IonLoading.show();
        Meteor.incrementLimit();
        IonLoading.hide();
    }
});