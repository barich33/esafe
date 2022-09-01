import { Spin } from 'antd';
import React from 'react';

const PrimeCareSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full bg-white spin-cls">
      <Spin />
    </div>
  );
};

export default PrimeCareSpinner;
