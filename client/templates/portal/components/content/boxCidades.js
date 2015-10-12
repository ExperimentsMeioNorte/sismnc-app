Template.boxCidades.events({

  'click [data-action="active-nav-cidades"]' : function(){
    document.querySelector('body').classList.add('show-nav-cidades');
    console.log('Ativo');
  },
  'click [data-action="inactive-nav-cidades"]' : function(){
    document.querySelector('body').classList.remove('show-nav-cidades');
    console.log('Inativo');
  }

});
