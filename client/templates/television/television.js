// Ao sair
Template.television.destroyed = function(){

  document.querySelector('body').classList.remove('television-page');
  document.querySelector('body').classList.remove('show-hide-image');

};

Template.television.events({
  'tap [data-action="goProgram"]' : function(){
    IonNavigation.skipTransitions = true;
  }
});

Template.television.helpers({
  programList: function(){
    var cityId = City.find(
      {
        name: 'Piauí',
        status: 1
      }
    ).map(
      function(c) {
        return {
          _id: c._id
        };
      }
    );

    var vehicleId = Vehicle.find(
      {
        name: 'Rede Meio Norte',
        status: 1
      }
    ).map(
      function(c) {
        return {
          _id: c._id
        };
      }
    );

    if((cityId && cityId[0] !== undefined) && (vehicleId && vehicleId[0] !== undefined)){
      return Program.find(
        {
          city_id: cityId[0]._id,
          vehicle_id: vehicleId[0]._id,
          status: 1
        }
      ).map(
        function(p) {
          return {
            _id: p._id,
            image_folder: p.image_folder,
          };
        }
      );
    }else{
      return '';
    }
 }
});