
Template.infoTv.helpers({
 // mostra a televisao
 playTvValidate: function(hour_begin, hour_end){
   return Meteor.playTv.playValidate(hour_begin, hour_end),
   document.querySelector('body').classList.add('playTV');
 },

 buttonValidate: function(){
   return Meteor.playTv.buttonPlayTv(),
   document.querySelector('body').classList.add('buttonGoTV');
 },

 buttonProgramId: function(){
   return Meteor.playTv.programId;
 }
});

Template.infoTv.destroyed = function () {
  document.querySelector('body').classList.remove('playTV');
  document.querySelector('body').classList.remove('buttonGoTV');
};
