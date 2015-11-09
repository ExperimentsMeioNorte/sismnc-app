// Ao sair
Template.index.rendered = function(){
  IonPopup.prompt({
    title: 'Qual seu telefone?',
    okText: 'Salvar',
    cancelText: 'Cancelar',
    inputType: 'text',
    inputPlaceholder: 'Digite aqui',
    onOk: function() {
      console.log('Salvo');
    }
  });
}

Template.index.destroyed = function(){

  document.querySelector('body').classList.remove('home-page');

};