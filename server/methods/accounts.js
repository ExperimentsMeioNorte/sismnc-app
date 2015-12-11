// OAUTH ( REDES SOCIAIS );
Meteor.startup(function() {

    // Google
    ServiceConfiguration.configurations.remove({
      service: "google"
    });
    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: "89878768792-op9bqlm96avdu4g32p2bpvrd9ga9e7ap.apps.googleusercontent.com",
      secret: "wT1pGMsvLfuncOXp1YP4hR5L"
    });

});
