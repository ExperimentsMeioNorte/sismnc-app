Template.boxBlogs.events({

  'click [data-action="active-nav-blogs"]' : function(){
    document.querySelector('body').classList.add('show-nav-blogs');
    console.log('Ativo');
  },
  'click [data-action="inactive-nav-blogs"]' : function(){
    document.querySelector('body').classList.remove('show-nav-blogs');
    console.log('Inativo');
  }

});
