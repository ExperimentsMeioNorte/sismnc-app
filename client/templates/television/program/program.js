Template.program.rendered = function () {
  Session.set('currentTab', 'tabs.timelineTelevision');
  Session.set('limit', 5);
};

Template.program.helpers({
  // gera os dados do programa atual
  programs: function(){
    IonLoading.show({
      customTemplate: 'Aguarde...'
    });
    var categoryId = Category.find(
      {
        description: 'Radio'
      }
    ).map(
      function(c){
        return {
          _id: c._id
        }
      }
    );

    if(categoryId && categoryId[0] !== undefined){
        var program = Program.find(
          {
            _id: Router.current().params._id,
            status: 1,
            category_id: { $not: categoryId[0]._id }
          }
        ).map(
          function(p) {
            var days = '';

            if(p.day_monday === 1){
              days += ' segunda -';
            }

            if(p.day_tuesday === 1){
              days += ' terça -';
            }

            if(p.day_wednesday === 1){
              days += ' quarta -';
            }

            if(p.day_thursday === 1){
              days += ' quinta -';
            }

            if(p.day_friday === 1){
              days += ' sexta -';
            }

            if(p.day_saturday === 1){
              days += ' sabado -';
            }

            if(p.day_sunday === 1){
              days += ' domingo -';
            }

            days = days.substr(1, (days.length - 2));

            return {
              _id: p._id,
              _idTv: p.city_id,
              name: p.name,
              day: days,
              hour_begin: p.hour_begin,
              hour_end: p.hour_end,
              description: p.description
            };
          }
        );
        IonLoading.hide();
        return program;
    }else{
        IonLoading.hide();
        return '';
    }
  }
});
