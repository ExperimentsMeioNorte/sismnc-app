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

  /*Cordova.depends({
      'com.phonegap.plugins.facebookconnect': '0.11.0',
      'cordova-plugin-camera': '1.2.0'
  });*/
 });
