Template.program.rendered = function () {
  Session.set('currentTab', 'tabs.timelineTelevision');
  Session.set('limit', 5);
};

Template.program.destroyed = function() {
  document.querySelector('body').classList.remove('television-page');
}

// Transferir esse helper para infoTv.js
Template.program.helpers({
  // gera os dados do programa atual
  programs: function(){
    IonLoading.show({
      customTemplate: '<i class="spinner spinner-spiral loading"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></i>'
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
