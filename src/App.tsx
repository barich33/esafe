
import React from 'react';
import MainRoutes from './routes/routes';
import { ShellProvider } from './context/shell.context';
import './App.css'
const App: React.FC = () => {
 
  return (
  <ShellProvider>   
  <MainRoutes/>
  </ShellProvider>
  );
};

export default App;