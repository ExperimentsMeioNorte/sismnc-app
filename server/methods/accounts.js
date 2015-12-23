// OAUTH ( REDES SOCIAIS );
var google = {
  clientId: '89878768792-horg1beja8ai32j24bg6k532ce2bhi5p.apps.googleusercontent.com',
  clientSecret: 'xFsGTQfT8s1Ij6oxhlIpmUiI'
}

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