Meteor.startup(function () {
  process.env.DDP_DEFAULT_CONNECTION_URL='http://admin.sistemameionorte.com.br:3002';

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