// OAUTH ( REDES SOCIAIS );
Meteor.startup(function() {

    // Google
    ServiceConfiguration.configurations.remove({
      service: "google"
    });
    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: google.clientId,
      secret: google.clientSecret
    });


});