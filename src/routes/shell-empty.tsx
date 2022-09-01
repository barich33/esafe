import React from "react";
import PCLogo from '../features/icons/pc_logo.png';

const ShellEmpty = ({message = ''}) => {
  return (
    <div className="pt-3 pb-3 pl-3">
      <div className="bg-white" style={{ height: '90vh' }}>
        <div className="flex items-center justify-center h-full pt-4">
          <div>
            <img src={PCLogo} alt="React Logo" />
            <div className="flex justify-center font-light text-2xl pt-4">
              {(message && <h2>{message}</h2>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShellEmpty;
