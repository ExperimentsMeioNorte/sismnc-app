// OAUTH ( REDES SOCIAIS );
Meteor.startup(function() {

    /*ServiceConfiguration.configurations.update(
      { service: "google" },
      { $set: {
          clientId: "89878768792-op9bqlm96avdu4g32p2bpvrd9ga9e7ap.apps.googleusercontent.com",
          secret: "wT1pGMsvLfuncOXp1YP4hR5L",
          loginStyle: "popup"
        }
      },
      { upsert: true }
    );*/

    //638977909535835
    //580730978674615

    //28012ad2d935da4bdbfe26b78c23f77a
    //17f294e3ae5aa7e088aa88fbe042dac6
    ServiceConfiguration.configurations.update(
      { service: "facebook" },
      { $set: {
          appId: "638977909535835",
          secret: "28012ad2d935da4bdbfe26b78c23f77a",
          loginStyle: "popup"
        }
      },
      { upsert: true }
    );

});
