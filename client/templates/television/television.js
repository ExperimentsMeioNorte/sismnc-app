// Ao sair
Template.television.rendered = function(){
  document.querySelector('body').classList.add('television-page');
}
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
    var categoryId = null;
    var programs = [];

    var category = Category.find(
      { description: { $not: 'Radio' } },
      {sort: {description:"asc"}}
    ).map(
      function(c) {
        return {
          _id: c._id,
          description: c.description
        };
      }
    );

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
      var program = Program.find(
        {
          city_id: cityId[0]._id,
          vehicle_id: vehicleId[0]._id,
          status:1
        },
        {sort: {category_id:"asc"}}
      ).map(
        function(p) {
          return {
            _id: p._id,
            _idTv: p.city_id,
            image_avatar: p.image_avatar,
            category_id: p.category_id
          };
        }
      );

      for(cID in category){
        for(pID in program){
          if(program[pID].category_id === category[cID]._id){
            programs[pID] = {
              _id: program[pID]._id,
              program_id: program[pID]._id,
              image_avatar: program[pID].image_avatar,
              category_name: category[cID].description,
              categoryValid: categoryId !== program[pID].category_id
            };
            categoryId = category[cID]._id;
          }
        }
      }

      if(programs || programs[0] !== undefined){
        return programs;
      }else{
        return '';
      }
    }else{
      return '';
    }
  }
});