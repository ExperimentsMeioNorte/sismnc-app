// OAUTH ( REDES SOCIAIS );

var google = {
  clientId: '89878768792-horg1beja8ai32j24bg6k532ce2bhi5p.apps.googleusercontent.com',
  clientSecret: 'xFsGTQfT8s1Ij6oxhlIpmUiI'
}

var facebook = {
  appId: '580730978674615',
  appSecret: '17f294e3ae5aa7e088aa88fbe042dac6'
}

Meteor.startup(function() {

    // Google
    Accounts.loginServiceConfiguration.remove({
      service: "google"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "google",
      clientId: google.clientId,
      secret: google.clientSecret,
      loginStyle: "redirect",
      redirectUrl: "/"
    });

    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: facebook.appId,
      secret: facebook.appSecret,
      loginStyle: "redirect",
      redirectUrl: "/"
    });



});
