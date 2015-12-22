Template.loading.rendered = function () {
  if ( ! Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      // logo: '/images/home/logo-sistema.png',
      backgroundColor: '#ffffff',
      loadingHtml: spinner
    });

    // manually remove loading for demo
    var loading = this.loading;
    Meteor.setTimeout(function () {
      loading.finish();
      Session.set('splashLoaded', true);
    }, 2000);

  }
};

Template.loading.destroyed = function () {
  if ( this.loading ) {
    this.loading.finish();
  }
};

//var message = '<p class="loading-message">Aguarde um momento...</p>';
var spinner = "<div class='uil-default-css' style='transform:scale(0.27);'><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:6px;position:absolute;'></div><div style='top:80px;left:94px;width:12px;height:40px;background:#000000;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:6px;position:absolute;'></div></div>";