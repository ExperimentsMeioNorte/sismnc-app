ApplicationController = RouteController.extend({
  layoutTemplate: 'ApplicationLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  onBeforeAction: function () {
    // if (!Meteor.userId()) {
    //   Router.go('authentication');
    // }
    this.next();
  }
});

Router.configure({
  controller: 'ApplicationController'
});
