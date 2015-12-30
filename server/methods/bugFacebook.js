Meteor.methods({
  	// insere a marca que foi configurado o primeiro uso ou atualizacao
	'insertBugFacebook': function(){
		BugFacebook.insert({validate: true});
	},

	// remove se tiver uma nova atualizacao
	'removeBugFacebook': function(){
	    BugFacebook.remove({});
	}
});

Meteor.publish('bugfacebook', function() {
    return BugFacebook.find({});
});