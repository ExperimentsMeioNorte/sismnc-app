// OAUTH ( REDES SOCIAIS );
Meteor.startup(function() {

    // Google
    ServiceConfiguration.configurations.remove({
      service: "google"
    });
    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: Meteor.settings.google.clientId,
      secret: Meteor.settings.google.clientSecret
    });


});