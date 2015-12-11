
Template.infoTv.helpers({
	// informacoes do programa atual
	info: function(){
		var program = Program.find(
	      {
	        _id: Router.current().params._id,
	        status: 1
	      }
	    ).map(
	      function(c) {
	        return {
	          day_monday: ((c.day_monday === 1)? 'segunda' : ''),
	          day_tuesday: ((c.day_tuesday === 1)? 'terça' : ''),
	          day_wednesday: ((c.day_wednesday === 1)? 'quarta' : ''),
	          day_thursday: ((c.day_thursday === 1)? 'quinta' : ''),
	          day_friday: ((c.day_friday === 1)? 'sexta' : ''),
	          day_saturday: ((c.day_saturday === 1)? 'sabado' : ''),
	          day_sunday: ((c.day_sunday === 1)? 'domingo' : ''),
	          hour_begin: c.hour_begin,
	          hour_end: c.hour_end,
	          description: c.description
	        };
	      }
	    );

	    if(program && program !== undefined){
	    	return program;
	    }else{
	    	return '';
	    }
	},

	// mostra a televisao
	playTvValidate: function(hour_begin, hour_end){
		document.querySelector('body').classList.add('playTV');
		return Meteor.playTv.playValidate(hour_begin, hour_end);
	},

	buttonValidate: function(){
		document.querySelector('body').classList.add('buttonGoTV');
		return Meteor.playTv.buttonPlayTv();
	},

	buttonProgramId: function(){
		return Meteor.playTv.programId;
	}
});

Template.infoTv.destroyed = function () {
	document.querySelector('body').classList.remove('playTV');
	document.querySelector('body').classList.remove('buttonGoTV');
};
