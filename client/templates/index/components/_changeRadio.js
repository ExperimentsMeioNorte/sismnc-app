Template._changeRadio.rendered = function () {
    Meteor.aud = Meteor.audControl = undefined; // remove o controle do botao play da radio
};

Template._changeRadio.events({
  'click .change-radio .item' : function(){
    IonModal.close();
    IonNavigation.skipTransitions = false;
    return true;
  }
});

Template._changeRadio.helpers({
  // gera as url das radios
  radio: function(){
    var vehicleRadio = Vehicle.find(
      {
        name: 'radio'
      }
    ).map(
      function(v){
        return {_id: v._id}
      }
    );

    if(vehicleRadio && vehicleRadio[0] !== undefined){
      return Program.find(
        {
          vehicle_id: vehicleRadio[0]._id,
          status: 1
        }
      ).map(
        function(p) {
          return {
            _id: p._id,
            image_folder: p.image_folder,
            name: p.name
          };
        }
      );
    }else{
      return '';
    }
 }
});