// OAUTH ( REDES SOCIAIS );
Meteor.startup(function() {

    ServiceConfiguration.configurations.update(
      { service: "google" },
      { $set: {
          clientId: "89878768792-op9bqlm96avdu4g32p2bpvrd9ga9e7ap.apps.googleusercontent.com",
          secret: "wT1pGMsvLfuncOXp1YP4hR5L",
          loginStyle: "popup"
        }
      },
      { upsert: true }
    );


    ServiceConfiguration.configurations.update(
      { service: "facebook" },
      { $set: {
          appId: "580730978674615",
          secret: "17f294e3ae5aa7e088aa88fbe042dac6",
          loginStyle: "popup"
        }
      },
      { upsert: true }
    );


});
