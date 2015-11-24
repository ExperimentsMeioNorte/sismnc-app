Template._enterEmail.events({
  'touchstart .btn-reset-pass, click .btn-reset-pass': function () {
    document.querySelector('body').classList.add('show-reset-password');
  },
  'touchstart .close-reset-password, click .close-reset-password': function () {
    document.querySelector('body').classList.add('show-reset-password');
  }
});