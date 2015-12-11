
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
	      	var monday = (c.day_monday === 1)? 'segunda - ' : '';
	      	var tuesday = (c.day_tuesday === 1)? 'terça - ' : '';
	      	var wednesday = (c.day_wednesday === 1)? 'quarta - ' : '';
	      	var thursday = (c.day_thursday === 1)? 'quinta - ' : '';
	      	var friday = (c.day_friday === 1)? 'sexta - ' : '';
	      	var saturday = (c.day_saturday === 1)? 'sabado - ' : '';
	      	var sunday = (c.day_sunday === 1)? 'domingo - ' : '';
	      	var days = monday + tuesday + wednesday + thursday + friday + saturday + sunday;

	        return {
	          day: days,
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
