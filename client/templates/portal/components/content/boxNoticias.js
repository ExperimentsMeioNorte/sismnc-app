Template.boxNoticias.events({

  'click [data-action="active-nav-noticias"]' : function(){
    document.querySelector('body').classList.add('show-nav-noticias');
    console.log('Ativo');
  },
  'click [data-action="inactive-nav-noticias"]' : function(){
    document.querySelector('body').classList.remove('show-nav-noticias');
    console.log('Inativo');
  }

});
