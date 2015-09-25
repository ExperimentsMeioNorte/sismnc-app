// Rota do Programa
Router.route('/rede-meionorte/programa/:_id', {
  fastRender: true,
  layout: 'ApplicationLayout',
  name: 'program',
  yieldRegions: {
    'headerTelevision': {to: 'header'},
    'program': {to: 'program'}
  },
  waitOn: function() {
    Meteor.remote.subscribe('program');
  },
  data: function(){
    return Program.findOne(this.params._id);
  }
});

Template.program.onRendered(function(){

  Meteor.setTimeout(function(){
    document.querySelector('body').classList.add('show-message-television');
  }, 1000);

  $('ul.tabsTV').tabs();

});

Template.program.onDestroyed(function(){
  document.querySelector('body').classList.remove('show-message-television');
  $('ul.tabsTV').tabs();
});

Template.program.events({

  'click #btn-hide-message, focus #btn-hide-message, click #btn-share-message, focus #btn-share-message': function () {
    document.querySelector('body').classList.remove('show-message-television');
  },

  'click #btn-show-message, focus #btn-show-message': function () {
    document.querySelector('body').classList.add('show-message-television');
  }
});