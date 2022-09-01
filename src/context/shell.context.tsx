
import { createContext, useState } from "react";
import { Application } from "../core";

let ShellType:ShellContextProps={application:{}};
const ShellContext = createContext<ShellContextProps>(ShellType);
const { Provider } = ShellContext;

interface ShellContextProps {
  application: Application;
}

const ShellProvider = ({ children }) => {
  const [application, setApplication] = useState<Application>({});

  return (
    <Provider value={{
      application: application
    }}>
      {children}
    </Provider>
  );
};

export { ShellContext, ShellProvider };

