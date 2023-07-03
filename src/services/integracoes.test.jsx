// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import App from '../paginas/Principal/App';
import api from './api';
import { buscaTransacoes } from './transacoes';
jest.mock('./api')
// Estou fazendo um teste sem que precise que a api rode, criamos um mock para fazer a simular o que api faria
// Fazendo o teste do retorno da api
  const mockTransacao = [{
    id:1,
    transacao:'Depósito',
    data:'22/11/2022',
    mes:'Novembro'
  }]
  const mockRequisicao = ( retorno)=>{
    return new Promise ((resolve)=>{
      setTimeout(()=>{
        resolve({
          data:retorno
        })
      },)
    })
  }
  const mockRequisicaoErro = ( )=>{
    return new Promise ((_, reject)=>{
      setTimeout(()=>{
        reject();
      
      },)
    })
  }
describe('Requisiçãoes para API', () => {

  test('Deve retornar uma lista de transações', async() =>{
    api.get.mockImplementation(()=>mockRequisicao(mockTransacao))

    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual(mockTransacao)
    expect(api.get).toHaveBeenCalledWith('/transacoes');

  })

  test('Deve retornar uma lista vazia', async() =>{
    api.get.mockImplementation(()=>mockRequisicaoErro(mockTransacao))

    const transacoes = await buscaTransacoes();
    expect(transacoes).toEqual([])
    expect(api.get).toHaveBeenCalledWith('/transacoes');

  })


// Éssa lista de transacoes funciona quando a api esta on rodando
  // test('deve retornar uma lista de transações', async () => {
  //   const transacoes = await buscaTransacoes();
  //   expect(transacoes).toHaveLength(3);
    
  //   render(<App />, { wrapper: BrowserRouter });
  //   const transacao = await screen.findAllByText('Novembro');
  //   transacao.forEach((transacao) => expect(transacao).toBeInTheDocument());
  // Fazendo teste para ver se a requisicao esta funcionando tudo corretamente

  // });



  
});
