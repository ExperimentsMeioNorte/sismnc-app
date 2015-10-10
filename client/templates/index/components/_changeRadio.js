Template.television.rendered = function(){
  Meteor.remote.subscribe('program');
  Meteor.remote.subscribe('category');
  Meteor.remote.subscribe('content');
  Meteor.remote.subscribe('user');
  Meteor.remote.subscribe('answer');
  Meteor.remote.subscribe('poll');
  Meteor.remote.subscribe('polluser');
  Meteor.remote.subscribe('vehicle');

};

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