App.info({
  id: 'br.com.app.sistemameionorte',
  name: 'MNAPPv2',
  description: 'Aplicativo Interativo Sistema Meio Norte de Comunicação',
  version: '0.0.1'
});

App.icons({

  // iOS
  'iphone': 'public/icons/ios/Icon-60.png',
  'iphone_2x': 'public/icons/ios/AppIcon.appiconset/Icon-60@2x.png',
  'ipad': 'public/icons/ios/Icon-72.png',
  'ipad_2x': 'public/icons/ios/Icon-72@2x.png',

  // Android
  'android_ldpi': 'public/icons/android/drawable-ldpi/ic_launcher.png',
  'android_mdpi': 'public/icons/android/drawable-lmdpi/ic_launcher.png',
  'android_hdpi': 'public/icons/android/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'public/icons/android/drawable-xhdpi/ic_launcher.png'

});

// App.launchScreens({

//   // iOS
//   'iphone': 'public/images/splash/splash-320x480.png',
//   'iphone_2x': 'public/images/splash/splash-320x480@2x.png',
//   'iphone5': 'public/images/splash/splash-320x568@2x.png',
//   'ipad_portrait': 'public/images/splash/splash-768x1024.png',
//   'ipad_portrait_2x': 'public/images/splash/splash-768x1024@2x.png',
//   'ipad_landscape': 'public/images/splash/splash-1024x768.png',
//   'ipad_landscape_2x': 'public/images/splash/splash-1024x768@2x.png',

//   // Android
//   'android_ldpi_portrait': 'public/images/splash/splash-200x320.png',
//   'android_ldpi_landscape': 'public/images/splash/splash-320x200.png',
//   'android_mdpi_portrait': 'public/images/splash/splash-320x480.png',
//   'android_mdpi_landscape': 'public/images/splash/splash-480x320.png',
//   'android_hdpi_portrait': 'public/images/splash/splash-480x800.png',
//   'android_hdpi_landscape': 'public/images/splash/splash-800x480.png',
//   'android_xhdpi_portrait': 'public/images/splash/splash-720x1280.png',
//   'android_xhdpi_landscape': 'public/images/splash/splash-1280x720.png'
// });

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
