Template.indexPortal.rendered = function () {
  document.querySelector('body').classList.add('portal-page');
};

Template.indexPortal.destroyed = function () {
  document.querySelector('body').classList.remove('portal-page');
};