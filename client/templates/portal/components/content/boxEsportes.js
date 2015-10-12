Template.boxEsportes.events({

  'click [data-action="active-nav-esportes"]' : function(){
    document.querySelector('body').classList.add('show-nav-esportes');
    console.log('Ativo');
  },
  'click [data-action="inactive-nav-esportes"]' : function(){
    document.querySelector('body').classList.remove('show-nav-esportes');
    console.log('Inativo');
  }

});
