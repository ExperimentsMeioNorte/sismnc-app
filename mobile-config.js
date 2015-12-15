App.info({
  id: 'br.com.app.sistemameionorte',
  name: 'Meio Norte',
  description: 'Aplicativo Interativo Sistema Meio Norte de Comunicação',
  version: '0.1.53',
  author: 'Agência Getup!',
  email: 'alexandesigner@gmail.com',
  website: 'http://app.sistemameionorte.com.br'
});

App.icons({

  // iOS
  'iphone': 'public/icons/ios/Icon-60.png',
  'iphone_2x': 'public/icons/ios/AppIcon.appiconset/Icon-60@2x.png',
  'iphone_3x': 'public/icons/ios/AppIcon.appiconset/Icon-60@3x.png',

  // Android
  'android_ldpi': 'public/icons/android/drawable-ldpi/ic_launcher.png',
  'android_mdpi': 'public/icons/android/drawable-mdpi/ic_launcher.png',
  'android_hdpi': 'public/icons/android/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'public/icons/android/drawable-xhdpi/ic_launcher.png'

});

App.launchScreens({

  // iOS
  'iphone': 'public/splash/ios/splash-320x480.png',
  'iphone_2x': 'public/splash/ios/splash-320x480.png',
  'iphone5': 'public/splash/ios/splash-320x568.png',
  'iphone6': 'public/splash/ios/splash-375x667.png',
  'iphone6p_portrait': 'public/splash/ios/splash-414x736.png',

  // Android
  'android_ldpi_portrait': 'public/splash/android/drawable-ldpi/screen.png',
  'android_ldpi_landscape': 'public/splash/android/drawable-land-ldpi/screen.png',
  'android_mdpi_portrait': 'public/splash/android/drawable-mdpi/screen.png',
  'android_mdpi_landscape': 'public/splash/android/drawable-land-mdpi/screen.png',
  'android_hdpi_portrait': 'public/splash/android/drawable-hdpi/screen.png',
  'android_hdpi_landscape': 'public/splash/android/drawable-land-hdpi/screen.png',
  'android_xhdpi_portrait': 'public/splash/android/drawable-xhdpi/screen.png',
  'android_xhdpi_landscape': 'public/splash/android/drawable-land-xhdpi/screen.png'
});

App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('Orientation', 'portrait');
App.setPreference("SplashScreen", "screen");
App.setPreference("SplashScreenDelay", "10000");

// cordova plugin facebook
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
     APP_ID: '580730978674615',
     APP_NAME: 'sistemamn'
});

// regras de acesso cross origen
App.accessRule("*");
App.accessRule('*.google-analytics.com/*');
App.accessRule("*://*.meteor.com/*");
//App.accessRule("*://localhost:3010/*");
