Template.tabsTimelineTelevision.rendered = function(){

  document.querySelector('body').classList.add('television-page');
  document.querySelector('.scroll-content').classList.add('has-tab-program');
}

Template.tabsTimelineTelevision.destroyed = function(){

  document.querySelector('body').classList.remove('television-page');
  document.querySelector('.scroll-content').classList.remove('has-tab-program');

}

Template.tabsTimelineTelevision.helpers({
  contents: function(){
    var dateObj = new Date();
    Meteor.dateBegin = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' 00:00:00';
    Meteor.dateNow = (dateObj.getDate() + 1) + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' 01:00:00';

    return Content.find(
    {
      program_id:Router.current().params._id,
      status: 1,
      date_record: {
        $gt: Meteor.dateBegin,
        $lt: Meteor.dateNow
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
            msg_time: Session.get('getupTimeLineTimeCompare' + c._id)
          };
        }else{
          return '';
        }
      }
    );
//console.log(content, content[0]);
    /*if(content && content[0] !== undefined){
      console.log('tem');
      Session.set('getupValidateContent', false);
      return content;
    }else{
      console.log('nao tem');
      Session.set('getupValidateContent', true);
      return '';
    }*/
  },

  validateContent: function(){
    var content = Content.findOne({ program_id:Router.current().params._id, status: 1});
    return (content !== undefined)? true : false;
  },

  // verifica se esta no final do registro e some com o botao mais
  mais: function(){
    var contentCount = Content.find(
    {
      program_id:Router.current().params._id,
      status: 1,
      date_record: {
        $gt: Meteor.dateBegin,
        $lt: Meteor.dateNow
      }
    }).count();

    return (Session.get('limit') >= contentCount)? 'display:none' : 'display:block';
  }
});

Template.tabsTimelineTelevision.events({
    'click #mais': function(){
        Meteor.incrementLimit();
    }
});