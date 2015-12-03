// Template._changeProgram.rendered = function () {

// };

Template._changeProgram.events({
  'tap .change-television .item' : function(){
    IonModal.close();
    IonNavigation.skipTransitions = false;
    return true;
  }
});

Template._changeProgram.helpers({
  program: function(){
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