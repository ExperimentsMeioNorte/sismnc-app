// Ao Entrar
Template.television.rendered = function(){
  Meteor.remote.subscribe('program');
  Meteor.remote.subscribe('category');
  Meteor.remote.subscribe('content');
  Meteor.remote.subscribe('user');
  Meteor.remote.subscribe('answer');
  Meteor.remote.subscribe('poll');
  Meteor.remote.subscribe('polluser');

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