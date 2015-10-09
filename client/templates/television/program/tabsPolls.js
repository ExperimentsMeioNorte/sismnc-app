Template.tabsPolls.rendered = function(){

  document.querySelector('body').classList.add('television-page');

}

Template.tabsPolls.destroyed = function(){

  document.querySelector('body').classList.remove('television-page');

}