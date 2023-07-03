import { act, renderHook } from '@testing-library/react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';
// Testando hooks

jest.mock('../services/transacoes');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];
describe('Hooks/useListaTransacoes', () => {
  test('Deve retornar uma lista de transacoes e uma funcao que a atualiza', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao);

    const { result } = renderHook(() => useListaTransacoes());
    expect(result.current[0]).toEqual([]);

    await act(async () => {
      result.current[1]();
    });
    expect(result.current[0]).toEqual(mockTransacao);
  });
});
