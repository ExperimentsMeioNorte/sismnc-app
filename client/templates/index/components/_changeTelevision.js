// Template._changeTelevision.rendered = function () {

// };

Template._changeTelevision.events({
  'click .change-television .item, touchstart .change-television .item' : function(){
    IonModal.close();
    IonNavigation.skipTransitions = false;
    return true;
  }
});

Template._changeTelevision.helpers({
  programs: function(){
    var vehicleTelevision = Vehicle.find({
        name: 'Rede Meio Norte'
    }).map( function(v){
        return {_id: v._id}
    });
    var cityId = City.find({
        name: 'Piauí'
    }).map( function(c){
        return {
           _idTv: c.city_id
        }
    });

    if(vehicleTelevision[0] && cityId[0] !== undefined){
      return Program.find({
          vehicle_id: vehicleTelevision[0]._id,
          city_id: cityId[0]._id,
          status: 1
      }).map( function(p) {
          return {
            _id: p._id,
            image_avatar: p.image_avatar,
            name: p.name
          };
      });
    } else{
      return '';
    }

    console.log(vehicleTelevision);
    console.log(cityId);

  }
});