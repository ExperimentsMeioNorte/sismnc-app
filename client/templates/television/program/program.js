Template.program.rendered = function () {
  Session.set('currentTab', 'tabs.timelineTelevision');
  Session.set('limit', 5);
};

Template.program.destroyed = function() {
  document.querySelector('body').classList.remove('television-page');
}

Template.program.helpers({
  // gera os dados do programa atual
  programs: function(){
    IonLoading.show({
      customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(196.349 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>'
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
