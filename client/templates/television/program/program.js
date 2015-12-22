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
      customTemplate: "<div class='uil-default-css' style='transform:scale(0.27);'><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:6px;position:absolute;'></div></div>"
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
