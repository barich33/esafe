
import React from 'react';
import MainRoutes from './routes/routes';
import { ShellProvider } from './context/shell.context';

const App: React.FC = () => {
 
  return (
  <ShellProvider>   
  <MainRoutes />
  </ShellProvider>
  );
};

export default App;