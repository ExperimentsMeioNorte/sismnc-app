Template.radio.rendered = function () {
  Session.set('currentTab', 'tabs.timelineRadio');
  Session.set('limit', 5);

  IonLoading.show({
    customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
    duration: 1000
  });

  document.querySelector('body').classList.add('radio-page');

};

// Ao sair
Template.radio.destroyed = function(){

  document.querySelector('body').classList.remove('radio-page');

};


// Template.radio.helpers({
//   // gera os dados do programa atual
//   programs: function(){
//     var categoryId = Category.find(
//       {
//         description: 'Radio'
//       }
//     ).map(
//       function(c){
//         return {
//           _id: c._id
//         }
//       }
//     );

//     if(categoryId && categoryId[0] !== undefined){
//         return Program.find(
//           {
//             _id: Router.current().params._id,
//             status: 1,
//             category_id: { $not: categoryId[0]._id }
//           }
//         ).map(
//           function(p) {
//             return {
//                 _id: p._id,
//               name: p.name,
//               day: p.day,
//               hour_begin: p.hour_begin,
//               hour_end: p.hour_end,
//               description: p.description
//             };
//           }
//         );
//     }else{
//         return '';
//     }
//   }
// });