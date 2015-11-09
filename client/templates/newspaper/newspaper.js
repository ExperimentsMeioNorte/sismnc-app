Template.indexNewspaper.rendered = function () {
  document.querySelector('body').classList.add('newspaper-page');
};

Template.indexNewspaper.destroyed = function () {
  document.querySelector('body').classList.remove('newspaper-page');
};