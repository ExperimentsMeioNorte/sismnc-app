App.info({
  name: 'SISMNC',
  description: 'Aplicativo Interativo Sistema Meio Norte de Comunicação',
  version: '0.0.1'
});

/*App.icons({
  'android_ldpi': 'resources/icons/icon-ldpi.png',
  'android_mdpi': 'resources/icons/icon-mdpi.png',
  'android_hdpi': 'resources/icons/icon-hdpi.png',
  'android_xhdpi': 'resources/icons/icon-xhdpi.png'
});*/

App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);

// cordova plugin facebook
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
     APP_ID: '638977909535835',
     APP_NAME: 'vtv'
});

// // regras de acesso cross origen
App.accessRule("*");
// //App.accessRule("*://localhost:3010/*");
