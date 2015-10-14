// Ao Entrar
Template.television.rendered = function(){

  IonLoading.show({
    customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
    duration: 500,
    backdrop: true
  });

  document.querySelector('body').classList.add('television-page');


};

// Ao sair
Template.television.destroyed = function(){

  document.querySelector('body').classList.remove('television-page');

};

Template.television.events({
  'click [data-action="goProgram"]' : function(){
    IonNavigation.skipTransitions = false;
    return true;
  }
});

Template.television.helpers({
  programList: function(){
    var categoryId = null;
    var programs = [];

    var category = Category.find(
      {description: { $not: 'Radio' }},
      {sort: {description:"asc"}}
    ).map(
      function(c) {
        return {
          _id: c._id,
          description: c.description
        };
      }
    );

    var program = Program.find(
      {status:1},
      {sort: {category_id:"asc"}}
    ).map(
      function(p) {
        return {
          _id: p._id,
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

    return programs;
  }
});