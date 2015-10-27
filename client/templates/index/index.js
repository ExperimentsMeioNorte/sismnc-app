// Ao sair
Template.index.rendered = function(){
  //Session.set('splashLoaded', true);
  IonPopup.prompt({
    title: 'Qual seu telefone?',
    okText: 'Salvar',
    inputType: 'text',
    inputPlaceholder: 'Digite aqui'
  });
}

Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};