Template.messageTimeline.events({
  'click [data-action="addMedia"]': function(event, template) {
    IonPopup.show({
      buttons: [{
        text: '<i class="ion-paperclip"></i>',
        type: 'button-positive',
        onTap: function() {
          IonPopup.close();
        }
      },
      {
        text: '<i class="ion-android-camera"></i>',
        type: 'button-positive',
        onTap: function() {
          IonPopup.close();
        }
      },
      {
        text: '<i class="ion-ios-videocam"></i>',
        type: 'button-positive',
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
  }
});