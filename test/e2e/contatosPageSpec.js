var ContatosPage = new require('./pages/contatosPage');

describe('Pagina Principal', function(){

  var pagina = new ContatosPage();

  beforeEach(function(){
    pagina.visitar();
  });

  it('Deve estar logado',function(){
    browser.sleep(1,function(){
    pagina.obterUsuarioLogado().then(function(texto){
        expect(texto.trim().length).toBeGreaterThan(0);
        })
      })
  });

  it('Deve remover um contato da lista',function(){
    browser.sleep(1,function(){
    var totalAntes = pagina.obterTotalDeItensDaLista();

    pagina.removerPrimeiroItemDaLista().then(function(){
        var totalDepois = pagina.obterTotalDeItensDaLista();
      expect(totalDepois).toBeLessThan(totalAntes);
      })
  })});
});
