// Rota Rede Meio Norte
Router.route('/rede-meionorte', function () {

  this.layout('television');

  this.render('home');
  this.render('headerTelevision', {to: 'header'});
  this.render('navigationTelevision', {to: 'navigation'});

}, {
  name: 'television'
  // waitOn: function() {
  //   Meteor.remote.subscribe('program');
  //   Meteor.remote.subscribe('category');
  // }
});


// Ao Entrar
Template.television.onRendered(function(){

   $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true
    }
  );

  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity:1,
    in_duration: 300,
    out_duration: 200,
    ready: function() {

    },
    complete: function() {

    }
  });
});

// Ao Sair
Template.television.onDestroyed(function(){

  // $('#modal-about, #modal-edit-profile, #modal-error-report').closeModal();
  document.querySelector('body').classList.remove('show-message');
  $('ul.tabsTV').tabs();

});
//
// Template.programs.helpers({
//   'programList': function(){
//     var categoryId = null;
//     var programs = [];
//
//     var category = Category.find(
//       {},
//       {sort: {description:"asc"}}
//     ).map(
//       function(c) {
//         return {
//           _id: c._id,
//           description: c.description
//         };
//       }
//     );
//
//     var program = Program.find(
//       {},
//       {sort: {category_id:"asc"}}
//     ).map(
//       function(p) {
//         return {
//           _id: p._id,
//           image_avatar: p.image_avatar,
//           category_id: p.category_id
//         };
//       }
//     );
//
//     for(cID in category){
//       for(pID in program){
//         if(program[pID].category_id === category[cID]._id){
//           console.log(program[pID]._id);
//           programs[pID] = {
//             program_id: program[pID]._id,
//             image_avatar: program[pID].image_avatar,
//             category_name: category[cID].description,
//             categoryValid: categoryId !== program[pID].category_id
//           };
//           categoryId = category[cID]._id;
//         }
//       }
//     }
//
//     return programs;
//   }
// });
