import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../../routes';
describe('Componente <App/>', () => {
  test('Deve perimitir adicionar uma transação de extrato', () => {
    render(<App />, { wrapper: BrowserRouter });
    const select = screen.getByRole('combobox');
    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(campoValor, '100');
    userEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');

    expect(novaTransacao).toContainElement(itemExtrato);
  });

  test('Devera navegar ate a pagina correspondente ao link que clica',async ()=>{
    render(<AppRoutes/>,{wrapper:BrowserRouter})
    const linkPaginaCartao = screen.getByText('Cartões');
    expect(linkPaginaCartao).toBeInTheDocument()


    userEvent.click(linkPaginaCartao)

    const tituloPgCartoes = await screen.findByText('Meus cartões')

    expect(tituloPgCartoes).toBeInTheDocument();
  })
});
