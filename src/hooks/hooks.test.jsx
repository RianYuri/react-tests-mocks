import { useState, useEffect } from 'react';
import {  renderHook } from '@testing-library/react';

test('Hooks', () => {
  const { result } = renderHook(() => {
    const [nome, setNome] = useState('');
    useEffect(() => {
      setNome('Rian');
    }, []);
    return nome;
  });

  expect(result.current).toBe('Rian')
});
