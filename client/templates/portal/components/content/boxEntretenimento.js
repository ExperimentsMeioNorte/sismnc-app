Template.boxEntretenimento.events({

  'click [data-action="active-nav-entretenimento"]' : function(){
    document.querySelector('body').classList.add('show-nav-entretenimento');
    console.log('Ativo');
  },
  'click [data-action="inactive-nav-entretenimento"]' : function(){
    document.querySelector('body').classList.remove('show-nav-entretenimento');
    console.log('Inativo');
  }

});
