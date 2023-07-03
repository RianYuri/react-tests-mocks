import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Cartoes from './componentes/Cartoes';
import AppRoutes from './routes'

describe('Rotas', () => {
  test('Deve renderizar a rota principal', () => {
    render(<App />, { wrapper: BrowserRouter });
    // Como a rota App esta dentro de BrowserRouter utilizamos o wrapper para dizer que esta dentro de BrowserRouter
    const usuario = screen.getByText('Olá, Joana :)!');
    expect(usuario).toBeInTheDocument();
  });

  test('deve renderizar a rota cartões', () => {
    const rota = '/cartoes';
    render(
      //  o MemoryRouter é utilizado nesse caso para simular ->
      //  a navegação na rota /cartoes durante os testes, garantindo que o componente correto seja renderizado e que o conteúdo esperado esteja presente na tela.
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });
  test('Deve renderizar a localização da rota atual', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );
    const localizacaoAtual = screen.getByTestId('local')
      expect(localizacaoAtual).toHaveTextContent(rota)
  });
  test('Deve renderizar a pagina 404', ()=>{
    const rota = '/extrato';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const paginaErro = screen.getByTestId('pagina-404');
    expect(paginaErro).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  })
});
