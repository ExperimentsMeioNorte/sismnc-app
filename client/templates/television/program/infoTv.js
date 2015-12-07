
Template.infoTv.helpers({

 // mostra a televisao
 playTvValidate: function(hour_begin, hour_end){
   document.querySelector('body').classList.add('playTV');
   return Meteor.playTv.playValidate(hour_begin, hour_end);
 },

 buttonValidate: function(){
   document.querySelector('body').classList.add('buttonGoTV');
   return Meteor.playTv.buttonPlayTv();
 },

 buttonProgramId: function(){
   return Meteor.playTv.programId;
 }
});

Template.infoTv.destroyed = function () {
  document.querySelector('body').classList.remove('playTV');
  document.querySelector('body').classList.remove('buttonGoTV');
};
