Meteor.publish('users', function() {
     return Meteor.users.find({}, {
         $fields:
             {
                 services:1,
                 resume:0,
                 profile:0,
                 createdAt:0
             }
         }
     );
 });
