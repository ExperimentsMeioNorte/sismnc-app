Meteor.startup(function () {

   // PERMISSIONS
   for(var i in collections){
     collections[i].allow({
       insert: function(userId, form){
         return false;
       },
       update: function(userId, form, fields, modifier){
         return false;
       },
       remove: function(userId, form){
         return false;
       }
     });
   }

 });
