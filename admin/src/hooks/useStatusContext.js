import { useContext } from 'react';
import { StatusContext } from '../contexts/StatusContext';

export const useStatusContext = () => {
  return useContext(StatusContext);
};


